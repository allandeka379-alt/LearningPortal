// W4a: the partnership appropriation account.
import { concept, P, money, r2, sum, check } from "../lib.mjs";
import { appropriation, headed, table, fmt, U } from "../tables/w4a-lib.mjs";

concept("acc.partnerships.appropriation", { file: "partnerships/appropriation", keyPrefix: "partnerships.appropriation" }, (b) => {
  // ---------------------------------------------------------------- MCQs
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which figure is the **starting point** of a partnership appropriation account?",
    options: [
      ["Profit for the year", "Correct: the appropriation account shares the profit after all expenses."],
      ["Gross profit", "Expenses must be deducted first, in the income statement."],
      ["Revenue for the year", "Revenue is the first line of the income statement, not of the appropriation account."],
      ["Total of the capital accounts", "Capital is used to calculate interest; it is not the starting point."],
    ],
    answer: "A",
    explanation: "The appropriation account begins with the profit (or loss) for the year from the income statement.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "How is **interest on drawings** shown in a partnership appropriation account?",
    options: [
      ["Added to the profit for the year", "Correct: partners pay it, so more profit is available to share."],
      ["Deducted from the profit for the year", "Interest on capital is deducted; interest on drawings is added."],
      ["Shown as an expense in the income statement", "It is an appropriation item, not an expense."],
      ["Credited to the partners' capital accounts", "It is charged to (debited to) the partners."],
    ],
    answer: "A",
    explanation: "Interest on drawings is a charge on the partners: add it in the appropriation account and debit each partner's current account.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which item is **not** shown in a partnership appropriation account?",
    options: [
      ["Interest on a partner's loan", "Correct: it is an expense in the income statement."],
      ["Interest on partners' capital", "This is an appropriation of profit."],
      ["A salary to one partner", "Partners' salaries are appropriations."],
      ["Each partner's share of the residual profit", "This is the final section of the appropriation account."],
    ],
    answer: "A",
    explanation: "A partner's loan is a liability; its interest is deducted before the profit for the year.",
  });
  {
    const profit = 26850, ioc = 3150, sal = 5400, iod = 420;
    const res = r2(profit + iod - ioc - sal);
    b.mcq({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: `Profit for the year ${money(profit)}; interest on capital ${money(ioc)}; partners' salaries ${money(sal)}; interest on drawings ${money(iod)}. What is the residual profit?`,
      options: [
        [money(res), "Correct: 26,850 + 420 − 3,150 − 5,400."],
        [money(r2(profit - iod - ioc - sal)), "Interest on drawings has been deducted instead of added."],
        [money(r2(profit - ioc - sal)), "Interest on drawings has been left out."],
        [money(r2(profit + iod - ioc)), "The salaries have not been deducted."],
      ],
      answer: "A",
      hints: ["Which item is added and which items are deducted?"],
      explanation: `${fmt(profit)} + ${fmt(iod)} − ${fmt(ioc)} − ${fmt(sal)} = ${fmt(res)}.`,
    });
  }
  {
    const res = 19250;
    const [a, bb] = [r2((res * 4) / 7), r2((res * 3) / 7)];
    b.mcq({
      d: 2, skill: "APPLICATION", daily: true, calculator: true,
      stem: `The residual profit of ${money(res)} is shared between Farai and Rudo in the ratio 4 : 3. What is Rudo's share?`,
      options: [
        [money(bb), "Correct: 19,250 × 3/7."],
        [money(a), "This is Farai's share (4/7)."],
        [money(r2(res * 3 / 4)), "The ratio has been read as 3/4 instead of 3/7."],
        [money(r2(res / 2)), "This is an equal share, ignoring the ratio."],
      ],
      answer: "A",
      explanation: `Total parts 4 + 3 = 7. Rudo: ${fmt(res)} × 3/7 = ${fmt(bb)}.`,
    });
  }
  {
    const amt = 7200, rate = 10, months = 3;
    const iod = r2((amt * rate) / 100 * months / 12);
    b.mcq({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: `Interest on drawings is charged at ${rate}% a year. Tendai drew ${money(amt)} on 1 October 2025. The year ends on 31 December 2025. What is the interest on these drawings?`,
      options: [
        [money(iod), "Correct: 7,200 × 10% × 3/12."],
        [money(r2(amt * 0.1)), "This charges a full year's interest."],
        [money(r2(amt * 0.1 * 9 / 12)), "This counts the nine months before the drawing, not the three after it."],
        [money(r2(amt * 0.1 / 12)), "This charges one month only."],
      ],
      answer: "A",
      hints: ["Count the months from the date of drawing to the year end."],
      explanation: `October to December is 3 months: ${fmt(amt)} × ${rate}% × 3/12 = ${fmt(iod)}.`,
    });
  }
  {
    const cap = 30000, extra = 12000, rate = 8;
    const ioc = r2(cap * rate / 100 + extra * rate / 100 * 6 / 12);
    b.mcq({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: `Thandeka's capital was ${money(cap)} on 1 January 2025. She introduced a further ${money(extra)} on 1 July 2025. Interest on capital is ${rate}% a year. What is her interest on capital for 2025?`,
      options: [
        [money(ioc), "Correct: 2,400 on the opening capital plus 480 on the new capital for six months."],
        [money(r2((cap + extra) * rate / 100)), "The new capital has been given a full year's interest."],
        [money(r2(cap * rate / 100)), "The new capital has been ignored."],
        [money(r2((cap + extra) * rate / 100 * 6 / 12)), "All the capital has been given six months' interest."],
      ],
      answer: "A",
      hints: ["Treat the two amounts of capital separately and time each one."],
      explanation: `${fmt(cap)} × ${rate}% = ${fmt(r2(cap * 0.08))}; ${fmt(extra)} × ${rate}% × 6/12 = ${fmt(r2(extra * 0.08 / 2))}. Total ${fmt(ioc)}.`,
    });
  }
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Partners A and B share profits equally. The agreement is changed so that B receives a salary. If the profit for the year is unchanged, what happens to A's share of the **residual** profit?",
    options: [
      ["It falls by half of the salary", "Correct: the salary reduces the residual profit, which A shares equally with B."],
      ["It is unchanged", "The salary is deducted before the residual profit is shared."],
      ["It falls by the full salary", "B also bears half of the reduction in residual profit."],
      ["It rises by half of the salary", "Deducting an appropriation cannot raise the residual profit."],
    ],
    answer: "A",
    hints: ["The salary is deducted before the residual profit is shared."],
    explanation: "The salary comes out of the profit before sharing, so the residual falls by the salary and A bears half of that fall.",
  });

  // ---------------------------------------------------------------- TF
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "If interest on capital and salaries are greater than the profit for the year, the partners share a residual loss.",
    answer: true,
    explanation: "True. Interest and salaries are given in full; the shortfall is a residual loss shared in the profit-sharing ratio.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Interest on drawings is credited to the partners' current accounts.",
    answer: false,
    explanation: "False. It is a charge on the partners, so it is debited to their current accounts and added in the appropriation account.",
  });

  // ---------------------------------------------------------------- Match
  b.match({
    d: 3, skill: "UNDERSTANDING",
    stem: "Match each partnership item with where it is recorded.",
    right: ["Added in the appropriation account", "Deducted in the appropriation account", "Expense in the income statement", "Debited to the current account only"],
    pairs: ["Interest on drawings", "Interest on capital", "Interest on a partner's loan", "Salary to a partner", "Cash drawn by a partner"],
    rightIndex: [0, 1, 2, 1, 3],
    hints: ["Only one item never passes through the appropriation account or the income statement."],
    explanation: "Interest on drawings is added; interest on capital and salaries are deducted; loan interest is an expense; drawings themselves go straight to the current account.",
  });

  // ---------------------------------------------------------------- FIB
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the order of the appropriation account.",
    template: "Profit for the year, {{blank:a}} interest on drawings, {{blank:b}} interest on capital and salaries, giving the {{blank:c}} profit, which is shared in the {{blank:d}}.",
    blanks: [
      { id: "a", accepted: ["add"], choices: ["add", "less"] },
      { id: "b", accepted: ["less"], choices: ["add", "less"] },
      { id: "c", accepted: ["residual"], choices: ["residual", "gross", "retained"] },
      { id: "d", accepted: ["profit-sharing ratio"], choices: ["profit-sharing ratio", "ratio of capitals", "ratio of drawings"] },
    ],
    explanation: "Add interest on drawings, deduct interest on capital and salaries, and share the residual profit in the profit-sharing ratio.",
  });

  // ---------------------------------------------------------------- Numerical
  {
    const rate = 12;
    const draws = [[3600, 9], [2700, 4]]; // amount, months to year end
    const iod = sum(draws.map(([a, m]) => r2((a * rate) / 100 * m / 12)));
    b.calc({
      d: 3, kind: "money", value: iod, calculator: true, wrong: [r2(sum(draws.map((x) => x[0])) * 0.12)],
      stem: `Interest on drawings is charged at ${rate}% a year; the year ends on 31 December 2025. Sipho drew ${money(3600)} on 1 April 2025 and ${money(2700)} on 1 September 2025. Calculate his total interest on drawings.`,
      hints: ["1 April to 31 December is 9 months; 1 September to 31 December is 4 months."],
      explanation: `${fmt(3600)} × 12% × 9/12 = ${fmt(r2(3600 * 0.12 * 0.75))}; ${fmt(2700)} × 12% × 4/12 = ${fmt(r2(2700 * 0.12 / 3))}. Total ${fmt(iod)}. Charging a full year on all drawings gives ${fmt(r2(6300 * 0.12))}.`,
    });
  }
  {
    const a = appropriation({ name: "x", partners: ["Rudo", "Chipo"], profit: 22680, iod: [180, 300], ioc: [2250, 1350], salary: [0, 6000], ratio: [3, 1] });
    b.num({
      d: 3, kind: "money", value: a.credits[1], calculator: true, wrong: [a.shares[1], r2(a.credits[1] - 300)],
      stem: `Profit for the year ${money(22680)}. Interest on drawings: Rudo ${money(180)}, Chipo ${money(300)}. Interest on capital: Rudo ${money(2250)}, Chipo ${money(1350)}. Salary: Chipo ${money(6000)}. Residual profit shared Rudo 3 : Chipo 1. Calculate the **total** amount credited to Chipo from the appropriation account (interest on capital, salary and share of profit).`,
      hints: ["Find the residual profit first, then Chipo's quarter of it."],
      explanation: `Residual = 22,680 + 480 − 3,600 − 6,000 = ${fmt(a.residual)}; Chipo's share = ${fmt(a.shares[1])}. Credited: ${fmt(1350)} + ${fmt(6000)} + ${fmt(a.shares[1])} = ${fmt(a.credits[1])}. Her interest on drawings (${fmt(300)}) is a separate debit in her current account.`,
    });
  }
  {
    // work backwards to the profit for the year
    const ioc = [1600, 1200], sal = [3000, 0], iod = [250, 150], shares = [5880, 3920];
    const profit = r2(sum(ioc) + sum(sal) + sum(shares) - sum(iod));
    check("back", profit, 15200);
    b.calc({
      d: 4, kind: "money", value: profit, calculator: true, wrong: [r2(sum(ioc) + sum(sal) + sum(shares) + sum(iod)), sum(shares)],
      stem: `A partnership's appropriation account shows: interest on capital ${money(1600)} and ${money(1200)}; salary ${money(3000)}; interest on drawings ${money(250)} and ${money(150)}; shares of residual profit ${money(5880)} and ${money(3920)}. Calculate the profit for the year.`,
      hints: ["Work backwards: what was added to the profit, and what was taken from it?"],
      explanation: `Profit = interest on capital ${fmt(sum(ioc))} + salary ${fmt(3000)} + shares ${fmt(sum(shares))} − interest on drawings ${fmt(sum(iod))} = ${fmt(profit)}. Adding the interest on drawings instead gives ${fmt(r2(sum(ioc) + 3000 + sum(shares) + 400))}.`,
    });
  }

  // ---------------------------------------------------------------- manual short
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 2,
    stem: "Explain why interest on capital is **not** treated as an expense of a partnership.",
    points: ["It is not a cost of running the business / no money is paid to an outsider", "It is a way of sharing the profit between the owners (an appropriation)"],
    modelAnswer: "Interest on capital is a reward to the owners for their investment; it divides the profit between them rather than being a cost of earning that profit, so it is an appropriation.",
    explanation: "Appropriations share profit between owners; expenses are costs of earning it.",
  });
  b.manualShort({
    d: 3, skill: "EVALUATION", marks: 3,
    stem: "Nyasha says: \"We made a profit of US\\$9,000, but after paying ourselves salaries of US\\$12,000 we have a loss. We should stop paying salaries.\" Comment on her statement.",
    points: ["The business still made a profit of US\\$9,000; the salaries are appropriations, not expenses", "The residual loss of US\\$3,000 is simply shared in the profit-sharing ratio", "Conclusion: salaries only change how the profit is divided; they could be reduced if they are unfair, but they do not cause a business loss"],
    modelAnswer: "The business made a profit of US\\$9,000. Partners' salaries share that profit out; they are not costs. The US\\$3,000 shortfall is a residual loss shared in the ratio, which only shifts profit between partners. Salaries could be reviewed for fairness, but stopping them would not make the business more profitable.",
    hints: ["Is a partner's salary an expense or an appropriation?"],
    explanation: "Appropriations change the division of profit, not its size.",
  });

  // ---------------------------------------------------------------- Practice structured 1: full appropriation account
  {
    const partners = ["Farai", "Thandeka"];
    const cap = [36000, 18000];
    const rate = 5, iodRate = 10;
    const draws = [[5400, 6], [3300, 8]];
    const iod = draws.map(([a, m]) => r2((a * iodRate) / 100 * m / 12));
    const ioc = cap.map((c) => r2((c * rate) / 100));
    const a = appropriation({ name: "Farai and Thandeka", partners, profit: 28460, iod, ioc, salary: [0, 6600], ratio: [3, 2] });
    b.struct({
      d: 4, examStyle: true, skill: "APPLICATION", calculator: true,
      stem: `Farai and Thandeka run a poultry project near Chinhoyi. Their profit for the year ended 31 December 2025 was ${money(28460)}.\n\n${table(["", `Farai ${U}`, `Thandeka ${U}`], [["Capital (unchanged all year)", cap[0], cap[1]], ["Drawings", draws[0][0], draws[1][0]]])}\n\nThe partnership agreement provides:\n\n1. interest on capital at ${rate}% a year;\n2. interest on drawings at ${iodRate}% a year (Farai drew on 1 July 2025 and Thandeka on 1 May 2025);\n3. a salary of ${money(6600)} a year for Thandeka;\n4. the remaining profit shared Farai 3 : Thandeka 2.`,
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "money", value: a.iodTot, wrong: [r2(draws[0][0] * 0.1 + draws[1][0] * 0.1)], stem: "Calculate the total interest on drawings.", explanation: `Farai ${fmt(draws[0][0])} × 10% × 6/12 = ${fmt(iod[0])}; Thandeka ${fmt(draws[1][0])} × 10% × 8/12 = ${fmt(iod[1])}. Total ${fmt(a.iodTot)}.` }),
        P.num({ label: "(b)", marks: 2, kind: "money", value: a.residual, wrong: [r2(28460 - a.iodTot - a.iocTot - 6600), r2(28460 - a.iocTot - 6600)], stem: "Calculate the residual profit.", explanation: `${fmt(28460)} + ${fmt(a.iodTot)} − ${fmt(a.iocTot)} − ${fmt(6600)} = ${fmt(a.residual)}.` }),
        P.manual({ label: "(c)", marks: 6, type: "EXTENDED_RESPONSE", stem: "Prepare the appropriation account for the year ended 31 December 2025.", points: ["Heading and profit for the year", `Interest on drawings added: ${fmt(iod[0])} and ${fmt(iod[1])}`, `Interest on capital deducted: ${fmt(ioc[0])} and ${fmt(ioc[1])}`, `Salary deducted: Thandeka ${fmt(6600)}`, `Residual profit ${fmt(a.residual)} (own figure)`, `Shares 3 : 2: Farai ${fmt(a.shares[0])}, Thandeka ${fmt(a.shares[1])} (own figure)`], modelAnswer: a.md, explanation: "Profit, add interest on drawings, deduct interest on capital and salary, share the residual." }),
        P.num({ label: "(d)", marks: 2, kind: "money", value: a.credits[0], wrong: [a.shares[0]], stem: "Calculate the total amount credited to Farai in the appropriation account (interest on capital and share of profit).", explanation: `${fmt(ioc[0])} + ${fmt(a.shares[0])} = ${fmt(a.credits[0])}.` }),
      ],
      hints: ["Interest on drawings runs from the date of drawing to 31 December.", "Interest on drawings is added; interest on capital and salary are deducted."],
      explanation: `Model answer:\n\n${a.md}`,
    });
  }

  // ---------------------------------------------------------------- Practice structured 2: loan interest and a residual loss
  {
    const draft = 17940, loan = 15000, lr = 6;
    const li = r2((loan * lr) / 100);
    const profit = r2(draft - li);
    const a = appropriation({ name: "Gweru Builders' Supplies", partners: ["Tendai", "Sipho", "Rudo"], profit, ioc: [2550, 1800, 1350], salary: [5200, 5200, 3600], ratio: [2, 2, 1] });
    check("loss", a.residual < 0, true);
    const is = headed("Gweru Builders' Supplies", "Income statement (extract)", "for the year ended 31 December 2025", [["Draft profit", null, draft], ["Less: Interest on loan: Rudo", null, -li], ["**Profit for the year**", null, profit]], { checks: [["p", profit, draft - li]] });
    b.struct({
      d: 4, examStyle: true, skill: "ANALYSIS", calculator: true,
      stem: `Tendai, Sipho and Rudo are partners in Gweru Builders' Supplies. The draft profit for the year ended 31 December 2025 was ${money(draft)}. It was calculated **before** interest on a loan of ${money(loan)} made by Rudo to the business on 1 January 2025 at ${lr}% a year.\n\nThe agreement gives interest on capital (Tendai ${money(2550)}, Sipho ${money(1800)}, Rudo ${money(1350)}), salaries (Tendai ${money(5200)}, Sipho ${money(5200)}, Rudo ${money(3600)}), and shares profits and losses Tendai 2 : Sipho 2 : Rudo 1.`,
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "money", value: profit, wrong: [draft], stem: "Calculate the profit for the year.", explanation: `Loan interest ${fmt(loan)} × ${lr}% = ${fmt(li)} is an expense: ${fmt(draft)} − ${fmt(li)} = ${fmt(profit)}.` }),
        P.mcq({ label: "(b)", stem: "Which statement about the residual figure is correct?", options: [[`It is a residual loss of ${money(-a.residual)}`, "Correct: appropriations exceed the profit."], [`It is a residual profit of ${money(-a.residual)}`, "Interest and salaries total more than the profit, so the residual is a loss."], [`It is a residual loss of ${money(r2(-a.residual - li))}`, "This uses the draft profit, before loan interest."], ["It is nil, because salaries are reduced to fit", "Salaries are given in full; the shortfall is shared."]], answer: "A", explanation: `${fmt(profit)} − ${fmt(a.iocTot)} − ${fmt(a.salTot)} = (${fmt(-a.residual)}).` }),
        P.manual({ label: "(c)", marks: 5, type: "EXTENDED_RESPONSE", stem: "Prepare the appropriation account for the year ended 31 December 2025.", points: [`Profit for the year ${fmt(profit)} (own figure)`, `Interest on capital ${fmt(a.iocTot)} by partner`, `Salaries ${fmt(a.salTot)} by partner`, `Residual loss (${fmt(-a.residual)})`, `Shares of loss: Tendai (${fmt(-a.shares[0])}), Sipho (${fmt(-a.shares[1])}), Rudo (${fmt(-a.shares[2])})`], modelAnswer: a.md, explanation: "Interest and salaries in full; the loss is shared 2 : 2 : 1." }),
        P.num({ label: "(d)", marks: 2, kind: "money", value: a.credits[2], wrong: [r2(a.credits[2] + li)], stem: "Calculate Rudo's net share of the profit for the year from the appropriation account.", explanation: `${fmt(1350)} + ${fmt(3600)} − ${fmt(-a.shares[2])} = ${fmt(a.credits[2])}. Her loan interest of ${fmt(li)} is paid to her as a lender, not as a share of profit.` }),
      ],
      hints: ["Loan interest is an expense: deduct it before you start the appropriation account.", "A residual loss is shared in the same ratio as a profit."],
      explanation: `Model answers:\n\n${is}\n\n${a.md}`,
    });
  }

  // ---------------------------------------------------------------- Flashcards
  b.card("DEFINITION", "Appropriation account", "Shows how a partnership's profit (or loss) for the year is shared between the partners.");
  b.card("FORMULA", "Residual profit", "Profit for the year + interest on drawings − interest on capital − partners' salaries.");
  b.card("FORMULA", "Interest on drawings", "Amount drawn × rate × months from the date of drawing to the year end ÷ 12.");
  b.card("FACT", "Order of the appropriation account", "Profit for the year → add interest on drawings → less interest on capital → less salaries → residual profit → shares in the ratio.");
  b.card("FACT", "Interest on a partner's loan", "An expense in the income statement, deducted BEFORE the profit for the year. Not an appropriation.");
  b.card("CONCEPT", "What if interest and salaries exceed the profit?", "They are still given in full; the shortfall is a residual loss shared in the profit-sharing ratio.");
  b.card("FACT", "Check on the appropriation account", "Interest on capital + salaries + shares − interest on drawings = profit for the year.");
  b.card("CONCEPT", "Is a partner's salary an expense?", "No. It is an appropriation of profit, shown in the appropriation account and credited to the current account.");
});
