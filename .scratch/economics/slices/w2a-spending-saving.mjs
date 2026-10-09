// W2a: econ.households.spending-saving (Cambridge only) — income, interest, confidence, age, culture.
import { concept, P, table, money, pct, check } from "../lib.mjs";

const LV = (m) => {
  const a = Math.round(m / 3), c = Math.round((2 * m) / 3);
  return [[1, 1, a, "Simple points, little explanation."], [2, a + 1, c, "Some analysis of both sides or one side well developed, limited conclusion."], [3, c + 1, m, "Two-sided analysis, developed, with a justified conclusion."]];
};

concept("econ.households.spending-saving", { file: "households/spending-saving", keyPrefix: "households.spending-saving" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is **saving**?",
    options: [
      ["Disposable income that is not spent", "Correct: saving = disposable income − spending."],
      ["Money borrowed from a bank to buy goods", "That is borrowing."],
      ["Spending on goods for immediate use", "That is consumption."],
      ["Income paid to the government in tax", "Tax is deducted before disposable income is calculated."],
    ],
    answer: "A",
    explanation: "Saving is the part of disposable income not used for spending.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "A rise in the rate of interest is most likely to cause households to",
    options: [
      ["save more and borrow less.", "Correct: saving is better rewarded and loans cost more."],
      ["save less and borrow more.", "This is the effect of a fall in interest rates."],
      ["save more and borrow more.", "Higher interest makes borrowing more expensive."],
      ["save less and borrow less.", "Higher interest rewards saving, so saving tends to rise."],
    ],
    answer: "A",
    explanation: "Interest is the reward for saving and the cost of borrowing, so a rise encourages saving and discourages borrowing.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "As a household's income rises, which is most likely to happen?",
    options: [
      ["It spends more in total but a smaller percentage of its income", "Correct: richer households save a larger share."],
      ["It spends less in total and saves all of the extra income", "Total spending normally rises with income."],
      ["It spends the same percentage of income as before", "The share spent usually falls as income rises."],
      ["It borrows more because its income is higher", "Higher income may make borrowing easier, but the general pattern concerns the share spent."],
    ],
    answer: "A",
    explanation: "Higher-income households spend more in dollars, but the proportion of income they spend falls and the proportion saved rises.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which group of people is most likely to be **dissaving** (spending past savings)?",
    options: [
      ["Retired people living on savings and pensions", "Correct: their income has fallen, so they draw on savings."],
      ["Middle-aged workers at the peak of their earnings", "This group usually saves the most."],
      ["Young adults starting their first jobs", "Young adults tend to borrow rather than run down savings."],
      ["Teenagers who are still at school", "They have little income or savings of their own."],
    ],
    answer: "A",
    explanation: "Saving follows a life cycle: borrow when young, save in middle age, dissave in retirement.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "News of factory closures makes households fear for their jobs. What is the most likely effect?",
    options: [
      ["Spending falls and saving rises", "Correct: low confidence leads households to save for a 'rainy day'."],
      ["Spending rises because prices will fall", "Fear of job loss makes households cautious, not more willing to spend."],
      ["Borrowing rises to pay for new cars", "Low confidence discourages new debt."],
      ["Saving falls because interest rates rise", "The news is about confidence, not interest rates."],
    ],
    answer: "A",
    hints: ["How do people behave when they are worried about their future income?"],
    explanation: "Falling consumer confidence makes households spend less, save more and avoid borrowing.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A household saves to reach a fixed target of US\\$1,200 for school fees next year. Interest rates on savings rise. Which is a possible result?",
    options: [
      ["It saves less each month, because interest now makes up more of the target", "Correct: target savers can reach the same goal with smaller deposits."],
      ["It must save more each month to reach the same target", "Higher interest helps, so smaller deposits are needed."],
      ["It stops saving and borrows the whole amount instead", "Borrowing has become more expensive, not cheaper."],
      ["Its monthly saving is unaffected, because interest only affects borrowers", "Interest is also the reward for saving."],
    ],
    answer: "A",
    hints: ["What happens to the interest earned as the rate rises?"],
    explanation: "Usually higher interest encourages saving, but a household saving for a fixed target needs to put in less to reach it. The effect of interest rates on saving is not always the same.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which change would be **most** likely to raise total household spending in an economy, other things being equal?",
    options: [
      ["Moving income from high-income to low-income households", "Correct: poorer households spend a larger share of each extra dollar."],
      ["A rise in interest rates on savings accounts", "This encourages saving and reduces spending."],
      ["A fall in consumer confidence about jobs", "This reduces spending."],
      ["A larger share of the population in middle age (40 to 60)", "Middle-aged people tend to save a high share of income."],
    ],
    answer: "A",
    hints: ["Who spends a larger proportion of their income?"],
    explanation: "Low-income households spend a higher proportion of income, so a transfer from rich to poor raises total spending.",
  });
  // Numericals.
  const y = 1150, c = 966;
  b.num({
    d: 2, skill: "APPLICATION", kind: "pct", value: ((y - c) / y) * 100, daily: true,
    stem: `A household has a monthly disposable income of US\\$${y.toLocaleString("en-GB")} and spends US\\$${c}. What percentage of its disposable income does it save? Give your answer to one decimal place.`,
    wrong: [(c / y) * 100, ((y - c) / c) * 100],
    explanation: `Saving = ${y.toLocaleString("en-GB")} − ${c} = ${money(y - c)}; ${y - c} ÷ ${y.toLocaleString("en-GB")} × 100 = **${pct(((y - c) / y) * 100, 1)}**. ${pct((c / y) * 100, 1)} is the share spent; dividing by spending uses the wrong base.`,
  });
  check("save pct", ((y - c) / y) * 100, 16);
  const L = 2800, r1 = 0.11, r2 = 0.17;
  b.calc({
    d: 3, skill: "APPLICATION", kind: "money", value: L * r2 - L * r1,
    stem: `Thandeka plans to borrow US\\$${L.toLocaleString("en-GB")} for one year at simple interest. The bank's rate rises from 11% to 17% before she signs. By how much does the interest she must pay rise?`,
    wrong: [L * r2, L * (1 + r2)],
    hints: ["Work out the interest at each rate, then subtract."],
    explanation: `1. At 11%: ${L.toLocaleString("en-GB")} × 0.11 = ${money(L * r1)}.\n2. At 17%: ${L.toLocaleString("en-GB")} × 0.17 = ${money(L * r2)}.\n3. Rise = **${money(L * r2 - L * r1)}**, which may persuade her to borrow less or delay.`,
  });
  const inc = [640, 700], sp = [604, 637];
  const s0 = inc[0] - sp[0], s1 = inc[1] - sp[1];
  b.num({
    d: 3, skill: "APPLICATION", kind: "pct", value: ((s1 - s0) / s0) * 100,
    stem: `A household's disposable income rises from US\\$${inc[0]} to US\\$${inc[1]} a month, and its spending rises from US\\$${sp[0]} to US\\$${sp[1]}. Calculate the percentage increase in its saving. Give your answer to one decimal place.`,
    wrong: [((inc[1] - inc[0]) / inc[0]) * 100, ((s1 - s0) / s1) * 100],
    hints: ["Find saving in each month first.", "Percentage change = change ÷ original × 100."],
    explanation: `Saving rises from ${inc[0]} − ${sp[0]} = ${money(s0)} to ${inc[1]} − ${sp[1]} = ${money(s1)}: (${s1} − ${s0}) ÷ ${s0} × 100 = **${pct(((s1 - s0) / s0) * 100, 1)}**. ${pct(((inc[1] - inc[0]) / inc[0]) * 100, 1)} is the rise in income.`,
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "A fall in interest rates makes borrowing cheaper.",
    answer: true,
    explanation: "True. Interest is the cost of borrowing, so a lower rate makes loans cheaper.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Young adults setting up a home usually save a larger share of their income than middle-aged workers.",
    answer: false,
    explanation: "False. Young adults often borrow; middle-aged people at peak earnings usually save the most.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each influence with its most likely effect.",
    pairs: [
      ["Interest rates fall", "Borrowing and spending rise"],
      ["Consumer confidence falls", "Saving rises as households become cautious"],
      ["Disposable income rises", "Total spending rises but the share spent falls"],
      ["A tradition of rotating savings clubs", "More households save regularly for large purchases"],
    ],
    explanation: "Interest, confidence, income and culture each change the balance between spending and saving.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Choose the correct words.",
    template: "Saving equals disposable income {{blank:a}} spending. A higher rate of interest {{blank:b}} the cost of borrowing and {{blank:c}} the reward for saving.",
    blanks: [
      { id: "a", accepted: ["minus"], choices: ["minus", "plus"] },
      { id: "b", accepted: ["raises"], choices: ["raises", "lowers"] },
      { id: "c", accepted: ["raises"], choices: ["raises", "lowers"] },
    ],
    wrong: [["plus", "lowers", "lowers"]],
    explanation: "Saving = disposable income − spending; higher interest raises both the cost of loans and the reward for saving.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain how a person's age may influence their saving and borrowing.",
    points: [
      "Young adults have low incomes but high needs (home, family), so they borrow and save little.",
      "Middle-aged people earn the most and save more (retirement, children's education), repaying debts.",
      "Retired people have lower incomes and dissave (spend past savings or pensions).",
      "So saving follows a life cycle / a country's age structure affects total saving.",
    ],
    modelAnswer: "Young adults usually earn little but need to set up a home and family, so they borrow and save little. In middle age, incomes are highest, so people save for retirement and children's education and pay off their debts. After retirement income falls and people dissave, spending the savings built up earlier. Saving therefore follows a life cycle, and a country's age structure affects how much its households save.",
    hints: ["Think of three stages of life."],
    explanation: "Credit each life stage with its effect, plus the overall pattern.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain **two** ways in which culture can influence household saving and borrowing.",
    points: [
      "Identifies attitudes to debt (for example debt seen as shameful, or credit seen as normal).",
      "Explains the effect on borrowing (less borrowing where debt is disapproved of; more where credit is normal).",
      "Identifies saving traditions or social obligations (savings clubs, livestock, supporting extended family, ceremonies, religious rules on interest).",
      "Explains the effect (clubs raise regular saving; obligations raise spending and reduce saving; no-interest rules change how people save and borrow).",
    ],
    modelAnswer: "In some cultures debt is seen as shameful, so households avoid borrowing and save before they buy; where buying on credit is normal, borrowing is higher. Traditions also matter: rotating savings clubs encourage regular saving for large purchases, while strong obligations to support extended family and pay for ceremonies raise spending and leave less to save.",
    hints: ["Attitudes to debt; traditions and obligations."],
    explanation: "Each way: identify (1) and explain the effect (1).",
  });

  // Structured 1: data on households by age group.
  const groups = [["18-29", 520, 560], ["30-44", 980, 850], ["45-59", 1240, 990], ["60 and over", 610, 660]];
  const T = table(["Age of head of household", "Average disposable income (US\\$ per month)", "Average spending (US\\$ per month)"], groups);
  const sav = groups.map(([, yy, cc]) => yy - cc);
  check("s45", sav[2], 250);
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 12, calculator: true,
    stem: `The table shows average monthly income and spending of households in a fictional country, by the age of the head of household.\n\n${T}`,
    parts: [
      P.num({ label: "(a)", marks: 1, kind: "money", value: sav[2], stem: "Calculate the average monthly saving of households aged 45-59.", wrong: [groups[2][1]], explanation: `${groups[2][1].toLocaleString("en-GB")} − ${groups[2][2]} = ${money(sav[2])}.` }),
      P.num({ label: "(b)", marks: 2, kind: "pct", value: (sav[2] / groups[2][1]) * 100, stem: "Calculate saving as a percentage of disposable income for households aged 45-59. Give your answer to one decimal place.", wrong: [(sav[2] / groups[2][2]) * 100], explanation: `${sav[2]} ÷ ${groups[2][1].toLocaleString("en-GB")} × 100 = ${pct((sav[2] / groups[2][1]) * 100, 1)}.` }),
      P.mcq({
        label: "(c)", marks: 1,
        stem: "Which age groups spend more than their income on average?",
        options: [
          ["18-29 and 60 and over", "Correct: spending exceeds income for both (borrowing and dissaving)."],
          ["30-44, 45-59 and 60 and over", "The 30-44 and 45-59 groups save part of their income."],
          ["18-29 only", "The 60 and over group also spends more than its income."],
          ["60 and over only", "The 18-29 group also spends more than its income."],
        ],
        answer: "A",
        explanation: `Saving is ${sav.map((s, i) => `${groups[i][0]}: ${s < 0 ? "−" : ""}US\\$${Math.abs(s)}`).join("; ")}.`,
      }),
      P.manual({
        label: "(d)", marks: 2,
        stem: "Explain how the 18-29 and 60 and over groups can spend more than their income.",
        points: ["18-29: by borrowing (loans, credit) against future income.", "60 and over: by dissaving, drawing on past savings or pensions."],
        modelAnswer: "Young households borrow, using loans or credit to be repaid from future earnings. Older households dissave, spending savings built up while they were working.",
        explanation: "Borrowing by the young, dissaving by the old.",
      }),
      P.manual({
        label: "(e)", marks: 6, levels: LV(6),
        stem: "The country's population is ageing. Discuss whether total household saving is likely to fall.",
        points: [
          "Fall: more people over 60, who dissave (spend more than income), so saving falls.",
          "Fall: fewer people in the high-saving 45-59 group over time.",
          "Not necessarily: people may save more while working if they expect to live longer / pensions are uncertain.",
          "Not necessarily: other influences (income growth, interest rates, confidence, culture) may outweigh age.",
          "Uses the data (for example the 45-59 group saves about 20% of income; over-60s dissave US\\$50 a month).",
          "Justified conclusion.",
        ],
        modelAnswer: "The data suggest saving will fall: households aged 60 and over spend US\\$50 a month more than their income, while the 45-59 group saves about a fifth of its income. As more households move into retirement, more people will be dissaving. However, people who expect to live longer may save more during their working lives, and rising incomes, higher interest rates or a culture of saving could raise saving among younger groups. Overall saving is likely to fall somewhat, but the size of the fall depends on these other influences.",
        explanation: "Use the life-cycle pattern in the data, then weigh other influences; conclude.",
      }),
    ],
    hints: ["Saving = income − spending.", "Negative saving means borrowing or dissaving."],
    explanation: "Saving rises with age to a peak at 45-59 and becomes negative after 60: the life-cycle pattern.",
  });

  // Structured 2: interest-rate cut.
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, marks: 8,
    stem: "The central bank of a fictional country cuts its interest rate from 15% to 10% to encourage households to spend more. At the same time, unemployment is rising and many households are already in debt.",
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "money", value: 4000 * 0.15 - 4000 * 0.1, stem: "A household has a loan of US\\$4,000. If its annual interest rate falls in line with the central bank's rate, by how much does its yearly interest payment fall?", wrong: [4000 * 0.1], explanation: `4,000 × 0.15 = US\\$600; 4,000 × 0.10 = US\\$400; fall = ${money(200)}.` }),
      P.manual({
        label: "(b)", marks: 6, levels: LV(6),
        stem: "Discuss whether the cut in interest rates will increase household spending.",
        points: [
          "For: cheaper loans encourage borrowing for cars, furniture, houses.",
          "For: lower reward for saving; lower interest payments leave indebted households more to spend.",
          "Against: rising unemployment lowers confidence, so households save more and avoid new debt.",
          "Against: households already in debt may use the savings to repay debts; banks may still be unwilling to lend.",
          "Other factors: income, age structure, culture may matter more than interest rates.",
          "Justified conclusion.",
        ],
        modelAnswer: "Lower interest rates make loans cheaper, so some households will borrow to buy cars or furniture, and savers earn less, so saving is less attractive. Households with loans, like the one above, also pay less interest, leaving more income to spend. However, unemployment is rising, so many households are worried about their jobs and will save rather than spend or borrow, and those already in debt may use the lower payments to repay what they owe. Banks may also refuse to lend to people whose jobs look insecure. The cut will raise spending a little, but while confidence is low its effect is likely to be weak.",
        explanation: "Interest-rate channels versus low confidence and existing debt; conclude.",
      }),
    ],
    hints: ["Interest = loan × rate.", "Consider confidence as well as the cost of borrowing."],
    explanation: "Lower rates reduce the cost of borrowing and the reward for saving, but low confidence can weaken the effect on spending.",
  });

  b.card("DEFINITION", "Define **disposable income**.", "Income after direct taxes and including state benefits: what a household can spend or save.");
  b.card("FORMULA", "Saving = ?", "Disposable income − spending. Saving ratio = saving ÷ disposable income × 100.");
  b.card("CONCEPT", "How does a rise in income affect spending and saving?", "Total spending rises, but the share of income spent falls and the share saved rises.");
  b.card("CONCEPT", "How does a rise in interest rates affect households?", "Saving is more rewarding and borrowing dearer, so saving rises and borrowing and spending fall.");
  b.card("CONCEPT", "How does consumer confidence affect spending?", "High confidence: more spending and borrowing. Low confidence: more saving, less borrowing.");
  b.card("CONCEPT", "How does age affect saving?", "Young: borrow; middle-aged: save most; retired: dissave.");
  b.card("CONCEPT", "Give two cultural influences on saving and borrowing.", "Attitudes to debt; saving traditions (savings clubs, livestock); family obligations; religious rules on interest.");
  b.card("DEFINITION", "What is **dissaving**?", "Spending more than current income by drawing on past savings.");
  b.card("FACT", "Which syllabus examines households' spending, saving and borrowing?", "Cambridge 0455 (3.2); it is not in the ZIMSEC syllabus.");
});
