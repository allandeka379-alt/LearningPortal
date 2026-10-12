// W4a: cost.overhead-absorption
import { concept, P, table, chk, r2, costing } from "../lib.mjs";
import { mc, F, usd, p1 } from "../tables/w4a-lib.mjs";

concept("aacc.cost.overhead-absorption", { file: "cost/overhead-absorption", keyPrefix: "cost.overhead-absorption" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "How is a pre-determined overhead absorption rate calculated?",
    ok: ["Budgeted overhead ÷ budgeted activity", "Correct: both figures are forecasts made before the period."],
    bad: [["Actual overhead ÷ actual activity", "That uses figures known only after the period ends."], ["Budgeted overhead ÷ actual activity", "A rate mixes forecast and actual figures here."], ["Actual overhead ÷ budgeted activity", "It mixes actual cost with a forecast of activity."]],
    explanation: "The rate is fixed in advance from the budgeted overhead and the budgeted activity so that jobs can be costed and priced during the period.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which absorption base is most suitable for a highly mechanised bottling department with few workers?",
    ok: ["Machine hours", "Correct: the overhead is caused by the use of machines."],
    bad: [["Direct labour hours", "Few workers means labour hours say little about the overhead."], ["Direct labour cost", "Labour cost is low and not linked to the machine overheads."], ["Prime cost", "Material cost would distort the share of overhead."]],
    explanation: "The base should reflect what causes the overhead. In a machine-intensive department that is machine hours.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why do businesses use budgeted rather than actual overhead to cost jobs?",
    ok: ["Actual overhead is known only after the period ends", "Correct: prices are needed now, and a pre-determined rate allows quotations and steady costs."],
    bad: [["Budgeted overhead is always exactly equal to actual overhead", "The two usually differ, which gives over- or under-absorption."], ["Actual overhead is never recorded in the ledger accounts", "Actual overhead is recorded; it is simply known later."], ["The law requires a budgeted rate to be used in all cases", "No law requires it."]],
    explanation: "Jobs must be priced before the year ends. A pre-determined rate also avoids seasonal changes in the cost of a job.",
  });
  const oh1 = 36000, dlh = 9000, mh = 12000;
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: `A department budgets overheads of ${usd(oh1)}, ${F(dlh)} direct labour hours and ${F(mh)} machine hours. Overheads are absorbed on direct labour hours. What is the absorption rate?`,
    ok: [`${usd(oh1 / dlh)} per direct labour hour`, "Correct: 36,000 ÷ 9,000."],
    bad: [[`${usd(oh1 / mh)} per direct labour hour`, "This divides by the machine hours, not the labour hours."], [`${usd(oh1 / (dlh + mh))} per direct labour hour`, "This adds two different bases together."], [`${usd(oh1 / dlh / 2)} per direct labour hour`, "This halves the correct rate for no reason."]],
    hints: ["Use the budgeted activity that matches the base."],
    explanation: `The base is direct labour hours, so the rate is ${F(oh1)} ÷ ${F(dlh)} = ${usd(oh1 / dlh)} per direct labour hour.`,
  });
  const oh2 = 33600, dlc = 48000;
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: `A workshop budgets overheads of ${usd(oh2)} and direct labour cost of ${usd(dlc)}. A job has direct labour cost of ${usd(900)}. How much overhead is absorbed by the job if overheads are absorbed as a percentage of direct labour cost?`,
    ok: [usd((oh2 / dlc) * 900), "Correct: 70% of 900."],
    bad: [[usd(900 / 0.7), "This divides the labour cost by the rate instead of multiplying."], [usd(oh2 / 900), "This divides the overhead by the labour cost of the job."], [usd(900 + (oh2 / dlc) * 900), "This adds the overhead to the labour cost; the question asks for the overhead alone."]],
    hints: ["Rate = budgeted overhead ÷ budgeted direct labour cost."],
    explanation: `Rate = ${F(oh2)} ÷ ${F(dlc)} = 70%. Overhead absorbed = 70% × ${F(900)} = ${usd((oh2 / dlc) * 900)}.`,
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "A factory makes one standard product, a 2-litre bottle of cooking oil. Which absorption base is simplest and suitable?",
    ok: ["A rate per unit produced", "Correct: every unit receives the same share."],
    bad: [["A percentage of prime cost", "Needs cost data that is not necessary for identical units."], ["A rate per machine hour for each department", "Possible, but more complex than needed for one product."], ["A rate per square metre of floor area", "Floor area is an apportionment basis, not an absorption base."]],
    hints: ["Identical units use identical resources."],
    explanation: "With one standard product a rate per unit is simplest and accurate.",
  });
  mc(b, {
    d: 4, skill: "ANALYSIS",
    stem: "A factory changes its absorption base from direct labour hours to machine hours. Job X uses many machine hours and few labour hours. What happens to the overhead and cost of Job X?",
    ok: ["More overhead is absorbed, so the cost of X rises", "Correct: the job takes a larger share of the overhead under the new base."],
    bad: [["Less overhead is absorbed, so the cost of X falls", "A machine-intensive job carries more overhead under machine hours."], ["The overhead is unchanged because the factory total is fixed", "The total is fixed but its distribution among jobs changes."], ["Overhead is absorbed twice, so the cost of X doubles", "Only one base is used."]],
    hints: ["Which job uses the factory's machines most?"],
    explanation: "The total overhead is unchanged but the share carried by each job depends on the base. A machine-intensive job carries more when machine hours are used.",
  });
  b.tf({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "A departmental absorption rate is generally more accurate than a single rate for the whole factory when departments use labour and machines differently.", answer: true, explanation: "True. Departmental rates reflect the different cost of overhead and activity of each department." });
  b.tf({ d: 3, skill: "UNDERSTANDING", stem: "A business can choose an absorption base that makes the total overhead of the factory larger or smaller.", answer: false, hints: ["Is the total changed or only its distribution?"], explanation: "False. The base changes how a given total is shared among jobs, not the total itself." });
  b.match({
    d: 2, skill: "APPLICATION",
    stem: "Match each absorption base to the department for which it is most suitable.",
    pairs: ["Machine hours", "Direct labour hours", "Units produced", "Percentage of direct labour cost"],
    right: ["A department of automatic bottling machines", "A hand-finishing department with workers on different shifts", "A business making one identical product", "A tailoring department where wage rates are the same for all workers"],
    rightIndex: [0, 1, 2, 3],
    explanation: "The base should follow the cause of overhead: machines, hours of labour, units of an identical product, or labour cost where wage rates are similar.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the sentence.",
    template: "A pre-determined absorption rate is calculated from {{blank:a}} overhead and {{blank:b}} activity.",
    blanks: [{ id: "a", accepted: ["budgeted"], choices: ["budgeted", "actual", "marginal"] }, { id: "b", accepted: ["budgeted"], choices: ["budgeted", "actual", "variable"] }],
    explanation: "Both figures are forecasts, so the rate can be set before the period begins.",
  });
  b.short({ d: 1, skill: "RECALL", stem: "State the total of direct materials, direct labour and direct expenses.", accepted: ["prime cost"], explanation: "It is the prime cost." });

  const oh3 = 63000, mh3 = 10500;
  const rate3 = costing.oar(oh3, mh3);
  b.num({
    d: 3, skill: "APPLICATION", kind: "money", value: rate3, calculator: true, daily: true, wrong: [oh3 / 14000, oh3 / (mh3 + 14000)],
    stem: `A Gweru plastics factory budgets production overheads of ${usd(oh3)} for the year, ${F(mh3)} machine hours and ${F(14000)} direct labour hours. Overheads are absorbed on machine hours. Calculate the absorption rate per machine hour.`,
    hints: ["Divide by the hours that match the base."],
    explanation: `${F(oh3)} ÷ ${F(mh3)} = ${usd(rate3)} per machine hour. Dividing by the direct labour hours gives ${usd(oh3 / 14000)}, which is the rate for a different base.`,
  });
  const oh4 = 54000, dlc4 = 72000;
  b.num({
    d: 3, skill: "APPLICATION", kind: "pct", value: (oh4 / dlc4) * 100, dp: 1, calculator: true, wrong: [(dlc4 / oh4) * 100, (oh4 / (dlc4 + oh4)) * 100],
    stem: `A Masvingo clothing factory budgets overheads of ${usd(oh4)} and direct labour cost of ${usd(dlc4)}. Calculate the overhead absorption rate as a percentage of direct labour cost, to one decimal place.`,
    hints: ["Overhead divided by the base."],
    explanation: `${F(oh4)} ÷ ${F(dlc4)} × 100 = ${p1((oh4 / dlc4) * 100)}%. Inverting the fraction gives the labour cost as a percentage of overhead.`,
  });
  const abs5 = 15.5 * rate3;
  b.calc({
    d: 4, skill: "APPLICATION", kind: "money", value: abs5, calculator: true, wrong: [15.5 * (oh3 / 14000), 15.5 + rate3],
    stem: `Using the rate per machine hour from the first numerical question, calculate the production overhead absorbed by a batch of mugs that uses ${15.5} machine hours.`,
    hints: ["Multiply the rate by the machine hours used."],
    explanation: `Overhead absorbed = ${15.5} × ${rate3.toFixed(2)} = ${usd(abs5)}. Using the labour hour rate (${usd(oh3 / 14000)}) would be wrong because the base is machine hours.`,
  });
  const dm = 410, dlh1 = 18, wage = 5, mhJ = 6, oar = rate3;
  const totalJ = dm + dlh1 * wage + mhJ * oar;
  b.calc({
    d: 4, skill: "APPLICATION", kind: "money", value: totalJ, calculator: true, wrong: [dm + dlh1 * wage, dm + dlh1 * wage + dlh1 * oar],
    stem: `A job uses direct materials of ${usd(dm)}, ${dlh1} direct labour hours paid at ${usd(wage)} an hour and ${mhJ} machine hours. Overheads are absorbed at ${usd(oar)} per machine hour. Calculate the total production cost of the job.`,
    hints: ["Prime cost first, then add the absorbed overhead."],
    explanation: `Prime cost = ${F(dm)} + ${dlh1} × ${wage} = ${F(dm + dlh1 * wage)}. Overhead = ${mhJ} × ${oar} = ${F(mhJ * oar)}. Total production cost = ${usd(totalJ)}.`,
  });

  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 2,
    stem: "Explain why a business uses a pre-determined absorption rate rather than waiting for actual overheads.",
    points: ["Prices and quotations are needed before the actual overhead for the period is known", "A budgeted rate avoids large changes in the cost of a job caused by the month in which it is made"],
    modelAnswer: "Quotations are needed during the period, before the actual overheads are known. A fixed rate also stops the cost of the same job rising in a month when overheads are high.",
    explanation: "One mark for each reason.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why a departmental absorption rate may give a more accurate cost than one rate for the whole factory.",
    points: ["Departments have different overheads and use different amounts of labour and machines", "Jobs spend different time in each department", "A rate for each department charges the job according to the resources it actually uses"],
    modelAnswer: "Departments differ in the machines and labour they use. A job that spends time only in the cheap department should carry less overhead, which departmental rates do.",
    hints: ["Think of a job that passes through only one department."],
    explanation: "One mark for each point.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "Evaluate the use of direct labour hours as the absorption base in a workshop that has recently bought automatic cutting machines.",
    points: ["The machines now cause much of the overhead (depreciation, power)", "Labour hours are less related to the cause of overhead, so jobs that use many machine hours are under-costed", "Machine hours (or separate rates for machines and hand work) would be fairer", "Under-costing can lead to prices that are too low and unprofitable work accepted"],
    modelAnswer: "Machines now cause the depreciation and power costs, but labour hours do not measure machine use. Machine-intensive jobs would carry too little overhead and be under-priced, so a machine hour rate would be better.",
    hints: ["What causes the overhead after the new machines are bought?"],
    explanation: "One mark for each point.",
  });

  // Structured 1 (12)
  const cutOH = 40500, cutMH = 4500, finOH = 22500, finDLH = 7500;
  const cutR = costing.oar(cutOH, cutMH), finR = costing.oar(finOH, finDLH);
  chk(cutR, 9); chk(finR, 3);
  const dmK = 680, dlK = 22, wageK = 5.5, mhK = 7;
  const absC = mhK * cutR, absF = dlK * finR;
  const totK = dmK + dlK * wageK + absC + absF;
  chk(totK, 680 + 121 + 63 + 66);
  const priceK = totK * 1.25;
  b.struct({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `Mutare Cabinets has a Cutting department (machine intensive) and a Finishing department (labour intensive). Budgeted figures for 2026:\n\n${table(["Department", "Overhead US\\$", "Budgeted activity"], [["Cutting", cutOH, `${F(cutMH)} machine hours`], ["Finishing", finOH, `${F(finDLH)} direct labour hours`]], ["l", "r", "l"])}\n\nJob K12 (a wardrobe) uses direct materials of ${usd(dmK)}, ${dlK} direct labour hours in Finishing at ${usd(wageK)} an hour and ${mhK} machine hours in Cutting. A mark-up of 25% on total production cost is added to find the selling price.`,
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "money", value: cutR, wrong: [cutOH / finDLH, cutOH / (cutMH + finDLH)], stem: "Calculate the absorption rate for Cutting, per machine hour.", explanation: `${F(cutOH)} ÷ ${F(cutMH)} = ${usd(cutR)}.` }),
      P.num({ label: "(b)", marks: 2, kind: "money", value: finR, wrong: [finOH / cutMH, finOH / (cutMH + finDLH)], stem: "Calculate the absorption rate for Finishing, per direct labour hour.", explanation: `${F(finOH)} ÷ ${F(finDLH)} = ${usd(finR)}.` }),
      P.num({ label: "(c)", marks: 2, kind: "money", value: absC + absF, wrong: [absC, dlK * cutR + mhK * finR], stem: "Calculate the total production overhead absorbed by Job K12.", explanation: `Cutting ${mhK} × ${cutR} = ${F(absC)}; Finishing ${dlK} × ${finR} = ${F(absF)}; total ${usd(absC + absF)}.` }),
      P.num({ label: "(d)", marks: 2, kind: "money", value: totK, wrong: [totK - absC - absF, dmK + absC + absF], stem: "Calculate the total production cost of Job K12.", explanation: `${F(dmK)} + labour ${F(dlK * wageK)} + overhead ${F(absC + absF)} = ${usd(totK)}.` }),
      P.num({ label: "(e)", marks: 2, kind: "money", value: priceK, wrong: [totK * 0.25, totK + 0.25 * dmK], stem: "Calculate the selling price of Job K12.", explanation: `${F(totK)} × 1.25 = ${usd(priceK)}.` }),
      P.manual({ label: "(f)", marks: 2, stem: "Explain why different bases are used in the two departments.", points: ["Cutting is machine intensive, so machine use causes its overhead", "Finishing is labour intensive, so labour hours cause its overhead"], modelAnswer: "In Cutting the machines cause the overhead, so machine hours are used; in Finishing the workers cause it, so direct labour hours are used.", explanation: "One mark for each department." }),
    ],
    hints: ["Rate = budgeted overhead ÷ budgeted activity of the department.", "Selling price = total cost × 1.25."],
    explanation: "This item tests departmental absorption rates, a job cost and a cost-plus price.",
  });

  // Structured 2 (14)
  const fOH = 70000, fDLH = 14000, fMH = 8750;
  const r1 = fOH / fDLH, r2h = fOH / fMH;
  chk(r1, 5); chk(r2h, 8);
  const P1 = { dlh: 30, mh: 5 }, Q1 = { dlh: 8, mh: 20 };
  b.struct({
    d: 5, skill: "EVALUATION", calculator: true,
    stem: `Chinhoyi Metalworks budgets production overheads of ${usd(fOH)} for 2026, ${F(fDLH)} direct labour hours and ${F(fMH)} machine hours. Two jobs for school desks were costed in January:\n\n${table(["", "Job P", "Job Q"], [["Direct labour hours", P1.dlh, Q1.dlh], ["Machine hours", P1.mh, Q1.mh]])}`,
    parts: [
      P.group({ label: "(a)", stem: "Calculate the absorption rate:", parts: [
        P.num({ label: "(i)", marks: 1, kind: "money", value: r1, wrong: [r2h], stem: "per direct labour hour", explanation: `${F(fOH)} ÷ ${F(fDLH)} = ${usd(r1)}.` }),
        P.num({ label: "(ii)", marks: 1, kind: "money", value: r2h, wrong: [r1], stem: "per machine hour", explanation: `${F(fOH)} ÷ ${F(fMH)} = ${usd(r2h)}.` }),
      ] }),
      P.group({ label: "(b)", stem: "Calculate the overhead absorbed by Job P using:", parts: [
        P.num({ label: "(i)", marks: 2, kind: "money", value: P1.dlh * r1, wrong: [P1.dlh * r2h], stem: "direct labour hours", explanation: `${P1.dlh} × ${r1} = ${usd(P1.dlh * r1)}.` }),
        P.num({ label: "(ii)", marks: 2, kind: "money", value: P1.mh * r2h, wrong: [P1.mh * r1], stem: "machine hours", explanation: `${P1.mh} × ${r2h} = ${usd(P1.mh * r2h)}.` }),
      ] }),
      P.group({ label: "(c)", stem: "Calculate the overhead absorbed by Job Q using:", parts: [
        P.num({ label: "(i)", marks: 2, kind: "money", value: Q1.dlh * r1, wrong: [Q1.dlh * r2h], stem: "direct labour hours", explanation: `${Q1.dlh} × ${r1} = ${usd(Q1.dlh * r1)}.` }),
        P.num({ label: "(ii)", marks: 2, kind: "money", value: Q1.mh * r2h, wrong: [Q1.mh * r1], stem: "machine hours", explanation: `${Q1.mh} × ${r2h} = ${usd(Q1.mh * r2h)}.` }),
      ] }),
      P.manual({ label: "(d)", marks: 4, stem: "The owner says: The base does not matter, because the same total overhead is absorbed. Evaluate this statement using the two jobs.", points: [`Under labour hours Job P carries ${usd(P1.dlh * r1)} and Job Q ${usd(Q1.dlh * r1)}`, `Under machine hours the position reverses: P ${usd(P1.mh * r2h)} and Q ${usd(Q1.mh * r2h)}`, "So the base changes the cost of each job and the price quoted, although the total is the same", "The base should match the cause of the overhead; here the machines probably cause it, so machine hours are fairer if the factory is mechanised"], modelAnswer: `The total is the same, but the share is not. Labour hours put ${usd(P1.dlh * r1)} on P and ${usd(Q1.dlh * r1)} on Q; machine hours put ${usd(P1.mh * r2h)} on P and ${usd(Q1.mh * r2h)} on Q. The base therefore changes costs and prices and should follow what causes the overhead.`, hints: ["Compare the cost of each job under each base."], explanation: "One mark for each point." }),
    ],
    hints: ["Rate = budgeted overhead ÷ budgeted activity."],
    explanation: "This item compares two absorption bases for labour-intensive and machine-intensive jobs.",
  });

  b.card("FORMULA", "Overhead absorption rate (OAR)", "Budgeted overhead ÷ budgeted activity (hours, cost or units).");
  b.card("FACT", "Absorption bases", "Direct labour hours, machine hours, percentage of direct labour cost, percentage of prime cost, units produced.");
  b.card("CONCEPT", "Why a pre-determined rate?", "Actual overhead is known only after the period; prices are needed now, and a budgeted rate avoids month-to-month swings in job cost.");
  b.card("FORMULA", "Overhead absorbed", "OAR × actual activity of the job, batch or unit.");
  b.card("CONCEPT", "Choosing the base", "Machine hours for machine-intensive work, labour hours for labour-intensive work, units for one standard product.");
  b.card("CONCEPT", "Departmental rates", "A rate per department, multiplied by the job's time in each, is more accurate than one rate for the factory.");
  b.card("FORMULA", "Percentage rate", "Budgeted overhead ÷ budgeted direct labour cost (or prime cost) × 100; applied to the job's labour cost (or prime cost).");
  b.card("CONCEPT", "Effect of the base", "The total overhead does not change, but the base changes the share each job carries and so its cost and price.");
  b.card("DEFINITION", "Prime cost", "Direct materials + direct labour + direct expenses.");
});
