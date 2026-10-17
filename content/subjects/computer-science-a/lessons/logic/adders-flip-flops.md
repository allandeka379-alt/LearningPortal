---
{
  "key": "logic.adders-flip-flops",
  "title": "Half adders, full adders and flip-flops",
  "summary": "Build half and full adders from gates, chain them into a ripple-carry adder, and describe SR and JK flip-flops as one-bit storage.",
  "concepts": [
    "acs.logic.adders-flip-flops"
  ],
  "estimatedMinutes": 50,
  "level": "core"
}
---
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

| A | B | S = A XOR B | C = A AND B |
|:-:|:-:|:-:|:-:|
| 0 | 0 | 0 | 0 |
| 0 | 1 | 1 | 0 |
| 1 | 0 | 1 | 0 |
| 1 | 1 | 0 | 1 |

The half adder is therefore **one XOR gate (sum) and one AND gate (carry)** with the same two inputs.

![Half adder: an XOR gate gives the sum S and an AND gate gives the carry C from the same inputs A and B; 1 + 1 gives sum 0 and carry 1](media:diagrams/logic-half-adder.png "Figure: a half adder is one XOR gate (sum) and one AND gate (carry), with its truth table")

## The full adder

A column in the middle of a binary addition has three bits to add: the two input bits and the carry from the column to the right. A full adder is made from **two half adders and an OR gate**. The first half adder adds A and B. The second adds its sum to Cin. The OR gate combines the carry outputs of the two half adders to give Cout.

| A | B | Cin | P = A XOR B | S = P XOR Cin | Q = A AND B | R = P AND Cin | Cout = Q OR R |
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| 0 | 0 | 1 | 0 | 1 | 0 | 0 | 0 |
| 0 | 1 | 0 | 1 | 1 | 0 | 0 | 0 |
| 0 | 1 | 1 | 1 | 0 | 0 | 1 | 1 |
| 1 | 0 | 0 | 1 | 1 | 0 | 0 | 0 |
| 1 | 0 | 1 | 1 | 0 | 0 | 1 | 1 |
| 1 | 1 | 0 | 0 | 0 | 1 | 0 | 1 |
| 1 | 1 | 1 | 0 | 1 | 1 | 0 | 1 |

Check any row: A = 1, B = 1, Cin = 1 gives 1 + 1 + 1 = 11 in binary, so S = 1 and Cout = 1.

![Full adder: two half adders and an OR gate; the first half adder adds A and B to give P and Q, the second adds P and the carry in Cin to give the sum S and R, and Cout = Q OR R](media:diagrams/logic-full-adder.png "Figure: a full adder built from two half adders and an OR gate")

## The ripple-carry adder

To add numbers of several bits, chain full adders: the least significant stage can use a half adder (or a full adder with Cin = 0), and each carry out goes into the next stage.

![Four-stage ripple-carry adder adding 0110 and 0111: the carry out of each full adder is the carry in of the next stage to the left, giving the sum bits 1101 and a final carry out of 0](media:diagrams/logic-ripple-carry-adder.png "Figure: a 4-stage ripple-carry adder working out 0110 + 0111 = 1101")

:::worked-solution{title="Add 0110 and 0111 with a 4-stage ripple-carry adder"}
1. Stage 0 takes the right-hand bits, stage 1 the next bits, and so on. Pass the carry from each stage to the next:

| Stage (bit position) | A | B | Carry in | Sum | Carry out |
|:-:|:-:|:-:|:-:|:-:|:-:|
| 0 | 0 | 1 | 0 | 1 | 0 |
| 1 | 1 | 1 | 0 | 0 | 1 |
| 2 | 1 | 1 | 1 | 1 | 1 |
| 3 | 0 | 0 | 1 | 1 | 0 |

2. Read the sum bits from stage 3 down to stage 0: **1101**, with a carry out of 0 from the last stage.
3. Check: 0110 = 6 and 0111 = 7; 6 + 7 = 13, which is 01101 in binary (the carry out is the fifth bit).
:::

The disadvantage of a ripple-carry adder is delay: each stage must wait for the carry from the stage before it, so a wide adder is slower.

## The SR flip-flop

A flip-flop is built from gates whose outputs feed back into inputs, so the circuit holds its state. The **SR (set-reset) flip-flop** can be made from two NOR gates. The inputs are S (set) and R (reset); the outputs are Q and NOT Q. The output of each NOR gate is connected to an input of the other.

![SR flip-flop built from two NOR gates whose outputs feed back to each other: S=1 sets Q to 1, R=1 resets Q to 0, S=R=0 holds the stored bit, and S=R=1 is not allowed](media:diagrams/logic-sr-flip-flop.png "Figure: an SR flip-flop from two cross-coupled NOR gates")

- S = 1, R = 0: Q becomes 1 (set).
- S = 0, R = 1: Q becomes 0 (reset).
- S = 0, R = 0: Q keeps its previous value (hold). This is the memory.
- S = 1, R = 1: not allowed. Both outputs would be 0, and the state after S and R return to 0 is unpredictable.

:::worked-solution{title="Trace a NOR-gate SR flip-flop that starts with Q = 0"}
1. Apply each pair of inputs in turn. The new Q depends on S, R and the old Q:

| S | R | Q before | Q after | NOT Q after |
|:-:|:-:|:-:|:-:|:-:|
| 0 | 0 | 0 | 0 | 1 |
| 1 | 0 | 0 | 1 | 0 |
| 0 | 0 | 1 | 1 | 0 |
| 0 | 1 | 1 | 0 | 1 |
| 0 | 0 | 0 | 0 | 1 |

2. The flip-flop is set when S = 1, **holds** the 1 when both inputs return to 0, is reset when R = 1, and holds the 0 afterwards.
:::

## The JK flip-flop

The JK flip-flop removes the unusable input pair: J acts like set and K like reset, and when J = K = 1 the output **toggles** (changes to the opposite value) at each clock pulse.

| J | K | Q before | Q after | Action |
|:-:|:-:|:-:|:-:|:-:|
| 0 | 0 | 0 | 0 | hold |
| 0 | 0 | 1 | 1 | hold |
| 0 | 1 | 0 | 0 | reset |
| 0 | 1 | 1 | 0 | reset |
| 1 | 0 | 0 | 1 | set |
| 1 | 0 | 1 | 1 | set |
| 1 | 1 | 0 | 1 | toggle |
| 1 | 1 | 1 | 0 | toggle |

Its next state can be written as `Q after = (J AND (NOT Q)) OR ((NOT K) AND Q)`.

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
