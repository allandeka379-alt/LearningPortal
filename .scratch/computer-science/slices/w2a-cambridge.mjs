// Slice w2a: Cambridge 0478 Paper 1 exam-format items (STRUCTURED, 15 marks, ANALYSIS, Cambridge only).
import { concept, P, CAM } from "../lib.mjs";

const C = (k) => `comp.${k}`;

// Tiny Von Neumann machine used to compute the register values in question 1.
function runMachine(mem, start, n) {
  const r = { PC: start, MAR: null, MDR: null, CIR: null, ACC: 0 };
  const after = [];
  for (let i = 0; i < n; i++) {
    r.MAR = r.PC;
    r.MDR = mem[r.MAR];
    r.PC += 1;
    r.CIR = r.MDR;
    const [op, a] = r.CIR.split(" ");
    const addr = Number(a);
    if (op === "LDA") { r.MAR = addr; r.MDR = mem[addr]; r.ACC = r.MDR; }
    else if (op === "ADD") { r.MAR = addr; r.MDR = mem[addr]; r.ACC += r.MDR; }
    else throw new Error(op);
    after.push({ ...r });
  }
  return after;
}
const mem = { 80: "LDA 95", 81: "ADD 96", 82: "ADD 97", 95: 14, 96: 23, 97: 6 };
const run = runMachine({ ...mem }, 80, 3);
const last = run[run.length - 1];

const cardGiB = 16;
const photoMiB = 6;
const photos = Math.floor((cardGiB * 1024) / photoMiB);

concept(C("hardware.fetch-execute"), { file: "exam/w2a-cambridge", keyPrefix: "exam.w2a-cambridge", applies: CAM }, (b) => {
  b.struct({
    d: 5, skill: "ANALYSIS", examStyle: true, paper: "Paper 1", secs: 1350, calculator: false,
    concepts: [C("hardware.cpu"), C("hardware.fetch-execute")],
    hints: ["PC and MAR hold addresses; MDR, CIR and ACC hold data, instructions or results.", "The PC is incremented in every fetch."],
    stem: `A tablet computer has a microprocessor with a Von Neumann architecture. Part of its memory holds this program and data:\n\n| Address | Contents |\n|:-:|:--|\n| 80 | LDA 95 (load the value at address 95 into the ACC) |\n| 81 | ADD 96 (add the value at address 96 to the ACC) |\n| 82 | ADD 97 (add the value at address 97 to the ACC) |\n| 95 | ${mem[95]} |\n| 96 | ${mem[96]} |\n| 97 | ${mem[97]} |`,
    parts: [
      P.mcq({ label: "(a)", stem: "What is meant by a **microprocessor**?", options: [["A CPU built as an integrated circuit on a single chip", "Correct."], ["A small computer with its own operating system and screen", "It is only the processor."], ["A type of non-volatile memory holding the bootstrap", "That is ROM."], ["A program that translates instructions into machine code", "That is a translator, which is software."]], answer: "A", explanation: "A microprocessor is a type of integrated circuit on a single chip." }),
      P.match({ label: "(b)", stem: "Match each register to the item it holds.", pairs: [["Program counter (PC)", "The address of the next instruction"], ["Memory address register (MAR)", "The address of the location being accessed"], ["Memory data register (MDR)", "The data or instruction just read from memory"], ["Current instruction register (CIR)", "The instruction being decoded and executed"]], explanation: "PC and MAR hold addresses; MDR holds what was read; CIR holds the current instruction." }),
      P.fib({ label: "(c)", stem: "Complete the sentences about the buses.", template: "The {{blank:a}} bus carries addresses in one direction only, from the CPU to memory. The {{blank:b}} bus carries data and instructions in both directions.", blanks: [{ id: "a", accepted: ["address"], choices: ["address", "data", "control"] }, { id: "b", accepted: ["data"], choices: ["address", "data", "control"] }], explanation: "Address bus one-way; data bus two-way." }),
      P.num({ label: "(d)", stem: "The PC starts at 80. State the value in the **accumulator** after all three instructions have been executed.", value: last.ACC, wrong: [mem[95] + mem[96]], explanation: `ACC: ${run.map((r) => r.ACC).join(" → ")}.`, workedSolution: `1. LDA 95: ACC = ${run[0].ACC}.\n2. ADD 96: ${run[0].ACC} + ${mem[96]} = ${run[1].ACC}.\n3. ADD 97: ${run[1].ACC} + ${mem[97]} = ${run[2].ACC}.` }),
      P.num({ label: "(e)", stem: "State the value in the **program counter** while the instruction at address 82 is being executed.", value: last.PC, wrong: [82], explanation: `The PC was incremented to ${last.PC} when the instruction at 82 was fetched.`, workedSolution: `1. The instruction at 82 is fetched: MAR ← 82.\n2. The PC is incremented to ${last.PC} during the fetch, before execution.` }),
      P.manual({ label: "(f)", marks: 4, stem: "Describe how the instruction at address 81 is **fetched** from memory.", points: ["The address 81 is copied from the PC into the MAR", "The address is sent along the address bus to memory (read signal on the control bus)", "The instruction ADD 96 is returned along the data bus into the MDR", "The PC is incremented (to 82) and the instruction is copied from the MDR to the CIR"], modelAnswer: "The PC holds 81, which is copied into the MAR and sent along the address bus, with a read signal on the control bus. ADD 96 is returned along the data bus into the MDR. The PC is incremented to 82, and ADD 96 is copied into the CIR to be decoded." }),
      P.manual({ label: "(g)", marks: 2, stem: "The manufacturer's next tablet has a CPU with more cores. Explain how this could affect performance.", points: ["Each core can process instructions independently, so several tasks/instructions can be processed at the same time", "Performance only improves if the software can split the work between cores (the cores must co-ordinate)"], modelAnswer: "Each core can execute instructions at the same time as the others, so more work is done per second, but only when the programs can split their work between the cores." }),
    ],
    explanation: `(d) ${last.ACC} (e) ${last.PC}.`,
  });

  b.struct({
    d: 5, skill: "ANALYSIS", examStyle: true, paper: "Paper 1", secs: 1350, calculator: false,
    concepts: [C("hardware.input-devices"), C("hardware.output-devices"), C("hardware.sensors"), C("hardware.primary-storage"), C("hardware.secondary-storage")],
    hints: ["Choose each sensor by the quantity it measures.", "Convert GiB to MiB first, and count only whole photos."],
    stem: "A wildlife research station in Hwange National Park uses camera traps that photograph animals at a waterhole. It also has a visitor centre with an information kiosk and a projector.",
    parts: [
      P.match({ label: "(a)", stem: "Match each requirement to the most suitable sensor.", pairs: [["Triggering a camera when a warm-bodied animal passes", "Infra-red sensor"], ["Recording how full the waterhole's supply tank is", "Level sensor"], ["Checking that the water pumped to the waterhole is not too acidic", "pH sensor"]], explanation: "Infra-red for body heat, level for the tank, pH for acidity." }),
      P.mcq({ label: "(b)", stem: "Visitors often touch the kiosk screen with a pen or while wearing gloves. The supplier says a **capacitive** screen is not suitable. Which statement explains why?", options: [["It needs a conductive touch, so gloves and ordinary pens do not work", "Correct: a capacitive screen detects a change in charge from a conductive finger."], ["It needs firm pressure, so a light touch does not register", "That describes a resistive screen."], ["Dust or insects can break its beams and trigger false touches", "That describes an infra-red screen."], ["Its soft flexible top layer is easily scratched by pens", "That describes a resistive screen; capacitive screens use tough glass."]], answer: "A", explanation: "Capacitive screens need a conductive touch such as a bare finger." }),
      P.manual({ label: "(c)", marks: 3, stem: "The visitor centre uses a DLP projector. Describe how a DLP projector produces an image.", points: ["A chip holds millions of micro-mirrors, one for each pixel", "Each mirror tilts towards or away from the lens (on/off) many times a second to give shades of grey", "Light passes through a spinning colour wheel (red, green, blue) to produce colour, and the lens projects the image"], modelAnswer: "A DLP chip has millions of tiny mirrors, one per pixel, which tilt on or off thousands of times a second to make shades. Light from the lamp passes through a spinning red, green and blue colour wheel so the image is in colour, and the lens projects it onto the screen." }),
      P.num({ label: "(d)", type: "CALCULATION", marks: 2, stem: `Each camera trap has a ${cardGiB} GiB SD card, and each photograph is ${photoMiB} MiB. Calculate the number of **whole** photographs that fit on one card. Show your working.`, value: photos, wrong: [Math.ceil((cardGiB * 1024) / photoMiB)], explanation: `${cardGiB} × 1024 = ${cardGiB * 1024} MiB; ${cardGiB * 1024} ÷ ${photoMiB} = ${((cardGiB * 1024) / photoMiB).toFixed(2)}…, so ${photos} whole photographs.`, workedSolution: `1. ${cardGiB} GiB = ${cardGiB} × 1024 = ${cardGiB * 1024} MiB.\n2. ${cardGiB * 1024} ÷ ${photoMiB} = ${((cardGiB * 1024) / photoMiB).toFixed(2)}…\n3. Round down: ${photos} photographs.` }),
      P.manual({ label: "(e)", marks: 2, stem: "Explain why solid-state storage is suitable for the camera traps.", points: ["No moving parts, so it is not damaged by knocks/vibration/animals or outdoor conditions", "Small, light and uses little power, so batteries last longer"], modelAnswer: "SD cards have no moving parts, so knocks and vibration from animals do not damage them, and they use very little power, which saves the trap's batteries." }),
      P.mcq({ label: "(f)", stem: "The station archives old photographs on Blu-ray discs. Which statement describes how data is stored on these discs?", options: [["A laser forms pits and lands on a spiral track", "Correct."], ["Electrons are trapped on floating gates", "That is flash memory."], ["Tracks and sectors are magnetised by electromagnets", "That is a hard disk."], ["Ink is printed in a pattern of dots", "That is a printer."]], answer: "A", explanation: "Optical storage: pits and lands read by a laser." }),
      P.manual({ label: "(g)", marks: 3, stem: "The station's analysis computer often runs out of RAM when processing large sets of photographs. Describe how virtual memory is used in this situation.", points: ["An area of secondary storage (HDD/SSD) is used as virtual memory", "When RAM is full, pages of data not currently needed are moved from RAM to virtual memory", "When those pages are needed again they are moved back into RAM (other pages being swapped out)"], modelAnswer: "Part of the computer's drive is set aside as virtual memory. When RAM fills up, pages of photo data not being used are moved out to it, and they are swapped back into RAM when the program needs them again." }),
    ],
    explanation: `(a) infra-red, level, pH (b) needs a conductive touch (d) ${photos} photographs (f) pits and lands.`,
  });
});
