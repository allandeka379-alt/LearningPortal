---
{
  "key": "software.languages-translators",
  "title": "Programming languages, translators and IDEs",
  "summary": "High-level and low-level languages and their advantages and disadvantages; assembly language, mnemonics and assemblers; how compilers and interpreters translate code and report errors, and when each is used; the functions of an integrated development environment.",
  "concepts": ["comp.software.languages-translators"],
  "estimatedMinutes": 40,
  "freePreview": true,
  "level": "core"
}
---
## Introduction

A processor understands only one thing: **machine code**, long patterns of 1s and 0s, each pattern meaning a simple instruction such as "load", "add" or "jump". Nobody wants to write a school-fees program for a college in Masvingo as millions of binary digits. Programmers therefore write in languages that people can read, and use a **translator** to turn their code into machine code.

Cambridge 0478 (topic 4.2) asks you to explain high-level and low-level languages, to describe how compilers, interpreters and assemblers work and report errors, to compare compilers with interpreters, and to explain the functions of an integrated development environment (IDE). These are favourite Paper 1 questions, often in the form "explain **two** differences between a compiler and an interpreter".

## Key definitions

:::definition{term="Machine code"}
Instructions in binary that the processor can execute directly; each type of processor has its own instruction set.
:::

:::definition{term="High-level language"}
A programming language that uses English-like keywords and mathematical notation, is independent of any one type of processor, and must be translated before it can run; one statement often becomes many machine code instructions.
:::

:::definition{term="Low-level language"}
A programming language that relates directly to the processor's instruction set: machine code, or assembly language.
:::

:::definition{term="Assembly language"}
A low-level language in which each machine code instruction is written as a short memorable code called a **mnemonic** (such as `LDA` or `ADD`); it is translated by an **assembler**.
:::

:::definition{term="Compiler"}
A translator that translates the whole high-level program into machine code at once, before it is run, producing an executable file.
:::

:::definition{term="Interpreter"}
A translator that translates and executes a high-level program one line (statement) at a time, without producing an executable file.
:::

## High-level and low-level languages

Here is the same idea, adding a mark to a total, at three levels:

```
// High-level (pseudocode)
Total ← Total + Mark
```

```
// Assembly language (illustrative mnemonics)
LDA Total
ADD Mark
STO Total
```

In machine code the same three instructions would be three binary patterns that only that kind of processor understands.

| | High-level language | Low-level language |
|:--|:--|:--|
| Reading and writing | Easy: English-like keywords, fewer lines | Hard: many short instructions, mnemonics or binary |
| Debugging | Easier to find and correct errors | Harder: code is long and difficult to follow |
| Machine independence | Portable: can be translated for different processors | Machine dependent: written for one processor's instruction set |
| Hardware | No direct control of registers and memory addresses | Direct manipulation of hardware, registers and memory |
| Efficiency | Translated code may be larger and slower | Can be very fast and use little memory |
| Translation | Needs a compiler or interpreter | Assembly needs an assembler; machine code needs none |

Low-level languages are used when a program must control hardware directly, run very fast or fit into very little memory, for example parts of device drivers or the firmware of an embedded system. Almost all other programs are written in high-level languages.

## Translators

### Assembler

An assembler translates assembly language into machine code. Each mnemonic usually becomes exactly one machine code instruction.

### Compiler

- Translates the **whole** program in one go, **before** it is run.
- Produces an **executable file** (machine code) that can be run again and again without the compiler and without the source code.
- If there are errors, it produces an **error report for the whole program**, listing the errors with their line numbers, and no executable file is created until they are all corrected.

### Interpreter

- Translates and executes the program **line by line**.
- Does **not** produce an executable file: the program must be translated again every time it runs, so the interpreter is needed each time.
- **Stops** when it reaches a line with an error and reports that error; the lines before it have already run.

| | Compiler | Interpreter |
|:--|:--|:--|
| Translation | Whole program at once, before running | One line at a time, while running |
| Output | Executable file | No executable file |
| Errors | Report of all errors after translation | Stops at the first error found |
| Speed of the finished program | Fast: already translated | Slower: translated every time it runs |
| Distribution | Executable can be shared without giving away the source code | Users need the source code and the interpreter |
| Best used | To translate the **finished** program | While **developing** and debugging a program |

An interpreter is mostly used during development, because the programmer can run the program as far as the first error, correct it and try again straight away. A compiler is used for the final version, because the executable runs quickly, needs no translator on the user's computer, and keeps the source code private.

:::example
**How the two translators report errors.** Tatenda's program has an error on line 3 (`OUPTUT` is misspelt) and another on line 5 (`ENDIF` is missing).

```
1  OUTPUT "Welcome to the quiz"
2  INPUT Answer
3  OUPTUT "You typed ", Answer
4  IF Answer = "Harare"
5      THEN
6          OUTPUT "Correct"
```

1. **Interpreter:** line 1 is translated and executed, so "Welcome to the quiz" is displayed; line 2 runs and waits for input. At line 3 the interpreter finds the error, stops and reports it. The error at line 5 is not found until line 3 is corrected and the program is run again.
2. **Compiler:** the whole program is translated first. Nothing is executed. The compiler reports **both** errors (lines 3 and 5) in one error report, and no executable file is produced.
:::

:::example
**Choosing a translator.** Rudo is writing a stock-control program for her family's shop in Gweru. While she is writing and testing, she uses an **interpreter**, so she can run each new section immediately and see exactly where it fails. When the program is finished, she uses a **compiler** to produce an executable file for the shop's computer. The shop's computer does not need a translator installed, the program runs faster, and nobody can read or change her source code.
:::

## Integrated development environments

An **IDE** is a single program that gives the programmer the tools needed to write, translate, run and debug code.

| Function | What it does |
|:--|:--|
| Code editor | Lets the programmer type and edit code, often with line numbers and colour-coded keywords |
| Run-time environment | Lets the program be run and tested inside the IDE, showing its output |
| Translator | A built-in compiler and/or interpreter |
| Error diagnostics | Highlights errors, explains them and shows where they are, sometimes as the code is typed |
| Auto-completion | Suggests the rest of a keyword or identifier as the programmer starts to type it |
| Auto-correction | Corrects common mistakes, such as a misspelt keyword, automatically or on request |
| Prettyprint | Formats the code with consistent indentation and colour so that it is easier to read |

## Common mistakes

:::mistake{title="Saying a compiler 'runs' the program"}
A compiler only translates. The executable it produces is run afterwards, without the compiler.
:::

:::mistake{title="Saying an interpreter produces an executable file"}
It does not. That is why the interpreter is needed every time the program runs.
:::

:::mistake{title="Calling assembly language a high-level language"}
Assembly language uses mnemonics, but each one matches a machine code instruction, so it is **low-level**.
:::

## Exam tips

:::exam-tip
"**Explain** the differences between a compiler and an interpreter": write matched pairs. "A compiler translates the whole program before running it, **whereas** an interpreter translates and runs one line at a time." Two pairs earn more than four unpaired facts.
:::

:::exam-tip
For IDE questions, name the function **and** say how it helps: "auto-completion suggests the rest of an identifier, so typing errors are reduced".
:::

## Summary

:::summary
- Processors execute only machine code; other code must be translated.
- High-level languages are easy to read, write and debug and are machine independent; low-level languages give direct control of hardware and efficient code.
- Assembly language uses mnemonics and is translated by an assembler.
- A compiler translates the whole program into an executable file and reports all errors; an interpreter translates and runs line by line and stops at the first error.
- Interpreters suit development; compilers suit the finished program.
- An IDE provides an editor, run-time environment, translator, error diagnostics, auto-completion, auto-correction and prettyprint.
:::
