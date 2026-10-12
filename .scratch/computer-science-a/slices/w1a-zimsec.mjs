// W1a exam-format item: one ZIMSEC Paper 2 section A (Computer Architecture, 30 marks) practical task on logic design and number work.
import { concept, P, EXAM, checkExam, ZIM, L, truthRows, toBase, fromBase, twos, addTwos, chk } from "../lib.mjs";

const C = (k) => `acs.${k}`;

concept(C("logic.circuits-expressions"), { file: "exam/w1a-zimsec", keyPrefix: "exam.w1a-zimsec", applies: ZIM }, (b) => {
  const f = (t, p, s) => L.and(L.and(t, p), L.not(s));
  const ones = truthRows(["T", "P", "S"], f).filter((r) => r.out).length;
  chk(ones, 1);
  const hex = "5E";
  const lvl = fromBase(hex, 16);
  const oct = toBase(lvl, 8);
  chk(fromBase(oct, 8), lvl);
  const temp = -18;
  const [x, y] = ["01110000", "00100000"];
  const add = addTwos(x, y);
  chk(add.trueValue, 144);
  b.struct({
    skill: EXAM.ZIM_P2_ARCH.skill, secs: EXAM.ZIM_P2_ARCH.secs, applies: EXAM.ZIM_P2_ARCH.applies, examStyle: true, paper: "ZIMSEC Paper 2", d: 4,
    concepts: [C("logic.gates-truth-tables"), C("logic.circuits-expressions"), C("data.number-bases"), C("data.binary-arithmetic")],
    stem: "A village near Masvingo uses a controller for its borehole pump. The pump motor R must run only when the water tank is low (T = 1) **and** mains power is available (P = 1), and it must **never** run while the safety cut-out is active (S = 1). The controller is a logic circuit with inputs T, P and S. It also has an 8-bit register that holds the tank level as a hexadecimal value and a temperature reading.",
    hints: ["Write the expression before the truth table.", "For two's complement, invert the bits and add 1.", "Octal digits are groups of three bits."],
    parts: checkExam(EXAM.ZIM_P2_ARCH, [
      P.mcq({ label: "(a)", marks: 2, stem: "Which logic expression gives R?", options: [["R = T AND P AND (NOT S)", "Correct: all three conditions are needed, with the cut-out inverted."], ["R = T OR P OR (NOT S)", "The pump would run when only one condition is true."], ["R = (T AND P) OR S", "The pump would run whenever the cut-out is active."], ["R = NOT (T AND P AND S)", "This is 1 for almost every combination."]], answer: "A", explanation: "T, P and (NOT S) must all be 1, so they are combined with AND." }),
      P.truth({ label: "(b)", marks: 4, stem: "Complete the truth table for R with inputs T, P and S.", inputs: ["T", "P", "S"], fn: f, out: "R", explanation: "R is 1 only for T = 1, P = 1 and S = 0." }),
      P.num({ label: "(c)", marks: 1, type: "CALCULATION", stem: "In how many of the eight rows does the pump run (R = 1)?", value: ones, explanation: "Only the row T = 1, P = 1, S = 0." }),
      P.num({ label: "(d)", marks: 2, type: "CALCULATION", stem: "The circuit is built from two-input AND gates and a NOT gate. How many gates are needed in total?", value: 3, explanation: "One NOT gate for S and two AND gates to combine T, P and NOT S: 3 gates." }),
      P.manual({ label: "(e)", marks: 3, stem: "Describe the circuit, saying which signals go into each gate.", points: ["A NOT gate with input S.", "A first AND gate with inputs T and P.", "A second AND gate with inputs the output of the first AND gate and the output of the NOT gate; its output is R."], modelAnswer: "Input S goes into a NOT gate. Inputs T and P go into an AND gate. The output of that AND gate and the output of the NOT gate go into a second AND gate, whose output is R." }),
      P.group({
        label: "(f)", stem: `The register holds the tank level as the hexadecimal number **${hex}**.`,
        parts: [
          P.bits({ label: "(i)", marks: 2, stem: "Write the contents of the register as an 8-bit binary number.", value: lvl, width: 8, explanation: `5 = 0101 and E (14) = 1110, so ${hex} = ${toBase(lvl, 2, 8)}.` }),
          P.num({ label: "(ii)", marks: 2, type: "CALCULATION", stem: "Give the denary value of the register contents.", value: lvl, explanation: `${hex} = 5 × 16 + 14 = ${lvl}.` }),
        ],
      }),
      P.group({
        label: "(g)", stem: "The service engineer prefers octal.",
        parts: [
          P.bits({ label: "(i)", marks: 2, stem: `Write the denary value ${lvl} in octal.`, value: lvl, base: 8, explanation: `${lvl} = ${toBase(lvl, 2, 9)} in binary; in threes ${toBase(lvl, 2, 9).match(/.{3}/g).join(" ")} = ${oct}.` }),
          P.tf({ label: "(ii)", marks: 1, stem: "One octal digit represents four bits.", answer: false, explanation: "One octal digit represents three bits; one hexadecimal digit represents four." }),
        ],
      }),
      P.group({
        label: "(h)", stem: "The register is also used to store a temperature in 8-bit two's complement.",
        parts: [
          P.bits({ label: "(i)", marks: 2, stem: `Write the temperature ${String(temp).replace("-", "−")} °C in 8-bit two's complement.`, value: temp, width: 8, twosComplement: true, explanation: `+18 = ${toBase(18, 2, 8)}; invert and add 1 to give ${twos(temp, 8)}.` }),
          P.bits({ label: "(ii)", marks: 2, stem: `A calculation adds the values ${x} and ${y}. Give the 8-bit result stored in the register.`, value: fromBase(add.sum, 2), width: 8, explanation: `${x} + ${y} = ${add.sum}.` }),
        ],
      }),
      P.mcq({ label: "(i)", marks: 2, stem: `Both numbers added in (h)(ii) are positive two's complement values. What does the result show?`, options: [["No error, because the result is a valid 8-bit pattern in the register", "Every pattern is valid, but this one has the wrong value."], ["Overflow: two positives gave a negative-looking result", "Correct: the true total, 144, is above 127."], ["The result is correct, because the carry out of the register is 0", "The carry out is not the test for overflow."], ["Underflow, because the answer shown is a negative number", "Underflow applies to real numbers."]], answer: "B", explanation: "The sum 144 is outside −128 to 127, so the stored pattern is read as a negative number." }),
      P.manual({ label: "(j)", marks: 3, stem: "Give three reasons why the engineer's display shows register contents in hexadecimal rather than binary.", points: ["It is much shorter (two digits for eight bits).", "It is easier to read and compare.", "It is less likely to be mistyped, and converts directly to binary in groups of four bits."], modelAnswer: "Hexadecimal needs only two digits for an 8-bit value, so it is shorter and easier to read. It is less error-prone to copy, and each digit converts directly to four bits." }),
      P.fib({ label: "(k)", marks: 2, stem: "Complete the statement about universal gates.", template: "A NOT gate can be built from a {{blank:g}} gate by joining its {{blank:i}} inputs together.", blanks: [{ id: "g", choices: ["NAND", "AND", "XOR", "OR"], accepted: ["NAND"] }, { id: "i", choices: ["two", "output and one", "no"], accepted: ["two"] }], explanation: "A NAND gate with both inputs joined to A gives NOT A (a NOR gate would also work)." }),
    ]),
    explanation: `R = T AND P AND (NOT S), true in one row. The register holds ${toBase(lvl, 2, 8)} = ${lvl} = ${oct} in octal; ${twos(temp, 8)} stores the temperature; ${x} + ${y} overflows.`,
  });
});
