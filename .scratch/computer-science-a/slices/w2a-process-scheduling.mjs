// Slice w2a: process management and scheduling (acs.os.process-scheduling, Cambridge A Level).
import { concept, P, chk, same, CAM, schedule, ganttMd, mdTable, round } from "../lib.mjs";
import { mc } from "../tables/w2a-q.mjs";

const procTable = (ps) => mdTable(["Process", "Arrival time", "Burst time"], ps.map((p) => [p.id, p.arrival, p.burst]));
const row = (r, id) => r.table.find((x) => x.id === id);

concept("acs.os.process-scheduling", { file: "os/process-scheduling", keyPrefix: "os.process-scheduling", applies: CAM }, (b) => {
  const S1 = [{ id: "P1", arrival: 0, burst: 5 }, { id: "P2", arrival: 1, burst: 3 }, { id: "P3", arrival: 3, burst: 2 }, { id: "P4", arrival: 4, burst: 4 }];
  const fcfs = schedule(S1, "FCFS"), sjf = schedule(S1, "SJF"), srt = schedule(S1, "SRT"), rr = schedule(S1, "RR", 2);
  chk(fcfs.avgWaiting, 3.75); chk(sjf.avgWaiting, 3.5); chk(srt.avgWaiting, 3); chk(rr.avgWaiting, 5.75);
  chk(row(sjf, "P3").completion, 7); chk(row(rr, "P2").turnaround, 10); chk(row(srt, "P1").waiting, 5);
  chk(srt.gantt.length - 1, 4); // changes of process in SRT
  const S2 = [{ id: "X", arrival: 0, burst: 4 }, { id: "Y", arrival: 2, burst: 6 }, { id: "Z", arrival: 3, burst: 2 }];
  const rr2 = schedule(S2, "RR", 3), fc2 = schedule(S2, "FCFS");
  same(rr2.gantt.map((g) => `${g.id}${g.start}-${g.end}`), ["X0-3", "Y3-6", "Z6-8", "X8-9", "Y9-12"]);
  chk(row(rr2, "Z").waiting, 3); chk(row(rr2, "X").completion, 9); chk(rr2.avgWaiting, 4);
  chk(fc2.avgWaiting, 3);

  // ---- multiple choice
  mc(b, 2, "UNDERSTANDING", "A running process asks to read a file from the disk and cannot continue until the data arrives. Into which state does the OS move it?",
    ["Blocked", "Correct: it is waiting for an event."],
    [["Ready", "Ready processes could run if given the processor."], ["Running", "It cannot use the processor while it waits."], ["Terminated", "The process has not finished."]],
    "Waiting for input or output puts a process into the blocked state.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "In round robin scheduling, what happens when a process has used up its time slice but has not finished?",
    ["It goes to the back of the ready queue", "Correct: the next process then runs."],
    [["It is deleted from memory", "It still has work to do."], ["It goes to the blocked state until the user types", "It is not waiting for an event."], ["It continues until it finishes", "That would be non-pre-emptive."]],
    "The process moves from running to ready, at the back of the queue.", { daily: true });
  mc(b, 3, "UNDERSTANDING", "Which statement describes a pre-emptive scheduling routine?",
    ["The OS may take the processor from a process before it has finished", "Correct."],
    [["Every process runs to the end before the next one is allowed to start", "That is non-pre-emptive."], ["Only one process can ever be in the ready state", "Many processes can be ready."], ["The processor is shared only when a process blocks", "That is also non-pre-emptive."]],
    "Pre-emption means taking the processor away, for example at the end of a time slice.", { hints: ["Think about what the word pre-empt means."] });
  mc(b, 3, "ANALYSIS", "What is a weakness of shortest job first scheduling?",
    ["A long process may wait if shorter ones keep arriving", "Correct."],
    [["It cannot be used when there is more than one process in the system", "It is designed for several processes."], ["It always has the highest mean waiting time of all four routines", "It usually gives a low mean waiting time."], ["It needs every process to have exactly the same burst time", "It is the differences in burst time that it uses."]],
    "Long jobs can be starved; SJF also needs the burst times to be known.", { hints: ["What happens to a long job if shorter ones keep arriving?"] });
  mc(b, 3, "APPLICATION", "A process arrives at time 3, has a burst time of 4 and completes at time 12. What is its waiting time?",
    ["5", "Correct: turnaround = 12 - 3 = 9, and waiting = 9 - 4."],
    [["9", "That is the turnaround time."], ["8", "That is the completion time minus the burst time, forgetting the arrival."], ["4", "That is the burst time."]],
    "Waiting time = turnaround - burst = (12 - 3) - 4 = 5.", { hints: ["Turnaround time is completion minus arrival."], calculator: false });
  mc(b, 3, "UNDERSTANDING", "What does the kernel do when a timer interrupt shows that the time slice of the running process has ended?",
    ["It saves the process's registers and starts the scheduler", "Correct: this is a context switch."],
    [["It terminates the running process", "The process is only moved back to ready."], ["It sends the process to secondary storage permanently", "A time slice end does not do that."], ["It ignores the interrupt until the process ends", "A timer interrupt is acted on at once."]],
    "The kernel acts as the interrupt handler, saving the state and calling the scheduler.", { hints: ["The registers must be kept so that the process can resume."] });
  mc(b, 2, "UNDERSTANDING", "Which is a reason for using multi-tasking?",
    ["Another process can use the processor while one waits for I/O", "Correct."],
    [["Each process is given a separate processor of its own to use", "A single processor is shared."], ["Processes no longer need any main memory while they run", "Each process still needs memory."], ["Programs run faster than the processor is able to execute them", "The processor speed is unchanged."]],
    "Sharing the processor stops it sitting idle while a process waits.");

  // ---- true / false, matching, fill in the blank
  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "A process in the blocked state can move directly to the running state when the event it was waiting for occurs.", answer: false,
    explanation: "False. It moves to the ready state and must wait to be chosen by the scheduler." });
  b.tf({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "Shortest remaining time scheduling is the pre-emptive version of shortest job first.", answer: true,
    explanation: "True. SRT can interrupt the running process when a process with a shorter remaining time arrives." });
  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each scheduling routine to its description.",
    pairs: [["First come first served", "Processes run in the order in which they arrive"], ["Shortest job first", "The ready process with the shortest burst runs next, without pre-emption"], ["Shortest remaining time", "A newly arrived process with less time left takes the processor"], ["Round robin", "Each process runs for a fixed time slice in turn"]],
    explanation: "The four routines differ in how the next process is chosen and whether it can be pre-empted." });
  b.fib({ d: 2, skill: "UNDERSTANDING", stem: "Complete the statements about the process states.",
    template: "A process that is using the processor is {{blank:a}}. A process that can run but is waiting for the processor is {{blank:b}}. A process that is waiting for an input or output operation is {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["running"], choices: ["running", "ready", "blocked", "stopped"] },
      { id: "b", accepted: ["ready"], choices: ["ready", "running", "blocked", "stopped"] },
      { id: "c", accepted: ["blocked"], choices: ["blocked", "ready", "running", "stopped"] },
    ], explanation: "Running, ready and blocked." });

  // ---- numerical
  b.calc({ d: 3, skill: "APPLICATION", calculator: false, hints: ["Run the processes in order of arrival and use waiting = completion - arrival - burst."],
    stem: "Four processes are scheduled by first come first served:\n\n" + procTable(S1) + "\n\nCalculate the mean waiting time.",
    value: fcfs.avgWaiting, wrong: [7.25, 5], unit: undefined, workedSolution: `1. Order: P1 (0-5), P2 (5-8), P3 (8-10), P4 (10-14).\n2. Waiting times: P1 0, P2 4, P3 5, P4 6.\n3. Mean = (0 + 4 + 5 + 6) ÷ 4 = 3.75.`, explanation: "Mean waiting time = 15 ÷ 4 = 3.75." });
  b.num({ d: 3, skill: "APPLICATION", calculator: false, hints: ["At time 5 the ready processes are P2, P3 and P4. Which has the shortest burst?"],
    stem: "Using the processes in the previous question and shortest job first (non-pre-emptive), at what time does P3 complete?",
    value: row(sjf, "P3").completion, wrong: [10, 5], workedSolution: "1. P1 runs 0-5 (the only process until time 1; non-pre-emptive).\n2. At time 5, P2 (3), P3 (2) and P4 (4) are ready; P3 has the shortest burst.\n3. P3 runs 5-7 and completes at 7.", explanation: "P3 is chosen first at time 5 and completes at 7." });
  b.num({ d: 4, skill: "APPLICATION", calculator: false, hints: ["Build the queue carefully at each time: new arrivals join before the process that has just been pre-empted."],
    stem: "The same processes are scheduled by round robin with a time slice of 2. A process that arrives during a slice joins the ready queue before the process that has just used its slice. What is the turnaround time of P2?",
    value: row(rr, "P2").turnaround, wrong: [11, 7], workedSolution: "1. P1 0-2, P2 2-4, P1 4-6, P3 6-8, P4 8-10, P2 10-11, P1 11-12, P4 12-14.\n2. P2 completes at 11.\n3. Turnaround = 11 - 1 = 10.", explanation: "P2 completes at 11 and arrived at 1: 10." });
  b.num({ d: 4, skill: "ANALYSIS", calculator: false, hints: ["Count the number of separate pieces in the shortest remaining time Gantt chart."],
    stem: `With shortest remaining time scheduling the processes above run in this order: ${srt.gantt.map((g) => g.id).join(", ")}. How many times does the processor switch from one process to a different process?`,
    value: srt.gantt.length - 1, wrong: [3, 5], workedSolution: `1. The order has ${srt.gantt.length} pieces.\n2. Between them there are ${srt.gantt.length - 1} switches.`, explanation: `${srt.gantt.length} pieces give ${srt.gantt.length - 1} switches.` });
  b.short({ d: 2, skill: "RECALL", stem: "Name the scheduling routine that gives each process a fixed time slice in turn.", accepted: ["round robin", "RR"], wrong: ["first come first served", "shortest job first"], explanation: "Round robin." });

  // ---- self-marked
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 3, hints: ["Think about what the processor does while a process waits for the disk."],
    stem: "Explain why an operating system uses scheduling. [3]",
    points: ["To keep the processor busy / make best use of it, for example when a process is waiting for input or output", "To share the processor fairly between processes", "To keep the response time for the user acceptable"],
    modelAnswer: "Scheduling keeps the processor busy by running another process when one is waiting for input or output, shares the processor fairly between processes, and keeps response times acceptable for the user.",
    explanation: "Utilisation, fairness, responsiveness." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 3, hints: ["Name the state and the event that causes each move."],
    stem: "Describe the three states of a process and one transition between two of them. [3]",
    points: ["Running: the process is using the processor", "Ready: able to run, waiting for the processor; blocked: waiting for an event such as an input or output operation", "A transition with its cause, for example running to ready at the end of the time slice"],
    modelAnswer: "A running process is using the processor. A ready process can run but is waiting for the processor, and a blocked process is waiting for an event such as the completion of input or output. For example, a running process moves to ready when its time slice ends.",
    explanation: "Three states and a transition." });
  b.manualShort({ d: 4, skill: "EVALUATION", marks: 4, hints: ["Compare fairness, response time and the cost of switching."],
    stem: "A school computer is used by many students at once, each running programs and expecting quick responses. Explain why round robin scheduling is suitable. [4]",
    points: ["Each process is given a turn in a fixed time slice", "No student's program waits a long time before getting the processor", "Short jobs are not held up by a long job", "The response seems quick to every user, although switching costs some processing time"],
    modelAnswer: "Each process gets a short turn in a fixed time slice, so no student's program waits a long time and a short job is not held up by a long one. Every user sees a quick response, although each switch costs some processing time.",
    explanation: "Fairness and response, with the overhead acknowledged." });

  // ---- structured practice
  b.struct({ d: 4, skill: "APPLICATION", examStyle: true, hints: ["Round robin: the process whose slice ends goes to the back of the queue.", "Waiting time = completion - arrival - burst."],
    explanation: "Round robin with a time slice of 3 on three processes.",
    stem: "Three processes arrive at a computer in a school office:\n\n" + procTable(S2) + "\n\nThey are scheduled by round robin with a time slice of 3. A process that arrives during a slice joins the queue before the process that has just used its slice.",
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "At what time does process Z first start running?", value: 6, wrong: [3, 8], workedSolution: "1. X runs 0-3, then Y 3-6 (Y and Z have both arrived; Y joined first).\n2. Z starts at 6.", explanation: "Z starts at 6." }),
      P.num({ label: "(b)", marks: 1, stem: "At what time does process X complete?", value: row(rr2, "X").completion, wrong: [4, 12], workedSolution: "1. X needs 4 and runs 3 in its first slice, then goes to the back.\n2. The order is X 0-3, Y 3-6, Z 6-8, X 8-9, Y 9-12.\n3. X completes at 9.", explanation: "X completes at 9." }),
      P.num({ label: "(c)", marks: 2, stem: "Calculate the waiting time of process Z.", value: row(rr2, "Z").waiting, wrong: [5, 6], type: "CALCULATION", workedSolution: "1. Z completes at 8, arrived at 3, burst 2.\n2. Turnaround = 8 - 3 = 5.\n3. Waiting = 5 - 2 = 3.", explanation: "Waiting time is 3." }),
      P.num({ label: "(d)", marks: 1, stem: "Calculate the mean waiting time of the three processes.", value: rr2.avgWaiting, wrong: [3, 5], type: "CALCULATION", workedSolution: "1. Waiting times: X 5, Y 4, Z 3.\n2. Mean = (5 + 4 + 3) ÷ 3 = 4.", explanation: "Mean waiting time = 4." }),
      P.manual({ label: "(e)", marks: 3, stem: "The mean waiting time with first come first served is 3. Compare this with round robin for these processes and give one advantage of round robin.", points: ["FCFS has the lower mean waiting time here (3 compared with 4)", "Round robin gives each process a turn soon after it arrives / more even response", "Short processes are not held behind long ones"], modelAnswer: "FCFS gives the lower mean waiting time (3 against 4), but round robin gives every process a turn soon after it arrives, so short processes are not held behind long ones.", explanation: "Compare the numbers, then name an advantage." }),
    ] });
  b.struct({ d: 3, skill: "APPLICATION", examStyle: true, hints: ["Match each event to a transition."],
    explanation: "Transitions follow from the events.",
    stem: "A word processor, a music player and a print job are running on a computer in a shop in Hwange. Each is a process.",
    parts: [
      P.mcq({ label: "(a)", marks: 1, stem: "The print job is waiting for the printer to finish a page. Which state is it in?", options: [["Blocked", "Correct."], ["Running", "It is not using the processor."], ["Ready", "It cannot run until the printer finishes."], ["Complete", "It has not finished."]], answer: "A", explanation: "Waiting for a device is the blocked state." }),
      P.mcq({ label: "(b)", marks: 1, stem: "The printer finishes the page and sends an interrupt. What happens to the print job?", options: [["It moves to the ready state", "Correct."], ["It moves directly to the running state", "It must wait for the scheduler."], ["It is deleted", "It has more to print."], ["It moves back to the blocked state", "The event has occurred."]], answer: "A", explanation: "Blocked to ready." }),
      P.manual({ label: "(c)", marks: 2, stem: "The music player's time slice ends. Describe what the kernel does.", points: ["It saves the music player's registers / state and moves it to the ready queue", "It runs the scheduler and loads the registers of the next process"], modelAnswer: "The kernel saves the registers of the music player and puts it in the ready queue, then runs the scheduler and loads the registers of the next process.", explanation: "Save, schedule, load." }),
    ] });

  // ---- flashcards
  b.card("DEFINITION", "Process", "A program being executed, with the resources it is using.");
  b.card("DEFINITION", "Multi-tasking", "Running several processes at the same time by sharing the processor between them.");
  b.card("FACT", "Process states", "Running (using the processor), ready (waiting for the processor), blocked (waiting for an event such as input or output).");
  b.card("FACT", "Transitions", "Ready to running (scheduled); running to ready (time slice ends); running to blocked (waits for I/O); blocked to ready (I/O completes).");
  b.card("FORMULA", "Turnaround and waiting time", "Turnaround = completion - arrival. Waiting = turnaround - burst.");
  b.card("CONCEPT", "Round robin", "Each process runs for a fixed time slice, then goes to the back of the ready queue; pre-emptive and fair.");
  b.card("CONCEPT", "SJF and SRT", "SJF: shortest burst runs next, no pre-emption. SRT: pre-empts when a process with a shorter remaining time arrives.");
  b.card("CONCEPT", "First come first served", "Runs in order of arrival; simple but a long job at the front delays the rest.");
  b.card("CONCEPT", "Kernel as interrupt handler", "Saves the running process's registers, runs the scheduler and loads the next process's registers (a context switch).");
});
