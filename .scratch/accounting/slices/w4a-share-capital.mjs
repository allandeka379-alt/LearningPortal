// W4a: limited companies: share capital and loan capital.
import { concept, P, money, r2, sum, check } from "../lib.mjs";
import { headed, table, fmt, U } from "../tables/w4a-lib.mjs";

concept("acc.companies.share-capital", { file: "companies/share-capital", keyPrefix: "companies.share-capital" }, (b) => {
  // ---------------------------------------------------------------- MCQs
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What does **limited liability** mean for a shareholder?",
    options: [
      ["They can lose only the money invested in their shares", "Correct: private possessions are protected."],
      ["They must pay all the company's debts personally", "That is unlimited liability, as in a partnership."],
      ["They cannot lose any money if the company fails", "The amount invested in shares can be lost."],
      ["They are paid a fixed rate of interest every year", "That describes a debenture holder."],
    ],
    answer: "A",
    explanation: "A shareholder's liability is limited to the amount (if any) unpaid on the shares; personal assets are safe.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which is a feature of **preference** shares?",
    options: [
      ["A fixed dividend paid before the ordinary dividend", "Correct: they rank first for dividends at a fixed rate."],
      ["A variable dividend set after the ordinary dividend", "Ordinary shares have the variable dividend, paid last."],
      ["Full voting rights at every general meeting", "Preference shares usually have no voting rights."],
      ["Interest charged as an expense in the income statement", "That describes debenture interest."],
    ],
    answer: "A",
    explanation: "Preference shares get a fixed-rate dividend before ordinary shareholders and are repaid first on winding up.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "A company issued 7% debentures repayable in 2034. Where are they shown in the statement of financial position at 31 December 2025?",
    options: [
      ["Non-current liabilities", "Correct: a long-term loan not due within twelve months."],
      ["Equity", "Debenture holders are lenders, not owners."],
      ["Current liabilities", "They are not repayable within a year."],
      ["Non-current assets", "The company owes the money: it is a liability."],
    ],
    answer: "A",
    explanation: "Debentures are loan capital: a non-current liability until the year in which they fall due.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "How is **debenture interest** treated in a limited company's financial statements?",
    options: [
      ["As a finance cost in the income statement", "Correct: it is the cost of borrowing and must be paid even without profit."],
      ["As a deduction in the statement of changes in equity", "Only dividends and transfers are shown there."],
      ["As an addition to the general reserve", "Interest is a cost, not a reserve."],
      ["As a deduction from share capital", "Share capital is not reduced by interest."],
    ],
    answer: "A",
    explanation: "Debenture interest is an expense (finance cost) deducted before the profit for the year.",
  });
  {
    const n = 450000, nom = 0.5;
    const cap = r2(n * nom);
    b.mcq({
      d: 2, skill: "APPLICATION", daily: true,
      stem: `A company has issued ${n.toLocaleString("en-GB")} ordinary shares of US\\$0.50 each, fully paid. What is its issued ordinary share capital?`,
      options: [
        [money(cap), "Correct: 450,000 × 0.50."],
        [money(n), "This treats each share as US\\$1; use the nominal value of US\\$0.50."],
        [money(r2(n * 2)), "The number of shares has been divided by 0.50 instead of multiplied."],
        [money(r2(n * 0.05)), "The nominal value has been read as US\\$0.05."],
      ],
      answer: "A",
      explanation: `Issued capital = number of shares × nominal value = ${n.toLocaleString("en-GB")} × 0.50 = ${fmt(cap)}.`,
    });
  }
  {
    const n = 80000, rate = 5;
    const div = r2(n * rate / 100);
    b.mcq({
      d: 2, skill: "APPLICATION", calculator: true,
      stem: `A company has 80,000 ${rate}% preference shares of US\\$1 each in issue. What is the annual preference dividend?`,
      options: [
        [money(div), "Correct: 80,000 × US\\$1 × 5%."],
        [money(r2(div * 10)), "The rate has been read as 50%."],
        [money(r2(n / rate)), "The capital has been divided by 5 instead of multiplied by 5%."],
        [money(n), "This is the share capital, not the dividend."],
      ],
      answer: "A",
      explanation: `${fmt(n)} × ${rate}% = ${fmt(div)}.`,
    });
  }
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "A company's authorised capital is US\\$800,000 and its issued capital is US\\$500,000. Which figure is included in total equity?",
    options: [
      ["US\\$500,000", "Correct: only issued share capital is part of equity."],
      ["US\\$800,000", "Authorised capital is a limit shown as a note."],
      ["US\\$1,300,000", "Authorised and issued capital are never added together."],
      ["US\\$300,000", "This is the unissued capital, which is not owned by anyone."],
    ],
    answer: "A",
    explanation: "Authorised capital is the maximum the company may issue; only the issued (paid-up) capital is in the equity total.",
  });
  {
    const items = [["ordinary share capital", 250000], ["preference share capital", 60000], ["general reserve", 35000], ["retained earnings", 41800]];
    const deb = 90000;
    const eq = sum(items.map((x) => x[1]));
    b.mcq({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: `A company has ordinary share capital ${money(250000)}, preference share capital ${money(60000)}, general reserve ${money(35000)}, retained earnings ${money(41800)} and 6% debentures ${money(deb)}. What are its shareholders' funds (equity)?`,
      options: [
        [money(eq), "Correct: shares plus reserves."],
        [money(r2(eq + deb)), "Debentures are a liability, not part of equity."],
        [money(r2(eq - 60000)), "Preference shares are part of equity."],
        [money(310000), "The reserves have been left out."],
      ],
      answer: "A",
      hints: ["Which item belongs to lenders rather than to shareholders?"],
      explanation: `Equity = ${items.map((x) => fmt(x[1])).join(" + ")} = ${fmt(eq)}. The debentures (${fmt(deb)}) are a non-current liability.`,
    });
  }
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which is an **advantage** of a limited company compared with a partnership?",
    options: [
      ["It continues if one of its owners dies", "Correct: the company is a separate legal entity, so it has continuity."],
      ["It is cheaper and quicker to set up", "Registering a company costs more and takes longer."],
      ["Its accounts never have to be published", "Companies must file and, in some cases, publish accounts."],
      ["Its owners always run the business", "Shareholders often leave running the company to directors."],
    ],
    answer: "A",
    explanation: "A company has continuity, limited liability and access to more capital, but costs more to form and has less privacy.",
  });
  {
    const shares = 200000, called = 0.6, paidPct = 98;
    const calledAmt = r2(shares * called);
    const received = r2(calledAmt * paidPct / 100);
    const arrear = r2(calledAmt - received);
    b.mcq({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: `A company issued 200,000 ordinary shares of US\\$1 each and has called up US\\$0.60 per share. It has received ${money(received)}. What are the calls in arrear?`,
      options: [
        [money(arrear), "Correct: called up 120,000 − received 117,600."],
        [money(r2(shares - received)), "This compares the receipts with the full nominal value, not with the amount called."],
        [money(r2(shares - calledAmt)), "This is the uncalled capital."],
        [money(calledAmt), "This is the called-up capital, not the amount still owed."],
      ],
      answer: "A",
      hints: ["Calls in arrear = amount called − amount received."],
      explanation: `Called up = 200,000 × 0.60 = ${fmt(calledAmt)}; arrears = ${fmt(calledAmt)} − ${fmt(received)} = ${fmt(arrear)}.`,
    });
  }

  // ---------------------------------------------------------------- TF
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Debenture holders are owners of the company.",
    answer: false,
    explanation: "False. Debenture holders lend money to the company; shareholders are the owners.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A general reserve is part of the equity of a company and belongs to the ordinary shareholders.",
    answer: true,
    explanation: "True. It is retained profit set aside; like retained earnings, it belongs to the ordinary shareholders.",
  });

  // ---------------------------------------------------------------- Match
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each term with its meaning.",
    pairs: [
      ["Authorised share capital", "The maximum value of shares the company may issue"],
      ["Issued share capital", "The nominal value of shares actually issued"],
      ["Called-up capital", "The part of issued capital shareholders have been asked to pay"],
      ["Retained earnings", "Profits kept in the company and not paid as dividends"],
      ["Debentures", "Long-term loans to the company at a fixed rate of interest"],
    ],
    explanation: "Authorised ≥ issued ≥ called up ≥ paid up; reserves are retained profits; debentures are loans.",
  });

  // ---------------------------------------------------------------- FIB
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the statements.",
    template: "Shareholders' funds = issued share capital + {{blank:a}}. Dividends are paid to {{blank:b}}; interest is paid to {{blank:c}}. Ordinary shareholders receive their dividend {{blank:d}} the preference shareholders.",
    blanks: [
      { id: "a", accepted: ["reserves"], choices: ["reserves", "debentures", "current liabilities"] },
      { id: "b", accepted: ["shareholders"], choices: ["shareholders", "debenture holders"] },
      { id: "c", accepted: ["debenture holders"], choices: ["shareholders", "debenture holders"] },
      { id: "d", accepted: ["after"], choices: ["after", "before"] },
    ],
    explanation: "Equity is shares plus reserves; owners get dividends, lenders get interest; preference dividends come first.",
  });

  // ---------------------------------------------------------------- Numerical
  {
    const ord = 600000, nom = 0.25, dps = 0.03, pref = 40000, prate = 8;
    const ordDiv = r2(ord * dps), prefDiv = r2(pref * prate / 100);
    const tot = r2(ordDiv + prefDiv);
    b.calc({
      d: 3, kind: "money", value: tot, calculator: true, wrong: [r2(ord * nom * dps + prefDiv), ordDiv],
      stem: `A company has issued 600,000 ordinary shares of US\\$0.25 each and 40,000 ${prate}% preference shares of US\\$1 each. The directors paid the preference dividend and an ordinary dividend of US\\$0.03 **per share**. Calculate the total dividends paid.`,
      hints: ["The ordinary dividend is per share, not a percentage of the nominal value."],
      explanation: `Preference: 40,000 × 8% = ${fmt(prefDiv)}. Ordinary: 600,000 × 0.03 = ${fmt(ordDiv)}. Total ${fmt(tot)}. Applying US\\$0.03 to the share capital (${fmt(r2(ord * nom))}) instead of to the number of shares gives ${fmt(r2(ord * nom * dps + prefDiv))}.`,
    });
  }
  {
    const deb = 120000, rate = 9, months = 9;
    const int = r2(deb * rate / 100 * months / 12);
    b.num({
      d: 3, kind: "money", value: int, calculator: true, wrong: [r2(deb * rate / 100)],
      stem: `On 1 April 2025 a company issued ${money(deb)} of ${rate}% debentures. Calculate the debenture interest for the year ended 31 December 2025.`,
      hints: ["The debentures were in issue for nine months."],
      explanation: `${fmt(deb)} × ${rate}% × 9/12 = ${fmt(int)}. A full year's interest would be ${fmt(r2(deb * 0.09))}.`,
    });
  }
  {
    const div = 18000, n = 360000;
    const dps = r2((div / n) * 100);
    b.num({
      d: 2, kind: "plain", value: 5, daily: true,
      stem: `A company paid a total ordinary dividend of ${money(div)} on ${n.toLocaleString("en-GB")} ordinary shares. Calculate the dividend per share in **cents**.`,
      explanation: `${fmt(div)} ÷ ${n.toLocaleString("en-GB")} = US\\$0.05, which is 5 cents per share.`,
    });
    check("dps", dps, 5);
  }

  // ---------------------------------------------------------------- manual short
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 3,
    stem: "State **three** differences between ordinary shares and preference shares.",
    points: ["Ordinary: variable dividend / preference: fixed rate of dividend", "Preference dividend is paid before the ordinary dividend", "Ordinary shares carry voting rights; preference shares usually do not / preference repaid first on winding up"],
    modelAnswer: "Ordinary shares receive a dividend that varies with profit, while preference shares receive a fixed rate. Preference dividends are paid first. Ordinary shareholders can vote at meetings; preference shareholders usually cannot, but are repaid first if the company is wound up.",
    explanation: "Dividend rate, order of payment, voting rights and repayment on winding up.",
  });
  b.manualShort({
    d: 3, skill: "EVALUATION", marks: 4,
    stem: "The directors of Gweru Packaging Limited need US\\$200,000 to buy new machines. Advise them whether to issue ordinary shares or debentures. Give **one** point for each and a conclusion.",
    points: ["Ordinary shares: no fixed payment; dividends only if profits allow / never repaid", "But new shareholders dilute control of the existing shareholders", "Debentures: interest must be paid every year even without profit, and the loan must be repaid; but control is not diluted", "Justified conclusion based on expected profits and cash flow"],
    modelAnswer: "Issuing ordinary shares means no compulsory payments, but new shareholders share control and future dividends. Debentures keep control with existing shareholders, but interest must be paid every year and the capital repaid. If profits from the machines are expected to be steady, debentures are suitable; if profits are uncertain, shares are safer.",
    hints: ["Compare the cost, the risk and the effect on control."],
    explanation: "A balanced answer weighs fixed interest and repayment against dilution of control.",
  });

  // ---------------------------------------------------------------- Practice structured 1: capital structure and equity
  {
    const ordN = 400000, ordNom = 0.5, prefN = 75000, prefRate = 6, dps = 0.04, gr = 28000, re = 53650, debs = 80000, debRate = 10;
    const ordCap = r2(ordN * ordNom);
    const prefDiv = r2(prefN * prefRate / 100);
    const ordDiv = r2(ordN * dps);
    const eq = r2(ordCap + prefN + gr + re);
    const ext = headed("Bulawayo Bakeries Limited", "Statement of financial position (extract)", "at 31 December 2025", [["**Equity**", null, null], ["Ordinary shares of US\\$0.50 each, fully paid", ordCap, null], [`${prefRate}% preference shares of US\\$1 each`, prefN, null], ["General reserve", gr, null], ["Retained earnings", re, eq], ["**Non-current liabilities**", null, null], [`${debRate}% debentures (repayable 2031)`, null, debs]], { checks: [["eq", eq, ordCap + prefN + gr + re]] });
    b.struct({
      d: 3, examStyle: true, skill: "APPLICATION", calculator: true,
      stem: `Bulawayo Bakeries Limited has an authorised capital of 1,000,000 ordinary shares of US\\$0.50 each. At 31 December 2025:\n\n- ${ordN.toLocaleString("en-GB")} ordinary shares of US\\$0.50 each had been issued, fully paid;\n- ${prefN.toLocaleString("en-GB")} ${prefRate}% preference shares of US\\$1 each had been issued, fully paid;\n- the general reserve was ${money(gr)} and retained earnings were ${money(re)} (after dividends);\n- ${money(debs)} of ${debRate}% debentures were in issue, repayable in 2031.\n\nDuring 2025 the company paid the full preference dividend and an ordinary dividend of US\\$0.04 per share.`,
      parts: [
        P.num({ label: "(a)", marks: 1, kind: "money", value: ordCap, wrong: [ordN, 500000], stem: "Calculate the issued ordinary share capital.", explanation: `${ordN.toLocaleString("en-GB")} × 0.50 = ${fmt(ordCap)}. The authorised capital (US\\$500,000) is only a note.` }),
        P.num({ label: "(b)", marks: 2, kind: "money", value: r2(prefDiv + ordDiv), wrong: [r2(prefDiv + ordCap * dps)], stem: "Calculate the total dividends paid in 2025.", explanation: `Preference ${fmt(prefN)} × 6% = ${fmt(prefDiv)}; ordinary ${ordN.toLocaleString("en-GB")} × 0.04 = ${fmt(ordDiv)}; total ${fmt(r2(prefDiv + ordDiv))}.` }),
        P.num({ label: "(c)", marks: 1, kind: "money", value: r2(debs * debRate / 100), stem: "Calculate the debenture interest for the year.", explanation: `${fmt(debs)} × 10% = ${fmt(r2(debs * 0.1))}, a finance cost in the income statement.` }),
        P.manual({ label: "(d)", marks: 4, type: "EXTENDED_RESPONSE", stem: "Prepare the equity and non-current liabilities section of the statement of financial position at 31 December 2025.", points: ["Ordinary and preference share capital with nominal values", "General reserve and retained earnings", `Total equity ${fmt(eq)}`, `Debentures ${fmt(debs)} as a non-current liability`], modelAnswer: ext, explanation: "Equity = issued shares + reserves; debentures follow as a liability." }),
        P.mcq({ label: "(e)", stem: "Who has the first claim on the company's profit each year?", options: [["The debenture holders", "Correct: interest is an expense, paid before any dividend."], ["The ordinary shareholders", "They are paid last, from what remains."], ["The preference shareholders", "Their dividend comes after debenture interest."], ["The directors, as a share of profit", "Directors' pay is an expense, not a share of profit."]], answer: "A", explanation: "Debenture interest is deducted before profit; then preference dividends; then ordinary dividends." }),
      ],
      hints: ["Use the nominal value of each class of share.", "Debentures are not part of equity."],
      explanation: `Model answer:\n\n${ext}`,
    });
  }

  // ---------------------------------------------------------------- Practice structured 2: shares or debentures, effect on retained earnings
  {
    const profitOps = 96000; // profit from operations after the expansion
    const need = 150000;
    const debRate = 8;
    const debInt = r2(need * debRate / 100);
    const existing = 500000; // ordinary shares of US\\$1
    const dps = 0.1;
    const div1 = r2((existing + need) * dps);
    const div2 = r2(existing * dps);
    const profit2 = r2(profitOps - debInt);
    const kept1 = r2(profitOps - div1);
    const kept2 = r2(profit2 - div2);
    check("kept", kept2 > kept1, true);
    b.struct({
      d: 4, examStyle: true, skill: "EVALUATION", calculator: true,
      stem: `Chinhoyi Feeds Limited has 500,000 ordinary shares of US\\$1 each and no loans. It needs ${money(need)} to build a new warehouse. After the expansion the profit from operations is expected to be ${money(profitOps)} a year, and the directors intend to pay an ordinary dividend of US\\$0.10 per share. They are choosing between:\n\n- **Option 1:** issuing 150,000 more ordinary shares of US\\$1 each at par;\n- **Option 2:** issuing ${money(need)} of ${debRate}% debentures repayable in 2035.\n\nIgnore taxation.`,
      parts: [
        P.num({ label: "(a)", marks: 1, kind: "money", value: debInt, stem: "Calculate the annual debenture interest under Option 2.", explanation: `${fmt(need)} × ${debRate}% = ${fmt(debInt)}.` }),
        P.num({ label: "(b)", marks: 2, kind: "money", value: div1, wrong: [div2], stem: "Calculate the total ordinary dividend under Option 1.", explanation: `650,000 shares × US\\$0.10 = ${fmt(div1)}. Using only the existing 500,000 shares gives ${fmt(div2)}.` }),
        P.num({ label: "(c)", marks: 2, kind: "money", value: kept1, wrong: [r2(profitOps - div2)], stem: "Calculate the profit retained (added to retained earnings) for the year under Option 1.", explanation: `No interest, so profit for the year is ${fmt(profitOps)}; retained ${fmt(profitOps)} − ${fmt(div1)} = ${fmt(kept1)}.` }),
        P.num({ label: "(d)", marks: 2, kind: "money", value: kept2, wrong: [r2(profitOps - div2)], stem: "Calculate the profit retained for the year under Option 2.", explanation: `Profit for the year ${fmt(profitOps)} − interest ${fmt(debInt)} = ${fmt(profit2)}; retained ${fmt(profit2)} − ${fmt(div2)} = ${fmt(kept2)}. Forgetting the interest gives ${fmt(r2(profitOps - div2))}.` }),
        P.manual({ label: "(e)", marks: 3, stem: "Advise the directors which option to choose. Justify your answer.", points: [`Option 2 retains more profit (${fmt(kept2)} against ${fmt(kept1)}) and the existing shareholders keep control`, "But debenture interest must be paid even if profits fall, and the loan must be repaid in 2035 (more risk)", "Justified recommendation, e.g. Option 2 if profits are reliable; Option 1 if profits are uncertain"], modelAnswer: `Debentures leave ${fmt(kept2)} in retained earnings against ${fmt(kept1)} with new shares, and no new shareholders share control. However, the ${fmt(debInt)} interest is compulsory and the loan must be repaid. If the expected profit is reliable, Option 2 is better; if it is uncertain, Option 1 is safer because dividends can be cut.`, hints: ["Compare the amount retained with the risk of fixed interest."], explanation: "Weigh retained profit and control against fixed commitments." }),
      ],
      hints: ["Debenture interest is an expense; new shares also receive dividends."],
      explanation: `Option 1: retained ${fmt(profitOps)} − ${fmt(div1)} = ${fmt(kept1)}. Option 2: retained ${fmt(profitOps)} − ${fmt(debInt)} − ${fmt(div2)} = ${fmt(kept2)}.`,
    });
  }

  // ---------------------------------------------------------------- Flashcards
  b.card("DEFINITION", "Limited liability", "Shareholders can lose only the amount invested in (or unpaid on) their shares; personal possessions are safe.");
  b.card("DEFINITION", "Ordinary shares", "Shares with voting rights and a variable dividend paid after the preference dividend; they carry the most risk.");
  b.card("DEFINITION", "Preference shares", "Shares with a fixed-rate dividend paid before ordinary dividends; usually no votes; repaid first on winding up.");
  b.card("DEFINITION", "Debentures", "Long-term loans to a company at a fixed rate of interest, repayable on a set date; a non-current liability.");
  b.card("FACT", "Authorised, issued, called-up, paid-up capital", "Authorised = maximum allowed; issued = shares given out; called up = amount requested; paid up = amount received.");
  b.card("FORMULA", "Equity (shareholders' funds)", "Issued share capital + reserves (general reserve + retained earnings).");
  b.card("FACT", "Dividend vs debenture interest", "Dividends: to owners, appropriation, deducted from retained earnings. Debenture interest: to lenders, expense (finance cost).");
  b.card("FORMULA", "Preference dividend", "Number of preference shares × nominal value × fixed rate.");
  b.card("CONCEPT", "General reserve", "Retained profit transferred and kept for the long term; part of equity, not a sum of cash.");
});
