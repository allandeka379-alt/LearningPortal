// W3b: departmental accounts (ZIMSEC only; the concept is tagged to ZIMSEC automatically).
import { concept, P, money, check, r2, sum } from "../lib.mjs";
import { departmental, apportion, table, U, fmt } from "../tables/w3b-lib.mjs";

concept("acc.statements.departmental", { file: "statements/departmental", keyPrefix: "statements.departmental" }, (b) => {
  // ---------------------------------------------------------------- MCQs
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is the main purpose of departmental accounts?",
    options: [
      ["To show the gross and net profit earned by each department", "Correct: the owner can compare the departments."],
      ["To record the cash received by each department each day", "That is the job of the cash book or till records."],
      ["To value the closing inventory of the business", "Inventory is counted and valued separately."],
      ["To calculate the tax payable by each department", "Tax is assessed on the business as a whole."],
    ],
    answer: "A",
    explanation: "Departmental accounts measure the performance of each department separately.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which basis is most suitable for apportioning **rent of the shop building** between departments?",
    options: [
      ["Floor area occupied", "Correct: each department pays for the space it uses."],
      ["Number of staff", "Staff numbers suit shared wages, not building costs."],
      ["Revenue of each department", "Revenue suits selling costs such as advertising."],
      ["Purchases of each department", "Purchases do not measure use of the building."],
    ],
    answer: "A",
    explanation: "Rent, rates, building insurance and lighting are usually shared by floor area.",
  });
  {
    const tot = 7500, w = [2, 3];
    const p = apportion(tot, w);
    b.mcq({
      d: 2, skill: "APPLICATION", daily: true,
      stem: `Insurance of ${money(tot)} is apportioned between the Food and Furniture departments by floor area of 200 m² and 300 m². What is Furniture's share?`,
      options: [
        [money(p[1]), "Correct: 7,500 × 300/500."],
        [money(p[0]), "This is Food's share."],
        [money(r2(tot / 2)), "This shares the insurance equally."],
        [money(r2((tot * 300) / 200)), "This divides by Food's area instead of the total area."],
      ],
      answer: "A",
      explanation: `Total area 500 m². Furniture: ${fmt(tot)} × 300 ÷ 500 = ${fmt(p[1])}.`,
    });
  }
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "The wages of a sales assistant who works only in the hardware department are …",
    options: [
      ["charged in full to the hardware department", "Correct: it is a direct expense of that department."],
      ["apportioned by the number of staff in each department", "Only shared wages are apportioned."],
      ["shared equally between all the departments", "The other departments receive no benefit from this assistant."],
      ["left out of the departmental statement", "All expenses appear, either directly or apportioned."],
    ],
    answer: "A",
    explanation: "Direct (departmental) expenses go in full to the department that incurs them.",
  });
  {
    const tot = 3600, rev = [45000, 27000];
    const p = apportion(tot, rev);
    b.mcq({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: `Advertising of ${money(tot)} is apportioned in proportion to revenue. Department X had revenue of ${money(rev[0])} and Department Y ${money(rev[1])}. What is Department Y's share?`,
      options: [
        [money(p[1]), "Correct: revenue ratio 5 : 3, so 3/8 of 3,600."],
        [money(p[0]), "This is Department X's share."],
        [money(r2((tot * 3) / 5)), "This uses 3/5 instead of 3/8: the ratio parts were not added."],
        [money(r2(tot / 2)), "This shares the advertising equally."],
      ],
      answer: "A",
      hints: ["Simplify the revenue ratio, then add its parts."],
      explanation: `45,000 : 27,000 = 5 : 3. Department Y: ${fmt(tot)} × 3 ÷ 8 = ${fmt(p[1])}.`,
    });
  }
  b.mcq({
    d: 3, skill: "EVALUATION",
    stem: "A department shows a net loss of US\\$900 after apportioned rent of US\\$3,000. The rent would still be paid if the department closed. What happens to the business's total profit if it closes, assuming no other changes?",
    options: [
      ["It falls by US\\$2,100", "Correct: the department contributed 3,000 − 900 = 2,100 towards the rent."],
      ["It rises by US\\$900", "This ignores the rent that would still have to be paid."],
      ["It rises by US\\$3,900", "Rent is not saved, so the loss is not removed."],
      ["It stays the same", "The department's contribution of 2,100 would be lost."],
    ],
    answer: "A",
    hints: ["Before rent the department made a profit of 3,000 − 900."],
    explanation: "Before rent the department made 2,100. Closing it loses that 2,100 while the rent stays, so total profit falls by 2,100.",
  });
  check("close", 3000 - 900, 2100);
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "In a departmental income statement, the **total** column shows …",
    options: [
      ["the figures of the business as a whole", "Correct: it equals the ordinary income statement."],
      ["the largest department's figures", "Every department is added in."],
      ["only the shared expenses", "Revenue, cost of sales and every expense are totalled."],
      ["the average of the departments", "It is a sum, not an average."],
    ],
    answer: "A",
    explanation: "The total column adds across each line and gives the business's overall results.",
  });
  {
    const gp = [18900, 12600], rev = [63000, 36000];
    const m = gp.map((g, i) => r2((g / rev[i]) * 100));
    b.mcq({
      d: 3, skill: "ANALYSIS", calculator: true,
      stem: `Department A: revenue ${money(rev[0])}, gross profit ${money(gp[0])}. Department B: revenue ${money(rev[1])}, gross profit ${money(gp[1])}. Which statement is correct?`,
      options: [
        [`B has the higher gross profit margin: ${m[1]}% against ${m[0]}%`, "Correct: 12,600 ÷ 36,000 = 35%; 18,900 ÷ 63,000 = 30%."],
        [`A has the higher gross profit margin: ${m[0]}% against ${m[1]}%`, "A has the larger gross profit in dollars but the lower margin."],
        ["Both departments have the same gross profit margin", "The margins are 30% and 35%."],
        ["A has the higher margin because its revenue is higher", "Revenue size does not decide the margin."],
      ],
      answer: "A",
      hints: ["Gross profit margin = gross profit ÷ revenue × 100."],
      explanation: `A: ${m[0]}%. B: ${m[1]}%. B earns more gross profit per dollar of sales.`,
    });
  }

  // ---------------------------------------------------------------- TF
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A separate statement of financial position is prepared for each department.",
    answer: false,
    explanation: "False. The statement of financial position is prepared for the whole business; departmental accounts split only the income statement.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "The sum of the departmental net profits equals the net profit of the business.",
    answer: true,
    explanation: "True. Every item is either direct or apportioned, so the columns add up to the total.",
  });

  // ---------------------------------------------------------------- Match
  b.match({
    d: 2, skill: "APPLICATION",
    stem: "Match each shared expense with the most suitable basis of apportionment.",
    right: ["Floor area", "Number of staff", "Revenue", "Value of equipment"],
    pairs: ["Rates on the building", "Canteen costs for staff", "Carriage outwards", "Depreciation of shop fittings", "Lighting and heating"],
    rightIndex: [0, 1, 2, 3, 0],
    explanation: "Building costs by floor area; staff costs by staff numbers; selling costs by revenue; depreciation by the value of equipment in each department.",
  });

  // ---------------------------------------------------------------- FIB
  b.fib({
    d: 2, skill: "APPLICATION",
    stem: "Electricity of US\\$4,200 is shared by floor area: Department P 250 m², Department Q 450 m².",
    template: "Department P's share is US\\$ {{blank:a}} and Department Q's share is US\\$ {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["1500", "1,500"] },
      { id: "b", accepted: ["2700", "2,700"] },
    ],
    explanation: "Total 700 m². P: 4,200 × 250/700 = 1,500. Q: 4,200 × 450/700 = 2,700. Check: 1,500 + 2,700 = 4,200.",
  });
  {
    const p = apportion(4200, [250, 450]);
    check("fib p", p[0], 1500);
    check("fib q", p[1], 2700);
  }

  // ---------------------------------------------------------------- Numerical
  {
    const rev = 38500, oi = 4200, pu = 27300, ci = 5100;
    const gp = r2(rev - (oi + pu - ci));
    b.num({
      d: 2, kind: "money", value: gp, wrong: [r2(rev - pu)],
      stem: `The stationery department had revenue ${money(rev)}, opening inventory ${money(oi)}, purchases ${money(pu)} and closing inventory ${money(ci)}. Calculate its gross profit.`,
      explanation: `Cost of sales ${fmt(oi)} + ${fmt(pu)} − ${fmt(ci)} = ${fmt(r2(oi + pu - ci))}; gross profit ${fmt(rev)} − ${fmt(r2(oi + pu - ci))} = ${fmt(gp)}.`,
    });
  }
  {
    const tot = 22400, staff = [4, 2, 1];
    const p = apportion(tot, staff);
    b.calc({
      d: 3, kind: "money", value: p[0], calculator: true, wrong: [r2(tot / 3), r2((tot * 4) / 3)],
      stem: `Shared wages of ${money(tot)} are apportioned by the number of staff: Groceries 4, Clothing 2, Electrical 1. Calculate the share charged to Groceries.`,
      hints: ["Add the staff numbers first."],
      explanation: `7 staff in total: ${fmt(tot)} ÷ 7 = ${fmt(r2(tot / 7))} per person; Groceries 4 × ${fmt(r2(tot / 7))} = ${fmt(p[0])}.`,
    });
  }
  {
    const gp = 14800, exps = [[5200], [2600], [1350]];
    const np = r2(gp - sum(exps.map((x) => x[0])));
    b.num({
      d: 2, kind: "money", value: np,
      stem: `The furniture department's gross profit was ${money(gp)}. Its share of expenses: wages ${money(5200)}, rent ${money(2600)}, advertising ${money(1350)}. Calculate its net profit.`,
      explanation: `${fmt(gp)} − (5,200 + 2,600 + 1,350) = ${fmt(np)}.`,
    });
  }

  // ---------------------------------------------------------------- manual short
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 2,
    stem: "State **two** decisions that an owner can make using departmental accounts.",
    points: ["e.g. whether to close / expand a department", "e.g. how to share floor space, advertising or staff; whether to change prices or suppliers in a low-margin department; rewarding managers"],
    modelAnswer: "Whether to expand the most profitable department or close a weak one, and how to divide floor space and advertising between departments.",
    explanation: "Any two sensible decisions.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 3,
    stem: "Explain why a department with a net loss in the departmental accounts should not automatically be closed.",
    points: ["Shared (fixed) expenses such as rent and insurance are apportioned and would still be paid after closure", "The department may still make a contribution: gross profit greater than the costs that would be saved", "Closure could also reduce sales in other departments (customers buy from several departments)"],
    modelAnswer: "Its loss is after a share of rent and other shared costs that would continue if it closed. If its gross profit is more than its own wages and other avoidable costs, it contributes to those shared costs and closing it would reduce total profit. Customers who come for that department may also buy from the others.",
    hints: ["Which costs would really disappear?"],
    explanation: "Compare gross profit lost with costs saved.",
  });

  // ---------------------------------------------------------------- Practice structured 1
  {
    const d = {
      name: "Rudo's Wholesalers", depts: ["Food", "Toiletries"],
      revenue: [99000, 45000], openInv: [7800, 5400], purchases: [71200, 33600], closeInv: [8600, 6100],
      expenses: [
        ["Wages (staff 3 : 1)", apportion(17200, [3, 1])],
        ["Rent and rates (floor area 740 : 260)", apportion(11000, [740, 260])],
        ["Advertising (revenue)", apportion(2880, [99000, 45000])],
        ["Insurance (floor area)", apportion(1700, [740, 260])],
      ],
    };
    const s = departmental(d);
    const stim = table(["Item", `Food ${U}`, `Toiletries ${U}`], [["Revenue", 99000, 45000], ["Inventory at 1 January 2025", 7800, 5400], ["Purchases", 71200, 33600], ["Inventory at 31 December 2025", 8600, 6100]]);
    const m = s.gp.map((g, i) => (g / d.revenue[i]) * 100);
    b.struct({
      d: 4, examStyle: true, skill: "APPLICATION", calculator: true,
      stem: `Rudo runs a wholesale business in Bulawayo with two departments. For the year ended 31 December 2025:\n\n${stim}\n\nShared expenses: wages ${money(17200)} (staff 3 : 1); rent and rates ${money(11000)} and insurance ${money(1700)} (floor area: Food 740 m², Toiletries 260 m²); advertising ${money(2880)} (in proportion to revenue).`,
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "money", value: s.cos[0], wrong: [r2(7800 + 71200 + 8600)], stem: "Calculate the cost of sales of the Food department.", explanation: `7,800 + 71,200 − 8,600 = ${fmt(s.cos[0])}.` }),
        P.num({ label: "(b)", marks: 1, kind: "money", value: s.gp[1], stem: "Calculate the gross profit of the Toiletries department.", explanation: `45,000 − (5,400 + 33,600 − 6,100) = 45,000 − ${fmt(s.cos[1])} = ${fmt(s.gp[1])}.` }),
        P.num({ label: "(c)", marks: 2, kind: "money", value: d.expenses[1][1][1], wrong: [r2(11000 / 2)], stem: "Calculate the rent and rates charged to Toiletries.", explanation: `11,000 × 260 ÷ 1,000 = ${fmt(d.expenses[1][1][1])}.` }),
        P.num({ label: "(d)", marks: 2, kind: "money", value: s.np[1], stem: "Calculate the net profit of the Toiletries department.", explanation: `${fmt(s.gp[1])} − ${fmt(s.te[1])} = ${fmt(s.np[1])}.` }),
        P.manual({ label: "(e)", marks: 5, type: "EXTENDED_RESPONSE", stem: "Prepare the departmental income statement for the year ended 31 December 2025 in columnar form, with a total column.", points: ["Heading and three columns (Food, Toiletries, Total)", `Cost of sales ${fmt(s.cos[0])} and ${fmt(s.cos[1])}`, `Gross profit ${fmt(s.gp[0])}, ${fmt(s.gp[1])}, total ${fmt(s.totals.gp)}`, "Four expenses correctly apportioned", `Net profit ${fmt(s.np[0])}, ${fmt(s.np[1])}, total ${fmt(s.totals.np)}`], modelAnswer: s.md, explanation: "Totals add across and down." }),
        P.num({ label: "(f)", marks: 2, kind: "pct", value: m[1], wrong: [r2((s.gp[1] / s.cos[1]) * 100)], stem: "Calculate the gross profit margin of the Toiletries department to one decimal place.", explanation: `${fmt(s.gp[1])} ÷ 45,000 × 100 = ${m[1].toFixed(1)}%. (Food: ${m[0].toFixed(1)}%.)` }),
      ],
      hints: ["Apportion each shared expense in its own ratio; check the shares add to the total."],
      explanation: `Model answer:\n\n${s.md}`,
    });
  }

  // ---------------------------------------------------------------- Practice structured 2 (closure decision)
  {
    const d = {
      name: "Farai's Supermarket", depts: ["Groceries", "Butchery", "Bakery"],
      revenue: [120000, 44000, 16000], openInv: [9900, 1250, 350], purchases: [92400, 30600, 9800], closeInv: [10800, 1400, 450],
      expenses: [
        ["Wages (direct)", [14400, 6300, 4600]],
        ["Rent (floor area 5 : 2 : 1)", apportion(10400, [5, 2, 1])],
        ["Electricity (direct meters)", [2350, 1650, 850]],
        ["Advertising (revenue)", apportion(3150, [120000, 44000, 16000])],
      ],
    };
    const s = departmental(d);
    const bk = 2; // bakery
    const saved = r2(d.expenses[0][1][bk] + d.expenses[2][1][bk] + d.expenses[3][1][bk]);
    const effect = r2(s.gp[bk] - saved);
    b.struct({
      d: 5, examStyle: true, skill: "EVALUATION", calculator: true,
      stem: `Farai owns a supermarket in Kwekwe with three departments. His departmental income statement for the year ended 31 December 2025 is shown below.\n\n${s.md}\n\nFarai is thinking of closing the Bakery. If he does, the bakery's wages, electricity and advertising will no longer be paid, but the rent of the building will stay the same.`,
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "pct", value: (s.gp[bk] / d.revenue[bk]) * 100, stem: "Calculate the gross profit margin of the Bakery to one decimal place.", explanation: `${fmt(s.gp[bk])} ÷ 16,000 × 100 = ${((s.gp[bk] / d.revenue[bk]) * 100).toFixed(1)}%.` }),
        P.num({ label: "(b)", marks: 2, kind: "money", value: saved, wrong: [s.te[bk]], stem: "Calculate the expenses that would be saved if the Bakery closed.", explanation: `Wages ${fmt(d.expenses[0][1][bk])} + electricity ${fmt(d.expenses[2][1][bk])} + advertising ${fmt(d.expenses[3][1][bk])} = ${fmt(saved)}. The rent of ${fmt(d.expenses[1][1][bk])} is not saved.` }),
        P.num({ label: "(c)", marks: 2, kind: "money", value: r2(s.totals.np - effect), wrong: [r2(s.totals.np - s.np[bk])], stem: "Calculate the total net profit of the supermarket if the Bakery closed (no other changes).", explanation: `Gross profit lost ${fmt(s.gp[bk])} − costs saved ${fmt(saved)} = ${fmt(effect)}. New profit ${fmt(s.totals.np)} − ${fmt(effect)} = ${fmt(r2(s.totals.np - effect))}.` }),
        P.manual({ label: "(d)", marks: 4, stem: "Advise Farai whether to close the Bakery. Give reasons, and suggest **one** other action he could take.", points: ["Do not close (or a reasoned conclusion consistent with the figures)", `The Bakery contributes ${fmt(effect)} towards the shared rent / total profit would fall`, "Bakery products may attract customers who also buy groceries and meat", "Other action, e.g. raise bakery prices / cut its wages / reduce its floor space / sell other lines in part of the space"], modelAnswer: `Farai should keep the Bakery. Its loss is only after a share of rent that will be paid anyway; its gross profit covers its own wages, electricity and advertising and contributes ${fmt(effect)} towards the rent, so closing it would reduce total profit to ${fmt(r2(s.totals.np - effect))}. Fresh bread also brings customers into the shop. He could improve the bakery's margin by raising prices or reducing waste, or give part of its space to a busier department.`, explanation: "Use the figures from (b) and (c)." }),
      ],
      hints: ["Rent is a shared cost that continues after closure.", "Effect on profit = gross profit lost − costs saved."],
      explanation: "Closing a department loses its gross profit but saves only its avoidable costs.",
    });
  }

  // ---------------------------------------------------------------- Cards
  b.card("DEFINITION", "What are **departmental accounts**?", "Income statements in columns, one per department plus a total, showing each department's gross and net profit.");
  b.card("DEFINITION", "Apportionment", "Sharing an expense that benefits several departments between them on a fair basis.");
  b.card("FACT", "Basis for rent, rates, lighting, building insurance", "Floor area.");
  b.card("FACT", "Basis for shared wages; for advertising and carriage outwards", "Wages: number of staff (or time). Advertising, carriage outwards, discount allowed: revenue.");
  b.card("FACT", "Direct (departmental) expense", "Belongs to one department only; charged to it in full, not apportioned.");
  b.card("FORMULA", "Apportioning by ratio", "Department's share = total expense × department's part ÷ sum of the parts.");
  b.card("CONCEPT", "Should a loss-making department close?", "Only if the gross profit lost is less than the costs actually saved; shared fixed costs continue.");
  b.card("FACT", "Departmental statement of financial position?", "No: one statement of financial position for the whole business; closing inventories are added together.");
});
