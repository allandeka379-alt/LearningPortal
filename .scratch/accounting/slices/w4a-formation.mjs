// W4a: partnerships: formation and the partnership agreement.
import { concept, P, money, journal, r2, sum, check } from "../lib.mjs";
import { appropriation, table, fmt, U } from "../tables/w4a-lib.mjs";

concept("acc.partnerships.formation", { file: "partnerships/formation", keyPrefix: "partnerships.formation" }, (b) => {
  // ---------------------------------------------------------------- MCQs
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which description best fits a **partnership**?",
    options: [
      ["Two or more people running a business together for profit", "Correct: shared ownership, profits and risks."],
      ["One person who owns and controls the whole business", "This describes a sole trader."],
      ["A business owned by shareholders with limited liability", "This describes a limited company."],
      ["A club run by members to provide a service, not profit", "This describes a not-for-profit organisation."],
    ],
    answer: "A",
    explanation: "A partnership is owned by two or more people who carry on a business together with a view to profit.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which is an **advantage** of a partnership compared with a sole trader?",
    options: [
      ["More capital and skills are available", "Correct: each partner brings money, assets and experience."],
      ["Each owner keeps all of the profit", "Profits are shared, so each partner receives only part."],
      ["The owners have limited liability", "Ordinary partners have unlimited liability."],
      ["Decisions are made faster by one owner", "Decisions must be agreed by the partners, which can be slower."],
    ],
    answer: "A",
    explanation: "Partners pool capital, skills and workload; the costs are shared profits and possible disagreements.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "A partnership in Mutare cannot pay a supplier. What does **unlimited liability** mean for the partners?",
    options: [
      ["Their private possessions may be used to pay the debt", "Correct: the partners are personally liable for all business debts."],
      ["They lose only the capital they put into the business", "That is limited liability, which shareholders enjoy."],
      ["Only the partner who ordered the goods must pay", "Each partner is liable for the debts of the whole firm."],
      ["The supplier must write off the debt as irrecoverable", "The debt is still owed; the partners must pay it."],
    ],
    answer: "A",
    explanation: "Unlimited liability means the owners' personal assets can be claimed to settle the business's debts.",
  });
  b.mcq({
    d: 2, skill: "RECALL", daily: true,
    stem: "Two partners have **no** partnership agreement. How is the profit for the year shared?",
    options: [
      ["Equally between the partners", "Correct: with no agreement, profits and losses are shared equally."],
      ["In the ratio of their capitals", "Capital ratios apply only if the partners agree to them."],
      ["After a salary to the partner who works most", "No salaries are given without an agreement."],
      ["After interest on capital at 5% a year", "No interest on capital is given without an agreement."],
    ],
    answer: "A",
    explanation: "Without an agreement: equal shares, no interest on capital, no salaries, no interest on drawings.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Tatenda lends US\\$6,000 to his partnership, in addition to his capital, at 10% interest a year. How is the interest of US\\$600 treated?",
    options: [
      ["As an expense in the income statement", "Correct: interest on a loan is a cost of borrowing, like bank interest."],
      ["As an appropriation of profit", "Interest on capital is an appropriation; loan interest is not."],
      ["As a deduction from his capital account", "The interest is owed to him, so it is not deducted from his capital."],
      ["As drawings in his current account", "Drawings are amounts taken out, not interest earned."],
    ],
    answer: "A",
    hints: ["Is a partner's loan part of his capital, or a liability of the business?"],
    explanation: "A partner's loan is a liability, so its interest is an expense deducted before the profit for the year is found.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "When the partnership is formed, Nyasha brings in a motor vehicle valued at US\\$7,800 as part of her capital. Which entry records this?",
    options: [
      ["Debit motor vehicle; credit capital: Nyasha", "Correct: the asset increases and so does her capital."],
      ["Debit capital: Nyasha; credit motor vehicle", "This reverses the entry."],
      ["Debit motor vehicle; credit bank", "No money was paid; the vehicle is her capital."],
      ["Debit drawings: Nyasha; credit motor vehicle", "She is putting value in, not taking it out."],
    ],
    answer: "A",
    explanation: "Assets brought in by a partner are debited to the asset account and credited to that partner's capital account.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why might a partnership agreement charge **interest on drawings**?",
    options: [
      ["To discourage partners from taking money out early", "Correct: the earlier and larger the drawings, the bigger the charge."],
      ["To pay the bank for the partners' overdraft", "Bank interest is an expense, not a charge on partners."],
      ["To reward partners who invest more capital", "That is the purpose of interest on capital."],
      ["To reward the partner who works the longest hours", "That is the purpose of a partner's salary."],
    ],
    answer: "A",
    explanation: "Interest on drawings is charged to partners; it is added back in the appropriation account and discourages heavy drawings.",
  });
  {
    const cash = 5600, inv = 2350, equip = 4150;
    const cap = sum([cash, inv, equip]);
    b.mcq({
      d: 2, skill: "APPLICATION", calculator: true,
      stem: `On forming a partnership, Sipho pays ${money(cash)} into the business bank account and brings in inventory worth ${money(inv)} and equipment worth ${money(equip)}. What is the balance on his capital account?`,
      options: [
        [money(cap), "Correct: every asset he brings in is part of his capital."],
        [money(cash), "Only the cash has been counted."],
        [money(r2(cash + equip)), "The inventory has been left out."],
        [money(r2(cash + inv)), "The equipment has been left out."],
      ],
      answer: "A",
      explanation: `${fmt(cash)} + ${fmt(inv)} + ${fmt(equip)} = ${fmt(cap)}.`,
    });
  }
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which item is **least** likely to appear in a partnership agreement?",
    options: [
      ["The prices of the goods the firm sells", "Correct: prices change often and are a trading decision."],
      ["The ratio for sharing profits and losses", "This is one of the main items in an agreement."],
      ["The rate of interest on capital", "Agreements normally state this rate."],
      ["The salary paid to a working partner", "Agreements normally state any salaries."],
    ],
    answer: "A",
    explanation: "An agreement sets out the partners' rights: capital, profit sharing, interest, salaries, loans and duties.",
  });

  // ---------------------------------------------------------------- TF
  b.tf({
    d: 1, skill: "RECALL",
    stem: "A partnership agreement must be in writing before the partnership can exist.",
    answer: false,
    explanation: "False. An agreement can be spoken or even implied by conduct, but a written one avoids arguments.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A salary paid to a partner is shown as an expense in the income statement.",
    answer: false,
    explanation: "False. Partners' salaries are an appropriation of profit, shown in the appropriation account.",
  });

  // ---------------------------------------------------------------- Match
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each term in a partnership agreement with its purpose.",
    pairs: [
      ["Interest on capital", "Rewards a partner for the money invested"],
      ["Partner's salary", "Rewards a partner for extra work in the business"],
      ["Interest on drawings", "Discourages partners from taking money out"],
      ["Profit-sharing ratio", "Divides what is left after the other items"],
      ["Interest on partner's loan", "Pays for money lent beyond the capital"],
    ],
    explanation: "Each item shares the profit fairly between partners who contribute different amounts of money and work.",
  });

  // ---------------------------------------------------------------- FIB
  b.fib({
    d: 2, skill: "APPLICATION",
    stem: "Complete the entries made when a partnership is formed.",
    template: "A partner pays cash into the business bank account: debit {{blank:a}}, credit {{blank:b}}. A partner brings in premises: debit {{blank:c}}, credit {{blank:d}}.",
    blanks: [
      { id: "a", accepted: ["bank"], choices: ["bank", "capital", "drawings"] },
      { id: "b", accepted: ["capital"], choices: ["bank", "capital", "drawings"] },
      { id: "c", accepted: ["premises"], choices: ["premises", "capital", "bank"] },
      { id: "d", accepted: ["capital"], choices: ["premises", "capital", "bank"] },
    ],
    explanation: "Assets brought in are debited; the partner's capital account is credited with their value.",
  });

  // ---------------------------------------------------------------- Numerical
  {
    const cap = 26400, rate = 7.5;
    const ioc = r2((cap * rate) / 100);
    b.num({
      d: 2, kind: "money", value: ioc, calculator: true, daily: true, wrong: [r2(cap * 0.075 / 12)],
      stem: `The partnership agreement allows interest on capital at ${rate}% a year. Thandeka's capital is ${money(cap)} for the whole year. Calculate her interest on capital.`,
      explanation: `${rate}% × ${fmt(cap)} = ${fmt(ioc)}. It is a full year, so no time adjustment is needed.`,
    });
  }
  {
    // with vs without agreement
    const profit = 27300;
    const a = appropriation({ name: "x", partners: ["Chipo", "Rudo"], profit, ioc: [1800, 900], salary: [4200, 0], ratio: [1, 1] });
    const eq = r2(profit / 2);
    const diff = r2(a.credits[0] - eq);
    check("diff", diff, r2(a.credits[0] - 13650));
    b.calc({
      d: 3, kind: "money", value: diff, calculator: true, wrong: [4200, r2(a.credits[0])],
      stem: `Chipo and Rudo made a profit of ${money(profit)}. Their agreement gives Chipo interest on capital of ${money(1800)} and a salary of ${money(4200)}, gives Rudo interest on capital of ${money(900)}, and shares the rest equally. How much **more** does Chipo receive under the agreement than she would with no agreement?`,
      hints: ["Find Chipo's total under the agreement, then compare it with half the profit."],
      explanation: `Residual profit = ${fmt(profit)} − ${fmt(2700)} − ${fmt(4200)} = ${fmt(a.residual)}; half each = ${fmt(a.shares[0])}. Chipo: ${fmt(1800)} + ${fmt(4200)} + ${fmt(a.shares[0])} = ${fmt(a.credits[0])}. With no agreement she receives ${fmt(eq)}. Difference ${fmt(diff)}. The salary alone (${fmt(4200)}) is not the answer, because the salary also reduces the residual profit she shares.`,
    });
  }

  // ---------------------------------------------------------------- manual short
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 2,
    stem: "State **two** reasons why a sole trader might take on a partner.",
    points: ["To obtain more capital", "To gain extra skills / share the workload / share the risk of losses"],
    modelAnswer: "To bring in more capital without borrowing, and to share the work and the risk with someone who has different skills.",
    explanation: "Capital, skills and shared workload or risk are the usual reasons.",
  });
  b.manualShort({
    d: 3, skill: "EVALUATION", marks: 4,
    stem: "Farai and Tendai plan to open a hardware shop in Gweru. Farai will invest twice as much capital, but Tendai will run the shop full time. Advise them on **two** terms they should include in their partnership agreement, and explain why.",
    points: ["Interest on capital", "Explanation: rewards Farai for investing more capital", "Salary for Tendai", "Explanation: rewards Tendai for working full time before the rest is shared"],
    modelAnswer: "They should agree interest on capital, so that Farai is rewarded for the extra money he risks, and a salary for Tendai, because he does most of the work. The remaining profit can then be shared in an agreed ratio.",
    hints: ["Match each term to the contribution it rewards."],
    explanation: "Different contributions of money and work are rewarded by interest on capital and salaries respectively.",
  });

  // ---------------------------------------------------------------- Practice structured 1: formation journal
  {
    const t = { bank: 9000, inv: 3250 }, n = { bank: 6500, fit: 5800, van: 11400 };
    const capT = r2(t.bank + t.inv), capN = r2(n.bank + n.fit + n.van);
    const j = journal([{ date: "1 Mar 2025", lines: [["Bank", t.bank + n.bank, null], ["Inventory", t.inv, null], ["Fixtures and fittings", n.fit, null], ["Motor van", n.van, null], ["Capital: Tatenda", null, capT], ["Capital: Nyasha", null, capN]], narrative: "Capital introduced on forming the partnership" }]);
    const iocN = r2(capN * 0.06 * 10 / 12);
    b.struct({
      d: 3, examStyle: true, skill: "APPLICATION", calculator: true,
      stem: `On 1 March 2025 Tatenda and Nyasha formed a partnership to run a tuck shop and stationery business in Masvingo.\n\n- Tatenda paid ${money(t.bank)} into the business bank account and brought in inventory valued at ${money(t.inv)}.\n- Nyasha paid ${money(n.bank)} into the business bank account and brought in fixtures and fittings valued at ${money(n.fit)} and a motor van valued at ${money(n.van)}.\n\nThe agreement allows interest on capital at 6% a year. The financial year ends on 31 December.`,
      parts: [
        P.num({ label: "(a)", marks: 1, kind: "money", value: capT, wrong: [t.bank], stem: "Calculate Tatenda's capital.", explanation: `${fmt(t.bank)} + ${fmt(t.inv)} = ${fmt(capT)}.` }),
        P.num({ label: "(b)", marks: 1, kind: "money", value: capN, wrong: [n.bank], stem: "Calculate Nyasha's capital.", explanation: `${fmt(n.bank)} + ${fmt(n.fit)} + ${fmt(n.van)} = ${fmt(capN)}.` }),
        P.manual({ label: "(c)", marks: 4, type: "EXTENDED_RESPONSE", stem: "Prepare the journal entry to record the formation of the partnership. A narrative is required.", points: [`Debit bank ${fmt(t.bank + n.bank)}`, `Debit inventory ${fmt(t.inv)}, fixtures ${fmt(n.fit)} and motor van ${fmt(n.van)}`, `Credit capital accounts: Tatenda ${fmt(capT)}, Nyasha ${fmt(capN)}`, "Date and narrative"], modelAnswer: j, explanation: "Each asset brought in is debited; each partner's capital is credited." }),
        P.num({ label: "(d)", marks: 2, kind: "money", value: iocN, wrong: [r2(capN * 0.06)], stem: "Calculate Nyasha's interest on capital for the period ended 31 December 2025.", explanation: `The business ran for 10 months (March to December): ${fmt(capN)} × 6% × 10/12 = ${fmt(iocN)}. A full year would give ${fmt(r2(capN * 0.06))}.` }),
      ],
      hints: ["Capital = every asset the partner brings in, valued at the agreed amount.", "Count the months from 1 March to 31 December."],
      explanation: `Model journal:\n\n${j}`,
    });
  }

  // ---------------------------------------------------------------- Practice structured 2: agreement vs none
  {
    const profit = 40500;
    const capS = 48000, capT = 24000;
    const a = appropriation({ name: "Sipho and Thandeka", partners: ["Sipho", "Thandeka"], profit, ioc: [r2(capS * 0.05), r2(capT * 0.05)], salary: [0, 7200], ratio: [2, 1] });
    const eq = r2(profit / 2);
    const cmp = table(["", `Sipho ${U}`, `Thandeka ${U}`, `Total ${U}`], [["Interest on capital", a.ioc[0], a.ioc[1], a.iocTot], ["Salary", null, 7200, 7200], ["Share of residual profit (2 : 1)", a.shares[0], a.shares[1], a.residual], ["Total under the agreement", a.credits[0], a.credits[1], sum(a.credits)], ["Total with no agreement", eq, eq, profit]]);
    b.struct({
      d: 4, examStyle: true, skill: "ANALYSIS", calculator: true,
      stem: `Sipho (capital ${money(capS)}) and Thandeka (capital ${money(capT)}) run a transport business between Bulawayo and Gweru. The profit for the year ended 31 December 2025 was ${money(profit)}. They are arguing over how to share it. Sipho proposes: interest on capital at 5% a year; a salary of ${money(7200)} for Thandeka, who manages the drivers; the rest shared Sipho 2 : Thandeka 1. There is no written agreement yet.`,
      parts: [
        P.num({ label: "(a)", marks: 1, kind: "money", value: eq, stem: "Calculate each partner's share of the profit if no agreement is made.", explanation: `With no agreement the profit is shared equally: ${fmt(profit)} ÷ 2 = ${fmt(eq)}.` }),
        P.num({ label: "(b)", marks: 2, kind: "money", value: a.residual, wrong: [r2(profit - 7200), r2(profit - a.iocTot)], stem: "Using Sipho's proposal, calculate the residual profit to be shared in the ratio 2 : 1.", explanation: `${fmt(profit)} − interest on capital ${fmt(a.iocTot)} − salary ${fmt(7200)} = ${fmt(a.residual)}.` }),
        P.num({ label: "(c)", marks: 2, kind: "money", value: a.credits[0], wrong: [a.shares[0]], stem: "Calculate Sipho's total share of profit under the proposal.", explanation: `Interest ${fmt(a.ioc[0])} + two-thirds of ${fmt(a.residual)} (${fmt(a.shares[0])}) = ${fmt(a.credits[0])}.` }),
        P.num({ label: "(d)", marks: 2, kind: "money", value: a.credits[1], wrong: [a.shares[1]], stem: "Calculate Thandeka's total share of profit under the proposal.", explanation: `Interest ${fmt(a.ioc[1])} + salary ${fmt(7200)} + one-third of ${fmt(a.residual)} (${fmt(a.shares[1])}) = ${fmt(a.credits[1])}. Check: ${fmt(a.credits[0])} + ${fmt(a.credits[1])} = ${fmt(profit)}.` }),
        P.manual({ label: "(e)", marks: 3, stem: "Advise Thandeka whether she should accept Sipho's proposal. Justify your answer.", points: [`Under the proposal she receives ${fmt(a.credits[1])}, less than ${fmt(eq)} with no agreement`, "But the proposal fairly rewards Sipho's larger capital, and her salary rewards her work", "Justified conclusion, e.g. accept but negotiate a higher salary or a 1 : 1 ratio, and put the agreement in writing"], modelAnswer: `The proposal gives her ${fmt(a.credits[1])}, which is ${fmt(r2(eq - a.credits[1]))} less than an equal share. However, Sipho has invested twice as much capital, so some reward for that is fair. She should accept the structure but negotiate a higher salary or equal sharing of the residual profit, and insist the terms are written down.`, hints: ["Compare her two totals, then consider fairness to both partners."], explanation: `Comparison:\n\n${cmp}` }),
      ],
      hints: ["With no agreement, profits are shared equally.", "Interest on capital and salaries come off before the ratio is applied."],
      explanation: `Comparison of the two methods:\n\n${cmp}`,
    });
  }

  // ---------------------------------------------------------------- Flashcards
  b.card("DEFINITION", "Partnership", "A business owned by two or more people who carry it on together to make a profit, sharing profits, risks and decisions.");
  b.card("DEFINITION", "Partnership agreement", "The partners' agreement (preferably written) on capital, profit-sharing ratio, interest on capital and drawings, salaries, loans and duties.");
  b.card("DEFINITION", "Unlimited liability", "Partners are personally responsible for all the business's debts; their private possessions can be used to pay them.");
  b.card("FACT", "Profit sharing when there is no partnership agreement", "Shared equally; no interest on capital, no salaries, no interest on drawings; interest on partners' loans at 5% a year.");
  b.card("FACT", "Where does interest on a partner's loan go?", "Income statement, as an expense (before profit for the year). It is NOT an appropriation.");
  b.card("CONCEPT", "Why give interest on capital?", "To reward the partner who has invested more money (and taken more risk) before the rest is shared.");
  b.card("CONCEPT", "Why charge interest on drawings?", "To discourage partners from taking money out early or in large amounts.");
  b.card("FACT", "Entry when a partner brings an asset into the business", "Debit the asset account; credit that partner's capital account.");
  b.card("CONCEPT", "Two disadvantages of a partnership", "Unlimited liability; profits shared; disagreements; less capital than a company; ends on a partner's death or departure.");
});
