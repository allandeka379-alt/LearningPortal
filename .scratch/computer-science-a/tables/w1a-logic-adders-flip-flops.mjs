import { truthTableMd, truthRows, L, mdTable, toBase, fromBase, chk, same } from "../lib.mjs";
import { writeLesson } from "./w1a-lib.mjs";

// half adder
const two = ["A", "B"];
const half = truthTableMd(two, [["S = A XOR B", L.xor], ["C = A AND B", L.and]]);
// full adder
const three = ["A", "B", "Cin"];
const fullS = (a, b, c) => L.xor(L.xor(a, b), c);
const fullC = (a, b, c) => L.or(L.and(a, b), L.and(c, L.xor(a, b)));
for (const r of truthRows(three, () => 0)) {
  const [a, b, c] = r.vals;
  chk(2 * fullC(a, b, c) + fullS(a, b, c), a + b + c);
}
const full = truthTableMd(three, [["P = A XOR B", (a, b) => L.xor(a, b)], ["S = P XOR Cin", fullS], ["Q = A AND B", (a, b) => L.and(a, b)], ["R = P AND Cin", (a, b, c) => L.and(L.xor(a, b), c)], ["Cout = Q OR R", fullC]]);
// ripple carry 4-bit
const x = "0110", y = "0111";
function ripple(xs, ys) {
  let carry = 0;
  const rows = [];
  for (let i = xs.length - 1; i >= 0; i--) {
    const a = Number(xs[i]), b = Number(ys[i]);
    const s = fullS(a, b, carry), co = fullC(a, b, carry);
    rows.push({ pos: xs.length - 1 - i, a, b, cin: carry, s, co });
    carry = co;
  }
  return { rows, sum: rows.map((r) => r.s).reverse().join(""), carryOut: carry };
}
const rp = ripple(x, y);
chk(fromBase(rp.sum, 2) + 16 * rp.carryOut, fromBase(x, 2) + fromBase(y, 2));
const rpTable = mdTable(["Stage (bit position)", "A", "B", "Carry in", "Sum", "Carry out"], rp.rows.map((r) => [r.pos, r.a, r.b, r.cin, r.s, r.co]));
// SR NOR latch simulation
function srStep(state, s, r) {
  let { q, qb } = state;
  for (let i = 0; i < 6; i++) {
    const nq = L.nor(r, qb);
    const nqb = L.nor(s, nq);
    q = nq;
    qb = nqb;
  }
  return { q, qb };
}
const seq = [[0, 0], [1, 0], [0, 0], [0, 1], [0, 0]];
let st = { q: 0, qb: 1 };
const srRows = [];
for (const [s, r] of seq) {
  const before = st.q;
  st = srStep(st, s, r);
  srRows.push([s, r, before, st.q, st.qb]);
}
const srTrace = mdTable(["S", "R", "Q before", "Q after", "NOT Q after"], srRows);
same(srRows.map((r) => r[3]), [0, 1, 1, 0, 0], "sr trace");
// JK
const jkNext = (j, k, q) => (j && !q) || (!k && q) ? 1 : 0;
const jkRows = [];
for (const [j, k] of [[0, 0], [0, 1], [1, 0], [1, 1]]) for (const q of [0, 1]) jkRows.push([j, k, q, jkNext(j, k, q)]);
const jkTable = mdTable(["J", "K", "Q before", "Q after", "Action"], jkRows.map(([j, k, q, n]) => [j, k, q, n, j === 0 && k === 0 ? "hold" : j === 0 && k === 1 ? "reset" : j === 1 && k === 0 ? "set" : "toggle"]));
chk(jkNext(1, 1, 0), 1);
chk(jkNext(1, 1, 1), 0);

const body = `
## Introduction

When a cashier in Harare enters 6 and 7 into a calculator, a few dozen logic gates add the numbers in a fraction of a second. The same gates, arranged differently, remember a value for as long as the power stays on. In this lesson you will see how the gates you already know are combined into **adders**, which do binary arithmetic, and **flip-flops**, which store one bit. Together they are the building blocks of the processor's arithmetic circuits and of its registers and memory.

You should know the truth tables of AND, OR, XOR, NOR and NAND and how to add binary numbers.

## Key definitions

:::definition{term="Half adder"}
A circuit that adds two single bits, A and B, and gives a sum bit S and a carry bit C. It cannot accept a carry from a previous column.
:::

:::definition{term="Full adder"}
A circuit that adds two bits and a carry in (Cin), giving a sum bit and a carry out (Cout).
:::

:::definition{term="Ripple-carry adder"}
A multi-bit adder made of full adders in a row, in which the carry out of each stage is the carry in of the next.
:::

:::definition{term="Flip-flop"}
A circuit with two stable states that can store one bit, and that keeps its output until it is changed by an input.
:::

## The half adder

Adding two bits gives 0 + 0 = 0, 0 + 1 = 1, 1 + 0 = 1 and 1 + 1 = 10 (sum 0, carry 1). The sum is 1 when the inputs differ, which is an XOR. The carry is 1 only when both inputs are 1, which is an AND.

${half}

The half adder is therefore **one XOR gate (sum) and one AND gate (carry)** with the same two inputs.

## The full adder

A column in the middle of a binary addition has three bits to add: the two input bits and the carry from the column to the right. A full adder is made from **two half adders and an OR gate**. The first half adder adds A and B. The second adds its sum to Cin. The OR gate combines the carry outputs of the two half adders to give Cout.

${full}

Check any row: A = 1, B = 1, Cin = 1 gives 1 + 1 + 1 = 11 in binary, so S = 1 and Cout = 1.

## The ripple-carry adder

To add numbers of several bits, chain full adders: the least significant stage can use a half adder (or a full adder with Cin = 0), and each carry out goes into the next stage.

:::worked-solution{title="Add ${x} and ${y} with a 4-stage ripple-carry adder"}
1. Stage 0 takes the right-hand bits, stage 1 the next bits, and so on. Pass the carry from each stage to the next:

${rpTable}

2. Read the sum bits from stage ${rp.rows.length - 1} down to stage 0: **${rp.sum}**, with a carry out of ${rp.carryOut} from the last stage.
3. Check: ${x} = ${fromBase(x, 2)} and ${y} = ${fromBase(y, 2)}; ${fromBase(x, 2)} + ${fromBase(y, 2)} = ${fromBase(x, 2) + fromBase(y, 2)}, which is ${toBase(fromBase(x, 2) + fromBase(y, 2), 2, 5)} in binary (the carry out is the fifth bit).
:::

The disadvantage of a ripple-carry adder is delay: each stage must wait for the carry from the stage before it, so a wide adder is slower.

## The SR flip-flop

A flip-flop is built from gates whose outputs feed back into inputs, so the circuit holds its state. The **SR (set-reset) flip-flop** can be made from two NOR gates. The inputs are S (set) and R (reset); the outputs are Q and NOT Q. The output of each NOR gate is connected to an input of the other.

- S = 1, R = 0: Q becomes 1 (set).
- S = 0, R = 1: Q becomes 0 (reset).
- S = 0, R = 0: Q keeps its previous value (hold). This is the memory.
- S = 1, R = 1: not allowed. Both outputs would be 0, and the state after S and R return to 0 is unpredictable.

:::worked-solution{title="Trace a NOR-gate SR flip-flop that starts with Q = 0"}
1. Apply each pair of inputs in turn. The new Q depends on S, R and the old Q:

${srTrace}

2. The flip-flop is set when S = 1, **holds** the 1 when both inputs return to 0, is reset when R = 1, and holds the 0 afterwards.
:::

## The JK flip-flop

The JK flip-flop removes the unusable input pair: J acts like set and K like reset, and when J = K = 1 the output **toggles** (changes to the opposite value) at each clock pulse.

${jkTable}

Its next state can be written as \`Q after = (J AND (NOT Q)) OR ((NOT K) AND Q)\`.

## Flip-flops as storage

Each flip-flop stores one bit. A register that holds an 8-bit number is eight flip-flops side by side, and static memory (SRAM) is made of large numbers of flip-flops. They keep their value as long as power is supplied.

:::keyfact{title="Cambridge only"}
Half adders, full adders, ripple-carry adders and SR and JK flip-flops are A Level topics for Cambridge (Paper 3). They are not in the ZIMSEC A Level specification, so these items are tagged to Cambridge only.
:::

## Common mistakes

:::mistake{title="Using OR for the sum bit"}
OR gives 1 for 11, but 1 + 1 has a sum bit of 0. The sum of two bits is XOR.
:::

:::mistake{title="Forgetting the carry in at the next stage"}
Each stage after the first adds three bits (A, B and the carry from the stage before). Write the carry in a row of its own.
:::

:::mistake{title="Using S = 1 and R = 1 on an SR flip-flop"}
This input combination is invalid because both outputs are forced to the same value and the final state is unpredictable.
:::

:::mistake{title="Saying that a flip-flop changes at once when it holds"}
With no change to the inputs, the output stays the same. The feedback keeps the old value.
:::

## Exam tips

:::exam-tip{title="Which paper tests this"}
Cambridge Paper 3 asks you to complete the truth table of a half or full adder, to describe how a full adder is built from two half adders and an OR gate, to trace a ripple-carry addition, and to complete the truth table or trace of an SR or JK flip-flop. For **describe**, name each gate and say what goes into it. For **trace**, give one row for each input change.
:::

:::exam-tip{title="Name the outputs"}
Label the outputs S and C (or Cout) and say which gate produces each.
:::

:::exam-tip{title="Check addition with denary"}
After adding by columns, convert to denary to see that the carry and the sum bits are correct.
:::

## Summary

:::summary
- Half adder: S = A XOR B, C = A AND B.
- Full adder: two half adders and an OR gate; it adds A, B and a carry in.
- A ripple-carry adder chains full adders so that each carry out is the next carry in.
- An SR flip-flop (two NOR gates) sets, resets or holds; S = R = 1 is invalid. A JK flip-flop also toggles when J = K = 1.
- Flip-flops store one bit each and make up registers and static memory.
:::
`;
writeLesson({ key: "logic.adders-flip-flops", title: "Half adders, full adders and flip-flops", summary: "Build half and full adders from gates, chain them into a ripple-carry adder, and describe SR and JK flip-flops as one-bit storage.", concept: "acs.logic.adders-flip-flops", minutes: 50 }, body);
