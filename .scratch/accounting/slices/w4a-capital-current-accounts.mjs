// W4a: partners' capital and current accounts.
import { concept, P, money, r2, sum, check, ZIM } from "../lib.mjs";
import { columnar, appropriation, headed, table, fmt, U } from "../tables/w4a-lib.mjs";

concept("acc.partnerships.capital-current-accounts", { file: "partnerships/capital-current-accounts", keyPrefix: "partnerships.capital-current-accounts" }, (b) => {
  // ---------------------------------------------------------------- MCQs
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Under the fixed capital method, where is a partner's **salary** recorded?",
    options: [
      ["Credit side of the current account", "Correct: it is an amount due to the partner."],
      ["Debit side of the current account", "Debits are drawings, interest on drawings and losses."],
      ["Credit side of the capital account", "Fixed capital accounts change only for capital introduced or withdrawn."],
      ["Wages in the income statement", "A partner's salary is an appropriation, not an expense."],
    ],
    answer: "A",
    explanation: "Appropriations in the partner's favour (interest on capital, salary, share of profit) are credited to the current account.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which item is entered on the **debit** side of a partner's current account?",
    options: [
      ["Interest on drawings", "Correct: it is a charge on the partner."],
      ["Interest on capital", "This is credited: it is due to the partner."],
      ["Share of residual profit", "This is credited to the partner."],
      ["Capital introduced", "Capital introduced is credited to the capital account."],
    ],
    answer: "A",
    explanation: "Debits: opening debit balance, drawings, interest on drawings and share of loss.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "At the year end a partner's current account has a **debit** balance. What does this show?",
    options: [
      ["The partner has drawn more than was credited", "Correct: the partner owes the difference to the business."],
      ["The business owes the partner some money", "That would be a credit balance."],
      ["The partnership made a loss for the year", "A partner can have a debit balance even in a profitable year."],
      ["The partner has paid in extra capital", "Capital introduced is a credit, in the capital account."],
    ],
    answer: "A",
    explanation: "A debit balance means drawings (and charges) exceeded the partner's interest, salary and share of profit.",
  });
  {
    const open = 960, ioc = 1440, sal = 3600, share = 8130, draw = 11250, iod = 285;
    const close = r2(open + ioc + sal + share - draw - iod);
    b.mcq({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: `Rudo's current account: opening credit balance ${money(open)}; interest on capital ${money(ioc)}; salary ${money(sal)}; share of profit ${money(share)}; drawings ${money(draw)}; interest on drawings ${money(iod)}. What is the closing balance?`,
      options: [
        [`${money(close)} credit`, "Correct: credits 14,130 − debits 11,535."],
        [`${money(r2(close + 2 * iod))} credit`, "Interest on drawings has been credited instead of debited."],
        [`${money(r2(close - 2 * open))} credit`, "The opening credit balance has been treated as a debit."],
        [`${money(close)} debit`, "The credits are larger, so the balance is a credit."],
      ],
      answer: "A",
      hints: ["Total the credits and the debits separately."],
      explanation: `Credits ${fmt(open)} + ${fmt(ioc)} + ${fmt(sal)} + ${fmt(share)} = ${fmt(r2(open + ioc + sal + share))}; debits ${fmt(draw)} + ${fmt(iod)} = ${fmt(r2(draw + iod))}; balance ${fmt(close)} credit.`,
    });
  }
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "A partnership keeps **fluctuating** capital accounts. Where is a partner's share of profit recorded?",
    options: [
      ["Credit side of the capital account", "Correct: with fluctuating capitals there is no current account."],
      ["Credit side of the current account", "Current accounts are used only with fixed capitals."],
      ["Debit side of the capital account", "A share of profit increases what is owed to the partner."],
      ["In the income statement as an expense", "A share of profit is an appropriation."],
    ],
    answer: "A",
    explanation: "Fluctuating capitals: every appropriation and all drawings go through the capital account, so it changes each year.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "How is a **debit** balance on a partner's current account shown in the statement of financial position?",
    options: [
      ["Deducted from the other current account balances", "Correct: it is shown in brackets in the current accounts section."],
      ["Added to the partner's capital account", "It reduces, not increases, the amount owed to partners."],
      ["As a non-current liability", "It is owed by the partner, so it is not a liability of the business."],
      ["It is left out of the statement", "Every balance must be shown; leaving it out would unbalance the statement."],
    ],
    answer: "A",
    explanation: "Debit current account balances are bracketed and deducted in the capital section.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "On 1 April 2025 Sipho paid an extra US\\$5,000 of capital into the partnership bank account. The firm uses fixed capitals. Which entry records this?",
    options: [
      ["Debit bank; credit Sipho's capital account", "Correct: capital introduced increases the fixed capital."],
      ["Debit bank; credit Sipho's current account", "Capital introduced goes to the capital account under fixed capitals."],
      ["Debit Sipho's capital account; credit bank", "This would record capital withdrawn."],
      ["Debit bank; credit the appropriation account", "Capital is not profit, so it never goes to the appropriation account."],
    ],
    answer: "A",
    explanation: "Capital introduced: debit bank, credit the partner's capital account. Interest on capital will then include the new amount from 1 April.",
  });
  {
    const caps = [35000, 25000], curs = [1860, -740];
    const tot = r2(sum(caps) + sum(curs));
    b.mcq({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: `Capital accounts: Farai ${money(35000)}, Chipo ${money(25000)}. Current accounts: Farai ${money(1860)} credit, Chipo ${money(740)} debit. What is the total of the partners' capital and current accounts in the statement of financial position?`,
      options: [
        [money(tot), "Correct: 60,000 + 1,860 − 740."],
        [money(r2(sum(caps) + 1860 + 740)), "The debit balance has been added instead of deducted."],
        [money(r2(sum(caps) + 1860)), "Chipo's debit balance has been left out."],
        [money(sum(caps)), "The current accounts have been left out."],
      ],
      answer: "A",
      hints: ["A debit balance is owed by the partner."],
      explanation: `${fmt(sum(caps))} + ${fmt(1860)} − ${fmt(740)} = ${fmt(tot)}.`,
    });
  }
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which is the main reason partners keep **fixed** capital accounts with separate current accounts?",
    options: [
      ["The agreed capital stays clear for interest on capital", "Correct: and drawings beyond earnings show up in the current account."],
      ["It increases the profit for the year", "The method of recording cannot change the profit."],
      ["It gives the partners limited liability", "Liability depends on the type of business, not the accounts kept."],
      ["It removes the need for an appropriation account", "The appropriation account is still prepared."],
    ],
    answer: "A",
    hints: ["What would happen to the capital figure if every share of profit and drawing went through it?"],
    explanation: "Fixed capitals keep the agreed investment unchanged, which makes interest on capital straightforward and shows clearly whether a partner is overdrawing.",
  });

  // ---------------------------------------------------------------- TF
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Under the fixed capital method, partners' drawings are debited to their current accounts.",
    answer: true,
    explanation: "True. Drawings reduce the amount owed to the partner and are debited to the current account.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A partner with a debit balance on the current account must have received a share of a loss.",
    answer: false,
    explanation: "False. A debit balance can arise in a profitable year if the partner's drawings exceed the amounts credited.",
  });

  // ---------------------------------------------------------------- Match
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each item with the side of the partner's account where it is entered (fixed capital method).",
    right: ["Debit side of the current account", "Credit side of the current account", "Credit side of the capital account"],
    pairs: ["Drawings of goods for own use", "Interest on capital", "Share of residual loss", "Partner's salary", "Additional capital paid in", "Interest on drawings"],
    rightIndex: [0, 1, 0, 1, 2, 0],
    explanation: "Charges against the partner are debits in the current account; rewards are credits; new capital is credited to the capital account.",
  });

  // ---------------------------------------------------------------- FIB
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the statements about partners' accounts.",
    template: "With fixed capitals, the share of profit is credited to the {{blank:a}} account. A current account balance on the debit side at the start of the year is shown as balance b/d on the {{blank:b}} side. A debit current account balance is {{blank:c}} in the statement of financial position.",
    blanks: [
      { id: "a", accepted: ["current"], choices: ["current", "capital", "appropriation"] },
      { id: "b", accepted: ["debit"], choices: ["debit", "credit"] },
      { id: "c", accepted: ["deducted"], choices: ["deducted", "added", "omitted"] },
    ],
    explanation: "Profit shares go to current accounts; a debit balance b/d sits on the debit side and is deducted in the statement.",
  });

  // ---------------------------------------------------------------- Numerical
  {
    const open = -530, ioc = 1260, sal = 4500, share = 5745, draw = 12100, iod = 0;
    const close = r2(open + ioc + sal + share - draw - iod);
    check("neg", close < 0, true);
    b.num({
      d: 3, kind: "money", value: -close, calculator: true, wrong: [r2(-close - 1060)],
      stem: `Nyasha's current account had a **debit** balance of ${money(530)} on 1 January 2025. During 2025 she was credited with interest on capital ${money(ioc)}, a salary of ${money(sal)} and a share of profit of ${money(share)}. Her drawings were ${money(draw)}. Calculate her closing current account balance. (It is a debit balance; enter the amount.)`,
      hints: ["The opening debit balance adds to the debits."],
      explanation: `Credits ${fmt(r2(ioc + sal + share))}; debits ${fmt(530)} + ${fmt(draw)} = ${fmt(r2(530 + draw))}; closing balance ${fmt(-close)} debit. Treating the opening debit balance as a credit gives ${fmt(r2(-close - 1060))}.`,
    });
  }
  {
    const close = 3415, ioc = 2100, share = 9860, draw = 9650, iod = 195;
    const open = r2(close - ioc - share + draw + iod);
    b.calc({
      d: 4, kind: "money", value: open, calculator: true, daily: false, wrong: [r2(close - ioc - share + draw - iod)],
      stem: `At 31 December 2025 Tendai's current account had a credit balance of ${money(close)}. During 2025 he was credited with interest on capital ${money(ioc)} and a share of profit of ${money(share)}, and debited with drawings ${money(draw)} and interest on drawings ${money(iod)}. Calculate the credit balance on his current account at 1 January 2025.`,
      hints: ["Work backwards: remove the credits and add back the debits."],
      explanation: `Opening = ${fmt(close)} − ${fmt(ioc)} − ${fmt(share)} + ${fmt(draw)} + ${fmt(iod)} = ${fmt(open)} credit. Subtracting the interest on drawings instead of adding it back gives ${fmt(r2(close - ioc - share + draw - iod))}.`,
    });
  }
  {
    const open = 1240, ioc = 1800, share = 6375, close = 2905, iod = 0;
    const draw = r2(open + ioc + share - close);
    b.num({
      d: 2, kind: "money", value: draw, calculator: true, daily: true, wrong: [r2(ioc + share - close)],
      stem: `Chipo's current account: opening credit balance ${money(open)}, interest on capital ${money(ioc)}, share of profit ${money(share)}, closing credit balance ${money(close)}. There was no interest on drawings. Calculate her drawings.`,
      explanation: `Drawings = ${fmt(open)} + ${fmt(ioc)} + ${fmt(share)} − ${fmt(close)} = ${fmt(draw)}.`,
    });
  }

  // ---------------------------------------------------------------- manual short
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 2,
    stem: "State **two** differences between a partner's capital account and current account (fixed capital method).",
    points: ["Capital account: long-term capital invested; changes only when capital is introduced or withdrawn", "Current account: records the year's interest, salary, share of profit or loss, drawings and interest on drawings; changes every year / can have a debit balance"],
    modelAnswer: "The capital account holds the agreed long-term investment and normally stays the same; the current account records each year's appropriations and drawings, so it changes every year and may go into debit.",
    explanation: "Capital is long-term and fixed; the current account carries the year-to-year items.",
  });
  b.manualShort({
    d: 3, skill: "EVALUATION", marks: 3,
    stem: "Farai's current account has had a debit balance for three years in a row. Explain why this concerns his partner and suggest **one** action the partners could take.",
    points: ["Farai is drawing more than his share of profit / he owes money to the business", "This reduces the firm's cash / working capital, or his capital is effectively being used up", "Action, e.g. limit drawings in the agreement / charge (higher) interest on drawings / ask him to repay or transfer from capital"],
    modelAnswer: "Farai keeps taking out more than he earns from the business, so he owes the firm money and is draining its cash, which his partner's profits are effectively financing. The partners could agree a limit on drawings or charge interest on drawings, and ask Farai to repay the debit balance.",
    hints: ["What does a debit balance mean for the business's cash?"],
    explanation: "Persistent debit balances show over-drawing; the agreement can control it.",
  });

  // ---------------------------------------------------------------- Practice structured 1: columnar current accounts
  {
    const partners = ["Tendai", "Rudo"];
    const a = appropriation({ name: "Tendai and Rudo", partners, profit: 21560, iod: [270, 410], ioc: [2700, 1650], salary: [0, 5000], ratio: [1, 1] });
    const draws = [8300, 14600];
    const c = columnar("Current accounts", partners, [["1 Jan 2025", "Balance b/d", [null, 380]], ["31 Dec 2025", "Drawings", draws], ["31 Dec 2025", "Interest on drawings", a.iod]], [["1 Jan 2025", "Balance b/d", [1125, null]], ["31 Dec 2025", "Interest on capital", a.ioc], ["31 Dec 2025", "Salary", [null, 5000]], ["31 Dec 2025", "Share of profit", a.shares]]);
    check("rudo debit", c.closing[1] < 0, true);
    const curTot = sum(c.closing);
    b.struct({
      d: 4, examStyle: true, skill: "APPLICATION", calculator: true,
      stem: `Tendai and Rudo own a hardware shop in Mutare. Their fixed capitals are Tendai ${money(45000)} and Rudo ${money(27500)}. On 1 January 2025 Tendai's current account had a credit balance of ${money(1125)} and Rudo's a debit balance of ${money(380)}.\n\nThe appropriation account for the year ended 31 December 2025 showed:\n\n${table(["", `Tendai ${U}`, `Rudo ${U}`], [["Interest on capital", a.ioc[0], a.ioc[1]], ["Salary", null, 5000], ["Interest on drawings", a.iod[0], a.iod[1]], ["Share of residual profit", a.shares[0], a.shares[1]]])}\n\nDrawings for the year were Tendai ${money(draws[0])} and Rudo ${money(draws[1])}.`,
      parts: [
        P.manual({ label: "(a)", marks: 7, type: "EXTENDED_RESPONSE", stem: "Prepare the partners' current accounts in columnar form for the year ended 31 December 2025, bringing down the balances on 1 January 2026.", points: ["Opening balances on the correct sides (Tendai credit, Rudo debit)", "Drawings debited", "Interest on drawings debited", "Interest on capital and Rudo's salary credited", "Shares of profit credited", `Tendai balance c/d ${fmt(c.closing[0])} on the debit side`, `Rudo balance c/d ${fmt(-c.closing[1])} on the credit side; balances b/d on 1 January 2026`], modelAnswer: c.md, explanation: "Balance each partner's column separately." }),
        P.num({ label: "(b)", marks: 2, kind: "money", value: c.closing[0], wrong: [r2(c.closing[0] + 2 * a.iod[0])], stem: "State the balance on Tendai's current account at 31 December 2025 (credit).", explanation: `${fmt(1125)} + ${fmt(a.ioc[0])} + ${fmt(a.shares[0])} − ${fmt(draws[0])} − ${fmt(a.iod[0])} = ${fmt(c.closing[0])}.` }),
        P.num({ label: "(c)", marks: 2, kind: "money", value: -c.closing[1], wrong: [r2(-c.closing[1] - 760)], stem: "State the balance on Rudo's current account at 31 December 2025 (debit).", explanation: `Credits ${fmt(r2(a.ioc[1] + 5000 + a.shares[1]))}; debits ${fmt(380)} + ${fmt(draws[1])} + ${fmt(a.iod[1])} = ${fmt(r2(380 + draws[1] + a.iod[1]))}; balance ${fmt(-c.closing[1])} debit.` }),
        P.num({ label: "(d)", marks: 1, kind: "money", value: r2(72500 + curTot), wrong: [r2(72500 + c.closing[0] - c.closing[1])], stem: "Calculate the total of the partners' capital and current accounts in the statement of financial position at 31 December 2025.", explanation: `${fmt(72500)} + ${fmt(c.closing[0])} − ${fmt(-c.closing[1])} = ${fmt(r2(72500 + curTot))}.` }),
      ],
      hints: ["Rudo's debits are larger than her credits, so her balance c/d goes on the credit side."],
      explanation: `Model answer:\n\n${c.md}`,
    });
  }

  // ---------------------------------------------------------------- Practice structured 2: statement of financial position extract (ZIM wording)
  {
    const caps = [32000, 24000, 16000];
    const a = appropriation({ name: "x", partners: ["Sipho", "Thandeka", "Nyasha"], profit: 30300, ioc: caps.map((c) => r2(c * 0.05)), salary: [0, 0, 4200], ratio: [2, 2, 1] });
    const open = [870, 1430, -215];
    const draws = [9800, 10900, 10100];
    const close = open.map((o, i) => r2(o + a.credits[i] - draws[i]));
    const curTot = sum(close);
    const rows = [["**Capital accounts**", null, null], ...["Sipho", "Thandeka", "Nyasha"].map((p, i) => [p, caps[i], i === 2 ? sum(caps) : null]), ["**Current accounts**", null, null], ...["Sipho", "Thandeka", "Nyasha"].map((p, i) => [p, close[i], i === 2 ? curTot : null]), ["", null, r2(sum(caps) + curTot)]];
    const ext = headed("Sipho, Thandeka and Nyasha", "Statement of financial position (extract)", "at 31 December 2025", rows, { checks: [["cur", curTot, close[0] + close[1] + close[2]]] });
    const neg = close.findIndex((x) => x < 0);
    b.struct({
      d: 4, examStyle: true, skill: "APPLICATION", calculator: true, applies: ZIM,
      stem: `Sipho, Thandeka and Nyasha share profits 2 : 2 : 1 in a transport business in Bulawayo. Their fixed capitals are Sipho ${money(caps[0])}, Thandeka ${money(caps[1])} and Nyasha ${money(caps[2])}; interest on capital is 5% a year and Nyasha receives a salary of ${money(4200)}. The net profit for the year ended 31 December 2025 was ${money(30300)}.\n\n${table(["", `Sipho ${U}`, `Thandeka ${U}`, `Nyasha ${U}`], [["Current account at 1 January 2025", "870 Cr", "1,430 Cr", "215 Dr"], ["Drawings for 2025", draws[0], draws[1], draws[2]]])}`,
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "money", value: a.residual, wrong: [r2(30300 - a.iocTot)], stem: "Calculate the residual profit to be shared.", explanation: `${fmt(30300)} − interest on capital ${fmt(a.iocTot)} − salary ${fmt(4200)} = ${fmt(a.residual)}.` }),
        P.num({ label: "(b)", marks: 2, kind: "money", value: close[0], wrong: [r2(close[0] - 2 * open[0])], stem: "Calculate Sipho's current account balance at 31 December 2025 (credit).", explanation: `${fmt(open[0])} + ${fmt(a.ioc[0])} + ${fmt(a.shares[0])} − ${fmt(draws[0])} = ${fmt(close[0])}.` }),
        P.num({ label: "(c)", marks: 2, kind: "money", value: Math.abs(close[neg]), wrong: [r2(Math.abs(close[neg]) - 430)], stem: `Calculate ${["Sipho", "Thandeka", "Nyasha"][neg]}'s current account balance at 31 December 2025. (It is a debit balance; enter the amount.)`, explanation: `${["Sipho", "Thandeka", "Nyasha"][neg]}: ${fmt(open[neg])} + credits ${fmt(a.credits[neg])} − drawings ${fmt(draws[neg])} = (${fmt(Math.abs(close[neg]))}), a debit balance.` }),
        P.manual({ label: "(d)", marks: 4, type: "EXTENDED_RESPONSE", stem: "Prepare the capital and current accounts section of the statement of financial position at 31 December 2025.", points: ["Heading and capital accounts totalling " + fmt(sum(caps)), "Current account credit balances shown for the two partners", "Debit balance shown in brackets and deducted", `Total ${fmt(r2(sum(caps) + curTot))} (own figure)`], modelAnswer: ext, explanation: "Debit balances are deducted." }),
      ],
      hints: ["Nyasha starts the year with a debit balance.", "Interest on capital is 5% of each fixed capital."],
      explanation: `Model answer:\n\n${ext}`,
    });
  }

  // ---------------------------------------------------------------- Flashcards
  b.card("DEFINITION", "Current account (partnership)", "A partner's account for the year's interest on capital, salary, share of profit or loss, drawings and interest on drawings.");
  b.card("DEFINITION", "Fixed capital", "A method in which each partner's capital account shows only the agreed long-term capital; appropriations and drawings go to the current account.");
  b.card("DEFINITION", "Fluctuating capital", "One account per partner; appropriations and drawings go straight to the capital account, so it changes every year.");
  b.card("FACT", "Credits in a partner's current account", "Opening credit balance, interest on capital, salary, share of profit.");
  b.card("FACT", "Debits in a partner's current account", "Opening debit balance, drawings, interest on drawings, share of loss.");
  b.card("CONCEPT", "Meaning of a debit current account balance", "The partner has drawn more than he or she has been credited with, and owes the difference to the business.");
  b.card("FACT", "Debit current account in the statement of financial position", "Shown in brackets and deducted in the current accounts section.");
  b.card("FACT", "Where does capital introduced by a partner go (fixed capitals)?", "Debit bank (or the asset); credit the partner's capital account.");
  b.card("CONCEPT", "Why balance each partner's column separately?", "One partner may finish with a credit balance and another with a debit balance; each needs its own balance c/d.");
});
