import { schedule, ganttMd, mdTable, chk, same, round } from "../lib.mjs";
export const procs = [{ id: "A", arrival: 0, burst: 6 }, { id: "B", arrival: 1, burst: 3 }, { id: "C", arrival: 2, burst: 4 }, { id: "D", arrival: 5, burst: 2 }];
const tab = (r) => mdTable(["Process", "Arrival", "Burst", "Completion", "Turnaround", "Waiting"], [...r.table.map((x) => [x.id, x.arrival, x.burst, x.completion, x.turnaround, x.waiting]), ["**Mean**", "", "", "", round(r.avgTurnaround, 2), round(r.avgWaiting, 2)]]);
const res = {};
for (const [k, a, q] of [["fcfs", "FCFS"], ["sjf", "SJF"], ["srt", "SRT"], ["rr", "RR", 2]]) res[k] = schedule(procs, a, q);
export { res };
// checks by hand-derivation
same(res.fcfs.gantt.map((g) => `${g.id}${g.start}-${g.end}`), ["A0-6", "B6-9", "C9-13", "D13-15"]);
chk(res.fcfs.avgWaiting, (0 + 5 + 7 + 8) / 4);
same(res.sjf.gantt.map((g) => `${g.id}${g.start}-${g.end}`), ["A0-6", "D6-8", "B8-11", "C11-15"]);
const compare = mdTable(["Algorithm", "Mean waiting time", "Mean turnaround time"], [["First come first served", res.fcfs], ["Shortest job first", res.sjf], ["Shortest remaining time", res.srt], ["Round robin (quantum 2)", res.rr]].map(([n, r]) => [n, round(r.avgWaiting, 2), round(r.avgTurnaround, 2)]));
const states = mdTable(["Transition", "Cause"], [["Ready → Running", "The scheduler gives the process the processor"], ["Running → Ready", "The time slice ends, or a higher-priority process is ready (pre-emption)"], ["Running → Blocked", "The process asks for an input or output operation and must wait"], ["Blocked → Ready", "The input or output completes (an interrupt tells the OS)"]]);
export const snips = {
  procTable: mdTable(["Process", "Arrival time", "Burst time"], procs.map((p) => [p.id, p.arrival, p.burst])),
  fcfsG: ganttMd(res.fcfs.gantt), fcfsT: tab(res.fcfs),
  sjfG: ganttMd(res.sjf.gantt), sjfT: tab(res.sjf),
  srtG: ganttMd(res.srt.gantt), srtT: tab(res.srt),
  rrG: ganttMd(res.rr.gantt), rrT: tab(res.rr),
  compare, states,
};
if (process.argv[1].endsWith("w2a-process-scheduling.mjs")) for (const [k, v] of Object.entries(snips)) console.log(`--- ${k}\n${v}`);
