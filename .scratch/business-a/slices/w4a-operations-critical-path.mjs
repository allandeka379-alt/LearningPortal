// W4a: operations.critical-path (owns the critical-path conventions: networks are given as precedence tables or arc tables;
// durations in days; all times and floats come from cpa / cpaNodes; total and free float are Cambridge detail -> applies CAM)
import { concept, P, CAM, cpa, cpaNodes, table, money, chk } from "../lib.mjs";
import { mc } from "../tables/w4a-lib.mjs";

const prec = (acts) => table(["Activity", "Duration (days)", "Follows"], acts.map((a) => [a.id, String(a.dur), a.after.length ? a.after.join(", ") : "none"]), ["l", "r", "l"]);
const R = (res, id) => res.rows.find((r) => r.id === id);

// Network 1: Rudo's Bakery fit-out
const A1 = [
  { id: "A", dur: 2, after: [] }, { id: "B", dur: 3, after: ["A"] }, { id: "C", dur: 4, after: ["A"] }, { id: "D", dur: 5, after: ["B", "C"] },
  { id: "E", dur: 3, after: ["C"] }, { id: "F", dur: 4, after: ["D", "E"] }, { id: "G", dur: 1, after: ["F"] },
];
const N1 = cpa(A1);
chk(N1.duration, 16);
chk(R(N1, "B").totalFloat, 1);
chk(R(N1, "E").totalFloat, 2);
chk(R(N1, "D").es, 6);
const A1c = A1.map((a) => (a.id === "D" ? { ...a, dur: 3 } : a));
const N1c = cpa(A1c);
chk(N1c.duration, 14);
const N1d = cpa(A1.map((a) => (a.id === "D" ? { ...a, dur: 2 } : a)));
chk(N1d.duration, 14);

// Network 2: arc table with a dummy (a school hall refurbishment)
const arcs2 = [
  { id: "A", from: 1, to: 2, dur: 5 }, { id: "B", from: 1, to: 3, dur: 7 }, { id: "C", from: 2, to: 4, dur: 6 }, { id: "D", from: 3, to: 4, dur: 4 },
  { id: "X", from: 2, to: 3, dur: 0 }, { id: "E", from: 3, to: 5, dur: 3 }, { id: "F", from: 4, to: 6, dur: 5 }, { id: "G", from: 5, to: 6, dur: 8 },
];
const N2 = cpaNodes(arcs2);
chk(N2.duration, 18);
const arcsE = arcs2.map((a) => (a.id === "E" ? { ...a, dur: 1 } : a));
const N2e = cpaNodes(arcsE);
chk(N2e.duration, 16);
const arcTable = (arcs) => table(["Activity", "From node", "To node", "Duration (days)"], arcs.map((a) => [a.id === "X" ? "Dummy" : a.id, String(a.from), String(a.to), String(a.dur)]), ["l", "r", "r", "r"]);

// Network 3: eight activities
const A3 = [
  { id: "A", dur: 6, after: [] }, { id: "B", dur: 4, after: [] }, { id: "C", dur: 5, after: ["A"] }, { id: "D", dur: 7, after: ["A", "B"] },
  { id: "E", dur: 3, after: ["B"] }, { id: "F", dur: 4, after: ["C", "D"] }, { id: "G", dur: 6, after: ["D", "E"] }, { id: "H", dur: 2, after: ["F", "G"] },
];
const N3 = cpa(A3);
chk(N3.duration, 21);
chk(R(N3, "C").totalFloat, 4);
chk(R(N3, "C").freeFloat, 2);
chk(R(N3, "E").totalFloat, 6);

concept("abus.operations.critical-path", { file: "operations/critical-path", keyPrefix: "operations.critical-path" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "In critical path analysis, the **critical path** is",
    ok: ["the longest route through the network", "Correct: it decides the minimum time in which the project can be finished."],
    bad: [["the route with the lowest total cost", "Cost is not what defines the critical path; time is."], ["the route with the fewest activities", "The number of activities does not matter; the total duration does."], ["the route that the workers start first", "The order in which routes start does not make a route critical."]],
    explanation: "The critical path is the longest route from start to finish. Its activities have no float, so a delay to any of them delays the whole project.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Activity X can start only when activity Y (earliest finish day 9) and activity Z (earliest finish day 12) are both complete. What is the earliest start time of X?",
    ok: ["Day 12", "Correct: X must wait for the later of its two predecessors."],
    bad: [["Day 9", "X cannot start when Y finishes, because Z is still in progress."], ["Day 21", "The finish days are not added; the activities run side by side."], ["Day 10.5", "The earliest start is not an average of the finishes."]],
    hints: ["Both predecessors must be finished first."],
    explanation: "In the forward pass the earliest start is the largest earliest finish of the predecessors: day 12.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "In a **backward pass**, an activity is followed by two activities with latest start times of day 14 and day 17. What is its latest finish time?",
    ok: ["Day 14", "Correct: it must finish in time for the earlier of the two latest starts."],
    bad: [["Day 17", "Finishing on day 17 would delay the activity that must start on day 14."], ["Day 31", "The latest starts are not added together."], ["Day 15.5", "The latest finish is not an average."]],
    hints: ["Take the smaller latest start."],
    explanation: "Latest finish = the smallest latest start of the activities that follow, which is day 14.",
  });
  const Brow = R(N1, "B");
  mc(b, {
    d: 3, skill: "APPLICATION", applies: CAM,
    stem: `Rudo's Bakery is a fictional business in Mutare. Its shop fit-out is planned as follows.\n\n${prec(A1)}\n\nWhich activity has a **total float of one day**?`,
    ok: ["B", "Correct: B can start on day 2 or day 3 and the shop still opens on time."],
    bad: [["C", "C is on the critical path, so its total float is zero."], ["D", "D is on the critical path, so its total float is zero."], ["E", "E has two days of float, not one."]],
    hints: ["Find the minimum duration first, then the latest start of each activity."],
    explanation: `The minimum duration is ${N1.duration} days and the critical path is A, C, D, F, G. B has earliest start 2 and latest start 3, so its total float is ${Brow.totalFloat} day; E has ${R(N1, "E").totalFloat} days.`,
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: `Rudo's Bakery is a fictional business in Mutare. Its shop fit-out is planned as follows.\n\n${prec(A1)}\n\nWhat is the **earliest start time** of activity D?`,
    ok: ["Day 6", "Correct: D must wait for C, which finishes on day 6, later than B on day 5."],
    bad: [["Day 5", "That is when B finishes, but D also needs C."], ["Day 11", "That is the earliest finish of D, not its start."], ["Day 2", "That is when B and C start, not when D can start."]],
    hints: ["D follows both B and C; take the later finish."],
    explanation: "A finishes on day 2. B finishes on day 5 and C on day 6, so D starts on day 6 and finishes on day 11.",
  });
  mc(b, {
    d: 4, skill: "ANALYSIS",
    stem: `On the fit-out network of Rudo's Bakery (minimum duration ${N1.duration} days) the critical path is A, C, D, F, G and E has two days of total float. The owner shortens D from 5 days to 2 days by hiring extra workers. By how many days is the whole project shortened?`,
    ok: ["2 days", "Correct: the route A, C, E, F, G takes 14 days and now limits the project, so only 2 of the 3 days saved on D count."],
    bad: [["3 days", "That assumes D is the only long route, but the route through E still takes 14 days."], ["1 day", "A saving of one day is the total float of B, which is not relevant to D."], ["0 days", "D is on the critical path, so shortening it does save time."]],
    hints: ["Recalculate the longest path after the change. Which other path now takes just as long?"],
    explanation: `With D at 2 days the route A, C, D, F, G takes 13 days, but A, C, E, F, G still takes 14 days, so the new minimum duration is ${N1d.duration} days against ${N1.duration}: a saving of ${N1.duration - N1d.duration} days, not 3.`,
  });
  mc(b, {
    d: 4, skill: "EVALUATION",
    stem: "A fictional building firm in Bulawayo finds that its network shows a minimum duration of 40 days. Which is the most important reason why the manager should still be cautious about promising completion in 40 days?",
    ok: ["Durations are only estimates and may be wrong", "Correct: the calculation is only as reliable as the time estimates behind it."],
    bad: [["A critical path can never be found accurately", "The path is found exactly from the data; the data are the problem."], ["Network analysis ignores the order of activities", "The order of activities is the basis of the method."], ["The longest route is always the cheapest one", "The longest route is not related to cost in this way."]],
    hints: ["Think about where the numbers in the network come from."],
    explanation: "The method is exact only for the figures it is given. Bad weather, late deliveries or optimistic estimates can lengthen the activities.",
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", applies: CAM,
    stem: "An activity's free float can never be larger than its total float.",
    answer: true,
    explanation: "True. Free float is the delay that does not affect the next activity; total float is the delay that does not affect the whole project. Free float is part of total float, so it cannot exceed it.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each term to its meaning.",
    pairs: [["Dummy activity", "An activity of zero duration that shows a dependence"], ["Critical path", "The longest route through the network"], ["Earliest start time", "The earliest time an activity can begin"], ["Minimum project duration", "The shortest time in which the whole project can be completed"]],
    explanation: "A dummy shows dependence; the critical path is the longest route and decides the minimum duration; the earliest start is found in the forward pass.",
  });

  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Choose the correct word for each gap.",
    template: "In the forward pass, where two activities lead into one, the {{blank:a}} earliest finish is used. Activities on the critical path have a float of {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["larger"], choices: ["larger", "smaller", "average"] },
      { id: "b", accepted: ["zero"], choices: ["zero", "one day", "two days"] },
    ],
    explanation: "The next activity cannot start until both predecessors have finished, so the larger finish is used. Critical activities have no spare time.",
  });

  b.short({
    d: 2, skill: "RECALL",
    stem: "State **one** benefit of using critical path analysis.",
    accepted: ["shows the minimum time for the project", "shows the critical activities", "helps to plan resources", "helps to schedule resources", "identifies the critical path", "shows which activities can be delayed", "shows the order of activities", "helps to control the project", "helps to avoid delays", "improves planning", "identifies delays", "helps to save time", "shows the earliest completion date"],
    explanation: "Accept any sensible benefit: the minimum duration, identifying activities that cannot be delayed, scheduling resources, showing the order of the work or helping to manage delays.",
  });

  const crit1 = N1.duration;
  b.num({
    d: 3, skill: "APPLICATION", kind: "plain", unit: "days", value: crit1, wrong: [A1.reduce((s, a) => s + a.dur, 0), 15],
    stem: `Using the fit-out network below for Rudo's Bakery, calculate the minimum project duration in days.\n\n${prec(A1)}`,
    hints: ["Do a forward pass and take the larger finish where two activities join."],
    explanation: `A (0-2), B (2-5), C (2-6), D (6-11), E (6-9), F (11-15), G (15-16). The minimum duration is ${crit1} days. Adding every duration (${A1.reduce((s, a) => s + a.dur, 0)}) ignores the activities that run at the same time.`,
  });
  const e3 = R(N3, "C");
  b.num({
    d: 4, skill: "ANALYSIS", kind: "plain", unit: "days", value: N3.duration, wrong: [A3.reduce((s, a) => s + a.dur, 0), 19],
    stem: `A fictional furniture workshop in Gweru plans a custom order in eight activities.\n\n${prec(A3)}\n\nCalculate the minimum project duration in days.`,
    hints: ["Find the earliest finish of each activity; where two lead into one, take the larger."],
    explanation: `A 0-6, B 0-4, C 6-11, D 6-13, E 4-7, F 13-17, G 13-19, H 19-21. Minimum duration = ${N3.duration} days along A, D, G, H (6 + 7 + 6 + 2). Adding all durations gives ${A3.reduce((s, a) => s + a.dur, 0)}.`,
  });
  b.calc({
    d: 4, skill: "ANALYSIS", kind: "plain", unit: "days", value: e3.totalFloat, applies: CAM, wrong: [e3.freeFloat, 5],
    stem: `Using the furniture workshop network below, calculate the **total float** of activity C.\n\n${prec(A3)}`,
    hints: ["Total float = latest start - earliest start.", "The minimum duration must be found first."],
    explanation: `Total float of C = latest start - earliest start = 10 - 6 = ${e3.totalFloat} days. The free float (${e3.freeFloat} days) is the delay that does not move the start of F.`,
    workedSolution: `1. Forward pass: minimum duration = ${N3.duration} days; C starts on day ${e3.es} and finishes on day ${e3.ef}.\n2. Backward pass: F must start by day ${R(N3, "F").ls}, so C must finish by day ${e3.lf}; its latest start is ${e3.lf} - 5 = ${e3.ls}.\n3. Total float = ${e3.ls} - ${e3.es} = ${e3.totalFloat} days.`,
  });
  b.num({
    d: 4, skill: "ANALYSIS", kind: "plain", unit: "days", value: e3.freeFloat, applies: CAM, wrong: [e3.totalFloat, 6],
    stem: `Using the furniture workshop network below, calculate the **free float** of activity C.\n\n${prec(A3)}`,
    hints: ["Free float = earliest start of the following activity - earliest finish of C."],
    explanation: `C finishes on day ${e3.ef}; F, the only activity that follows it, cannot start before day ${R(N3, "F").es}, so the free float is ${R(N3, "F").es} - ${e3.ef} = ${e3.freeFloat} days. The total float is ${e3.totalFloat} days.`,
  });

  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why activities on the critical path need the closest supervision.",
    points: ["They have no float, so there is no spare time", "A delay to any critical activity delays the whole project", "Resources can be moved to them from non-critical activities to keep the project on time"],
    modelAnswer: "Critical activities have no float, so there is no spare time. A delay to any one of them delays the whole project, so the manager watches them closely and may move workers from non-critical activities to them.",
    hints: ["What happens to the finish date if a critical activity is late?"],
    explanation: "One point per mark.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 4,
    stem: "A fictional hotel in Victoria Falls uses a network to plan the repainting of its rooms. Explain two ways in which the manager could use the network.",
    points: ["To find the minimum time in which the repainting can be completed", "Application: the hotel can tell guests when rooms will be back in use", "To identify the critical activities that must not be delayed", "Application: the manager can keep the painters on the critical rooms and move spare workers elsewhere"],
    modelAnswer: "The manager can use the network to find the minimum time to finish the repainting, so the hotel can tell guests when the rooms will be back in use. It also shows which activities are critical, so the manager can keep the painters on those jobs and move spare workers to jobs with float.",
    hints: ["Link each use to rooms, guests or painters."],
    explanation: "Two uses, each developed in the context.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Analyse why the time estimates are the main weakness of critical path analysis.",
    points: ["The durations are estimates made before the work starts", "Every calculation of float and duration depends on them", "If estimates are wrong, the critical path itself may change", "Managers may trust the precise-looking answer too much"],
    modelAnswer: "The durations are estimates made before the work starts, and every duration and float is calculated from them. If an estimate is wrong, another route may become the longest, so the critical path changes. Managers may also trust the precise-looking answer more than it deserves.",
    hints: ["Where do the numbers come from, and what happens if one is wrong?"],
    explanation: "One point per mark.",
  });
  b.manualShort({
    d: 5, skill: "EVALUATION", marks: 6,
    stem: "A fictional construction firm in Gaborone is deciding whether to use critical path analysis for a single building project. Assess whether it is worth the effort.",
    points: ["It shows the minimum duration and the critical path, so the firm can plan resources", "Large projects have many activities, so the benefit is greater", "Costs of preparing and updating the network, including managers' time", "Estimates of duration may be unreliable on a new type of project", "Counter-argument: the cost is small compared with penalties for late completion", "Judgement with a reason, for example worthwhile for a large project with penalties; not for a small simple job"],
    modelAnswer: "For a large building project the analysis is probably worth the effort. It shows the minimum duration and the critical activities, so resources can be planned and delays managed. The costs are managers' time to prepare and update the network, and its value falls if the estimates are unreliable, as on a new type of building. Against this, the cost is small compared with penalties for late completion on a big contract. The firm should use it for a large project with penalties, but not for a small, simple job.",
    hints: ["Give a benefit, a cost, and a condition under which the judgement changes."],
    explanation: "One point per mark; the judgement needs a reason.",
  });

  // Practice structured 1 (9 marks)
  b.struct({
    d: 3, skill: "APPLICATION",
    stem: `Rudo's Bakery is a fictional business in Mutare. The fit-out of its new shop is planned as follows.\n\n${prec(A1)}`,
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "plain", unit: "days", value: N1.duration, wrong: [15, 19], stem: "Calculate the minimum project duration.", explanation: `The longest path is A, C, D, F, G: 2 + 4 + 5 + 4 + 1 = ${N1.duration} days.` }),
      P.mcq({ label: "(b)", marks: 1, stem: "Which activities form the critical path?", options: [["A, C, D, F, G", "Correct: 2 + 4 + 5 + 4 + 1 = 16 days, the longest route."], ["A, B, D, F, G", "This route takes 15 days, so it is not the longest."], ["A, C, E, F, G", "This route takes 14 days, so it is not the longest."], ["A, B, E, F, G", "B and E do not follow each other."]], answer: "A", explanation: "Only A, C, D, F, G takes the full 16 days." }),
      P.manual({ label: "(c)", marks: 3, stem: "Explain why a delay of one day to activity E would not delay the opening of the shop.", points: ["E is not on the critical path", "E has spare time (float) of 2 days", "A one-day delay uses part of the float, so F can still start on day 11"], modelAnswer: "E is not on the critical path and has 2 days of float. A delay of one day uses only part of that float, so F can still start on day 11 and the shop opens on time.", explanation: "E can finish as late as day 11 without delaying F, and a one-day delay is within that." }),
      P.manual({ label: "(d)", marks: 3, stem: "State and explain one limitation of the network for Rudo.", points: ["The durations are estimates and could be wrong", "Application: builders or equipment may arrive late", "A different path could then become critical"], modelAnswer: "The durations are estimates, so they could be wrong. If the oven installer arrives late, a different path could become the longest and the shop would open later than planned.", explanation: "A limitation with a development." }),
    ],
    hints: ["Do a forward pass and take the larger finish where two activities join.", "Float is the time by which an activity can be delayed without delaying the whole project."],
    explanation: "Minimum duration 16 days; critical path A, C, D, F, G; E has 2 days of float.",
  });

  // Practice structured 2 (14 marks): arc table with a dummy
  const dN = (n) => N2.nodes.find((x) => x.node === n);
  const dEnd = Object.fromEntries(N2.rows.map((r) => [r.id, r]));
  chk(dN(4).est, 11);
  chk(dN(5).lft, 10);
  chk(dEnd.C.totalFloat, 2);
  chk(dEnd.F.freeFloat, 2);
  b.struct({
    d: 4, skill: "ANALYSIS", applies: CAM,
    stem: `A fictional school in Lusaka is refurbishing its hall. The activities are shown below as an arc table. Activity X is a dummy.\n\n${arcTable(arcs2)}\n\nThe earliest start time (EST) of each node has been calculated as: node 1 = 0, node 2 = 5, node 3 = 7, node 5 = 10, node 6 = 18.`,
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "plain", unit: "days", value: dN(4).est, wrong: [9, 15], stem: "Calculate the earliest start time of node 4.", explanation: "Node 4 is reached by C (5 + 6 = 11) and by D (7 + 4 = 11), so its EST is 11 days." }),
      P.num({ label: "(b)", marks: 2, kind: "plain", unit: "days", value: dN(5).lft, wrong: [13, 18], stem: "Calculate the latest finish time of node 5, given that the project must be completed in the minimum duration.", explanation: "The latest finish of node 5 is the project duration (18) less the duration of G (8) = 10 days." }),
      P.mcq({ label: "(c)", marks: 2, stem: "Which activities are critical?", options: [["B, E and G", "Correct: 7 + 3 + 8 = 18 days, the longest route."], ["A, C and F", "This route takes 16 days, so it has float."], ["A, X, E and G", "This route takes 16 days (5 + 0 + 3 + 8), so it has float."], ["B, D and F", "This route takes 16 days (7 + 4 + 5), so it has float."]], answer: "A", explanation: "Only B, E, G reaches 18 days." }),
      P.num({ label: "(d)", marks: 2, kind: "plain", unit: "days", value: dEnd.C.totalFloat, wrong: [0, 6], stem: "Calculate the total float of activity C.", explanation: "Total float = LFT of node 4 (13) - EST of node 2 (5) - duration (6) = 2 days." }),
      P.manual({ label: "(e)", marks: 6, stem: "The school can finish activity E two days earlier (from 3 days to 1 day) by paying for extra workers. Assess whether it should do so.", points: ["E is on the critical path, so shortening it shortens the project", `The minimum duration falls from ${N2.duration} to ${N2e.duration} days, a saving of 2 days`, "Other routes (for example A, C, F and B, D, F) now also take 16 days, so any further saving would need more than one activity shortened", "The extra cost of the workers must be weighed against the value of having the hall back 2 days earlier", "Non-financial factors: the hall may be needed for an exam or an event, or pupils may lose lessons while it is closed", "Judgement with a reason: worthwhile if the hall has a fixed date or if the cost is below the value of the two days; otherwise not"], modelAnswer: `Shortening E would reduce the project from ${N2.duration} to ${N2e.duration} days, because E is critical. Other routes then also take 16 days, so no further saving is possible without shortening more activities. Whether it is worthwhile depends on the cost of the extra workers against the value of having the hall back 2 days sooner. If the hall is needed for a fixed event or for exams, it is probably worth it; if not, the school should keep its money.`, hints: ["Recalculate the minimum duration after the change.", "Compare the cost with the value of two days."], explanation: "Weighs the saving, the new critical routes and the cost to a judgement." }),
    ],
    hints: ["The EST of a node is the longest route to it.", "LFT = project duration minus the longest route from the node to the end."],
    explanation: "Node 4 EST 11; node 5 LFT 10; critical activities B, E, G (18 days); C has 2 days of total float.",
  });

  // Practice structured 3 (15 marks): crashing and evaluation
  const crashCost = 450;
  const dCrash = N1.duration - N1c.duration;
  chk(dCrash, 2);
  b.struct({
    d: 5, skill: "EVALUATION",
    stem: `Rudo's Bakery is a fictional business in Mutare. The shop fit-out network is below. Rudo estimates that every day by which the shop opens late loses US\\$180 of profit. She can shorten activity D from 5 days to 3 days by hiring extra workers for US\\$${crashCost}.\n\n${prec(A1)}`,
    parts: [
      P.num({ label: "(a)", marks: 3, kind: "plain", unit: "days", type: "CALCULATION", value: N1.duration, wrong: [15, 19], stem: "Calculate the minimum project duration.", explanation: "Longest path A, C, D, F, G = 2 + 4 + 5 + 4 + 1 = 16 days.", workedSolution: "1. Forward pass: A 0-2, B 2-5, C 2-6, D 6-11, E 6-9, F 11-15, G 15-16.\n2. The largest finish is 16 days." }),
      P.num({ label: "(b)", marks: 3, kind: "plain", unit: "days", type: "CALCULATION", value: N1c.duration, wrong: [13, 15], stem: "Calculate the minimum project duration if D is shortened to 3 days.", explanation: "A, C, D, F, G becomes 2 + 4 + 3 + 4 + 1 = 14 days; A, C, E, F, G is also 2 + 4 + 3 + 4 + 1 = 14 days; B routes are shorter. Minimum duration is 14 days.", workedSolution: "1. D: 6-9. E: 6-9. F starts on day 9 (both finish on day 9) and ends on day 13.\n2. G ends on day 14.\n3. Minimum duration = 14 days." }),
      P.manual({ label: "(c)", marks: 9, stem: "Rudo says: 'The shop's opening date matters more than any other cost.' Evaluate whether she should hire the extra workers.", points: [["Shortening D by 2 days saves 2 days (16 to 14); the route through E now also takes 14 days, so no more can be saved on D", 1], ["Saving: 2 days x US\\$180 = US\\$360 of profit", 2], ["Cost of US\\$450 is more than the US\\$360 saved, so the change loses US\\$90 on the figures", 2], ["The estimate of US\\$180 a day is itself uncertain; benefits such as earlier customer goodwill are not counted", 1], ["Risk of other delays (for example late equipment) makes a margin of time valuable, or the opposite if the shop must open for a fixed event", 1], ["Judgement with a reason: do not hire on the figures unless a fixed opening date makes the days worth more than US\\$225 each", 2]], levels: [[3, 7, 9, "Both durations calculated, the cost and saving compared, uncertainty and a condition considered, and a justified judgement"], [2, 4, 6, "Compares cost with saving with some application; judgement weakly supported"], [1, 1, 3, "States the cost or the saving without a comparison"]], modelAnswer: "Shortening D saves 2 days, because the route through E then also takes 14 days. At US\\$180 a day this saves US\\$360 of profit, but the extra workers cost US\\$450, so on the figures Rudo loses US\\$90. The US\\$180 is only an estimate, and earlier opening could win customer goodwill which the figure leaves out. Against that, other delays may eat the time saved. Rudo should not hire the workers unless the shop must open by a fixed date, such as a launch event, when each day is worth more than US\\$225 to her.", hints: ["Compare the saving in days x the daily loss with the cost.", "Check which route becomes critical after the change."], explanation: "Weighs the saving of US\\$360 against the cost of US\\$450, with the reliability of the estimate and the importance of the date." }),
    ],
    hints: ["Recalculate the longest path after the change.", "Compare the cost with the profit saved."],
    explanation: "Duration 16 days falls to 14 days; the saving of US\\$360 is below the cost of US\\$450.",
  });

  b.card("DEFINITION", "Critical path analysis", "A planning technique that shows the activities of a project, their order and duration, so that the minimum completion time and the activities that cannot be delayed can be found.");
  b.card("DEFINITION", "Critical path", "The longest route through the network. Its activities have zero float, so a delay to any of them delays the whole project.");
  b.card("DEFINITION", "Dummy activity", "An activity of zero duration, used to show that one activity depends on another.");
  b.card("FORMULA", "Earliest start and finish", "Earliest start = largest earliest finish of the activities that precede it. Earliest finish = earliest start + duration.");
  b.card("FORMULA", "Latest finish and start", "Latest finish = smallest latest start of the activities that follow it. Latest start = latest finish - duration.");
  b.card("FORMULA", "Total float", "Total float = latest start - earliest start (the delay possible without delaying the project). Critical activities have zero.");
  b.card("FORMULA", "Free float", "Free float = earliest start of the following activity - earliest finish of this one. It cannot exceed total float.");
  b.card("FACT", "Minimum project duration", "The largest earliest finish in the network, which is also the length of the critical path.");
  b.card("FACT", "Benefits and limitations", "Benefits: shows the minimum time and critical jobs, helps schedule resources and manage delays. Limits: depends on estimated durations, takes time to update, may give false precision.");
  b.card("CONCEPT", "Shortening a critical activity", "Reducing a critical activity shortens the project only until another route becomes equally long; after that there is no further saving.");
});
