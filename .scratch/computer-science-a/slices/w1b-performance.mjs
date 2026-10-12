// Slice w1b: processor performance (acs.cpu.performance, both boards).
import { concept, P, chk, round } from "../lib.mjs";
import { mc, pm } from "../tables/w1b-q.mjs";

const amat = (h, tc, tm) => h * tc + (1 - h) * tm;

concept("acs.cpu.performance", { file: "cpu/performance", keyPrefix: "cpu.performance" }, (b) => {
  mc(b, 1, "RECALL", "What does the clock speed of a processor measure?",
    ["The number of cycles per second", "Correct: it is measured in hertz."],
    [["The number of cores in the processor chip", "Cores are counted separately from clock speed."], ["The size of the cache in megabytes of memory", "Cache size is measured in bytes."], ["The width of the data bus in bits", "Bus width is measured in bits, not hertz."]],
    "Clock speed is the number of cycles per second, in hertz (Hz, MHz, GHz).");
  mc(b, 2, "UNDERSTANDING", "What happens on a cache hit?",
    ["The data is found in the cache", "Correct: no access to main memory is needed."],
    [["The data is missing and is fetched from main memory", "That describes a cache miss."], ["The processor stops until the clock catches up", "The processor does not stop on a hit."], ["The data is deleted from main memory", "A cache holds copies; main memory is not erased."]],
    "A hit means the required data is already in the cache.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "Which is a reason why raising the clock speed beyond a certain point gives diminishing returns?",
    ["The processor gets hotter and may have to slow down", "Correct: heat and power limit how fast the clock can go."],
    [["The processor needs fewer instructions at a higher speed", "The number of instructions needed does not change with the clock."], ["Main memory becomes faster automatically as well", "Memory speed is independent of the processor clock."], ["The cache is switched off at a very high clock speed", "The cache is not switched off by a faster clock."]],
    "Heat, power use and waiting for slower memory all limit the benefit of a faster clock.", { daily: true });
  mc(b, 3, "APPLICATION", "Which task is most likely to run much faster on a four-core processor than on a single-core processor of the same clock speed?",
    ["Converting four separate video files at the same time", "Correct: the four jobs are independent and can run on different cores."],
    [["Adding up a long list in which each step needs the previous result", "Each step depends on the one before, so it cannot be shared."], ["Waiting for a user to type a password", "The delay is caused by the user, not the processor."], ["Reading one value from a slow USB drive", "The speed is limited by the drive."]],
    "Independent tasks can run on different cores. Tasks where each step depends on the last cannot be split.", { hints: ["Look for work that can be divided into independent parts."] });
  mc(b, 3, "ANALYSIS", "A program is written to run as one sequence of dependent steps. It is run on a processor with eight cores instead of two. What is the most likely effect?",
    ["Little or no improvement, because only one core can run it", "Correct: the steps cannot be shared between cores."],
    [["It runs four times faster because there are four times as many cores", "Extra cores do not help a single sequence."], ["It runs slower because the extra cores slow the clock", "The clock is not automatically slowed by extra cores."], ["It runs correctly only if the cache is removed", "The cache is not related to this."]],
    "Without parallel code, only one core does the work, so more cores make no real difference.", { hints: ["What can a second core do if the next step needs the result of the one before?"] });
  mc(b, 3, "UNDERSTANDING", "How does a larger cache usually affect performance?",
    ["More data is found without visiting main memory", "Correct: the hit rate rises, so the average access time falls."],
    [["The clock speed of the processor rises automatically", "Cache size does not change the clock speed."], ["The address bus becomes wider", "The width of the address bus is a separate design feature."], ["Main memory becomes non-volatile", "Cache does not change the nature of main memory."]],
    "A larger cache holds more frequently used data, so there are more hits.", { hints: ["Think about hits and misses."] });
  mc(b, 4, "EVALUATION", "A user complains that her computer is slow whenever she opens several large spreadsheets, and the system monitor shows that most of the RAM is in use and the disk is working constantly. Which upgrade is the most appropriate?",
    ["Fit more RAM", "Correct: there is less need to swap data to the slow disk."],
    [["Fit a faster printer", "A printer has no effect on memory use."], ["Fit a second display", "A display does not affect memory or disk use."], ["Replace the keyboard with a wireless one", "A keyboard has no effect on performance in this case."]],
    "When RAM is full the system moves data to and from the disk, which is slow. More RAM reduces this.", { hints: ["What happens when the RAM is nearly full?"] });
  b.tf({ d: 2, skill: "RECALL", stem: "Cache memory is larger than main memory.", answer: false,
    explanation: "False. Cache is small and very fast; main memory is much larger and slower." });
  b.tf({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "Doubling the number of cores always doubles the speed of every program.", answer: false,
    explanation: "False. Only work that can be split between cores speeds up; programs with a serial part gain less." });
  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each factor to its effect on performance.",
    pairs: [["Higher clock speed", "More cycles per second, but more heat"], ["More cores", "More tasks at the same time"], ["Wider data bus", "More bits moved in each transfer"], ["Larger cache", "More data found without using main memory"], ["Wider address bus", "More memory can be addressed"]],
    explanation: "Each factor improves a different part of the system." });
  b.fib({ d: 2, skill: "UNDERSTANDING", stem: "Complete the description of a cache.",
    template: "A cache is made of {{blank:a}} memory, which is faster than main memory. When the data needed is in the cache it is called a {{blank:b}}; when it is not, the data is fetched from {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["SRAM"], choices: ["SRAM", "DRAM", "ROM", "flash"] },
      { id: "b", accepted: ["hit"], choices: ["hit", "miss", "buffer", "refresh"] },
      { id: "c", accepted: ["main memory"], choices: ["main memory", "the registers", "the keyboard", "the clock"] },
    ],
    explanation: "Cache is SRAM; a hit is found in the cache; a miss goes to main memory." });
  chk(3e9 / 3, 1e9);
  b.num({ d: 2, skill: "APPLICATION", stem: "A processor runs at 3 GHz (3 000 000 000 cycles per second) and an average instruction needs 3 cycles. How many instructions does it carry out each second?",
    value: 1e9, wrong: [9e9, 3e9], workedSolution: "1. Instructions per second = cycles per second ÷ cycles per instruction.\n2. 3 000 000 000 ÷ 3 = 1 000 000 000.", explanation: "3 000 000 000 ÷ 3 = 1 000 000 000 instructions per second." });
  chk(6e9 / 3e9, 2);
  b.num({ d: 2, skill: "APPLICATION", unit: "s", stem: "How long does a 3 GHz processor take to complete 6 000 000 000 clock cycles?",
    value: 2, wrong: [18, 0.5], workedSolution: "1. Time = cycles ÷ cycles per second.\n2. 6 000 000 000 ÷ 3 000 000 000 = 2 s.", explanation: "6 × 10^9 ÷ 3 × 10^9 = 2 seconds." });
  const a95 = amat(0.96, 5, 100);
  chk(round(a95, 2), 8.8);
  b.calc({ d: 3, skill: "APPLICATION", unit: "ns", answer: "8.8", hints: ["Average = hit rate × cache time + miss rate × memory time."],
    stem: "A cache is read in 5 ns and main memory in 100 ns. The hit rate is 96%. Assume a miss costs the full 100 ns. Calculate the average memory access time in nanoseconds.",
    value: 8.8, wrong: [5, 105], workedSolution: "1. Hits: 0.96 × 5 = 4.8 ns.\n2. Misses: 0.04 × 100 = 4 ns.\n3. Average = 4.8 + 4 = 8.8 ns.", explanation: "0.96 × 5 + 0.04 × 100 = 8.8 ns." });
  const t4 = 12 * (0.2 + 0.8 / 4);
  chk(t4, 4.8);
  b.calc({ d: 4, skill: "ANALYSIS", unit: "s", answer: "4.8", hints: ["Time = 12 × (serial fraction + parallel fraction ÷ number of cores)."],
    stem: "A job takes 12 s on one core. 20% of the job must run in sequence and the other 80% can be shared equally between cores. How long does the job take on 4 cores?",
    value: 4.8, wrong: [3, 7.2], workedSolution: "1. Serial part: 0.2 × 12 = 2.4 s.\n2. Parallel part on 4 cores: 0.8 × 12 ÷ 4 = 2.4 s.\n3. Total = 2.4 + 2.4 = 4.8 s.", explanation: "12 × (0.2 + 0.2) = 4.8 s." });
  chk(9 / 2 + 3, 7.5);
  b.calc({ d: 4, skill: "ANALYSIS", unit: "s", answer: "7.5", hints: ["Only the computing time halves."],
    stem: "A program takes 12 s: 9 s of computing and 3 s of waiting for main memory. The clock speed is doubled and the memory is unchanged. How long does the program now take?",
    value: 7.5, wrong: [6, 4.5], workedSolution: "1. Computing time: 9 ÷ 2 = 4.5 s.\n2. Waiting time stays 3 s.\n3. Total = 4.5 + 3 = 7.5 s.", explanation: "Only the computing part is faster: 4.5 + 3 = 7.5 s." });
  b.manualShort({ d: 3, skill: "ANALYSIS", marks: 3, hints: ["Mention heat or power, and waiting for memory."],
    stem: "Explain why doubling the clock speed of a processor does not double the speed of the whole computer. [3]",
    points: ["The processor may spend time waiting for main memory or the bus, which do not get faster", "A higher clock produces more heat, which may force the processor to slow down", "More power is used, so battery life is shorter / cooling is needed"],
    modelAnswer: "The processor still waits for slower main memory and buses. A faster clock also produces more heat and uses more power, so the speed has to be limited.",
    explanation: "Waiting, heat, power." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4, hints: ["Define hit and miss, then the benefit."],
    stem: "Explain how cache memory improves the performance of a computer. [4]",
    points: ["Cache is small, fast memory between the processor and main memory", "It holds copies of data and instructions that are used often", "When the data is in the cache (a hit) it is read quickly without using slow main memory", "If it is not (a miss), it is fetched from main memory and copied to the cache for next time"],
    modelAnswer: "Cache is small, fast memory next to the processor that holds frequently used data and instructions. A hit gives data without going to slow main memory. On a miss the data is fetched from main memory and copied into the cache.",
    explanation: "Location, content, hit, miss." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 3, hints: ["One situation where it helps and one where it does not."],
    stem: "Explain when adding more cores to a processor improves performance and when it does not. [3]",
    points: ["It helps when several programs run at the same time", "It helps when a program is written so that its work is split into parts that run together", "It does not help when the program is a single sequence of dependent steps / only one core can be used"],
    modelAnswer: "More cores help when several programs run together or a program splits its work. They do not help a program that is a single sequence of dependent steps.",
    explanation: "Two cases that benefit and one that does not." });
  chk(2.0e9 / 4, 5e8); chk(3.2e9 / 4, 8e8);
  b.struct({ d: 4, skill: "EVALUATION", examStyle: true, hints: ["Instructions per second = cycles per second ÷ cycles per instruction.", "Think about what a user who runs many programs needs."],
    explanation: "A: 500 million instructions per second; B: 800 million. B is faster on one task but A has more cores and cache, which suits many programs.",
    stem: "A shop in Gweru sells two laptops. Laptop A has 4 cores, a 2.0 GHz clock and 8 MiB of cache. Laptop B has 2 cores, a 3.2 GHz clock and 2 MiB of cache. On both, an average instruction takes 4 clock cycles.",
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the number of instructions per second that one core of laptop A can carry out.", value: 500000000, wrong: [2000000000, 8000000000],
        workedSolution: "1. Cycles per second = 2 000 000 000.\n2. Instructions per second = 2 000 000 000 ÷ 4 = 500 000 000.", explanation: "2.0 GHz ÷ 4 cycles = 500 million instructions per second." }),
      P.num({ label: "(b)", marks: 2, stem: "Calculate the number of instructions per second that one core of laptop B can carry out.", value: 800000000, wrong: [3200000000, 1280000000],
        workedSolution: "1. Cycles per second = 3 200 000 000.\n2. Instructions per second = 3 200 000 000 ÷ 4 = 800 000 000.", explanation: "3.2 GHz ÷ 4 cycles = 800 million instructions per second." }),
      P.mcq({ label: "(c)", marks: 1, stem: "Which laptop is likely to be better at running several programs at once?", options: [["Laptop A, with 4 cores", "Correct: more cores can run more programs together."], ["Laptop B, with the faster clock", "A faster clock helps each program, but B has only two cores."], ["Neither, because they use the same cycles per instruction", "The core counts and the cache sizes differ."], ["Laptop B, because it has the smaller cache", "A smaller cache does not help."]], answer: "A", explanation: "Four cores run more tasks together." }),
      P.manual({ label: "(d)", marks: 3, stem: "A student runs a web browser, a word processor and a music player at the same time. Recommend one of the laptops and justify your choice.", points: ["Recommends laptop A", "It has 4 cores so the programs can run at the same time", "It has a larger cache so more data is found without using main memory"], modelAnswer: "Laptop A, because its four cores let the three programs run at the same time, and its larger cache reduces trips to main memory.", explanation: "Choice plus two linked reasons." }),
    ] });
  chk(round(amat(0.9, 3, 60), 2), 8.7);
  b.struct({ d: 3, skill: "APPLICATION", examStyle: true, hints: ["Average = hit rate × cache time + miss rate × memory time."],
    explanation: "Average = 0.9 × 3 + 0.1 × 60 = 8.7 ns; a larger cache raises the hit rate and lowers the average.",
    stem: "A processor has a cache that takes 3 ns to read and main memory that takes 60 ns to read. The hit rate is 90%. Assume a miss costs the full 60 ns.",
    parts: [
      P.num({ label: "(a)", marks: 3, stem: "Calculate the average memory access time in nanoseconds.", value: 8.7, answer: "8.7", unit: "ns", wrong: [3, 63],
        workedSolution: "1. Hits: 0.9 × 3 = 2.7 ns.\n2. Misses: 0.1 × 60 = 6 ns.\n3. Average = 2.7 + 6 = 8.7 ns.", explanation: "0.9 × 3 + 0.1 × 60 = 8.7 ns." }),
      P.mcq({ label: "(b)", marks: 1, stem: "What would a larger cache normally do to the hit rate?", options: [["Increase it", "Correct: more data fits in the cache."], ["Decrease it", "A larger cache holds more, not less."], ["Make it zero", "A hit rate of zero would mean the cache is useless."], ["Leave it fixed by law", "The hit rate depends on the program and the cache size."]], answer: "A", explanation: "More data in the cache gives more hits." }),
      P.manual({ label: "(c)", marks: 2, stem: "Explain what happens when the processor needs data that is not in the cache.", points: ["The data is fetched from main memory (slower)", "A copy is placed in the cache for later use"], modelAnswer: "The data is fetched from main memory, which is slower, and a copy is put in the cache.", explanation: "Fetch from RAM and copy to cache." }),
    ] });
  b.card("DEFINITION", "Clock speed", "The number of clock cycles per second, in hertz; more cycles allow more instructions per second.");
  b.card("CONCEPT", "Limits of a faster clock", "More heat, more power use, and waiting for slower memory limit the gain.");
  b.card("DEFINITION", "Core", "A processing unit with its own ALU, control unit and registers; a multi-core chip has several.");
  b.card("CONCEPT", "When more cores help", "When several programs run together or a program splits its work; not for one dependent sequence.");
  b.card("CONCEPT", "Bus width and performance", "A wider data bus moves more bits per transfer; a wider address bus allows more memory.");
  b.card("DEFINITION", "Cache hit and miss", "Hit: the data is in the cache. Miss: it is not, so it comes from main memory.");
  b.card("FORMULA", "Average access time", "Average = hit rate × cache time + miss rate × memory time.");
  b.card("FORMULA", "Instructions per second", "Cycles per second ÷ cycles per instruction.");
});
