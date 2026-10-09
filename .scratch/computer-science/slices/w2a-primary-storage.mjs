// Slice w2a: primary storage, RAM, ROM and virtual memory (comp.hardware.primary-storage).
import { concept, P, ZIM, CAM } from "../lib.mjs";

const ramGiB = 16;
const apps = [["operating system", 4], ["game", 9], ["music player", 1.5], ["browser", 3.5]];
const needGiB = apps.reduce((s, [, g]) => s + g, 0);
const vmGiB = needGiB - ramGiB;
if (vmGiB <= 0) throw new Error("vm");

concept("comp.hardware.primary-storage", { file: "hardware/primary-storage", keyPrefix: "hardware.primary-storage" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is meant by **primary storage**?",
    options: [
      ["Memory that is directly accessed by the CPU", "Correct: RAM and ROM are primary storage."],
      ["Storage that keeps files permanently, such as a hard disk", "That is secondary storage, which the CPU does not access directly."],
      ["Storage on remote servers reached over the internet", "That is cloud storage."],
      ["The first device a user buys for storing backups", "Primary storage is defined by direct CPU access."],
    ],
    answer: "A",
    explanation: "Primary storage (RAM and ROM) is directly accessed by the CPU.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which statement about **RAM** is correct?",
    options: [
      ["It is volatile and its contents can be changed", "Correct: RAM is read-write and loses its contents when the power is off."],
      ["It is non-volatile and read-only", "That describes ROM."],
      ["It stores the bootstrap permanently", "The bootstrap is stored in ROM."],
      ["It is a type of secondary storage", "RAM is primary storage."],
    ],
    answer: "A",
    explanation: "RAM: volatile, read-write, holds what is in use. ROM: non-volatile, read-only, holds the bootstrap.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why are the start-up instructions (the bootstrap) stored in ROM rather than RAM?",
    options: [
      ["ROM is non-volatile, so the instructions are still there when the computer is switched on", "Correct: RAM is empty at start-up."],
      ["ROM is much larger than RAM, so it has plenty of room for the start-up instructions", "ROM is usually much smaller than RAM."],
      ["ROM is faster to write to than RAM, so start-up is quicker", "ROM is not written to in normal use."],
      ["RAM can only hold data, not instructions", "RAM holds both programs and data."],
    ],
    answer: "A",
    explanation: "RAM loses everything when the power goes off; ROM keeps the bootstrap so the computer can always start.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Rudo is typing an essay when the school's electricity is cut. She had not saved her work. Why is the essay lost?",
    options: [
      ["It was held in RAM, which is volatile", "Correct: RAM loses its contents when the power is off."],
      ["It was held in ROM, which is read-only", "Work in progress is held in RAM, not ROM."],
      ["The hard disk was wiped by the power cut", "Secondary storage is non-volatile; saved files survive."],
      ["The CPU deleted it to free up space", "The CPU does not delete work; the RAM simply lost power."],
    ],
    answer: "A",
    explanation: "Unsaved work is only in RAM. Saving copies it to non-volatile secondary storage.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What does the bootstrap program do when a computer is switched on?",
    options: [
      ["Checks the hardware and loads the operating system into RAM", "Correct."],
      ["Saves all open files to the hard disk", "Saving files is not part of starting up."],
      ["Deletes temporary files from secondary storage", "That is done by utility software."],
      ["Copies the contents of RAM into ROM", "ROM is not written to in normal use."],
    ],
    answer: "A",
    explanation: "The bootstrap in ROM checks the hardware and loads the operating system from secondary storage into RAM.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING", applies: CAM,
    hints: ["Where is virtual memory created?"],
    stem: "How is **virtual memory** created?",
    options: [
      ["An area of secondary storage is set aside to be used as if it were RAM", "Correct: virtual memory is on the hard disk or SSD."],
      ["Spare RAM chips on the motherboard are switched on when the RAM is full", "Virtual memory is not extra RAM chips."],
      ["Part of the ROM is changed so it can be written to", "ROM is not used for virtual memory."],
      ["Data is compressed so that more of it fits inside the CPU cache", "Cache is not used to create virtual memory."],
    ],
    answer: "A",
    explanation: "Virtual memory is an area of secondary storage used as an extension of RAM.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS", applies: CAM,
    hints: ["Compare the speed of RAM and secondary storage."],
    stem: "A computer with too little RAM becomes very slow when many programs are open, and the drive light flashes constantly. What is the most likely cause?",
    options: [
      ["Pages are being moved constantly between RAM and virtual memory", "Correct: this disk thrashing is slow because secondary storage is much slower than RAM."],
      ["The bootstrap program is running again and again", "The bootstrap only runs at start-up."],
      ["ROM is filling up with the programs that are open", "Programs in use are held in RAM, not ROM."],
      ["The CPU is reading every program directly from ROM", "Programs are loaded into RAM to run."],
    ],
    answer: "A",
    explanation: "When RAM is full, pages are swapped to and from virtual memory; constant swapping (disk thrashing) slows the computer.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION", applies: CAM,
    hints: ["Which change reduces the need to swap pages?"],
    stem: "Which upgrade would best reduce how often a computer uses virtual memory?",
    options: [
      ["Installing more RAM", "Correct: more programs and data fit in RAM, so fewer pages are moved out."],
      ["Installing a larger ROM chip", "ROM holds the bootstrap; it does not hold programs in use."],
      ["Increasing the size of the virtual memory area", "That allows more swapping but does not reduce it."],
      ["Using a larger hard disk drive", "More secondary storage does not reduce the need to swap."],
    ],
    answer: "A",
    explanation: "Virtual memory is used when RAM is full, so more RAM means it is needed less often.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "The contents of ROM are lost when the computer is switched off.",
    answer: false,
    explanation: "False. ROM is non-volatile; it keeps its contents without power.",
  });
  b.tf({
    d: 3, skill: "UNDERSTANDING", applies: CAM,
    hints: ["Can the CPU fetch directly from secondary storage?"],
    stem: "The CPU can process a page directly while it is held in virtual memory.",
    answer: false,
    explanation: "False. A page in virtual memory must be moved back into RAM before the CPU can use it.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each description to RAM or ROM.",
    pairs: [
      "Holds the bootstrap program",
      "Volatile",
      "Holds the programs and data currently in use",
      "Contents cannot be changed in normal use",
      "Contents change all the time as programs are opened and closed",
    ],
    right: ["RAM", "ROM"],
    rightIndex: [1, 0, 0, 1, 0],
    explanation: "ROM: bootstrap, non-volatile, read-only. RAM: volatile, read-write, holds what is in use.",
  });
  b.fib({
    d: 3, skill: "UNDERSTANDING", applies: CAM,
    hints: ["Think about where virtual memory is and which way pages move."],
    stem: "Complete the description of virtual memory.",
    template: "When RAM is full, the operating system uses an area of {{blank:a}} storage as virtual memory. Data is divided into {{blank:b}}. Those not currently needed are moved out of RAM, and they are moved back into {{blank:c}} when the CPU needs them. Constant swapping slows the computer; this is called disk {{blank:d}}.",
    blanks: [
      { id: "a", accepted: ["secondary"], choices: ["secondary", "primary", "cache", "read only"] },
      { id: "b", accepted: ["pages"], choices: ["pages", "packets", "pixels", "registers"] },
      { id: "c", accepted: ["RAM"], choices: ["RAM", "ROM", "the cache", "the cloud"] },
      { id: "d", accepted: ["thrashing"], choices: ["thrashing", "formatting", "booting", "buffering"] },
    ],
    explanation: "Virtual memory: secondary storage, pages, moved back into RAM, disk thrashing.",
  });
  b.calc({
    d: 3, skill: "APPLICATION", applies: CAM, calculator: false,
    hints: ["Add up all the memory needed, then compare with the RAM."],
    stem: `A computer has ${ramGiB} GiB of RAM. These are open at the same time: ${apps.map(([n, g]) => `${n} ${g} GiB`).join(", ")}. What is the minimum amount of data, in GiB, that must be held in virtual memory?`,
    value: vmGiB,
    unit: "GiB",
    wrong: [needGiB],
    explanation: `Total needed ${needGiB} GiB; ${needGiB} − ${ramGiB} = ${vmGiB} GiB must be in virtual memory.`,
    workedSolution: `1. Total: ${apps.map(([, g]) => g).join(" + ")} = ${needGiB} GiB.\n2. RAM: ${ramGiB} GiB.\n3. Virtual memory needed: ${needGiB} − ${ramGiB} = ${vmGiB} GiB.`,
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Give the term for memory that loses its contents when the power is switched off.",
    accepted: ["volatile", "volatile memory"],
    wrong: ["non-volatile"],
    explanation: "Volatile memory (such as RAM) loses its contents without power.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    hints: ["Give a reason for each: why ROM, why RAM."],
    stem: "Explain why a computer needs both RAM and ROM. [4]",
    points: [
      "ROM is non-volatile, so its contents are kept when the power is off",
      "ROM holds the bootstrap / start-up instructions needed to load the operating system",
      "RAM is read-write, so programs and data can be changed as the user works",
      "RAM holds the operating system, programs and data currently in use (ROM cannot be written to)",
    ],
    modelAnswer: "ROM is non-volatile, so it keeps the bootstrap that starts the computer and loads the operating system. RAM is read-write, so it can hold the operating system, programs and data in use, which change all the time; ROM cannot be changed in normal use.",
    explanation: "Two points about ROM and two about RAM.",
  });
  b.manualShort({
    d: 4, skill: "UNDERSTANDING", marks: 4, applies: CAM,
    hints: ["Where is it created, when is it used, what moves, and why is it needed?"],
    stem: "Describe how virtual memory is created and used, and why it is needed. [4]",
    points: [
      "An area of secondary storage (HDD/SSD) is allocated as virtual memory",
      "When RAM is full, pages of data not currently needed are moved from RAM to virtual memory",
      "When a page in virtual memory is needed it is moved back into RAM (swapping another page out)",
      "Needed so more/larger programs can run than fit in RAM, instead of the computer crashing / refusing to open them",
    ],
    modelAnswer: "The operating system sets aside part of the SSD as virtual memory. When RAM is full, pages that are not being used are moved out to it, and they are moved back into RAM when needed. This lets the computer run more programs than its RAM could hold without crashing.",
    explanation: "Secondary storage, pages out when RAM is full, pages back in when needed, reason.",
  });
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true, applies: ZIM,
    hints: ["Volatile versus non-volatile; read-write versus read-only."],
    stem: "A school in Kadoma is setting up new computers. A pupil asks what happens to the memory when a computer is switched on and off. (Memory sizes: 1 GB = 1024 MB.)",
    parts: [
      P.mcq({ label: "(a)", stem: "Which type of memory holds the instructions that run first when the computer is switched on?", options: [["ROM", "Correct: the bootstrap is in ROM."], ["RAM", "RAM is empty at start-up."], ["Cache", "Cache holds frequently used data."], ["Virtual memory", "Virtual memory is on secondary storage and used when RAM is full."]], answer: "A", explanation: "ROM holds the bootstrap." }),
      P.num({ label: "(b)", stem: "Each computer has 4 GB of RAM. How many MB is this?", value: 4 * 1024, unit: "MB", wrong: [4000], explanation: `4 × 1024 = ${4 * 1024} MB.`, workedSolution: `1. 1 GB = 1024 MB.\n2. 4 × 1024 = ${4 * 1024} MB.` }),
      P.manual({ label: "(c)", marks: 2, stem: "Describe **two** differences between RAM and ROM.", points: ["RAM is volatile, ROM is non-volatile", "RAM is read-write, ROM is read-only / RAM holds programs in use, ROM holds the start-up instructions"], modelAnswer: "RAM loses its contents when the power is off but ROM keeps them; RAM can be written to, while ROM can only be read in normal use." }),
    ],
    explanation: "ROM holds the bootstrap; 4 GB = 4096 MB; RAM volatile and read-write, ROM non-volatile and read-only.",
  });
  b.struct({
    d: 5, skill: "ANALYSIS", examStyle: true, applies: CAM, calculator: false,
    hints: ["Find how far the memory needed exceeds the RAM.", "Explain the slowdown in terms of the speed of secondary storage."],
    stem: "Nyasha's laptop has 8 GiB of RAM. She edits a large video (5 GiB of data) while the operating system uses 2 GiB and a chat app uses 1.5 GiB. The laptop slows down badly whenever she switches between programs.",
    parts: [
      P.num({ label: "(a)", stem: "Calculate how many GiB of data cannot fit in RAM.", value: 5 + 2 + 1.5 - 8, unit: "GiB", wrong: [8.5], explanation: `5 + 2 + 1.5 = ${5 + 2 + 1.5} GiB; ${5 + 2 + 1.5} − 8 = ${5 + 2 + 1.5 - 8} GiB.`, workedSolution: `1. Total: 5 + 2 + 1.5 = ${5 + 2 + 1.5} GiB.\n2. ${5 + 2 + 1.5} − 8 = ${5 + 2 + 1.5 - 8} GiB.` }),
      P.mcq({ label: "(b)", stem: "Where is this data held?", options: [["In virtual memory on secondary storage", "Correct."], ["In the ROM chip on the motherboard", "ROM is read-only."], ["In the CPU's registers", "Registers hold single values being processed."], ["In cloud storage on remote servers", "Virtual memory is on the laptop's own drive."]], answer: "A", explanation: "Virtual memory is an area of secondary storage." }),
      P.manual({ label: "(c)", marks: 2, stem: "Explain why the laptop slows down when Nyasha switches between programs.", points: ["Pages for the program she switches to are in virtual memory and must be moved back into RAM (others moved out)", "Secondary storage is much slower than RAM, so this swapping takes time / disk thrashing"], modelAnswer: "The program she switches to has pages in virtual memory, which must be moved back into RAM while other pages are moved out. Secondary storage is much slower than RAM, so the swapping causes delays." }),
      P.manual({ label: "(d)", marks: 1, stem: "Suggest **one** way to stop the slowdown.", points: ["Install more RAM / close programs not in use"], modelAnswer: "Install more RAM so all the programs fit at once." }),
    ],
    explanation: "Excess goes to virtual memory; swapping with slow secondary storage causes the slowdown; more RAM fixes it.",
  });

  b.card("DEFINITION", "**Primary storage**", "Memory directly accessed by the CPU: RAM and ROM.");
  b.card("DEFINITION", "**RAM**", "Random access memory: volatile, read-write; holds the OS, programs and data in use.");
  b.card("DEFINITION", "**ROM**", "Read only memory: non-volatile, read-only; holds the bootstrap (start-up instructions).");
  b.card("DEFINITION", "**Volatile**", "Loses its contents when the power is switched off (e.g. RAM).");
  b.card("CONCEPT", "What the bootstrap does", "Runs from ROM at switch-on, checks the hardware and loads the operating system from secondary storage into RAM.");
  b.card("CONCEPT", "Why both RAM and ROM", "ROM: permanent start-up instructions (RAM is empty at switch-on). RAM: changeable programs and data in use.");
  b.card("DEFINITION", "**Virtual memory**", "An area of secondary storage used as extra RAM when RAM is full; pages are moved between them.", undefined, { applies: CAM });
  b.card("DEFINITION", "**Disk thrashing**", "Constant moving of pages between RAM and virtual memory, which makes the computer very slow.", undefined, { applies: CAM });
  b.card("FACT", "Reducing virtual memory use", "Add more RAM so more programs and data fit at once.", undefined, { applies: CAM });
});
