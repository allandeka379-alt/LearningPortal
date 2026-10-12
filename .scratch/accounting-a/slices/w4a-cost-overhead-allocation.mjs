// W4a: cost.overhead-allocation
import { concept, P, table, chk, r2, sum } from "../lib.mjs";
import { mc, F, usd, p1 } from "../tables/w4a-lib.mjs";

concept("aacc.cost.overhead-allocation", { file: "cost/overhead-allocation", keyPrefix: "cost.overhead-allocation" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "What is meant by the allocation of an overhead?",
    ok: ["Charging the whole cost to the cost centre that incurred it", "Correct: the cost belongs wholly to that centre."],
    bad: [["Sharing a cost among several cost centres on a fair basis", "That is apportionment."], ["Sharing service department costs among production departments", "That is reapportionment."], ["Adding overheads to the cost of each unit", "That is absorption."]],
    explanation: "Allocation charges a whole, identifiable cost to one cost centre, for example the salary of the assembly supervisor to the assembly department.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which basis is most suitable for apportioning the rent of a factory building among departments?",
    ok: ["Floor area", "Correct: a department uses rent in proportion to the space it occupies."],
    bad: [["Number of employees", "Employees are a basis for the canteen or personnel costs, not rent."], ["Machine hours", "Machine hours suit power or machine running costs."], ["Value of materials issued", "That is a basis for stores costs."]],
    explanation: "Rent is caused by space, so floor area (or volume) is used.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which basis is most suitable for apportioning the depreciation of machinery?",
    ok: ["Carrying amount of the machinery in each department", "Correct: the larger the machines used, the larger the depreciation."],
    bad: [["Floor area of each department in square metres", "Floor area is unrelated to the value of the machines."], ["Number of employees working in each department", "Employees do not cause depreciation of machines."], ["Direct labour hours worked in each department", "Hours of labour are not the cause of machine depreciation."]],
    explanation: "Depreciation arises from the machines, so the cost or carrying amount of machinery in each department is the best basis.",
  });
  const rent = 18000, areas = [400, 300, 100];
  const sh = (rent * areas[1]) / 800;
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: `Rent of ${usd(rent)} is to be shared on floor area. Department X has ${areas[0]} m², Y has ${areas[1]} m² and Z has ${areas[2]} m². How much is apportioned to Y?`,
    ok: [usd(sh), "Correct: 18,000 × 300/800."],
    bad: [[usd(rent / 3), "This shares the rent equally and ignores the floor areas."], [usd((rent * areas[0]) / 800), "This is the share of X, the largest department."], [usd((rent * 300) / 700), "This uses 700 m² as the total, leaving out department Z."]],
    hints: ["Total floor area is 1,000 m²."],
    explanation: `Y's share = ${F(rent)} × ${areas[1]}/${areas[0] + areas[1] + areas[2]} = ${usd(sh)}.`,
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "After the service department costs have been fully reapportioned, which statement about the overhead analysis sheet is correct?",
    ok: ["The service departments show nil and the production departments carry the whole overhead", "Correct: only production departments absorb overheads into products."],
    bad: [["The service departments keep their own costs for use as an overhead rate", "Service departments make no product to absorb into."], ["The total overhead is lower than before reapportionment", "Reapportionment moves cost between departments; the total does not change."], ["The production departments carry only the allocated costs", "They carry allocated, apportioned and reapportioned costs."]],
    hints: ["Think of reapportionment as moving cost, not removing it."],
    explanation: "Reapportionment moves the service departments' costs to the production departments. The grand total is unchanged.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "Which overhead of a factory with several departments would normally be allocated and not apportioned?",
    ok: ["Pay of the painting department's supervisor", "Correct: the cost belongs wholly to one department."],
    bad: [["Insurance of the whole factory building", "It benefits all departments, so it is apportioned."], ["Heating and lighting of the whole factory", "It is shared, so it is apportioned on floor area."], ["Cost of the factory's security guard at the gate", "The guard serves the whole factory: apportioned."]],
    hints: ["Does the cost belong to one department only?"],
    explanation: "A cost that can be identified wholly with one department is allocated; shared costs are apportioned.",
  });
  mc(b, {
    d: 4, skill: "EVALUATION",
    stem: "A manager apportions the power cost on floor area although most power is used by one heavily mechanised department with a small floor space. What is the likely effect?",
    ok: ["Its overhead is understated and its products look too cheap", "Correct: the department that causes most of the power gets too little of its cost."],
    bad: [["The total overhead of the whole factory will be understated", "The total is the same whatever the basis."], ["Its overhead is overstated because of the small floor space", "The small floor area gives it a small share, so it is understated."], ["The cost of products from other departments will fall", "They absorb more of the cost, so their products look more expensive."]],
    hints: ["Compare the share of floor area with the share of power used."],
    explanation: "The basis decides who carries the cost. Using area gives the high-power department too little, so its products are under-costed and the others over-costed.",
  });
  b.tf({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "The total overhead of a factory changes when service department costs are reapportioned to production departments.", answer: false, explanation: "False. Reapportionment only moves cost between departments; the total stays the same." });
  b.tf({ d: 3, skill: "UNDERSTANDING", stem: "A cost may be apportioned on a different basis from year to year and the resulting product costs may change, even if the total overhead is the same.", answer: true, hints: ["A basis is a convention."], explanation: "True. The basis decides how the total is shared among departments, so it changes product costs." });
  b.match({
    d: 2, skill: "APPLICATION",
    stem: "Match each overhead to the most suitable basis of apportionment.",
    pairs: ["Heating and lighting", "Insurance of machinery", "Canteen costs", "Power for machines"],
    right: ["Floor area", "Carrying amount of machinery", "Number of employees", "Machine hours or metered use"],
    rightIndex: [0, 1, 2, 3],
    explanation: "Space-related costs use floor area; machine-related costs use machinery value; canteen costs use employees; power uses machine hours or meter readings.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the sentences.",
    template: "Sharing the cost of a service department among production departments is called {{blank:a}}. A department that makes no product, such as maintenance, is a {{blank:b}} department.",
    blanks: [{ id: "a", accepted: ["reapportionment"], choices: ["reapportionment", "allocation", "absorption"] }, { id: "b", accepted: ["service"], choices: ["service", "production", "selling"] }],
    explanation: "Reapportionment moves service department costs to production departments; maintenance and the canteen are service departments.",
  });
  b.short({ d: 1, skill: "RECALL", stem: "Name the schedule on which allocated and apportioned overheads are recorded for each department.", accepted: ["overhead analysis sheet", "overhead apportionment table", "overhead analysis", "overhead schedule"], explanation: "It is the overhead analysis sheet." });

  const ins = 7500;
  const nbv = [48000, 32000, 20000];
  const shareMach = r2((ins * 32000) / 100000);
  b.num({
    d: 3, skill: "APPLICATION", kind: "money", value: shareMach, calculator: true, daily: true, wrong: [ins / 3, r2((ins * 32000) / 80000)],
    stem: `Insurance of machinery of ${usd(ins)} is apportioned on the carrying amount of machinery: Department A ${usd(nbv[0])}, Department B ${usd(nbv[1])} and the Stores ${usd(nbv[2])}. Calculate the amount apportioned to Department B.`,
    hints: ["Total carrying amount is 100,000."],
    explanation: `${F(ins)} × ${F(nbv[1])}/${F(sum(nbv))} = ${usd(shareMach)}. Dividing by the production departments only (80,000) would ignore the Stores.`,
  });
  const stores = 13200;
  const toP = r2(stores * 0.55);
  b.num({
    d: 3, skill: "APPLICATION", kind: "money", value: toP, calculator: true, wrong: [r2(stores * 0.45), stores / 2],
    stem: `After allocation and apportionment, the stores department has total overheads of ${usd(stores)}. Its services are used by the Cutting and Finishing departments in the ratio 55% : 45%. Calculate the cost reapportioned to Cutting.`,
    hints: ["Multiply the stores total by the percentage for Cutting."],
    explanation: `${F(stores)} × 55% = ${usd(toP)}. Finishing receives ${usd(r2(stores * 0.45))}.`,
  });
  const cut = 41800, fin = 27300, stor = 13200, tot = cut + fin + stor;
  b.calc({
    d: 4, skill: "APPLICATION", kind: "money", value: cut + toP, calculator: true, wrong: [cut, cut + stores],
    stem: `The total overheads of Cutting are ${usd(cut)} before reapportionment. Using the reapportionment of the stores costs in the previous question, calculate the total overhead of the Cutting department after reapportionment.`,
    hints: ["Add the share of the stores cost."],
    explanation: `${F(cut)} + ${F(toP)} = ${usd(cut + toP)}. Check: Finishing = ${F(fin)} + ${F(r2(stores * 0.45))} = ${F(fin + r2(stores * 0.45))}; together ${F(tot)} equals the original total.`,
  });
  chk(cut + toP + fin + r2(stores * 0.45), tot);

  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 2,
    stem: "Distinguish between allocation and apportionment of overheads.",
    points: ["Allocation charges a whole cost to the one cost centre that caused it", "Apportionment shares a cost that benefits several cost centres among them on a suitable basis"],
    modelAnswer: "Allocation charges a whole cost to one cost centre; apportionment divides a shared cost among several cost centres using a basis such as floor area.",
    explanation: "One mark for each correct definition.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why the cost of the canteen is reapportioned to production departments and not absorbed directly into the cost of products.",
    points: ["The canteen makes no product and so has no output to which cost can be charged", "Its cost is a necessary part of the cost of production because it supports the workers", "Reapportioning to production departments lets the cost be absorbed in their rates"],
    modelAnswer: "The canteen does not make a product. Its cost helps production, so it is shared among the production departments and then absorbed in their overhead rates.",
    hints: ["Which departments make the goods that are sold?"],
    explanation: "One mark for each point.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "A factory apportions rent on floor area and power on floor area. Evaluate whether this is suitable.",
    points: ["Floor area is a suitable basis for rent because space causes the cost", "It is not suitable for power if departments use machines of different size or running time", "Using machine hours or meter readings would better reflect the power used", "A poor basis misstates departmental costs and the cost and price of products"],
    modelAnswer: "Floor area suits rent but not power, which depends on machine use. Machine hours or meters would give a fairer split. A poor basis gives wrong department costs and so wrong product costs and selling prices.",
    hints: ["Ask what causes each cost."],
    explanation: "One mark for each point.",
  });

  // Structured 1 (12 marks): analysis sheet
  const A = { rent: 20000, dep: 15000, pow: 7800, supM: 4200, supF: 3700, stores: 6400 };
  const rentS = r2([400, 300, 100].map((a) => (A.rent * a) / 800)[0]);
  const rentSh = [400, 350, 250].map((a) => r2((A.rent * a) / 1000));
  const depSh = [50, 30, 20].map((a) => r2((A.dep * a) / 100));
  const powSh = [8, 3, 1].map((a) => r2((A.pow * a) / 12));
  const tM = rentSh[0] + depSh[0] + powSh[0] + A.supM;
  const tF = rentSh[1] + depSh[1] + powSh[1] + A.supF;
  const tS = rentSh[2] + depSh[2] + powSh[2] + A.stores;
  chk(tM + tF + tS, A.rent + A.dep + A.pow + A.supM + A.supF + A.stores);
  const toM = r2(tS * 0.6), toF = r2(tS * 0.4);
  b.struct({
    d: 4, skill: "APPLICATION", calculator: true,
    stem: `Bulawayo Plastics Ltd has two production departments, Moulding and Finishing, and a Stores department. Overheads for the year ended 31 December 2025:\n\n${table(["Overhead", "US\\$", "Basis or allocation"], [["Factory rent", A.rent, "Floor area: Moulding 400 m², Finishing 350 m², Stores 250 m²"], ["Depreciation of machinery", A.dep, "Carrying amount: Moulding 50%, Finishing 30%, Stores 20%"], ["Power", A.pow, "Kilowatt hours: 8, 3 and 1 parts"], ["Supervisors' salaries", A.supM + A.supF, "Moulding US\\$4,200; Finishing US\\$3,700"], ["Storekeepers' wages", A.stores, "Stores"]], ["l", "r", "l"])}\n\nThe Stores department is used by Moulding and Finishing in the ratio 60 : 40.`,
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "money", value: rentSh[0], wrong: [A.rent / 3, rentSh[1]], stem: "Calculate the rent apportioned to Moulding.", explanation: `${F(A.rent)} × 400/1000 = ${usd(rentSh[0])}.` }),
      P.num({ label: "(b)", marks: 2, kind: "money", value: powSh[1], wrong: [powSh[0], A.pow / 3], stem: "Calculate the power apportioned to Finishing.", explanation: `${F(A.pow)} × 3/12 = ${usd(powSh[1])}.` }),
      P.num({ label: "(c)", marks: 3, kind: "money", value: tS, wrong: [A.stores, tS - powSh[2]], stem: "Calculate the total overhead of the Stores department before reapportionment.", explanation: `Rent ${F(rentSh[2])} + depreciation ${F(depSh[2])} + power ${F(powSh[2])} + wages ${F(A.stores)} = ${usd(tS)}.` }),
      P.num({ label: "(d)", marks: 3, kind: "money", value: tM + toM, wrong: [tM, tM + tS], stem: "Calculate the total overhead of the Moulding department after reapportioning the Stores department.", explanation: `Moulding: ${F(rentSh[0])} + ${F(depSh[0])} + ${F(powSh[0])} + ${F(A.supM)} = ${F(tM)}; plus 60% of ${F(tS)} = ${F(toM)}; total ${usd(tM + toM)}.` }),
      P.mcq({ label: "(e)", marks: 2, stem: "What is the total overhead of Finishing after reapportionment, and what is the grand total of the two production departments?", options: [[`Finishing ${usd(tF + toF)}; grand total ${usd(tM + toM + tF + toF)}`, "Correct: the grand total equals all the overheads."], [`Finishing ${usd(tF)}; grand total ${usd(tM + tF)}`, "This ignores the reapportionment of Stores."], [`Finishing ${usd(tF + tS)}; grand total ${usd(tM + toM + tF + tS)}`, "This charges all of the stores cost to Finishing."], [`Finishing ${usd(tF + toF)}; grand total ${usd(tM + tF + toF)}`, "This leaves out Moulding's share of the stores cost."]], answer: "A", explanation: `Finishing ${F(tF)} + ${F(toF)} = ${F(tF + toF)}. The total equals ${F(A.rent + A.dep + A.pow + A.supM + A.supF + A.stores)}.` }),
    ],
    hints: ["Total floor area is 1,000 m².", "Check that the department totals equal the total of all overheads."],
    explanation: "This item tests apportionment, allocation and the reapportionment of a service department.",
  });

  // Structured 2 (14 marks): step-down with canteen and maintenance
  const mil = 32400, pac = 19600, mai = 9600, can = 6000;
  const cs = [8, 6, 6].map((e) => r2((can * e) / 20));
  const maiTot = r2(mai + cs[2]);
  const ms = [60, 40].map((e) => r2((maiTot * e) / 100));
  const finMil = mil + cs[0] + ms[0], finPac = pac + cs[1] + ms[1];
  chk(finMil + finPac, mil + pac + mai + can);
  b.struct({
    d: 5, skill: "ANALYSIS", calculator: true,
    stem: `Mutare Milling Ltd has production departments Milling and Packing and service departments Maintenance and Canteen. After allocation and apportionment, the overheads for 2025 are:\n\n${table(["Department", "US\\$"], [["Milling", mil], ["Packing", pac], ["Maintenance", mai], ["Canteen", can]])}\n\nThe canteen is used by Milling, Packing and Maintenance employees in the ratio 8 : 6 : 6. Maintenance serves only the production departments, in the ratio 60 : 40. The canteen is reapportioned first.`,
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "money", value: cs[2], wrong: [can / 3, cs[0]], stem: "Calculate the canteen cost reapportioned to Maintenance.", explanation: `${F(can)} × 6/20 = ${usd(cs[2])}.` }),
      P.num({ label: "(b)", marks: 2, kind: "money", value: maiTot, wrong: [mai, mai + can], stem: "Calculate the total of the Maintenance department to be reapportioned.", explanation: `${F(mai)} + ${F(cs[2])} = ${usd(maiTot)}.` }),
      P.group({ label: "(c)", stem: "Calculate the final total overhead of:", parts: [
        P.num({ label: "(i)", marks: 3, kind: "money", value: finMil, wrong: [mil + cs[0], mil + ms[0]], stem: "Milling", explanation: `${F(mil)} + canteen ${F(cs[0])} + maintenance ${F(ms[0])} = ${usd(finMil)}.` }),
        P.num({ label: "(ii)", marks: 3, kind: "money", value: finPac, wrong: [pac + cs[1], pac + ms[1]], stem: "Packing", explanation: `${F(pac)} + canteen ${F(cs[1])} + maintenance ${F(ms[1])} = ${usd(finPac)}.` }),
      ] }),
      P.manual({ label: "(d)", marks: 4, stem: "Explain why the canteen was reapportioned before Maintenance and state the check that proves both reapportionments are complete.", points: ["The canteen serves Maintenance, so its cost must be added to Maintenance before Maintenance is shared out", "Maintenance does not serve the canteen, so no cost is returned to the canteen", `Check: the final totals of the two production departments (${F(finMil)} + ${F(finPac)}) equal the original total of ${F(mil + pac + mai + can)}`, "The service departments show nil after reapportionment"], modelAnswer: `The canteen serves Maintenance, so its cost is added to Maintenance first and then Maintenance is cleared in full. The total of Milling and Packing ${F(finMil + finPac)} equals the original total ${F(mil + pac + mai + can)}, and both service departments are nil.`, explanation: "One mark for each point." }),
    ],
    hints: ["Maintenance receives part of the canteen cost.", "The grand total does not change."],
    explanation: "This item uses a step-down reapportionment with a service department serving another.",
  });

  b.card("DEFINITION", "Allocation of overheads", "Charging a whole cost to the cost centre that caused it.");
  b.card("DEFINITION", "Apportionment of overheads", "Sharing a cost that benefits several cost centres among them on a fair basis, such as floor area.");
  b.card("DEFINITION", "Reapportionment", "Sharing the costs of service departments among production departments (ZIMSEC: allotment).");
  b.card("FACT", "Bases of apportionment", "Floor area: rent, heating. Carrying amount of machinery: depreciation, insurance. Employees: canteen. Machine hours or meters: power.");
  b.card("CONCEPT", "Production against service department", "A production department works on the product; a service department supports production and makes no product.");
  b.card("CONCEPT", "Overhead analysis sheet", "A table with a row for each overhead and a column for each department, showing allocated, apportioned and reapportioned costs.");
  b.card("CONCEPT", "Order of reapportionment", "Reapportion first the service department that serves other service departments. Do not send cost back to a cleared department.");
  b.card("CONCEPT", "Check after reapportionment", "Service departments show nil and the production totals equal the total of all overheads.");
  b.card("CONCEPT", "Why the basis matters", "A different basis moves overhead between departments and changes the cost and selling price of products, although the total is unchanged.");
});
void p1;
