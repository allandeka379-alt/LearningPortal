// Slice w2a: bit manipulation (acs.asm.bit-manipulation, Cambridge AS).
import { concept, P, chk, same, CAM, runAsm, toBase, fromBase, fromTwos, codeBlock, mdTable } from "../lib.mjs";
import { mc } from "../tables/w2a-q.mjs";
import { lsl, lsr, asr, rol, andS, orS, xorS, g4 } from "../tables/w2a-bits.mjs";

const v = (s) => fromBase(s, 2);

concept("acs.asm.bit-manipulation", { file: "asm/bit-manipulation", keyPrefix: "asm.bit-manipulation", applies: CAM }, (b) => {
  // computed values
  const a1 = "11100110", m1 = "00111100";
  const a2 = "10010011", m2 = "01100101";
  const and1 = andS(a1, m1), or1 = orS(a1, m1), xor1 = xorS(a2, m2);
  same(and1, "00100100"); same(or1, "11111110"); same(xor1, "11110110");
  const neg = "10110100";
  const neg2 = asr(neg, 2);
  chk(fromTwos(neg), -76); chk(fromTwos(neg2), -19);
  const negLog = lsr("11101000", 1);
  chk(v(negLog), 116);
  chk(v(lsl(toBase(11, 2, 8), 3)), 88);
  chk(v(lsr(toBase(77, 2, 8), 2)), 19);
  chk(v(lsl(toBase(150, 2, 8), 1)), 44);
  const rot = rol("01110011", 3);
  same(rot, "10011011");

  // device register: irrigation controller, bits numbered from 0 at the right
  // bit 0 = soil dry sensor, bit 1 = tank empty sensor, bit 3 = pump, bit 5 = alarm lamp
  const ctl = "00101001";
  const setPump = orS(ctl, "00001000");
  const clearAlarm = andS(ctl, "11011111");
  const toggleLamp = xorS(ctl, "00100000");
  same(setPump, "00101001"); same(clearAlarm, "00001001"); same(toggleLamp, "00001001");
  const ctl2 = "10010010";
  const setP2 = orS(ctl2, "00001000"), clrP2 = andS(ctl2, "11110111"), tgl2 = xorS(ctl2, "00000011");
  same(setP2, "10011010"); same(clrP2, "10010010"); same(tgl2, "10010001");
  const testBit1 = andS(ctl2, "00000010");
  same(testBit1, "00000010");

  // program run: mask program
  const src = ["LDD Reading", "AND B00001111", "OR B01000000", "STO Result", "END", "Reading: B10110101", "Result: 0"];
  const run = runAsm(src, { base: 120 });
  const res = toBase(run.mem[run.labels.Result], 2, 8);
  same(res, "01000101");

  // ---- multiple choice
  mc(b, 2, "RECALL", "Which bitwise operation is used with a mask to set a chosen bit to 1 without changing the other bits?",
    ["OR", "Correct: OR with a 1 in the position sets the bit and leaves the others as they were."],
    [["AND", "AND can keep or clear bits but cannot set a bit that is 0."], ["XOR", "XOR toggles; it sets the bit only if it was 0."], ["LSR", "A shift moves all the bits and does not set one chosen bit."]],
    "OR with a mask sets the bits that have a 1 in the mask.", { daily: true });
  mc(b, 2, "RECALL", "Which operation toggles (flips) the bits of a register that are 1 in the mask?",
    ["XOR", "Correct: a bit XOR 1 changes, a bit XOR 0 stays."],
    [["AND", "AND clears or keeps bits."], ["OR", "OR sets bits to 1 and never changes a 1 to 0."], ["LSL", "A shift moves the bits to new positions."]],
    "XOR with a 1 flips the bit.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "What is the effect of a logical left shift of 3 places on an unsigned number, if no 1 bit is shifted out?",
    ["The number is multiplied by 8", "Correct: each place multiplies by 2, so three places multiply by 2 × 2 × 2."],
    [["The number is divided by 8", "That is a right shift."], ["The number is increased by 3", "A shift multiplies; it does not add."], ["The number is multiplied by 3", "Three places multiply by 2^3, not by 3."]],
    "n places multiply by 2^n.");
  mc(b, 3, "ANALYSIS", "The 8-bit number 150 is shifted left one place. Why is the answer not 300?",
    ["Only 8 bits are stored, so the left-most 1 is shifted out", "Correct: 300 needs 9 bits."],
    [["A left shift divides the number by 2 instead of doubling it", "A left shift multiplies by 2."], ["The shift changes the sign of the number to negative", "An unsigned number has no sign bit."], ["The result is rounded to the nearest hundred by the processor", "Rounding is not part of a shift."]],
    "The overflow bit is lost, leaving 44.", { hints: ["How many bits are needed to store 300?"] });
  mc(b, 3, "UNDERSTANDING", "What is the difference between a logical shift and a cyclic shift?",
    ["A cyclic shift brings the bits that leave one end back in at the other end", "Correct: no bit is lost."],
    [["A cyclic shift always multiplies by 2 and a logical shift always divides by 2", "Both can go either way; the difference is what happens at the ends."], ["A logical shift keeps the sign bit and a cyclic shift does not", "Keeping the sign bit describes an arithmetic shift."], ["A cyclic shift can only be used on text, not on numbers", "It works on any bit pattern."]],
    "Logical: zeros fill; cyclic: the bits wrap round.", { hints: ["Where do the bits that move out end up?"] });
  mc(b, 4, "APPLICATION", "The 8-bit two's complement number 11101000 (-24) is shifted right one place using a LOGICAL shift. What is the result?",
    ["A positive number, 116", "Correct: the sign bit becomes 0, giving 01110100."],
    [["-12, because the sign bit is kept", "That needs an arithmetic shift, which copies the sign bit."], ["-116, the same size but negative", "The shift does not negate the number."], ["-48, as the number is doubled", "That would be a left shift."]],
    "A logical right shift puts 0 in the sign bit.", { hints: ["Write the shifted bit pattern and read it as a positive number."] });
  mc(b, 3, "APPLICATION", "A control register holds 10010010. Bit 4 is to be cleared without changing any other bit. Which instruction should be used?",
    ["AND B11101111", "Correct: the 0 in bit 4 clears it and the 1s keep the rest."],
    [["OR B11101111", "OR cannot clear a bit and this would set most of them."], ["AND B00010000", "That would clear every bit except bit 4."], ["XOR B00010000", "That would toggle bit 4; it was 1 so it would become 0, but a 0 would become 1."]],
    "AND with the inverse mask clears only the chosen bit.", { hints: ["Which mask has a 0 only in bit 4?"] });

  // ---- true/false, matching, fill in the blanks
  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "Doing XOR with the same mask twice returns a register to its original value.", answer: true,
    explanation: "True. Each bit that is 1 in the mask is flipped twice, so it returns to its original value." });
  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each task to the operation that does it.",
    pairs: [["Test whether bit 3 is 1", "AND with a mask that has a 1 only in bit 3, then compare with 0"], ["Set bit 5 to 1", "OR with a mask that has a 1 in bit 5"], ["Clear the top four bits", "AND with the mask 00001111"], ["Flip bit 0", "XOR with the mask 00000001"], ["Multiply by 4", "Logical left shift by two places"]],
    explanation: "Masks select the bits and the operation decides what happens to them." });
  b.fib({ d: 3, skill: "APPLICATION", hints: ["To set a bit use OR; to clear a bit use AND with 0 in that position."],
    stem: "Complete the instructions that switch on bit 2 and switch off bit 6 of the value in ACC.",
    template: "{{blank:a}} B00000100\n\n{{blank:b}} B10111111",
    blanks: [
      { id: "a", accepted: ["OR"], choices: ["OR", "AND", "XOR", "LSL"] },
      { id: "b", accepted: ["AND"], choices: ["AND", "OR", "LSR", "CMP"] },
    ],
    explanation: "OR sets bit 2; AND with a 0 in bit 6 clears it." });

  // ---- bits / numerical
  b.bits({ d: 3, skill: "APPLICATION", calculator: false, value: v(and1), base: 2, width: 8, hints: ["Work column by column: the result is 1 only where both bits are 1."],
    stem: `ACC holds ${g4(a1)}. The instruction \`AND B${m1}\` is executed. Write the 8-bit value in ACC.`,
    explanation: `${g4(a1)} AND ${g4(m1)} = ${g4(and1)}.` });
  b.bits({ d: 3, skill: "APPLICATION", calculator: false, value: v(xor1), base: 2, width: 8, hints: ["XOR is 1 where the bits differ."],
    stem: `ACC holds ${g4(a2)}. The instruction \`XOR B${m2}\` is executed. Write the 8-bit value in ACC.`,
    explanation: `${g4(a2)} XOR ${g4(m2)} = ${g4(xor1)}.` });
  b.bits({ d: 4, skill: "APPLICATION", calculator: false, value: v(neg2), base: 2, width: 8, hints: ["An arithmetic right shift copies the sign bit into the empty places."],
    stem: `The 8-bit two's complement number ${g4(neg)} is shifted two places to the right using an arithmetic shift. Write the 8-bit result.`,
    explanation: `The sign bit 1 is copied in twice: ${g4(neg2)}, which is -19 (the original was -76).` });
  b.num({ d: 2, skill: "APPLICATION", calculator: false, daily: true, stem: "The unsigned number 77 is in an 8-bit register. It is shifted two places to the right with a logical shift. What is the denary result?",
    value: 19, wrong: [38, 20], workedSolution: "1. 77 = 0100 1101.\n2. Shift right two places: 0001 0011.\n3. 0001 0011 = 19. (77 ÷ 4 = 19 remainder 1; the remainder is lost.)", explanation: "A right shift of two places divides by 4 and drops the remainder: 19." });
  b.num({ d: 3, skill: "APPLICATION", calculator: false, hints: ["Which bits survive the AND, and what does the OR add?"],
    stem: "Reading holds B10110101 and this program is run from address 120:\n\n" + codeBlock(src.map((l, i) => `${120 + i}  ${l}`).join("\n")) + "\n\nWhat denary value is held in `Result` when the program ends?",
    value: run.mem[run.labels.Result], wrong: [181, 5], workedSolution: `1. AND B00001111 keeps the low four bits: 1011 0101 gives 0000 0101.\n2. OR B01000000 sets bit 6: 0100 0101.\n3. 0100 0101 = 69.`, explanation: "The result is 0100 0101, which is 69." });
  b.short({ d: 2, skill: "RECALL", stem: "Name the type of shift that copies the sign bit into the empty places when a two's complement number is shifted right.", accepted: ["arithmetic shift", "arithmetic", "arithmetic right shift"], wrong: ["logical shift", "cyclic shift"], explanation: "An arithmetic shift keeps the sign." });

  // ---- self-marked
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 3, hints: ["Say what mask you use, which operation, and what you do with the result."],
    stem: "A sensor sets bit 2 of a status register to 1 when a tank is full. Explain how a program can test whether the tank is full. [3]",
    points: ["Use AND with a mask that has a 1 only in bit 2 (00000100)", "All the other bits are cleared so the result is 0 or 00000100", "Compare the result with 0; if it is not 0 the tank is full"],
    modelAnswer: "AND the register with the mask 00000100. This clears all the other bits, so the result is non-zero only if bit 2 was 1. Compare the result with 0: not equal means the tank is full.",
    explanation: "Mask, clear the rest, compare with zero." });
  b.manualShort({ d: 3, skill: "CREATION", marks: 3, hints: ["Load the register, use a mask that sets only bit 5, then store."],
    stem: "The location `Control` holds a control byte. Write assembly language instructions to switch on bit 5 without changing the other bits, and store the result back in `Control`. [3]",
    points: ["Loads Control into ACC with LDD Control", "Uses OR with the mask B00100000", "Stores ACC at Control with STO Control"],
    modelAnswer: "\n" + codeBlock("LDD Control\nOR B00100000\nSTO Control"),
    explanation: "Load, OR with a mask, store." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 3, hints: ["Mention the overflow bit."],
    stem: "A programmer uses LSL #1 to double a number held in an 8-bit register. Explain a situation in which the answer is wrong. [3]",
    points: ["The number is 128 or more / the left-most bit is 1", "That bit is shifted out of the register and lost", "So the result is smaller than twice the number (and the overflow is not detected)"],
    modelAnswer: "If the number is 128 or more, its left-most 1 bit is shifted out of the register and lost, so the result is not twice the number.",
    explanation: "Overflow loses the top bit." });
  b.manualShort({ d: 4, skill: "EVALUATION", marks: 4, hints: ["Compare the number of memory locations and the effect on other bits."],
    stem: "Give two advantages of holding eight on/off settings in the bits of one byte instead of in eight separate memory locations, and one thing the programmer must take care over. [4]",
    points: ["Uses less memory", "All the settings can be read or written together in one instruction", "Several settings can be changed in one operation", "The programmer must use masks so that changing one bit does not change the others"],
    modelAnswer: "It uses less memory, and all eight settings can be read or written in one instruction. The programmer must use masks so that changing one bit does not change the others.",
    explanation: "Compact and fast, but needs masks." });

  // ---- structured practice
  b.struct({ d: 4, skill: "APPLICATION", examStyle: true, hints: ["Bit 0 is the right-hand bit.", "Use OR to set, AND with 0 to clear, XOR to toggle."],
    explanation: "Masks change only the chosen bits of the register.",
    stem: "A greenhouse controller in Mutare uses one byte, `Ctl`, to control its equipment. Bits are numbered from 0 at the right-hand end. Bit 3 switches the water pump and bit 1 switches the fan. `Ctl` currently holds " + ctl2 + ".",
    parts: [
      P.bits({ label: "(a)", marks: 2, stem: "The pump is switched on by the instruction `OR B00001000`. Write the 8-bit value in ACC afterwards, if ACC held the value above.", value: v(setP2), base: 2, width: 8, explanation: `${g4(ctl2)} OR 0000 1000 = ${g4(setP2)}.` }),
      P.bits({ label: "(b)", marks: 2, stem: "The fan and pump are both toggled by the instruction `XOR B00001010`. Write the 8-bit value in ACC afterwards, if ACC held the value above.", value: v(xorS(ctl2, "00001010")), base: 2, width: 8, explanation: `${g4(ctl2)} XOR 0000 1010 = ${g4(xorS(ctl2, "00001010"))}.` }),
      P.manual({ label: "(c)", marks: 2, stem: "Write the instruction that switches the fan off (bit 1 to 0) without changing any other bit.", points: ["Uses AND", "With the mask B11111101"], modelAnswer: "AND B11111101", explanation: "A 0 in bit 1 and 1s elsewhere." }),
      P.manual({ label: "(d)", marks: 2, stem: "State why LDM B00001000 followed by STO Ctl is not a good way to switch the pump on.", points: ["It replaces the whole byte", "All other settings, such as the fan, are switched off"], modelAnswer: "It replaces the whole byte, so all the other settings are lost.", explanation: "Masks change only selected bits." }),
    ] });
  b.struct({ d: 3, skill: "APPLICATION", examStyle: true, hints: ["Write each bit pattern in groups of four."],
    explanation: "Logical shifts fill with zeros; cyclic shifts wrap round.",
    stem: "An 8-bit register holds " + g4("01110011") + ".",
    parts: [
      P.bits({ label: "(a)", marks: 1, stem: "Write the contents after a logical shift left of 2 places.", value: v(lsl("01110011", 2)), base: 2, width: 8, explanation: `${g4("01110011")} shifted left two places is ${g4(lsl("01110011", 2))}; the two left-most bits are lost.` }),
      P.bits({ label: "(b)", marks: 1, stem: "Write the contents after a logical shift right of 3 places.", value: v(lsr("01110011", 3)), base: 2, width: 8, explanation: `${g4("01110011")} shifted right three places is ${g4(lsr("01110011", 3))}.` }),
      P.bits({ label: "(c)", marks: 1, stem: "Write the contents after a cyclic shift left of 3 places.", value: v(rot), base: 2, width: 8, explanation: `The three left-most bits (011) re-enter at the right: ${g4(rot)}.` }),
      P.num({ label: "(d)", marks: 1, stem: "State the denary value of the original contents.", value: v("01110011"), wrong: [114, 150], workedSolution: "64 + 32 + 16 + 2 + 1 = 115.", explanation: "01110011 = 115." }),
    ] });

  // ---- flashcards
  b.card("DEFINITION", "Logical shift", "Bits move n places and zeros fill the empty positions; bits shifted out are lost.");
  b.card("DEFINITION", "Arithmetic shift", "A right shift of a two's complement number that copies the sign bit into the empty places, keeping the sign.");
  b.card("DEFINITION", "Cyclic shift", "Bits shifted out at one end re-enter at the other end.");
  b.card("DEFINITION", "Mask", "A bit pattern used with AND, OR or XOR to select, set, clear or toggle chosen bits.");
  b.card("CONCEPT", "AND, OR and XOR with a mask", "AND: keep or clear (test a bit). OR: set. XOR: toggle.");
  b.card("FACT", "Shifts as arithmetic", "Left shift n places multiplies an unsigned number by 2^n; right shift n places divides by 2^n and drops the remainder.");
  b.card("CONCEPT", "Testing a bit", "AND with a mask having a 1 only in that bit, then compare the result with 0.");
  b.card("FACT", "9618 bit instructions", "AND, OR, XOR with #n, Bn, &n or an address; LSL #n and LSR #n shift ACC logically.");
  b.card("CONCEPT", "Status and control registers", "A device sets bits in a status register; the program sets bits in a control register using masks that leave the other bits alone.");
});
