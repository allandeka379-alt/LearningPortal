// W4b: liquidity ratios (current ratio, acid test / quick ratio).
import { concept, P, money, ZIM } from "../lib.mjs";
import { statement } from "../lib.mjs";
import { ratios, table, fmt, r2, sum, check, d2 } from "../tables/w4b-lib.mjs";

concept("acc.analysis.liquidity-ratios", { file: "analysis/liquidity-ratios", keyPrefix: "analysis.liquidity-ratios" }, (b) => {
  // ---------------------------------------------------------------- MCQs
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which formula gives the **acid test (quick) ratio**?",
    options: [
      ["(Current assets − inventory) ÷ current liabilities", "Correct: inventory is excluded as the least liquid current asset."],
      ["Current assets ÷ current liabilities", "This is the current ratio."],
      ["(Current assets − trade receivables) ÷ current liabilities", "Receivables stay in; only inventory is removed."],
      ["Current liabilities ÷ (current assets − inventory)", "This is the ratio upside down."],
    ],
    answer: "A",
    explanation: "Acid test = (current assets − inventory) ÷ current liabilities, written x : 1.",
  });
  {
    const ca = 27300, cl = 15600;
    const v = ratios.current(ca, cl);
    check("lq mcq1", r2(v), 1.75);
    b.mcq({
      d: 2, skill: "APPLICATION", daily: true, calculator: true,
      stem: `Current assets are ${money(ca)} and current liabilities ${money(cl)}. What is the current ratio?`,
      options: [
        ["1.75 : 1", "Correct: 27,300 ÷ 15,600."],
        [`${d2(cl / ca)} : 1`, "Current liabilities have been divided by current assets."],
        ["11,700 : 1", "This is working capital in dollars, not a ratio."],
        ["175 : 1", "The ratio has been multiplied by 100 like a percentage."],
      ],
      answer: "A",
      explanation: `${fmt(ca)} ÷ ${fmt(cl)} = ${d2(v)} : 1.`,
    });
  }
  {
    const ca = 41600, inv = 22400, cl = 16000;
    const v = ratios.acidTest(ca, inv, cl);
    check("lq mcq2", v, 1.2);
    b.mcq({
      d: 2, skill: "APPLICATION", calculator: true,
      stem: `Current assets ${money(ca)} (including inventory of ${money(inv)}); current liabilities ${money(cl)}. What is the acid test ratio?`,
      options: [
        ["1.20 : 1", "Correct: (41,600 − 22,400) ÷ 16,000."],
        [`${d2(ratios.current(ca, cl))} : 1`, "This is the current ratio: inventory has not been removed."],
        [`${d2(inv / cl)} : 1`, "This divides inventory alone by current liabilities."],
        [`${d2((ca - inv) / (cl + inv))} : 1`, "Inventory has been added to current liabilities."],
      ],
      answer: "A",
      explanation: `(${fmt(ca)} − ${fmt(inv)}) ÷ ${fmt(cl)} = ${fmt(ca - inv)} ÷ ${fmt(cl)} = ${d2(v)} : 1.`,
    });
  }
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why is inventory left out of the acid test ratio?",
    options: [
      ["It may take time to sell and then to turn into cash", "Correct: inventory is the least liquid current asset."],
      ["It is a non-current asset", "Inventory is a current asset."],
      ["It is valued at selling price", "Inventory is valued at cost (or net realisable value if lower)."],
      ["It is already included in current liabilities", "Inventory is an asset, not a liability."],
    ],
    answer: "A",
    explanation: "The acid test asks whether debts could be paid without relying on selling inventory.",
  });
  {
    const ca = 30000, cl = 20000, pay = 5000;
    const v = ratios.current(ca - pay, cl - pay);
    check("lq mcq3", r2(v), 1.67);
    b.mcq({
      d: 3, skill: "ANALYSIS", calculator: true,
      stem: `A business has current assets of ${money(ca)} and current liabilities of ${money(cl)}. It pays a supplier ${money(pay)} from the bank. What is the new current ratio?`,
      options: [
        ["1.67 : 1", "Correct: 25,000 ÷ 15,000."],
        ["1.50 : 1", "This is the ratio before the payment."],
        ["1.25 : 1", "Only current assets have been reduced; current liabilities fall too."],
        ["2.00 : 1", "Only current liabilities have been reduced; the bank balance falls too."],
      ],
      answer: "A",
      hints: ["Both the bank (a current asset) and trade payables (a current liability) fall."],
      explanation: `After the payment: ${fmt(ca - pay)} ÷ ${fmt(cl - pay)} = ${d2(v)} : 1. Working capital is still ${fmt(ca - cl)}.`,
    });
  }
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which transaction would **improve** a trader's acid test ratio?",
    options: [
      ["Selling surplus inventory for cash at cost", "Correct: inventory (excluded) becomes cash (included)."],
      ["Buying inventory on credit", "This adds to current liabilities but not to liquid assets."],
      ["Receiving cash from a credit customer", "One liquid asset replaces another; the ratio is unchanged."],
      ["Paying wages in cash", "Liquid assets fall with no fall in current liabilities."],
    ],
    answer: "A",
    hints: ["Which items are in the top of the acid test fraction?"],
    explanation: "Turning inventory into cash raises liquid assets while current liabilities stay the same.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "A trader's current ratio is 4.8 : 1, much higher than similar shops. What does this most likely suggest?",
    options: [
      ["Resources are tied up in idle current assets", "Correct: very high ratios suggest resources not being used well."],
      ["The trader cannot pay her debts as they fall due", "That would be shown by a low ratio."],
      ["The trader's profit margin is very high", "The current ratio measures liquidity, not profitability."],
      ["The trader has too many non-current liabilities", "Non-current liabilities are not part of the current ratio."],
    ],
    answer: "A",
    explanation: "A very high current ratio can mean excess inventory, slow collection of debts or cash that could be earning a return.",
  });
  b.mcq({
    d: 2, skill: "RECALL", applies: ZIM,
    stem: "In ZIMSEC questions the acid test ratio is usually called the …",
    options: [
      ["quick ratio", "Correct: the ZIMSEC syllabus lists it as the quick ratio."],
      ["working capital ratio", "This is another name for the current ratio."],
      ["rate of stock turnover", "This is an efficiency ratio."],
      ["net profit percentage", "This is a profitability ratio."],
    ],
    answer: "A",
    explanation: "ZIMSEC: quick ratio; Cambridge: acid test (liquid) ratio.",
  });

  // ---------------------------------------------------------------- TF
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A bank overdraft is included in current liabilities when calculating the current ratio.",
    answer: true,
    explanation: "True. An overdraft is repayable on demand, so it is a current liability.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A business with a high profit for the year must also have a high current ratio.",
    answer: false,
    explanation: "False. Profit and liquidity are different. A profitable business can be short of cash, for example if its money is tied up in inventory or new equipment.",
  });

  // ---------------------------------------------------------------- Match
  b.match({
    d: 3, skill: "ANALYSIS",
    stem: "A business has a current ratio above 1 : 1. Match each transaction with its effect on the current ratio.",
    right: ["Increases", "Decreases", "No change"],
    pairs: ["Paying a trade payable from the bank", "Buying inventory on credit", "Receiving cash from a trade receivable", "Taking a five-year bank loan into the bank account", "Paying rent in cash"],
    rightIndex: [0, 1, 2, 0, 1],
    hints: ["Work out what happens to the top and the bottom of the fraction."],
    explanation: "Equal falls in both (paying a payable) raise a ratio above 1; equal rises (credit purchases) lower it; swapping one current asset for another changes nothing; a long-term loan adds cash only; paying an expense lowers current assets only.",
  });

  // ---------------------------------------------------------------- FIB
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the formulas.",
    template: "Current ratio = current assets ÷ {{blank:a}}. Acid test ratio = (current assets − {{blank:b}}) ÷ current liabilities.",
    blanks: [
      { id: "a", accepted: ["current liabilities"], choices: ["current liabilities", "non-current liabilities", "capital"] },
      { id: "b", accepted: ["inventory"], choices: ["inventory", "trade receivables", "bank"] },
    ],
    explanation: "Both ratios compare current assets with current liabilities; the acid test removes inventory.",
  });

  // ---------------------------------------------------------------- Numerical
  {
    const ca = [["Inventory", 14850], ["Trade receivables", 7320], ["Prepaid rent", 450], ["Cash", 380]];
    const cl = [["Trade payables", 8940], ["Bank overdraft", 2160], ["Accrued wages", 600]];
    const tca = sum(ca.map((x) => x[1])), tcl = sum(cl.map((x) => x[1]));
    const v = ratios.current(tca, tcl);
    b.calc({
      d: 3, kind: "ratio", value: v, calculator: true, wrong: [d2(ratios.current(tca, tcl - 2160)), d2(ratios.current(tca - 2160, tcl - 2160))],
      stem: `Sipho's current assets: inventory ${money(14850)}, trade receivables ${money(7320)}, prepaid rent ${money(450)}, cash ${money(380)}. Current liabilities: trade payables ${money(8940)}, bank overdraft ${money(2160)}, accrued wages ${money(600)}. Calculate the current ratio, as x : 1 to two decimal places.`,
      hints: ["The overdraft is a current liability."],
      explanation: `Current assets ${fmt(tca)}; current liabilities ${fmt(tcl)}. ${fmt(tca)} ÷ ${fmt(tcl)} = ${d2(v)} : 1. Leaving out the overdraft gives ${d2(ratios.current(tca, tcl - 2160))} : 1.`,
    });
    const at = ratios.acidTest(tca, 14850, tcl);
    b.num({
      d: 3, kind: "ratio", value: at, calculator: true, wrong: [d2(ratios.acidTest(tca, 14850 + 450, tcl))],
      stem: `Using the same figures (current assets ${money(tca)} including inventory of ${money(14850)}; current liabilities ${money(tcl)}), calculate Sipho's acid test (quick) ratio, as x : 1 to two decimal places.`,
      hints: ["Remove only the inventory."],
      explanation: `(${fmt(tca)} − 14,850) ÷ ${fmt(tcl)} = ${fmt(tca - 14850)} ÷ ${fmt(tcl)} = ${d2(at)} : 1.`,
    });
  }
  {
    const cl = 18400, cr = 1.6;
    const ca = r2(cl * cr);
    check("lq num3", ca, 29440);
    b.num({
      d: 3, kind: "money", value: ca, calculator: true, wrong: [r2(cl / cr)],
      stem: `A trader's current liabilities are ${money(cl)} and her current ratio is 1.6 : 1. Calculate her current assets.`,
      hints: ["Current assets = current ratio × current liabilities."],
      explanation: `${fmt(cl)} × 1.6 = ${fmt(ca)}. Dividing instead of multiplying gives ${fmt(r2(cl / cr))}.`,
    });
  }

  // ---------------------------------------------------------------- manual short
  b.manualShort({
    d: 3, skill: "EVALUATION", marks: 3,
    stem: "Tatenda's acid test ratio has fallen from 1.1 : 1 to 0.6 : 1. Suggest **three** actions he could take to improve his liquidity.",
    points: ["Collect debts faster / offer cash discounts for prompt payment", "Reduce inventory levels / sell surplus inventory", "Introduce more capital / take a long-term loan instead of an overdraft / reduce drawings / negotiate longer credit from suppliers"],
    modelAnswer: "He could offer customers a small discount to pay sooner, sell off slow-moving inventory to raise cash, and replace his overdraft with a long-term loan or put in more of his own capital.",
    hints: ["Raise liquid assets or reduce current liabilities."],
    explanation: "Any three distinct, practical actions.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 2,
    stem: "Explain why a supplier would look at a customer's liquidity ratios before giving credit.",
    points: ["The ratios show whether the customer can pay short-term debts", "A low ratio warns that the supplier might not be paid on time / at all"],
    modelAnswer: "The supplier wants to be paid within the credit period. The ratios show whether the customer has enough current assets to cover its short-term debts; low ratios suggest a risk of late payment or bad debt.",
    explanation: "Creditors are users who care most about short-term solvency.",
  });

  // ---------------------------------------------------------------- Practice structured 1 (two years)
  {
    const y = [
      { yr: "2024", inv: 12600, recv: 6800, bank: 4100, pay: 9200, od: 0 },
      { yr: "2025", inv: 19750, recv: 9300, bank: 0, pay: 13600, od: 2900 },
    ];
    const v = y.map((o) => {
      const ca = o.inv + o.recv + o.bank, cl = o.pay + o.od;
      return { ca, cl, cr: ratios.current(ca, cl), at: ratios.acidTest(ca, o.inv, cl) };
    });
    const stim = table(["", "2024 US\\$", "2025 US\\$"], [["Inventory", 12600, 19750], ["Trade receivables", 6800, 9300], ["Bank", 4100, "–"], ["Trade payables", 9200, 13600], ["Bank overdraft", "–", 2900]]);
    b.struct({
      d: 4, examStyle: true, skill: "ANALYSIS", calculator: true,
      stem: `Thandeka Ndlovu sells furniture in Bulawayo. Her current assets and current liabilities at 31 December were:\n\n${stim}`,
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "ratio", value: v[0].cr, stem: "Calculate the current ratio for 2024, as x : 1 to two decimal places.", explanation: `${fmt(v[0].ca)} ÷ ${fmt(v[0].cl)} = ${d2(v[0].cr)} : 1.` }),
        P.num({ label: "(b)", marks: 2, kind: "ratio", value: v[1].cr, wrong: [d2(ratios.current(v[1].ca, 13600))], stem: "Calculate the current ratio for 2025, as x : 1 to two decimal places.", explanation: `${fmt(v[1].ca)} ÷ ${fmt(v[1].cl)} = ${d2(v[1].cr)} : 1.` }),
        P.num({ label: "(c)", marks: 2, kind: "ratio", value: v[1].at, wrong: [d2(v[1].cr)], stem: "Calculate the acid test (quick) ratio for 2025, as x : 1 to two decimal places.", explanation: `(${fmt(v[1].ca)} − 19,750) ÷ ${fmt(v[1].cl)} = ${d2(v[1].at)} : 1. (2024: ${d2(v[0].at)} : 1.)` }),
        P.manual({ label: "(d)", marks: 4, stem: "Comment on Thandeka's liquidity in 2025 compared with 2024.", points: [`Current ratio fell from ${d2(v[0].cr)} : 1 to ${d2(v[1].cr)} : 1 but is still above 1 : 1`, `Acid test fell from ${d2(v[0].at)} : 1 to ${d2(v[1].at)} : 1: below 1 : 1, so she depends on selling inventory to pay debts`, "Inventory has risen sharply (12,600 to 19,750) while the bank balance has become an overdraft", "Conclusion: liquidity has worsened; she may struggle to pay suppliers on time"], modelAnswer: `Her current ratio has fallen from ${d2(v[0].cr)} : 1 to ${d2(v[1].cr)} : 1, which still looks acceptable, but the acid test has dropped from ${d2(v[0].at)} : 1 to ${d2(v[1].at)} : 1. Much of her money is now tied up in furniture: inventory rose by US\\$7,150 while the bank balance of US\\$4,100 turned into an overdraft of US\\$2,900. Her liquidity has worsened and she may struggle to pay suppliers without selling stock quickly.`, explanation: "Use figures; identify the cause; conclude." }),
      ],
      hints: ["The overdraft is a current liability; there is no bank asset in 2025."],
      explanation: `2024: current ${d2(v[0].cr)} : 1, acid test ${d2(v[0].at)} : 1. 2025: current ${d2(v[1].cr)} : 1, acid test ${d2(v[1].at)} : 1.`,
    });
  }

  // ---------------------------------------------------------------- Practice structured 2 (prepare section, missing figure)
  {
    const ca = [["Inventory", 8460], ["Trade receivables", 5130], ["Other receivables (prepaid insurance)", 310], ["Bank", 1700]];
    const cl = [["Trade payables", 6920], ["Other payables (electricity owing)", 280]];
    const tca = sum(ca.map((x) => x[1])), tcl = sum(cl.map((x) => x[1]));
    const md = statement("Extract from the statement of financial position at 31 December 2025", [["**Current assets**", null, null], ...ca.map(([l, a]) => [l, a, null]), ["", null, tca], ["**Current liabilities**", null, null], ...cl.map(([l, a]) => [l, a, null]), ["", null, -tcl], ["Net current assets (working capital)", null, tca - tcl]], { checks: [["wc", tca - tcl, r2(tca - tcl)]] });
    const cr = ratios.current(tca, tcl), at = ratios.acidTest(tca, 8460, tcl);
    b.struct({
      d: 3, examStyle: true, skill: "APPLICATION", calculator: true,
      stem: `Nyasha Chirwa runs a pharmacy in Masvingo. At 31 December 2025 she had: inventory ${money(8460)}, trade receivables ${money(5130)}, insurance prepaid ${money(310)}, bank ${money(1700)}, trade payables ${money(6920)} and electricity owing ${money(280)}. She also has a loan of ${money(10000)} repayable in 2030.`,
      parts: [
        P.manual({ label: "(a)", marks: 3, type: "EXTENDED_RESPONSE", stem: "Prepare the current assets and current liabilities section of Nyasha's statement of financial position at 31 December 2025, showing the working capital.", points: [`Current assets listed, total ${fmt(tca)}`, `Current liabilities (excluding the loan), total ${fmt(tcl)}`, `Working capital ${fmt(tca - tcl)}`], modelAnswer: md, explanation: "The loan is non-current, so it is not in this section." }),
        P.num({ label: "(b)", marks: 2, kind: "ratio", value: cr, wrong: [d2(ratios.current(tca, tcl + 10000))], stem: "Calculate the current ratio, as x : 1 to two decimal places.", explanation: `${fmt(tca)} ÷ ${fmt(tcl)} = ${d2(cr)} : 1. Including the loan gives ${d2(ratios.current(tca, tcl + 10000))} : 1.` }),
        P.num({ label: "(c)", marks: 2, kind: "ratio", value: at, stem: "Calculate the acid test (quick) ratio, as x : 1 to two decimal places.", explanation: `(${fmt(tca)} − 8,460) ÷ ${fmt(tcl)} = ${d2(at)} : 1.` }),
        P.mcq({ label: "(d)", stem: "Nyasha plans to use US\\$1,500 from the bank to pay a supplier. What will happen to her current ratio?", options: [["It will rise", "Correct: equal falls in both parts raise a ratio that is above 1 : 1."], ["It will fall", "It would fall only if the ratio were below 1 : 1."], ["It will stay the same", "Working capital stays the same, but the ratio changes."], ["It will become exactly 1 : 1", "There is no reason for it to reach exactly 1 : 1."]], answer: "A", explanation: `New ratio ${fmt(tca - 1500)} ÷ ${fmt(tcl - 1500)} = ${d2(ratios.current(tca - 1500, tcl - 1500))} : 1.` }),
      ],
      hints: ["A loan repayable in 2030 is a non-current liability."],
      explanation: `Model answer:\n\n${md}`,
    });
  }

  // ---------------------------------------------------------------- Flashcards
  b.card("FORMULA", "Current ratio", "Current assets ÷ current liabilities, written x : 1.");
  b.card("FORMULA", "Acid test (quick / liquid) ratio", "(Current assets − inventory) ÷ current liabilities, written x : 1.");
  b.card("DEFINITION", "Liquidity", "The ability of a business to pay its short-term debts as they fall due.");
  b.card("DEFINITION", "Working capital", "Current assets − current liabilities (net current assets).");
  b.card("CONCEPT", "Why exclude inventory from the acid test?", "Inventory must be sold and then paid for before it becomes cash, so it is the least liquid current asset.");
  b.card("CONCEPT", "Very high current ratio", "May mean too much inventory, slow debt collection or idle cash that could earn a return.");
  b.card("FACT", "Ways to improve liquidity", "Collect debts faster, reduce inventory, introduce capital, take a long-term loan instead of an overdraft, cut drawings, get longer supplier credit.");
  b.card("FACT", "Bank overdraft in liquidity ratios", "A current liability.");
  b.card("FACT", "ZIMSEC and Cambridge names", "ZIMSEC: quick ratio. Cambridge: acid test (liquid) ratio. Same formula.");
});
