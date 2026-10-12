---
{
  "key": "cpu.risc-cisc-pipelining",
  "title": "RISC and CISC processors and pipelining",
  "summary": "The differences between reduced and complex instruction set computers, how pipelining overlaps the fetch, decode and execute of different instructions, the timing of a pipeline, branch hazards, the importance of registers in RISC and how interrupts are handled.",
  "concepts": ["acs.cpu.risc-cisc-pipelining"],
  "estimatedMinutes": 45,
  "level": "core"
}
---
## Introduction

A laundry in Gweru washes, dries and folds. If one customer's bundle goes through all three stages before the next customer's bundle starts, the dryer and the folding table spend most of the day idle. A sensible owner starts the second wash as soon as the first load moves to the dryer. Nothing is done faster by any machine; more work is simply done at the same time.

A processor can do the same with instructions. This idea is **pipelining**, and it is easier when the instructions are short and similar, which is why it is linked with **RISC** processors. This lesson compares RISC and CISC designs, shows how a pipeline is timed, explains the problem of branches, and describes how interrupts are handled on each type.

You should already know the fetch, decode and execute stages, the role of registers, and the meaning of an instruction set.

## Key definitions

:::definition{term="Instruction set"}
The complete set of machine-code instructions that a particular processor can carry out.
:::

:::definition{term="Complex Instruction Set Computer (CISC)"}
A processor with a large set of instructions, some of them powerful and taking several cycles, so that a task needs fewer instructions.
:::

:::definition{term="Reduced Instruction Set Computer (RISC)"}
A processor with a small set of simple, fixed-length instructions that mostly take one clock cycle each, with many registers.
:::

:::definition{term="Pipelining"}
Overlapping the stages of several instructions so that, while one instruction is being executed, the next is being decoded and the one after is being fetched.
:::

## RISC and CISC

{{comparison}}

Because every RISC instruction does only a little, a RISC program needs **more instructions**, and a good compiler is needed to produce them. In return the processor design is simple, uses little power and can complete an instruction almost every cycle. A CISC program is shorter, which saved memory when memory was expensive, but the complex instructions need more circuitry and some take many cycles. RISC uses a **load-store** design: only `LOAD` and `STORE` instructions use memory, and all arithmetic uses registers.

**Why registers matter in RISC.** Registers are inside the processor and are much faster than memory. A RISC processor has many registers so that values can stay in the processor between instructions, which avoids slow memory accesses and keeps the pipeline supplied.

## Pipelining

Without pipelining, an instruction passes through all of its stages before the next starts. With a three-stage pipeline (fetch **F**, decode **D**, execute **E**) a new instruction enters every cycle once the pipeline is full.

:::worked-solution{title="Timing five instructions on a three-stage pipeline"}
{{p5}}

1. Without a pipeline, 5 instructions × 3 stages = {{unpiped}} cycles.
2. With the pipeline the last instruction finishes in cycle {{p5cycles}}: the first needs 3 cycles, then one more instruction finishes every cycle (3 + 4 = 7).
3. In general, *n* instructions on a *k*-stage pipeline take *n* + *k* − 1 cycles, against *n* × *k* without one.
:::

:::worked-solution{title="A longer program"}
A program has {{n}} instructions and the pipeline has {{k}} stages. Every stage takes one cycle.

1. Without a pipeline: {{n}} × {{k}} = {{un}} cycles.
2. With a pipeline: {{n}} + {{k}} − 1 = {{pi}} cycles.
3. The speed-up is {{un}} ÷ {{pi}} = {{sp}}, close to the number of stages, as expected for a long program.
:::

Pipelining does not shorten the time for one instruction; it increases the **throughput**, the number of instructions finished per second. It works best when instructions are of the same length and take the same time, which is why RISC fits it.

## Pipeline hazards: branches

The pipeline fetches instructions in order. When a **jump or branch** is executed, the instructions already fetched after it may not be the ones that should run. They must be **discarded** (flushed), and fetching restarts at the target address.

:::worked-solution{title="A taken jump in the pipeline"}
Instruction I3 is a jump to a distant address. I4 and I5 are fetched while I3 is still being decoded and executed.

{{br}}

1. I3 executes in cycle 5, when the jump target becomes known.
2. I4 and I5 were fetched (and I4 decoded) but are discarded: the stages shown for I4 and I5 are wasted.
3. The target instruction is fetched in cycle 6 and finishes in cycle {{brCycles}}, two cycles later than if the program had continued in order.
:::

Designers reduce the cost with branch prediction (guessing the outcome and fetching ahead), but a wrong guess still means flushing the pipeline. A long pipeline pays a bigger penalty. Another hazard arises when an instruction needs the result of the one before it before it is ready; the pipeline must wait.

## Interrupts on CISC and RISC

The processor still checks for an interrupt at the end of the cycle, but the state to be saved differs.

- **CISC**: a complex instruction may take many cycles, so the interrupt is usually serviced between instructions, or the instruction must be made restartable. There are fewer registers to save.
- **RISC**: several instructions are in the pipeline at the same time, so the processor must either complete them or discard them, and must record which instruction to resume with. There are many registers, so more values may have to be saved.

:::example{title="Choosing for a phone and for a server"}
A budget phone in Harare needs a processor that does a lot of work on a small battery, so a RISC design with a simple, low-power core and a pipeline suits it. A mainframe that runs older business software may be built on a CISC instruction set because the programs are written for it. The choice depends on power, cost and existing software.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
ZIMSEC names pipelining in Form 5; the comparison of RISC and CISC and the handling of interrupts on each are Cambridge detail (A Level only). Write it once at the deeper level: pipelining for both boards, RISC against CISC for Cambridge.
:::

## Common mistakes

:::mistake{title="Saying pipelining makes one instruction finish faster"}
A single instruction takes as long as before. Pipelining raises throughput by overlapping instructions.
:::

:::mistake{title="Saying that RISC programs are shorter"}
A RISC task needs more instructions because each is simpler. CISC programs are shorter.
:::

:::mistake{title="Giving 'faster' as the whole comparison"}
Compare features: instruction count and length, cycles per instruction, number of registers, hardware complexity, memory access.
:::

:::mistake{title="Forgetting the branch penalty"}
A pipeline is not always full. After a jump, instructions are discarded and the pipeline refills.
:::

## Exam tips

:::exam-tip
"**Compare** RISC and CISC" earns marks for matching pairs: simple against complex instructions, fixed against variable length, one cycle against several, many against few registers.
:::

:::exam-tip
For a pipeline table question, draw one row per instruction, shift each row one cycle to the right, and count the last cycle. Check with *n* + *k* − 1.
:::

:::exam-tip
"**Explain** why a jump slows a pipeline": the instructions fetched after the jump may be the wrong ones, so they are discarded and the pipeline must be refilled from the target.
:::

## Summary

:::summary
- CISC: many complex, variable-length instructions, several cycles each, few registers, shorter programs.
- RISC: few simple, fixed-length instructions, mostly one cycle, many registers, load-store, longer programs.
- Pipelining overlaps stages of different instructions: *n* instructions on *k* stages take *n* + *k* − 1 cycles.
- A jump forces the instructions fetched after it to be discarded, causing a delay.
- RISC registers keep data inside the processor and the pipeline supplied; interrupts need the pipeline to be completed or flushed and the resume point recorded.
:::
