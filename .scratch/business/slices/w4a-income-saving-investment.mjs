// W4a: personal income, saving and investment (COM Form 1, BES Form 1).
import { concept, P, money, fmt, r2, round } from "../lib.mjs";

concept("bus.finance.income-saving-investment", { file: "finance/income-saving-investment", keyPrefix: "finance.income-saving-investment" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which is income earned from owning shares in a company?",
    options: [
      ["Dividend", "Correct: a share of the company's profit paid to shareholders."],
      ["Rent", "Rent is earned from land and buildings."],
      ["Wages", "Wages are earned from labour."],
      ["Commission", "Commission is paid to agents and salespeople."],
    ],
    answer: "A",
    explanation: "Shareholders receive dividends out of the company's profit.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is saving?",
    options: [
      ["Income that is not spent on consumption now", "Correct: saving = income − consumption spending."],
      ["Money borrowed from a bank to buy goods", "That is borrowing, not saving."],
      ["Spending on goods that last a long time", "Durable goods are still consumption spending."],
      ["Paying tax to the government", "Tax is a deduction from income, not saving."],
    ],
    answer: "A",
    explanation: "Saving is the part of income kept for future use rather than spent now.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which method of saving earns no interest and carries the greatest risk of theft?",
    options: [
      ["Keeping cash at home", "Correct: no interest and it can be stolen or lost."],
      ["A savings account at a bank", "Bank savings earn interest and are kept safely."],
      ["A fixed deposit", "A fixed deposit earns a higher interest rate."],
      ["A post office savings account", "This earns interest and is held by an institution."],
    ],
    answer: "A",
    explanation: "Cash at home is easy to reach but earns nothing and is exposed to theft and fire.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why does a fixed deposit usually pay a higher interest rate than an ordinary savings account?",
    options: [
      ["The money is left for an agreed period", "Correct: the bank can lend it out for longer with certainty."],
      ["Fixed deposits are free from all risk", "No investment is entirely free from risk."],
      ["The saver can withdraw at any time", "Early withdrawal is restricted on a fixed deposit."],
      ["The government pays part of the interest", "Banks pay the interest, not the government."],
    ],
    answer: "A",
    explanation: "Savers accept that the money is tied up for a fixed time, and are rewarded with a higher rate.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which of these is a personal **investment** rather than saving?",
    options: [
      ["Buying a small flat to rent out", "Correct: an asset bought to earn rent and grow in value."],
      ["Putting part of a salary into a money box", "That is saving: no income-earning asset is bought."],
      ["Not spending a bonus this month", "Not spending is saving."],
      ["Paying a monthly bill for electricity", "That is consumption spending."],
    ],
    answer: "A",
    explanation: "Investment uses savings to buy an asset that is expected to earn income or rise in value.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A young worker wants money available at short notice for emergencies. Which is the most suitable place for these savings?",
    options: [
      ["A bank savings account", "Correct: safe, earns some interest and can be withdrawn quickly."],
      ["Shares in a listed company", "Share prices may be low just when the money is needed."],
      ["A plot of land", "Land is slow to sell and costly to buy."],
      ["A five-year fixed deposit", "The money is tied up for five years."],
    ],
    answer: "A",
    explanation: "Emergency savings need liquidity and safety more than a high return.",
    hints: ["Which option can be turned into cash fastest without losing value?"],
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which statement best explains why a family might invest in livestock?",
    options: [
      ["Animals can multiply and may keep value when prices rise", "Correct: offspring add value and livestock may hold value in inflation."],
      ["Livestock carry no risk of loss", "Disease, drought and theft are real risks."],
      ["Livestock pay a fixed rate of interest", "Interest is paid on deposits and loans, not on animals."],
      ["Livestock can always be sold instantly at a known, fixed price", "Prices vary and buyers must be found."],
    ],
    answer: "A",
    explanation: "Livestock produce offspring, milk or eggs and can hold value, but they carry risks.",
    hints: ["Think about how cattle or goats increase in number."],
  });
  const s1 = 750, r1 = 8, y1 = 3;
  const i1 = r2((s1 * r1 * y1) / 100);
  b.num({
    d: 2, skill: "APPLICATION", kind: "money", value: i1, daily: true,
    stem: `Thandeka saves ${money(s1)} in an account that pays simple interest. Assume a rate of ${r1}% a year. Calculate the total interest she earns in ${y1} years.`,
    wrong: [r2((s1 * r1) / 100), r2(s1 + i1)],
    explanation: `Interest = ${fmt(s1)} × ${r1} × ${y1} ÷ 100 = ${money(i1)}.`,
    workedSolution: `1. One year: ${r1}% of ${fmt(s1)} = ${fmt(r2(s1 * r1 / 100))}.\n2. ${y1} years: ${fmt(r2(s1 * r1 / 100))} × ${y1} = ${money(i1)}.`,
  });
  const inv2 = 1600, div2 = 64, end2 = 1720;
  const ret2 = ((div2 + end2 - inv2) / inv2) * 100;
  b.calc({
    d: 4, skill: "ANALYSIS", kind: "pct", value: ret2, calculator: true,
    stem: `Sipho buys shares for ${money(inv2)}. During the year he receives a dividend of ${money(div2)}, and at the end of the year the shares are worth ${money(end2)}. Calculate his total return as a percentage of the amount invested, to one decimal place.`,
    wrong: [round((div2 / inv2) * 100, 1), round(((end2 - inv2) / inv2) * 100, 1)],
    explanation: `Return = dividend ${fmt(div2)} + gain ${fmt(end2 - inv2)} = ${money(div2 + end2 - inv2)}; ${fmt(div2 + end2 - inv2)} ÷ ${fmt(inv2)} × 100 = ${round(ret2, 1)}%.`,
    workedSolution: `1. Gain in value = ${fmt(end2)} − ${fmt(inv2)} = ${fmt(end2 - inv2)}.\n2. Total return = ${fmt(div2)} + ${fmt(end2 - inv2)} = ${fmt(div2 + end2 - inv2)}.\n3. Percentage = ${fmt(div2 + end2 - inv2)} ÷ ${fmt(inv2)} × 100 = ${round(ret2, 1)}%.`,
    hints: ["Include both the dividend and the rise in value.", "Divide by the amount invested."],
  });
  const inc3 = 540, spend3 = 465;
  b.num({
    d: 2, skill: "APPLICATION", kind: "money", value: inc3 - spend3,
    stem: `Rudo's monthly income is ${money(inc3)} and she spends ${money(spend3)} on consumption. How much does she save each month?`,
    wrong: [inc3 + spend3],
    explanation: `Saving = income − consumption = ${fmt(inc3)} − ${fmt(spend3)} = ${money(inc3 - spend3)}.`,
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "A person must have savings before making a personal investment.",
    answer: true,
    explanation: "True. Investment uses savings (or borrowed money) to buy an income-earning asset; saving comes first.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Shares always pay a fixed dividend every year.",
    answer: false,
    explanation: "False. Ordinary share dividends depend on profits and the directors' decision; they can be cut or not paid.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each source of personal income with the person who earns it.",
    pairs: [
      ["Wages", "A factory worker paid for hours worked"],
      ["Rent", "A landlord who lets out a shop"],
      ["Interest", "A saver with a fixed deposit"],
      ["Profit", "A vendor who sells vegetables at a market stall"],
    ],
    explanation: "Each factor of production earns its own type of income.",
  });
  b.fib({
    d: 2,
    stem: "Complete the sentences.",
    template: "Saving aims mainly at {{blank:a}} and quick access to the money. Investment aims mainly at a higher {{blank:b}}, but carries more risk.",
    blanks: [
      { id: "a", accepted: ["safety"], choices: ["safety", "profit", "spending", "borrowing"] },
      { id: "b", accepted: ["return"], choices: ["return", "cost", "tax", "debt"] },
    ],
    explanation: "Savings are kept safe and liquid; investments seek a return at higher risk.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the type of bank account in which money is left for an agreed period at a higher rate of interest.",
    accepted: ["fixed deposit", "fixed deposit account", "time deposit", "fixed-term deposit", "term deposit"],
    wrong: ["current account"],
    explanation: "A fixed (time) deposit ties money up for an agreed period in return for higher interest.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** reasons why people save.",
    points: [
      "Reason, e.g. emergencies such as illness or loss of a job (1)",
      "Explained: savings avoid borrowing at high cost when money is needed suddenly (1)",
      "Reason, e.g. future purchases / retirement / starting a business / earn interest (1)",
      "Explained, e.g. school fees or a business needs a large sum that monthly income cannot cover (1)",
    ],
    modelAnswer: "People save for emergencies such as illness, so that they do not have to borrow at a high cost. They also save for large future spending such as school fees or starting a business, which cannot be paid from one month's income.",
    explanation: "Each reason must be stated and developed.",
    hints: ["Think about the unexpected and the planned."],
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "Explain **one** advantage and **one** disadvantage of a savings club (rotating savings group) compared with a bank savings account.",
    points: [
      "Advantage, e.g. encourages discipline / no bank charges / lump sum available sooner (1)",
      "Explained, e.g. members receive the full pool to buy stock in bulk (1)",
      "Disadvantage, e.g. no interest / risk that a member defaults or the money is stolen (1)",
      "Explained, e.g. no legal protection, so members may lose their contributions (1)",
    ],
    modelAnswer: "A savings club makes members save every month and gives each member a large lump sum in turn, which can buy stock in bulk. However, it pays no interest and has no legal protection, so if a member stops paying the others may lose money.",
    explanation: "Savings clubs give discipline and lump sums but carry risk and earn no interest.",
    hints: ["Compare interest and safety.", "Who guarantees the money in each case?"],
  });
  const fd = 2500, fdR = 7, sh = 2500, shDiv = 90, shEnd = 2650;
  const fdRet = r2((fd * fdR) / 100);
  const shRet = shDiv + shEnd - sh;
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: 840, calculator: true,
    stem: `Tendai, aged 58, has saved ${money(fd)} and plans to retire in two years. A bank offers a one-year fixed deposit; assume an interest rate of ${fdR}% a year. A friend suggests buying shares instead, which he expects to pay a dividend of ${money(shDiv)} and to be worth ${money(shEnd)} after one year.`,
    parts: [
      P.num({
        label: "(a)", marks: 2, kind: "money", value: fdRet, type: "CALCULATION",
        stem: "Calculate the interest Tendai would earn on the fixed deposit in one year.",
        wrong: [r2(fd + fdRet)],
        explanation: `${fdR}% × ${fmt(fd)} = ${money(fdRet)}.`,
      }),
      P.num({
        label: "(b)", marks: 2, kind: "money", value: shRet, type: "CALCULATION",
        stem: "Calculate the total expected return from the shares in one year.",
        wrong: [shDiv, shEnd - sh],
        explanation: `Dividend ${fmt(shDiv)} + gain ${fmt(shEnd - sh)} = ${money(shRet)}.`,
      }),
      P.manual({
        label: "(c)", marks: 2,
        stem: "State **two** risks of investing in shares.",
        points: ["Share price may fall (1)", "Dividend may be cut or not paid / company may fail (1)"],
      }),
      P.manual({
        label: "(d)", marks: 4,
        stem: "Recommend whether Tendai should choose the fixed deposit or the shares. Justify your answer.",
        points: [
          `Shares expected to earn more (${money(shRet)} against ${money(fdRet)}) (1)`,
          "But the share return is only expected; fixed deposit interest is agreed (1)",
          "Tendai retires soon and needs his money safe / cannot wait for prices to recover (1)",
          "Justified recommendation (1)",
        ],
      }),
    ],
    explanation: `Fixed deposit ${money(fdRet)}; shares expected ${money(shRet)}. With retirement close, safety matters more than a higher but uncertain return.`,
    hints: ["Interest = amount × rate ÷ 100.", "Return on shares = dividend + rise in value.", "Think about Tendai's age."],
  });
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, secs: 600,
    stem: "Chipo, a teacher in Gweru, receives a monthly salary. She also rents out a room in her house and owns some shares. She keeps her spare cash in a tin at home.",
    parts: [
      P.manual({
        label: "(a)", marks: 3,
        stem: "Identify **three** sources of Chipo's income.",
        points: ["Salary (1)", "Rent (1)", "Dividends (1)"],
      }),
      P.manual({
        label: "(b)", marks: 2,
        stem: "Distinguish between saving and investment.",
        points: ["Saving: income not spent, kept for later use (1)", "Investment: using savings to buy an asset that earns income or grows in value (1)"],
      }),
      P.manual({
        label: "(c)", marks: 3,
        stem: "Explain why Chipo should move her spare cash from the tin to a bank savings account.",
        points: ["Earns interest (1)", "Safe from theft or fire (1)", "Value better protected from inflation / still available when needed (1)"],
      }),
    ],
    explanation: "Chipo earns a salary, rent and dividends. Saving keeps money for later; investment buys income-earning assets. A bank account is safer and earns interest.",
    hints: ["Each asset she owns gives a different type of income."],
  });
  b.card("DEFINITION", "Saving", "The part of income not spent on consumption now, kept for future use.");
  b.card("DEFINITION", "Personal investment", "Using savings to buy an asset expected to earn income or rise in value (shares, property, livestock, a business).");
  b.card("CONCEPT", "Sources of personal income", "Wages and salaries, profit, rent, interest, dividends, transfer payments (pensions, grants, remittances).");
  b.card("CONCEPT", "Reasons for saving", "Emergencies, future purchases, retirement, starting a business, earning interest, security.");
  b.card("CONCEPT", "Methods of saving", "At home, bank savings account, fixed deposit, post office savings bank, savings clubs, mobile money savings, insurance and pensions.");
  b.card("FORMULA", "Simple interest", "Interest = amount × rate (%) × years ÷ 100.");
  b.card("CONCEPT", "Saving versus investment", "Saving: safety and quick access, low return. Investment: income and growth, higher risk.");
  b.card("CONCEPT", "Return on shares", "Return = dividend + rise in share price; as a % of the amount invested.");
  b.card("DEFINITION", "Fixed (time) deposit", "Money left in a bank for an agreed period at a higher interest rate; early withdrawal may lose interest.");
});
