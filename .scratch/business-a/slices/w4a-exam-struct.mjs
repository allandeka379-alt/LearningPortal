// W4a exam-format items: ZIM_STRUCT10 x3 (ZIMSEC Business Studies Paper 1 section A / Business Enterprise Skills Paper 1 section A)
import { concept, P, EXAM, checkExam, ZIM, cashForecast, cpa, stats, table, money, fmt, chk, r2 } from "../lib.mjs";

const C = (k) => `abus.${k}`;
const common = { d: 3, examStyle: true, skill: EXAM.ZIM_STRUCT10.skill, secs: EXAM.ZIM_STRUCT10.secs, applies: ZIM };

concept(C("finance.cash-flow-forecast"), { file: "exam/w4a-struct", keyPrefix: "exam.w4a-struct" }, (b) => {
  // 1. Cash flow forecast (Business Studies and Business Enterprise Skills Paper 1 section A)
  const months = ["Jan", "Feb", "Mar"];
  const cash = [3700, 4050, 4450], credit = [2350, 2850, 3250], stock = [3100, 3450, 3850];
  const wages = 1350, rent = 650, van = 6900, open1 = 2400;
  const f = cashForecast({
    opening: open1,
    periods: months.map((m, i) => ({
      label: m,
      receipts: [["Cash sales", cash[i]], ["Receipts from credit customers", credit[i]]],
      payments: [["Stock purchases", stock[i]], ["Wages", wages], ["Rent", rent], ...(i === 2 ? [["New delivery van", van]] : [])],
    })),
  });
  const [m1, m2, m3] = f.rows;
  chk(m1.close, 3350); chk(m2.close, 4800); chk(m3.net, -5050); chk(m3.close, -250);
  const items = table(["US\\$", "Jan", "Feb", "Mar"], [
    ["Cash sales", ...cash],
    ["Receipts from credit customers", ...credit],
    ["Stock purchases", ...stock],
    ["Wages", wages, wages, wages],
    ["Rent", rent, rent, rent],
    ["New delivery van", "", "", van],
  ]);
  b.struct({
    ...common, calculator: true,
    paper: "ZIMSEC Business Studies Paper 1",
    concepts: [C("finance.cash-flow-forecast")],
    stem: `Shumba Supplies is a fictional business in Chinhoyi that supplies school tuck shops. It began January with ${money(open1)} in the bank. The owner has listed the cash she expects to receive and pay out in the first three months of the year.\n\n${items}`,
    parts: checkExam(EXAM.ZIM_STRUCT10, [
      P.num({ label: "(a)", marks: 3, kind: "money", type: "CALCULATION", value: m2.close, wrong: [m2.net, m1.close], stem: "Calculate the cash balance expected at the end of February.", explanation: `January: receipts ${fmt(m1.rec)} - payments ${fmt(m1.pay)} = +${fmt(m1.net)}, closing ${fmt(m1.close)}. February: receipts ${fmt(m2.rec)} - payments ${fmt(m2.pay)} = +${fmt(m2.net)}, closing ${money(m2.close)}.`, workedSolution: `1. January net cash flow = (3,700 + 2,350) - (3,100 + 1,350 + 650) = +${fmt(m1.net)}; closing = 2,400 + ${fmt(m1.net)} = ${fmt(m1.close)}.\n2. February net cash flow = (4,050 + 2,850) - (3,450 + 1,350 + 650) = +${fmt(m2.net)}.\n3. Closing balance = ${fmt(m1.close)} + ${fmt(m2.net)} = ${money(m2.close)}.` }),
      P.num({ label: "(b)", marks: 3, kind: "money", type: "CALCULATION", value: Math.abs(m3.close), wrong: [Math.abs(m3.net), m2.close], stem: "Calculate the size of the overdraft expected at the end of March.", explanation: `March: receipts ${fmt(m3.rec)} - payments ${fmt(m3.pay)} = -${fmt(Math.abs(m3.net))}. Closing = ${fmt(m2.close)} - ${fmt(Math.abs(m3.net))} = -${fmt(Math.abs(m3.close))}, an overdraft of ${money(Math.abs(m3.close))}.`, workedSolution: `1. March receipts = 4,450 + 3,250 = ${fmt(m3.rec)}.\n2. March payments = 3,850 + 1,350 + 650 + 6,900 = ${fmt(m3.pay)}.\n3. Net cash flow = ${fmt(m3.rec)} - ${fmt(m3.pay)} = -${fmt(Math.abs(m3.net))}.\n4. Closing balance = ${fmt(m2.close)} - ${fmt(Math.abs(m3.net))} = -${fmt(Math.abs(m3.close))}: an overdraft of ${money(Math.abs(m3.close))}.` }),
      P.manual({ label: "(c)", marks: 4, stem: "Outline two ways in which the owner could deal with the overdraft in March.", points: ["Arrange an overdraft with the bank before March", `Application: an overdraft of at least ${money(Math.abs(m3.close))} would cover the shortage until money arrives from credit customers`, "Ask the credit customers to pay sooner, or delay buying the van until April", `Application: moving ${money(Math.abs(m3.close))} of receipts or payments from March to April would remove the shortage`], modelAnswer: `She could arrange an overdraft of at least ${money(Math.abs(m3.close))} with the bank before March, which would cover the shortage until money arrives from credit customers. She could also ask the schools to pay sooner or delay buying the van until April, which would move the shortage out of March.`, explanation: "Two ways, each applied." }),
    ]),
    hints: ["Carry each month's closing balance forward.", "Net cash flow = receipts - payments."],
    explanation: `February closing balance ${money(m2.close)}; March overdraft ${money(Math.abs(m3.close))}; two ways to deal with it.`,
  });

  // 2. Work study (time study)
  const obs = [1.9, 2.1, 2.0, 2.2, 1.8];
  const mean = stats.mean(obs);
  const basic = (mean * 110) / 100, standard = basic * 1.15;
  chk(mean, 2); chk(basic, 2.2); chk(standard, 2.53);
  b.struct({
    ...common, calculator: true,
    paper: "ZIMSEC BES Paper 1",
    concepts: [C("operations.work-study")],
    stem: `Mhofu Bakery is a fictional business in Mutare. An observer times how long a packer takes to pack a box of rolls. Five timings in minutes were: ${obs.join(", ")}. The packer was rated at 110. The bakery allows 15% of the basic time for rest and delay.`,
    parts: checkExam(EXAM.ZIM_STRUCT10, [
      P.num({ label: "(a)", marks: 3, kind: "plain", unit: "minutes", type: "CALCULATION", value: basic, dp: 2, wrong: [mean, 2.53], stem: "Calculate the basic time for packing one box, in minutes. (Basic time = average observed time × rating ÷ 100.)", explanation: "Average = 10.0 ÷ 5 = 2.0. Basic time = 2.0 × 110 ÷ 100 = 2.2 minutes.", workedSolution: "1. Total of the timings = 1.9 + 2.1 + 2.0 + 2.2 + 1.8 = 10.0.\n2. Average = 10.0 ÷ 5 = 2.0 minutes.\n3. Basic time = 2.0 × 110 ÷ 100 = 2.2 minutes." }),
      P.num({ label: "(b)", marks: 3, kind: "plain", unit: "minutes", type: "CALCULATION", value: standard, dp: 2, wrong: [basic, 2.4], stem: "Calculate the standard time for packing one box, in minutes.", explanation: "Standard time = basic time × (1 + allowance) = 2.2 × 1.15 = 2.53 minutes.", workedSolution: "1. Basic time = 2.2 minutes.\n2. Allowance = 15% of 2.2 = 0.33.\n3. Standard time = 2.2 + 0.33 = 2.53 minutes." }),
      P.manual({ label: "(c)", marks: 4, stem: "Outline two ways in which the bakery could use the standard time.", points: ["To set a target number of boxes for each packer in a shift", "Application: in 480 minutes a packer should pack about 189 boxes", "To plan how many packers are needed for an order", "Application: more packers can be rostered on busy days such as Fridays"], modelAnswer: "The bakery can use the standard time to set a target for each packer: in 480 minutes a packer should pack about 189 boxes. It can also plan how many packers are needed for an order, for example rostering more on busy days.", explanation: "Two uses, each applied." }),
    ]),
    hints: ["Average, then rating, then allowance."],
    explanation: "Basic time 2.2 minutes; standard time 2.53 minutes; uses for targets and planning.",
  });

  // 3. Critical path
  const acts = [
    { id: "A", dur: 2, after: [] }, { id: "B", dur: 4, after: [] }, { id: "C", dur: 3, after: ["A"] },
    { id: "D", dur: 2, after: ["B", "C"] }, { id: "E", dur: 3, after: ["C"] }, { id: "F", dur: 1, after: ["D", "E"] },
  ];
  const net = cpa(acts);
  const row = (id) => net.rows.find((r) => r.id === id);
  chk(net.duration, 9); chk(row("D").totalFloat, 1);
  const desc = { A: "Clear the old kitchen", B: "Order the new equipment", C: "Fit the plumbing", D: "Install the ovens", E: "Tile the floor", F: "Health inspection" };
  const nt = table(["Activity", "Description", "Duration (days)", "Follows"], acts.map((a) => [a.id, desc[a.id], String(a.dur), a.after.length ? a.after.join(", ") : "none"]), ["l", "l", "r", "l"]);
  b.struct({
    ...common,
    paper: "ZIMSEC Business Studies Paper 1",
    concepts: [C("operations.critical-path")],
    stem: `Nkosi Hotel is a fictional hotel in Bulawayo that is refitting its kitchen. The work has been planned as follows.\n\n${nt}`,
    parts: checkExam(EXAM.ZIM_STRUCT10, [
      P.num({ label: "(a)", marks: 3, kind: "plain", unit: "days", type: "CALCULATION", value: net.duration, wrong: [15, 8], stem: "Calculate the minimum time in which the refit can be completed.", explanation: "Forward pass: A 0-2, B 0-4, C 2-5, D 5-7 (after B at 4 and C at 5), E 5-8, F 8-9. Minimum duration = 9 days.", workedSolution: "1. A finishes on day 2 and B on day 4.\n2. C starts on day 2 and finishes on day 5.\n3. D waits for B (day 4) and C (day 5), so it starts on day 5 and finishes on day 7; E starts on day 5 and finishes on day 8.\n4. F waits for D (day 7) and E (day 8), so it starts on day 8 and finishes on day 9.\n5. Minimum duration = 9 days." }),
      P.num({ label: "(b)", marks: 3, kind: "plain", unit: "days", type: "CALCULATION", value: row("D").totalFloat, wrong: [0, 2], stem: "Activity D (installing the ovens) is not on the critical path. By how many days can it be delayed without delaying the whole refit?", explanation: "D must finish by day 8, the latest start of F, so its latest start is 6. It can start on day 5, so it can be delayed by 6 - 5 = 1 day.", workedSolution: "1. F must start by day 8 to finish on day 9.\n2. So D must finish by day 8 and its latest start is 8 - 2 = 6.\n3. Earliest start of D = 5, so delay possible = 6 - 5 = 1 day." }),
      P.manual({ label: "(c)", marks: 4, stem: "Outline two benefits to the hotel of using network analysis for this refit.", points: ["It shows the shortest time in which the refit can be done", "Application: the hotel can tell guests when the kitchen will reopen", "It identifies the critical activities that must not be delayed", "Application: the manager can watch the plumbing and tiling closely and keep spare workers for the other jobs"], modelAnswer: "Network analysis shows that the refit can be done in 9 days, so the hotel can tell guests when the kitchen will reopen. It also identifies the critical activities, so the manager can watch the plumbing and tiling closely and use spare workers on the other jobs.", explanation: "Two benefits, each applied." }),
    ]),
    hints: ["In the forward pass take the later finish where two activities lead into one.", "Float = latest start - earliest start."],
    explanation: "Minimum duration 9 days; critical path A, C, E, F; activity D has 1 day of float.",
  });
});
