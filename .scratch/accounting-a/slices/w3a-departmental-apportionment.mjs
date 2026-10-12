// W3a: departmental.apportionment (ZIMSEC only: tagged automatically)
import { concept, P, table, sum, r2, fmt, money, chk } from "../lib.mjs";
import { mc } from "../tables/w3a-lib.mjs";

const share = (total, part, whole) => r2((total * part) / whole);

concept("aacc.departmental.apportionment", { file: "departmental/apportionment", keyPrefix: "departmental.apportionment" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Which basis is most suitable for apportioning the rent of a shop among its departments?",
    ok: ["Floor area used by each department", "Correct: the rent pays for space."],
    bad: [["Number of customers who enter the shop", "Customers do not determine the rent."], ["Sales of each department in the year", "Sales do not show how much space is used."], ["Purchases made by each department", "Purchases are not linked to the space occupied."]],
    explanation: "Rent buys space, so the fair basis is the floor area of each department.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which basis is most suitable for apportioning general staff wages that serve all departments?",
    ok: ["The number of staff in each department", "Correct: more staff in a department means more staff costs."],
    bad: [["The floor area of each department", "Space has no link to the number of staff."], ["The value of assets used in each department", "Assets do not determine staff costs."], ["Equal shares for every department", "Departments with more staff would be undercharged."]],
    explanation: "General staff wages are best shared by the number of staff in each department, as that reflects who uses staff services.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING",
    stem: "Commission received by a business as a whole from a supplier is:",
    ok: ["ancillary income, shared among the departments", "Correct: it is not earned by one department alone."],
    bad: [["a departmental expense", "It is income, not an expense."], ["added to the department with the highest sales only", "It is shared on a suitable basis."], ["ignored in departmental accounts", "It increases total profit, so it must be shown."]],
    explanation: "Income that is not earned by one department alone is shared on a suitable basis, usually sales.",
  });
  const rent = 18000, fa = [150, 100, 50];
  const sB = share(rent, fa[1], 300);
  chk(sB, 6000);
  mc(b, {
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `Rent of ${money(rent)} is apportioned on floor area. Department A occupies 150 m², B occupies 100 m² and C occupies 50 m². How much rent is charged to department B?`,
    ok: [money(sB), "Correct: 18,000 × 100 ÷ 300."],
    bad: [[money(share(rent, fa[0], 300)), "That is the share of department A."], [money(share(rent, fa[2], 300)), "That is the share of department C."], [money(share(rent, 100, 150)), "The total floor area has been taken as 150 m² instead of 300 m²."]],
    hints: ["Total floor area = 300 m²."],
    explanation: "B's share = 100 ÷ 300 × 18,000 = 6,000.",
  });
  const staff = [4, 3, 1], wages = 15200;
  const wA = share(wages, staff[0], 8);
  chk(wA, 7600);
  mc(b, {
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `General wages of ${money(wages)} are apportioned by the number of staff: department A has 4 staff, B has 3 and C has 1. What is charged to department A?`,
    ok: [money(wA), "Correct: 15,200 × 4 ÷ 8."],
    bad: [[money(r2(wages / 3)), "The wages have been shared equally among three departments."], [money(share(wages, staff[1], 8)), "That is the share of department B."], [money(share(wages, staff[0], 3)), "The total number of staff is 8, not 3."]],
    hints: ["Total staff = 4 + 3 + 1."],
    explanation: "A's share = 4 ÷ 8 × 15,200 = 7,600.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "A business changes the basis on which rent is apportioned from sales to floor area. What is the effect on the total profit of the business?",
    ok: ["No effect; only the split between departments changes", "Correct: the same total rent is charged."],
    bad: [["Total profit increases", "The total rent is unchanged."], ["Total profit decreases", "The total rent is unchanged."], ["Total profit is shown only in the largest department's column", "Total profit is the sum of the departmental profits."]],
    hints: ["Does the total rent change?"],
    explanation: "Apportionment only divides a fixed total, so the total profit is the same.",
  });
  const gp = 9000, sh2 = 0.3;
  mc(b, {
    d: 4, skill: "ANALYSIS",
    stem: "Department X has 2 of the 8 employees and makes 30% of the total sales. General staff wages are US\\$24,000 and advertising is US\\$10,000, apportioned on staff numbers and on sales respectively. What is the total charge to X for these two expenses?",
    ok: [money(9000), "Correct: 6,000 (2 ÷ 8 of 24,000) + 3,000 (30% of 10,000)."],
    bad: [[money(r2(24000 * 0.3 + 10000 * 0.25)), "The bases have been swapped."], [money(r2(34000 * 0.25)), "A single ratio has been used for both expenses."], [money(r2(34000 * 0.3)), "The sales ratio has been used for both expenses."]],
    hints: ["Use the staff ratio for wages and the sales ratio for advertising."],
    explanation: "Wages: 24,000 × 2 ÷ 8 = 6,000; advertising: 10,000 × 30% = 3,000; total 9,000.",
  });
  void gp; void sh2;
  mc(b, {
    d: 4, skill: "ANALYSIS",
    stem: "Which of these expenses should NOT be apportioned among departments?",
    ok: ["The wages of staff who work only in one department", "Correct: it is allocated directly to that department."],
    bad: [["Rent of the whole shop building and yard", "It is a common expense and is apportioned."], ["Insurance of the whole stock held in the whole shop building", "It is a common expense and is apportioned."], ["Bank charges of the business as a whole", "It is a common expense and is apportioned."]],
    hints: ["Which expense belongs clearly to one department?"],
    explanation: "An expense that clearly belongs to one department is allocated to it directly; common expenses are apportioned.",
  });

  b.tf({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "Changing the basis of apportionment changes the total profit of the business.", answer: false, explanation: "False. The total profit is the same; only the share allocated to each department changes." });
  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "Departmental accounts are part of the Cambridge 9706 syllabus.", answer: false, explanation: "False. Departmental accounts are examined by ZIMSEC only." });

  b.match({
    d: 2, skill: "APPLICATION",
    stem: "Match each expense to the most suitable basis of apportionment.",
    pairs: ["Rent of the shop", "General staff wages", "Insurance of the equipment", "Advertising of the whole shop"],
    right: ["Floor area", "Number of employees", "Value of assets", "Sales"],
    rightIndex: [0, 1, 2, 3],
    explanation: "Each basis follows the way the expense is caused or the benefit received.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the sentences.",
    template: "An expense charged wholly to one department is {{blank:a}}. A common expense shared among departments is {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["allocated"], choices: ["allocated", "apportioned"] },
      { id: "b", accepted: ["apportioned"], choices: ["allocated", "apportioned"] },
    ],
    explanation: "Allocation charges a cost directly; apportionment shares a common cost.",
  });
  b.short({
    d: 1, skill: "RECALL",
    stem: "Name the type of income, such as commission received, that is earned by the whole business and shared among the departments.",
    accepted: ["ancillary income", "ancillary", "common income"],
    explanation: "Income not earned by one department alone is called ancillary income.",
  });

  // numerical
  const light = 7800, fl = [210, 130, 60];
  const lC = share(light, fl[2], 400);
  chk(lC, 1170);
  b.num({
    d: 2, skill: "APPLICATION", kind: "money", value: lC, daily: true, calculator: true, wrong: [share(light, fl[0], 400), r2(light / 3)],
    stem: `Lighting costs of ${money(light)} are apportioned on floor area. The floor areas are 210 m² (clothing), 130 m² (shoes) and 60 m² (toys). Calculate the lighting cost charged to toys.`,
    explanation: "Total area = 400 m². Toys: 60 ÷ 400 × 7,800 = 1,170.",
  });
  const adv = 4860, sales = [38000, 52000, 30000];
  const aShoes = share(adv, sales[1], 120000);
  chk(aShoes, 2106);
  b.num({
    d: 3, skill: "APPLICATION", kind: "money", value: aShoes, calculator: true, wrong: [share(adv, sales[0], 120000), r2(adv / 3)],
    stem: `Advertising of ${money(adv)} is apportioned on sales. Sales were US\\$38,000 (clothing), US\\$52,000 (shoes) and US\\$30,000 (toys). Calculate the advertising charged to shoes.`,
    hints: ["Total sales first."],
    explanation: "Total sales = 120,000. Shoes: 52,000 ÷ 120,000 × 4,860 = 2,106.",
  });
  const comm = 3900, cs = [1.5, 1];
  const commA = share(comm, 60000, 130000);
  b.num({
    d: 3, skill: "APPLICATION", kind: "money", value: commA, calculator: true, wrong: [share(comm, 70000, 130000), r2(comm / 2)],
    stem: `Commission received of ${money(comm)} is shared on sales. Department A had sales of US\\$60,000 and department B had sales of US\\$70,000. Calculate the commission credited to department A.`,
    hints: ["Share = 60,000 ÷ 130,000 of the commission."],
    explanation: "60,000 ÷ 130,000 × 3,900 = 1,800. Department B receives 2,100.",
  });
  void cs;

  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 2,
    stem: "Distinguish between allocation and apportionment of expenses.",
    points: ["Allocation charges an expense wholly to the department that incurred it", "Apportionment shares a common expense among departments on a suitable basis"],
    modelAnswer: "Allocation charges an expense wholly to one department. Apportionment shares a common expense among departments using a basis such as floor area.",
    explanation: "One mark for each term.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why floor area is a better basis than sales for apportioning rent.",
    points: ["Rent is paid for the use of space", "A department that occupies more space benefits more and should bear more of the cost", "A sales basis could undercharge a large department with low sales and overcharge a small one with high sales"],
    modelAnswer: "Rent pays for space, so a department using more space should carry more of it. Sales does not reflect space and could undercharge a large, slow department.",
    hints: ["What does the rent buy?"],
    explanation: "One mark for each point.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "State three limitations of apportioning common expenses among departments.",
    points: ["Any basis is a judgement and may not reflect the actual use", "Different bases give different departmental profits, so the results can be manipulated", "Some common costs, such as the owner's salary, cannot be linked to departments reliably"],
    modelAnswer: "Any basis is a judgement. Different bases give different departmental profits. Some costs cannot be linked reliably to departments.",
    hints: ["Think about how arbitrary a basis can be."],
    explanation: "One mark for each limitation.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "A manager says department C makes a loss only because it is charged rent on floor area, and wants the rent shared on sales instead. Evaluate the suggestion.",
    points: ["Department C uses a large floor area, so floor area measures its use of the space", "Changing to sales would shift rent to other departments and make C look better but would not change the total profit", "The change would hide the cost of the space that C uses and could lead to wrong decisions about it", "Judgement: keep floor area for rent; consider whether C could use less space or earn more per square metre"],
    modelAnswer: "Floor area reflects the space C uses. A sales basis would make C look better by moving rent to other departments, but the total profit would not change. The manager should keep the floor-area basis and consider using less space or earning more per square metre.",
    hints: ["Does the change affect total profit?"],
    explanation: "One mark each for the logic of floor area, the effect of the change, the risk of a wrong decision and a judgement.",
  });

  // Structured 1 (10 marks)
  const A = { rent: 14400, light: 2800, wages: 12600, adv: 4500, dep: 5400, area: [180, 60], staff: [4, 3], sales: [63000, 27000], assets: [30000, 15000] };
  const rA = [share(A.rent, A.area[0], 240), share(A.rent, A.area[1], 240)];
  const lA = [share(A.light, A.area[0], 240), share(A.light, A.area[1], 240)];
  const wA2 = [share(A.wages, A.staff[0], 7), share(A.wages, A.staff[1], 7)];
  const adA = [share(A.adv, A.sales[0], 90000), share(A.adv, A.sales[1], 90000)];
  const dpA = [share(A.dep, A.assets[0], 45000), share(A.dep, A.assets[1], 45000)];
  const totA = [0, 1].map((i) => r2(rA[i] + lA[i] + wA2[i] + adA[i] + dpA[i]));
  chk(sum(totA), r2(A.rent + A.light + A.wages + A.adv + A.dep));
  b.struct({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `Shamva Hardware and Paints has two departments, hardware and paints. The common expenses for the year are shown below with the bases of apportionment.\n\n${table(["Expense", "US$", "Basis", "Hardware", "Paints"], [["Rent", A.rent, "Floor area (m²)", String(A.area[0]), String(A.area[1])], ["Lighting", A.light, "Floor area (m²)", String(A.area[0]), String(A.area[1])], ["General wages", A.wages, "Staff", String(A.staff[0]), String(A.staff[1])], ["Advertising", A.adv, "Sales (US$)", fmt(A.sales[0]), fmt(A.sales[1])], ["Depreciation", A.dep, "Asset values (US$)", fmt(A.assets[0]), fmt(A.assets[1])]], ["l", "r", "l", "r", "r"]).split("US$").join("US\\$")}`,
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "money", value: rA[1], wrong: [rA[0], r2(A.rent / 2)], stem: "Calculate the rent charged to paints.", explanation: `${fmt(A.rent)} × ${A.area[1]} ÷ 240 = ${fmt(rA[1])}.` }),
      P.num({ label: "(b)", marks: 2, kind: "money", value: wA2[0], wrong: [wA2[1], r2(A.wages / 2)], stem: "Calculate the general wages charged to hardware.", explanation: `${fmt(A.wages)} × 4 ÷ 7 = ${fmt(wA2[0])}.` }),
      P.num({ label: "(c)", marks: 2, kind: "money", value: dpA[1], wrong: [dpA[0], r2(A.dep / 2)], stem: "Calculate the depreciation charged to paints.", explanation: `${fmt(A.dep)} × 15,000 ÷ 45,000 = ${fmt(dpA[1])}.` }),
      P.num({ label: "(d)", marks: 3, kind: "money", value: totA[0], wrong: [totA[1], r2(totA[0] - dpA[0])], stem: "Calculate the total of the common expenses charged to hardware.", explanation: `Rent ${fmt(rA[0])} + lighting ${fmt(lA[0])} + wages ${fmt(wA2[0])} + advertising ${fmt(adA[0])} + depreciation ${fmt(dpA[0])} = ${fmt(totA[0])}.` }),
      P.manual({ label: "(e)", marks: 1, stem: "State one reason for using asset values to apportion depreciation.", points: ["Depreciation arises on the assets, so departments holding more assets should bear more of the charge"], modelAnswer: "Depreciation is caused by the assets, so the department with more assets should bear more.", explanation: "One mark for the link between depreciation and the assets." }),
    ],
    hints: ["Find the total of each basis first.", "Add the five shares for hardware."],
    explanation: "This item tests the apportionment of five common expenses between two departments.",
  });

  // Structured 2 (14 marks)
  const B = { gp: [41500, 28300, 19200], wagesD: [6200, 5400, 4100], rent: 15600, area: [130, 80, 50], gen: 17400, staff: [5, 4, 3], adv: 6480, sales: [102000, 66000, 48000], comm: 2160 };
  const rentB = B.area.map((a) => share(B.rent, a, 260));
  const genB = B.staff.map((s) => share(B.gen, s, 12));
  const advB = B.sales.map((s) => share(B.adv, s, 216000));
  const commB = B.sales.map((s) => share(B.comm, s, 216000));
  const netB = [0, 1, 2].map((i) => r2(B.gp[i] + commB[i] - B.wagesD[i] - rentB[i] - genB[i] - advB[i]));
  const totB0 = r2(rentB[0] + genB[0] + advB[0]);
  chk(rentB[2], 3000); chk(genB[1], 5800);
  const netTot = sum(netB);
  b.struct({
    d: 5, skill: "EVALUATION", calculator: true,
    stem: `Gweru Gifts and Books has three departments. The gross profit of each department is: gifts US\\$${fmt(B.gp[0])}, crafts US\\$${fmt(B.gp[1])} and books US\\$${fmt(B.gp[2])}. The expenses for the year are:\n\n${table(["Item", "US$", "Basis"], [["Departmental wages (gifts / crafts / books)", fmt(B.wagesD[0]) + " / " + fmt(B.wagesD[1]) + " / " + fmt(B.wagesD[2]), "Allocated directly"], ["Rent", B.rent, "Floor area: 130 / 80 / 50 m²"], ["General staff wages", B.gen, "Staff: 5 / 4 / 3"], ["Advertising", B.adv, "Sales: US\\$102,000 / 66,000 / 48,000"], ["Commission received (income)", B.comm, "Sales"]], ["l", "r", "l"]).split("US$").join("US\\$")}`,
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "money", value: rentB[2], wrong: [rentB[0], r2(B.rent / 3)], stem: "Calculate the rent charged to books.", explanation: `${fmt(B.rent)} × 50 ÷ 260 = ${fmt(rentB[2])}.` }),
      P.num({ label: "(b)", marks: 2, kind: "money", value: genB[1], wrong: [genB[0], r2(B.gen / 3)], stem: "Calculate the general staff wages charged to crafts.", explanation: `${fmt(B.gen)} × 4 ÷ 12 = ${fmt(genB[1])}.` }),
      P.num({ label: "(c)", marks: 3, kind: "money", value: totB0, wrong: [r2(totB0 + B.wagesD[0]), rentB[0]], stem: "Calculate the total of rent, general staff wages and advertising charged to gifts.", explanation: `Rent ${fmt(rentB[0])} + general wages ${fmt(genB[0])} + advertising ${fmt(advB[0])} = ${fmt(totB0)}.` }),
      P.num({ label: "(d)", marks: 3, kind: "money", value: netB[2], wrong: [r2(netB[2] - commB[2]), B.gp[2]], stem: "Calculate the net profit or loss of books. Enter a loss as a negative number.", explanation: `Gross profit ${fmt(B.gp[2])} + commission ${fmt(commB[2])} - wages ${fmt(B.wagesD[2])} - rent ${fmt(rentB[2])} - general wages ${fmt(genB[2])} - advertising ${fmt(advB[2])} = ${fmt(netB[2])}.` }),
      P.manual({ label: "(e)", marks: 4, stem: "Books shows a lower net profit than the other departments. Evaluate whether this proves that the books department should be closed.", points: [`Books has a net result of ${fmt(netB[2])} (compared with ${fmt(netB[0])} for gifts), so on these figures it contributes least`, "The common costs charged to books (rent, general wages, advertising) would remain if it closed, so total profit could fall even more", "The result depends on the bases chosen: a different basis could change books' result", "Judgement: do not close on this evidence alone; compare books' gross profit with the direct costs it causes, and consider customers it attracts to other departments"], modelAnswer: `Books has a net result of ${fmt(netB[2])}, less than the other departments. But most of the common costs charged to it would continue if it closed, and the bases are judgements. The directors should look at its contribution after direct costs, and at the customers it brings in, before deciding.`, explanation: "One mark each for the comparison with figures, the common costs, the effect of the basis and a judgement." }),
    ],
    hints: ["Compute each department's share of each basis.", "Commission is shared on sales."],
    explanation: "This item tests apportionment and the analysis of departmental results.",
  });
  void netTot;

  b.card("DEFINITION", "What is **apportionment**?", "Sharing a common expense or income among departments on a basis that reflects the benefit each receives.");
  b.card("DEFINITION", "What is **allocation**?", "Charging an expense wholly to the department that incurred it.");
  b.card("FACT", "Basis for rent, rates and lighting", "Floor area (or volume) of each department.");
  b.card("FACT", "Basis for general staff wages", "The number of employees in each department.");
  b.card("FACT", "Basis for depreciation and insurance of assets", "The value of assets used by each department.");
  b.card("FACT", "Basis for advertising and commission received", "Sales of each department (or another measure of activity).");
  b.card("FORMULA", "A department's share", "Total expense × department's part of the basis ÷ total of the basis.");
  b.card("DEFINITION", "What is **ancillary income**?", "Income of the whole business, such as commission or rent received, shared among departments like a common expense.");
  b.card("CONCEPT", "Effect of the basis on profit", "A different basis changes departmental profits but not the total profit of the business.");
});
