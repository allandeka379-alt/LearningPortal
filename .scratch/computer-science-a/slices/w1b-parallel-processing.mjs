// Slice w1b: parallel processing and architectures (acs.cpu.parallel-processing, Cambridge A Level).
import { concept, P, chk, round, CAM } from "../lib.mjs";
import { mc, pm } from "../tables/w1b-q.mjs";

const amdahl = (p, n) => 1 / ((1 - p) + p / n);

concept("acs.cpu.parallel-processing", { file: "cpu/parallel-processing", keyPrefix: "cpu.parallel-processing", applies: CAM }, (b) => {
  mc(b, 1, "RECALL", "In which architecture does one instruction operate on many data items at the same time?",
    ["SIMD", "Correct: single instruction, multiple data."],
    [["SISD", "SISD handles one data item at a time."], ["MISD", "MISD has many instruction streams on one data stream."], ["MIMD", "MIMD runs different instructions on different data."]],
    "SIMD applies the same instruction to many data items.");
  mc(b, 2, "RECALL", "Which is an example of a MIMD computer?",
    ["A multi-core processor with a program on each core", "Correct: each core has its own instructions and data."],
    [["A single-core processor running one program", "That is SISD."], ["A graphics processor applying one instruction to every pixel of an image", "That is SIMD."], ["A basic calculator that adds just two numbers at a time", "That is a single instruction on a single stream of data."]],
    "MIMD: multiple instruction streams and multiple data streams, as in multi-core PCs and clusters.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "Which describes a SISD computer?",
    ["One unit follows one instruction on one data item", "Correct: it is the traditional single-core computer."],
    [["Many processing units follow the same instruction on many data items", "That describes SIMD."], ["Many units run different instructions on different sets of data", "That describes MIMD."], ["Many units run different instructions on one single data stream", "That describes MISD."]],
    "SISD: single instruction stream, single data stream.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "For what purpose is a MISD design sometimes used?",
    ["Comparing the results of units to find faults", "Correct: several units process the same data in different ways."],
    [["Applying one filter to every pixel of a large photograph", "That is a SIMD task."], ["Running ten unrelated programs on ten different cores", "That is MIMD."], ["Running one program on a single core", "That is SISD."]],
    "MISD is rare; one use is fault-tolerant control where several units work on the same input and their results are compared.");
  mc(b, 3, "APPLICATION", "A photo-editing program must lower the brightness of every pixel in a large image by the same amount. Which architecture is best suited?",
    ["SIMD", "Correct: one instruction (subtract) applied to many pixels."],
    [["SISD", "SISD would handle one pixel after another."], ["MISD", "There is only one operation, not several."], ["MIMD with a different program on each processor", "The operation is the same for all pixels, so SIMD is simpler."]],
    "The same operation on many data items is the SIMD pattern.", { hints: ["Is the instruction the same for every pixel?"] });
  mc(b, 3, "ANALYSIS", "What is a disadvantage of shared memory in a computer with a very large number of processors?",
    ["The common memory becomes a bottleneck", "Correct: all processors compete for the same memory."],
    [["Each processor needs to send messages to the others", "That describes distributed memory."], ["The processors cannot run at the same time", "They can, but they compete for memory access."], ["Programs cannot use more than one processor", "Programs can use several processors."]],
    "With shared memory, access to the single memory limits how many processors can be added usefully.", { hints: ["What do all of the processors have in common?"] });
  mc(b, 3, "APPLICATION", "Which task is least suitable for parallel processing?",
    ["A chain of steps that each need the previous result", "Correct: the steps cannot be done at the same time."],
    [["Rendering the frames of an animation, each independent of the others in the film", "Independent frames can be rendered at the same time."], ["Predicting the weather for thousands of separate grid squares", "Each square can be worked on at the same time, with some communication."], ["Searching a very large set of records for one value", "The set can be divided between processors."]],
    "Dependent steps in a chain must be done in order.", { hints: ["Look for a chain of dependent steps."] });
  mc(b, 4, "ANALYSIS", "According to Amdahl's idea, what sets the maximum possible speed-up of a task, however many processors are used?",
    ["The fraction that must run in sequence", "Correct: maximum speed-up = 1 ÷ (1 − p)."],
    [["The clock speed of the slowest processor in use", "The clock speed does not set the theoretical limit."], ["The total number of processors and nothing else", "More processors do not remove the sequential part."], ["The size of the cache memory in each processor", "Cache size is not the limit in Amdahl's idea."]],
    "The sequential part must always be done by one processor, so it limits the speed-up.", { hints: ["What part of the task cannot be shared?"] });
  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "In a massively parallel computer, the processors can work together without any time lost on communication.", answer: false,
    explanation: "False. Sending data between processors and waiting for each other is communication overhead, which limits the gain." });
  b.tf({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "If 90% of a task can be run in parallel, the speed-up can never be more than 10, however many processors are used.", answer: true,
    explanation: "True. The maximum is 1 ÷ (1 − 0.9) = 10 because the sequential 10% must always be done in order." });
  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each computer to its architecture.",
    pairs: [["An old single-core desktop computer", "SISD"], ["A graphics processor changing every pixel with one instruction", "SIMD"], ["A cluster in which each node runs its own program", "MIMD"], ["Control units comparing results on the same sensor data", "MISD"]],
    explanation: "Count the instruction streams and the data streams." });
  b.fib({ d: 2, skill: "UNDERSTANDING", stem: "Complete the names.",
    template: "SISD stands for single instruction, {{blank:a}} data. MIMD stands for {{blank:b}} instruction, multiple data. In a computer with {{blank:c}} memory, each processor has its own memory and messages are sent between them.",
    blanks: [
      { id: "a", accepted: ["single"], choices: ["single", "multiple", "shared", "serial"] },
      { id: "b", accepted: ["multiple"], choices: ["multiple", "single", "mixed", "main"] },
      { id: "c", accepted: ["distributed"], choices: ["distributed", "shared", "virtual", "volatile"] },
    ],
    explanation: "Single instruction, single data; multiple instruction, multiple data; distributed memory." });
  const simd = 640000 / 16;
  chk(simd, 40000);
  b.num({ d: 2, skill: "APPLICATION", calculator: false, stem: "A SIMD processor applies one instruction to 16 data items at a time. How many instructions does it need to process 640 000 data items?",
    value: 40000, wrong: [640000, 10240000], workedSolution: "1. Instructions = items ÷ items per instruction.\n2. 640 000 ÷ 16 = 40 000.", explanation: "640 000 ÷ 16 = 40 000 instructions." });
  chk(round(amdahl(0.9, 5), 2), 3.57);
  b.calc({ d: 4, skill: "APPLICATION", calculator: true, answer: "3.57", tol: 0.01, hints: ["Speed-up = 1 ÷ ((1 − p) + p ÷ n)."],
    stem: "90% of a task can be run in parallel. Calculate the speed-up on 5 processors, to 2 decimal places.",
    value: 3.57, wrong: [4.5, 5], workedSolution: "1. 1 − p = 0.1 and p ÷ n = 0.9 ÷ 5 = 0.18.\n2. 0.1 + 0.18 = 0.28.\n3. Speed-up = 1 ÷ 0.28 = 3.57.", explanation: "1 ÷ 0.28 = 3.57." });
  chk(1 / (1 - 0.9), 10);
  b.calc({ d: 3, skill: "APPLICATION", calculator: false, hints: ["Maximum speed-up = 1 ÷ (1 − p)."],
    stem: "90% of a task can be run in parallel. What is the greatest speed-up that could be obtained with any number of processors?",
    value: 10, wrong: [9, 90], workedSolution: "1. The sequential fraction is 1 − 0.9 = 0.1.\n2. Maximum speed-up = 1 ÷ 0.1 = 10.", explanation: "1 ÷ 0.1 = 10." });
  const t4 = 120 * ((1 - 0.5) + 0.5 / 4);
  chk(t4, 75);
  b.calc({ d: 3, skill: "APPLICATION", calculator: false, unit: "s", hints: ["New time = old time × ((1 − p) + p ÷ n)."],
    stem: "A job takes 120 s on one processor. Half of the job can be shared equally between processors. How long does it take on 4 processors?",
    value: 75, wrong: [30, 60], workedSolution: "1. Sequential part: 0.5 × 120 = 60 s.\n2. Parallel part: 0.5 × 120 ÷ 4 = 15 s.\n3. Total = 60 + 15 = 75 s.", explanation: "120 × (0.5 + 0.125) = 75 s." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4, hints: ["For each: what is the instruction stream and what is the data?"],
    stem: "Describe the SIMD and MIMD architectures and give one example of each. [4]",
    points: ["SIMD: the same instruction is applied to many data items at the same time", "Example of SIMD: a graphics processor changing many pixels", "MIMD: several processors run different instructions on different data at the same time", "Example of MIMD: a multi-core processor or a cluster of computers"],
    modelAnswer: "SIMD applies one instruction to many data items at once, as a graphics processor does for pixels. MIMD has several processors running different instructions on different data, as in a multi-core processor or a cluster.",
    explanation: "Definition and example for each." });
  b.manualShort({ d: 4, skill: "ANALYSIS", marks: 3, hints: ["Sequential part, communication, waiting."],
    stem: "Explain why doubling the number of processors does not double the speed of most tasks. [3]",
    points: ["Part of the task must be done in sequence and cannot be shared", "The processors spend time communicating with each other", "Processors may have to wait for each other or for access to shared memory"],
    modelAnswer: "Part of the task has to be done in order, so extra processors cannot speed it up. The processors also spend time communicating and waiting for each other or for shared memory.",
    explanation: "Sequential part, communication, waiting." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 3, hints: ["Describe each memory type, then one drawback."],
    stem: "Distinguish between shared memory and distributed memory in a parallel computer. [3]",
    points: ["Shared memory: all processors can access one common memory", "Distributed memory: each processor has its own memory and exchanges data by messages", "One drawback: shared memory becomes a bottleneck / distributed memory needs communication to be managed"],
    modelAnswer: "In shared memory all processors use one common memory. In distributed memory each has its own memory and they send messages. Shared memory can become a bottleneck, while distributed memory needs the communication to be managed.",
    explanation: "Definition of each plus a drawback." });
  b.manualShort({ d: 4, skill: "EVALUATION", marks: 3, hints: ["Is each seat's total independent of the others?"],
    stem: "A national election in a small country produces the counts from 10 000 polling stations. Explain whether adding up the counts for each constituency suits parallel processing. [3]",
    points: ["Yes: the counts for different constituencies are independent of each other", "They can be added up on different processors at the same time", "The national total is a sequential step that must wait for all the constituency results"],
    modelAnswer: "Yes. The constituency totals are independent, so different processors can add them at the same time. The national total must wait for all the results, so that step is sequential.",
    explanation: "Independent parts plus a sequential final step." });
  chk(round(amdahl(0.95, 20), 2), 10.26);
  b.struct({ d: 4, skill: "APPLICATION", examStyle: true, hints: ["Speed-up = 1 ÷ ((1 − p) + p ÷ n).", "The maximum is 1 ÷ (1 − p)."],
    explanation: "With p = 0.95: 20 processors give 10.26, the limit is 20, and the sequential 5% prevents this.",
    stem: "A weather centre runs a forecast model on a massively parallel computer. 95% of the calculation can be run in parallel and the rest must run in sequence.",
    parts: [
      P.mcq({ label: "(a)", marks: 1, stem: "Which architecture describes a cluster of processors, each running its own instructions on its own part of the data?", options: [["MIMD", "Correct."], ["SISD", "SISD has one processing unit."], ["SIMD", "SIMD runs the same instruction on all data."], ["MISD", "MISD has one data stream."]], answer: "A", explanation: "Multiple instruction streams on multiple data streams is MIMD." }),
      P.num({ label: "(b)", marks: 3, stem: "Calculate the speed-up using 20 processors, to 2 decimal places.", value: 10.26, answer: "10.26", tol: 0.01, wrong: [20, 19],
        workedSolution: "1. 1 − p = 0.05; p ÷ n = 0.95 ÷ 20 = 0.0475.\n2. Sum = 0.0975.\n3. Speed-up = 1 ÷ 0.0975 = 10.26.", explanation: "1 ÷ 0.0975 = 10.26." }),
      P.num({ label: "(c)", marks: 1, stem: "State the greatest possible speed-up with any number of processors.", value: 20, wrong: [95, 19], workedSolution: "1. Maximum = 1 ÷ (1 − 0.95) = 1 ÷ 0.05 = 20.", explanation: "1 ÷ 0.05 = 20." }),
      P.manual({ label: "(d)", marks: 3, stem: "Explain why the speed-up with 20 processors is much less than 20.", points: ["5% of the work must be done in sequence by one processor", "The processors spend time communicating with each other (communication overhead)", "Processors may have to wait for each other or for access to shared memory"], modelAnswer: "5% of the work cannot be shared and is done in sequence. The processors also lose time communicating and waiting for each other or for shared memory.", explanation: "Sequential part and overhead." }),
    ] });
  b.struct({ d: 3, skill: "UNDERSTANDING", examStyle: true, hints: ["Is the same operation applied to every item?"],
    explanation: "Applying one operation to every item suits SIMD; 64 items per instruction needs 1/64 of the instructions.",
    stem: "A graphics processor in a tablet changes the colour of every pixel of an image of 1 024 000 pixels using SIMD, with 64 pixels handled by each instruction.",
    parts: [
      P.short({ label: "(a)", marks: 1, stem: "Write out in full what SIMD stands for.", accepted: ["single instruction multiple data", "single instruction, multiple data"], wrong: ["single instruction single data"], explanation: "SIMD is single instruction, multiple data." }),
      P.num({ label: "(b)", marks: 2, stem: "Calculate the number of instructions needed to change all of the pixels.", value: 16000, wrong: [64, 1024000], workedSolution: "1. 1 024 000 ÷ 64 = 16 000.", explanation: "1 024 000 ÷ 64 = 16 000 instructions." }),
      P.manual({ label: "(c)", marks: 3, stem: "Explain why this task suits SIMD but a task such as running a spreadsheet and a music player together suits MIMD.", points: ["The same operation is applied to every pixel, so one instruction can handle many pixels", "The spreadsheet and music player run different instructions", "On different data, so separate processors or cores can run them independently"], modelAnswer: "In the image the same operation applies to every pixel, so one instruction can handle many. A spreadsheet and a music player run different instructions on different data, so separate cores can work independently.", explanation: "Same operation against different operations." }),
    ] });
  b.card("DEFINITION", "SISD", "Single instruction, single data: one processing unit, one instruction at a time on one data item.");
  b.card("DEFINITION", "SIMD", "Single instruction, multiple data: one instruction applied to many data items; used by graphics processors.");
  b.card("DEFINITION", "MISD", "Multiple instruction, single data: rare; used where several units process the same data and results are compared.");
  b.card("DEFINITION", "MIMD", "Multiple instruction, multiple data: several processors run different instructions on different data; multi-core PCs and clusters.");
  b.card("CONCEPT", "Shared and distributed memory", "Shared: one common memory, can bottleneck. Distributed: each processor has its own memory and messages are sent.");
  b.card("FORMULA", "Amdahl speed-up", "Speed-up = 1 ÷ ((1 − p) + p ÷ n), where p is the parallel fraction.");
  b.card("FORMULA", "Maximum speed-up", "1 ÷ (1 − p): the sequential part sets the limit.");
  b.card("CONCEPT", "What suits parallel processing", "Large problems split into independent parts with little communication, such as weather forecasting and simulation.");
});
