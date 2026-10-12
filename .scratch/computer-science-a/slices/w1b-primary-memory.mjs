// Slice w1b: primary memory (acs.hardware.primary-memory, Cambridge AS).
import { concept, P, chk, CAM } from "../lib.mjs";
import { mc, pm } from "../tables/w1b-q.mjs";

concept("acs.hardware.primary-memory", { file: "hardware/primary-memory", keyPrefix: "hardware.primary-memory", applies: CAM }, (b) => {
  mc(b, 1, "RECALL", "Which type of memory loses its contents when the power is switched off?",
    ["RAM", "Correct: RAM is volatile."],
    [["ROM", "ROM is non-volatile: it keeps its contents without power."], ["EEPROM", "EEPROM is non-volatile and keeps its contents."], ["Flash memory", "Flash memory is non-volatile and keeps its contents."]],
    "RAM is volatile; ROM, EEPROM and flash are non-volatile.");
  mc(b, 2, "UNDERSTANDING", "Why is the bootstrap program stored in ROM rather than in RAM?",
    ["ROM keeps its contents when the power is off", "Correct: the program must be present at start-up, before anything can be loaded."],
    [["ROM is faster than every type of RAM when it is running", "ROM is not faster than RAM, and speed is not the reason."], ["RAM cannot hold a program as small as the bootstrap", "RAM can hold programs of any size up to its capacity."], ["ROM can be rewritten every time the computer starts", "ROM is read-only in normal use."]],
    "At switch-on RAM is empty. The bootstrap must come from non-volatile memory so that the processor can load the operating system.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "Why must the cells of DRAM be refreshed?",
    ["The charge in each capacitor leaks away", "Correct: the stored charge must be read and rewritten before it is lost."],
    [["The flip-flops in each cell lose their state when the clock stops", "That would describe SRAM, which is not refreshed."], ["The laser drifts away from the correct track on the disc", "Lasers are used in optical drives, not memory chips."], ["The memory is erased by ultraviolet light in normal use", "Ultraviolet light erases EPROM, not DRAM."]],
    "DRAM stores each bit as charge in a capacitor. Capacitors leak, so each cell is refreshed many times per second.", { daily: true });
  mc(b, 3, "APPLICATION", "A processor designer wants a very small memory next to the processor that responds as quickly as possible, even though it costs more per bit. Which technology is suitable?",
    ["SRAM", "Correct: it is fast and needs no refresh; it is used for cache."],
    [["DRAM", "DRAM is cheaper and slower; it is used for the large main memory."], ["EPROM", "EPROM is a read-mostly memory used for firmware, not for speed."], ["Flash memory", "Flash is non-volatile storage and is slower to write."]],
    "Cache is built from SRAM because it is faster than DRAM; its higher cost per bit is acceptable for a small size.", { hints: ["Which RAM is fast but costs more per bit?"] });
  mc(b, 3, "APPLICATION", "A device keeps a table of bus fares that the operator changes twice a year. The table must survive power cuts and be changed without removing the chip. Which memory is most suitable?",
    ["EEPROM", "Correct: non-volatile and erasable electrically while in the circuit."],
    [["Mask ROM", "Mask ROM can never be changed after manufacture."], ["DRAM", "DRAM is volatile and loses the table when the power is off."], ["EPROM", "EPROM must be removed and exposed to ultraviolet light to be erased."]],
    "The table must be kept without power and rewritten rarely, in circuit, which describes EEPROM.", { hints: ["Look for non-volatile and electrically erasable."] });
  mc(b, 3, "UNDERSTANDING", "Why is a buffer used between a processor and a printer?",
    ["The processor can send the data quickly and then carry on with other work", "Correct: the printer takes the data from the buffer at its own slower speed."],
    [["The buffer makes the printer print faster than its mechanism allows", "The printer is still limited by its own speed."], ["The buffer converts the document into toner", "A buffer only holds data; it does not change it."], ["The buffer keeps a permanent copy of every printed page", "A buffer is temporary and its contents are replaced."]],
    "A buffer lets a fast device hand over data and move on, while a slow device collects it at its own pace.", { hints: ["Which of the two devices is faster, and what is it free to do?"] });
  mc(b, 4, "ANALYSIS", "How does an EEPROM differ from an EPROM?",
    ["An EEPROM can be erased electrically while still in the circuit", "Correct: an EPROM needs ultraviolet light and removal from the circuit."],
    [["An EEPROM loses its contents when the power is off, but an EPROM does not", "Both are non-volatile."], ["An EEPROM can only be programmed once, but an EPROM many times", "That describes PROM, which is programmed once."], ["An EEPROM has no address lines, but an EPROM has", "Both are addressed in the same way as any memory chip."]],
    "EPROM is erased with ultraviolet light through a window; EEPROM is erased with electrical signals, so it can be reprogrammed in place.", { hints: ["The first E in EEPROM stands for electrically."] });
  b.tf({ d: 2, skill: "RECALL", stem: "Static RAM needs to be refreshed many times each second.", answer: false,
    explanation: "False. SRAM holds its state in flip-flops as long as power is on. DRAM is the type that needs refreshing." });
  b.tf({ d: 2, skill: "RECALL", daily: true, stem: "The contents of ROM are lost when the computer is switched off.", answer: false,
    explanation: "False. ROM is non-volatile: it keeps its contents without power, which is why it holds the bootstrap." });
  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each memory type to its description.",
    pairs: [["SRAM", "Flip-flops, no refresh, used for cache"], ["DRAM", "Capacitors that are refreshed, used for main memory"], ["PROM", "Programmed once after manufacture"], ["EPROM", "Erased by ultraviolet light"], ["Flash", "Erased electrically in blocks, used in SSDs"]],
    explanation: "Each type is defined by how a cell stores data and by how (or whether) it can be erased." });
  b.fib({ d: 2, skill: "UNDERSTANDING", stem: "Complete the sentences about memory.",
    template: "The first program run when a computer is switched on is the {{blank:a}}, and it is stored in {{blank:b}}. A temporary store that matches the speed of two devices is a {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["bootstrap"], choices: ["bootstrap", "buffer", "compiler", "driver"] },
      { id: "b", accepted: ["ROM"], choices: ["ROM", "DRAM", "SRAM", "cache"] },
      { id: "c", accepted: ["buffer"], choices: ["buffer", "register", "bootstrap", "platter"] },
    ],
    explanation: "The bootstrap is stored in ROM, and a buffer is the temporary store that matches speeds." });
  const bytes1 = 2 ** 14;
  chk(bytes1, 16384);
  b.num({ d: 2, skill: "APPLICATION", calculator: false, unit: "bytes", stem: "A ROM chip has 14 address lines and each location holds 8 bits. How many bytes can it store?",
    value: bytes1, wrong: [14 * 8, 2 ** 13],
    workedSolution: "1. Locations = 2^14 = 16 384.\n2. Each location is 8 bits = 1 byte.\n3. Capacity = 16 384 bytes (16 KiB).",
    explanation: "2^14 locations of one byte each is 16 384 bytes." });
  const bytes2 = (2 ** 10 * 16) / 8;
  chk(bytes2, 2048);
  b.num({ d: 3, skill: "APPLICATION", calculator: false, unit: "bytes", hints: ["Bits = locations × width; divide by 8 for bytes."],
    stem: "A memory chip has 10 address lines and each location holds 16 bits. Calculate its capacity in bytes.",
    value: bytes2, wrong: [1024, 16384],
    workedSolution: "1. Locations = 2^10 = 1024.\n2. Bits = 1024 × 16 = 16 384.\n3. Bytes = 16 384 ÷ 8 = 2048.",
    explanation: "1024 locations × 2 bytes each = 2048 bytes." });
  const bufBytes = (4e6 * 8) / 8;
  chk(bufBytes, 4000000);
  b.num({ d: 3, skill: "APPLICATION", calculator: false, unit: "bytes", hints: ["Bits in the buffer = rate × seconds; then divide by 8."],
    stem: "A video is streamed at 4 Mbit/s (4 000 000 bits per second). The buffer holds 8 seconds of video. How many bytes does the buffer hold?",
    value: bufBytes, wrong: [32000000, 500000],
    workedSolution: "1. Bits = 4 000 000 × 8 = 32 000 000.\n2. Bytes = 32 000 000 ÷ 8 = 4 000 000.",
    explanation: "32 000 000 bits is 4 000 000 bytes." });
  const printSecs = 2 / 0.25;
  chk(printSecs, 8);
  b.num({ d: 3, skill: "APPLICATION", calculator: false, unit: "s", hints: ["Time = size ÷ rate."],
    stem: "A 2 MiB document is held in a printer buffer. The printer takes data from the buffer at 0.25 MiB per second. How many seconds does the printer need to print the whole document?",
    value: printSecs, wrong: [0.125, 50],
    workedSolution: "1. Time = size ÷ rate.\n2. 2 ÷ 0.25 = 8 seconds.",
    explanation: "2 MiB at 0.25 MiB per second takes 8 s." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 2, hints: ["Say what the cell is made of and why that needs refreshing."],
    stem: "Explain why DRAM needs to be refreshed. [2]",
    points: ["Each bit is stored as charge in a capacitor", "The charge leaks away, so it must be read and rewritten regularly"],
    modelAnswer: "Each bit is a charge on a capacitor. The charge leaks away, so the cell is read and rewritten many times a second.",
    explanation: "Capacitor charge and leakage." });
  b.manualShort({ d: 4, skill: "ANALYSIS", marks: 4, hints: ["Use matching comparisons: refresh, speed, cost, use."],
    stem: "Compare SRAM and DRAM. [4]",
    points: ["SRAM does not need refreshing but DRAM does", "SRAM is faster than DRAM", "SRAM costs more per bit (and uses more space) than DRAM", "SRAM is used for cache; DRAM is used for main memory"],
    modelAnswer: "SRAM needs no refresh and is faster, but costs more per bit and takes more space, so it is used for cache. DRAM must be refreshed, is slower and cheaper, and is used for main memory.",
    explanation: "Four matching comparisons." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 3, hints: ["Name the two speeds, then say what the buffer holds."],
    stem: "Explain how a buffer prevents a video from pausing when the network connection slows briefly. [3]",
    points: ["The player downloads data ahead of the part being watched", "The data is held in the buffer", "When the network slows, playback uses the stored data until the download catches up"],
    modelAnswer: "The player downloads ahead and keeps the data in a buffer. If the network slows, the video plays from the stored data until the download recovers.",
    explanation: "Download ahead, hold in buffer, play from buffer." });
  b.struct({ d: 4, skill: "APPLICATION", examStyle: true, hints: ["Which data never changes, which changes rarely, which changes constantly?"],
    explanation: "Fixed code goes in ROM, rarely changed data in EEPROM or flash, and working data in RAM; capacity is 2^addresses × width.",
    stem: "A prepaid water meter in Bulawayo has a processor that runs a fixed program, stores a tariff table that the council updates each year, and keeps the number of litres used since the last reading.",
    parts: [
      P.mcq({ label: "(a)", marks: 1, stem: "Which type of memory should hold the fixed program?", options: [["ROM", "Correct: the program never changes and must remain without power."], ["DRAM", "DRAM is volatile."], ["SRAM", "SRAM is volatile."], ["A buffer", "A buffer holds data temporarily and is not used to store the program."]], answer: "A", explanation: "The program is fixed and must be kept without power, so ROM." }),
      P.short({ label: "(b)", marks: 1, stem: "Name a type of memory that keeps the tariff table without power and allows the council to update it electrically.", accepted: ["EEPROM", "flash", "flash memory"], wrong: ["ROM"], explanation: "EEPROM or flash can be erased and rewritten electrically and keep data without power." }),
      P.num({ label: "(c)", marks: 2, stem: "The tariff table is held in a chip with 11 address lines and 8 bits per location. Calculate its capacity in bytes.", value: 2048, unit: "bytes", wrong: [88, 1024],
        workedSolution: "1. Locations = 2^11 = 2048.\n2. One byte per location, so 2048 bytes.", explanation: "2^11 = 2048 locations of one byte each." }),
      P.manual({ label: "(d)", marks: 2, stem: "Explain why the litres-used value is held in RAM while the meter is working.", points: ["It changes constantly and RAM can be read and written quickly", "ROM cannot be written during normal use"], modelAnswer: "The value changes constantly, so it needs memory that can be read and written quickly. ROM cannot be written to in normal use.", explanation: "Needs read-write memory." }),
    ] });
  b.struct({ d: 3, skill: "UNDERSTANDING", examStyle: true, hints: ["Time = size ÷ rate for each device."],
    explanation: "Filling the buffer takes 0.05 s but printing takes 8 s, so the buffer frees the processor.",
    stem: "A 2 MiB report is sent to a printer buffer at 40 MiB per second. The printer takes data from the buffer at 0.25 MiB per second.",
    parts: [
      P.num({ label: "(a)", marks: 3, stem: "Calculate the time taken to fill the buffer, in seconds.", value: 0.05, answer: "0.05", tol: 0.001, unit: "s", wrong: [20, 8],
        workedSolution: "1. Time = 2 ÷ 40.\n2. = 0.05 seconds.", explanation: "2 MiB at 40 MiB/s takes 0.05 s." }),
      P.num({ label: "(b)", marks: 1, stem: "Calculate the time taken by the printer to print the report from the buffer, in seconds.", value: 8, unit: "s", wrong: [0.125, 80],
        workedSolution: "1. Time = 2 ÷ 0.25 = 8 seconds.", explanation: "2 MiB at 0.25 MiB/s takes 8 s." }),
      P.manual({ label: "(c)", marks: 2, stem: "Explain the benefit of the buffer to the user of the computer.", points: ["The processor is free after about 0.05 s to do other tasks", "It does not have to wait for the slow printer to finish"], modelAnswer: "The computer is free to do other work after only 0.05 s instead of waiting 8 s for the printer.", explanation: "The processor is released early." }),
    ] });
  b.card("DEFINITION", "Primary memory", "Memory the processor accesses directly; it holds programs and data in use (RAM) and the bootstrap (ROM).");
  b.card("CONCEPT", "RAM against ROM", "RAM: volatile, read and write, running programs. ROM: non-volatile, read only, bootstrap and firmware.");
  b.card("CONCEPT", "DRAM", "One capacitor and one transistor per bit; must be refreshed; cheaper; used for main memory.");
  b.card("CONCEPT", "SRAM", "Flip-flop per bit; no refresh; faster; costs more; used for cache.");
  b.card("CONCEPT", "PROM, EPROM, EEPROM", "PROM: programmed once. EPROM: erased by ultraviolet light. EEPROM: erased electrically in circuit.");
  b.card("CONCEPT", "Flash memory", "A form of EEPROM erased in blocks; used in USB drives, memory cards and SSDs.");
  b.card("DEFINITION", "Buffer", "A temporary store that holds data moving between parts that work at different speeds.");
  b.card("FACT", "Examples of buffers", "Keyboard buffer, printer buffer and streaming buffer.");
  b.card("FORMULA", "Chip capacity", "Locations = 2^(address lines); bits = locations × word width.");
});
