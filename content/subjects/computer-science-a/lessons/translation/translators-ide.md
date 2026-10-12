---
{
  "key": "translation.translators-ide",
  "title": "Language translators and integrated development environments",
  "summary": "Why assemblers, compilers and interpreters are needed, the benefits and drawbacks of compiling and interpreting and when to use each, partly compiled and partly interpreted languages, source and object code, and the features of an integrated development environment.",
  "concepts": ["acs.translation.translators-ide"],
  "estimatedMinutes": 50,
  "level": "core"
}
---
## Introduction

A student at a school in Gweru writes a program in Python on a laptop and runs it in seconds. A company that sells accounting software to shops across Zimbabwe writes its program in another language and delivers one file that runs on the customer's computer without the source code. Both programs started as text that a human can read. The processor can run neither of them until the text has been **translated** into machine code.

This lesson explains why translators are needed, how an **assembler**, a **compiler** and an **interpreter** differ, when each is the better choice, what **source code** and **object code** are, how some languages are partly compiled and partly interpreted, and the features of an **integrated development environment (IDE)** that help a programmer to write and test a program.

You should already know that a processor executes machine code, and the difference between high-level and low-level languages.

## Key definitions

:::definition{term="Translator"}
A program that converts a program written in one language into another language, for example from a high-level language or assembly language into machine code.
:::

:::definition{term="Compiler"}
A translator that converts the whole of a high-level program into machine code (object code) before it is run; the object code can then be run without the compiler.
:::

:::definition{term="Interpreter"}
A translator that analyses and executes a high-level program one statement at a time, without producing a complete translated copy.
:::

:::definition{term="Source code and object code"}
Source code is the program as the programmer wrote it. Object code is the machine code produced by translating it.
:::

## The three translators

| Translator | Translates | Output |
|---|---|---|
| Assembler | Assembly language | Machine code, one instruction for each assembly instruction |
| Compiler | A high-level language, all at once | Object code (a complete translated program) |
| Interpreter | A high-level language, statement by statement | Nothing saved: each statement is translated and executed immediately |

## Compiling and interpreting compared

| | Compiler | Interpreter |
|---|---|---|
| When the program is translated | Before it is run, in one go | While it is running, every time |
| Speed of execution | Fast: the translation is already done | Slower: each statement is translated each time it is run |
| Errors | All syntax errors are reported after the translation; the program cannot be run until they are fixed | Execution stops at the first error, so the program can be tested up to that point |
| Distribution | The object code can be given to users without the source code, which protects the programmer's work | The user needs the interpreter and the source code |
| Portability | Object code works on one type of processor; the source is recompiled for another | The same source runs on any computer that has an interpreter |
| Development | Slower: compile, then run, then change and compile again | Quick: change one line and run again |

:::keyfact{title="Which one to use"}
Use an **interpreter** while developing and testing, because errors are found at once and small changes can be tried quickly. Use a **compiler** for the finished program that will be used many times, because it runs faster and the source code stays private.
:::

### Worked example: compile or interpret?

Suppose, with invented figures for illustration, that compiling a program takes 12 s, running the compiled program takes 0.4 s, and interpreting it takes 3 s every time it is run.

:::worked-solution{title="When does compiling pay off?"}
| Runs | Compile once, then run (s) | Interpret each time (s) | Faster overall |
|:-:|:-:|:-:|:-:|
| 1 | 12.4 | 3 | interpreted |
| 2 | 12.8 | 6 | interpreted |
| 3 | 13.2 | 9 | interpreted |
| 4 | 13.6 | 12 | interpreted |
| 5 | 14 | 15 | compiled |
| 6 | 14.4 | 18 | compiled |

1. Compiled: 12 + 0.4 × (number of runs). Interpreted: 3 × (number of runs).
2. The compiled version becomes faster overall when 12 + 0.4n < 3n, which gives n > 4.6.
3. The first whole number of runs for which this is true is 5.
4. A program that is run only once or twice is better interpreted; one that is run many times, such as a payroll or a till system, is better compiled.
:::

## Partly compiled, partly interpreted

Some languages are translated in two stages. The compiler converts the source code into an **intermediate code**, often called **byte code**, which is not tied to one type of processor. A program called a **virtual machine** then interprets the byte code on the user's computer (some systems also translate it to machine code as it runs). Java works in this way, and so does the standard form of Python. The benefits are that the same byte code runs on any computer with the virtual machine (portability), and the compiled stage can find many errors before the program is run.

:::example{title="Choosing a translator"}
A teacher in Mutare is writing a small program to analyse class test marks and changes it many times a day while testing it. An interpreter lets her run each change at once and see the line where an error occurs. A software company in Harare has finished a stock-control program that thousands of shop owners will run every day. Compiling it gives fast object code, and the shop owners never receive the source code, so the company's work is protected. The same language may be used by both, with a different translator at each stage.
:::

## Features of an IDE

An **integrated development environment** combines an editor, a translator and testing tools in one program.

| Feature | What it does |
|---|---|
| Context-sensitive prompts | Offers the names of keywords, variables and functions as you type, or shows help for the one under the cursor |
| Dynamic syntax checking | Underlines errors, such as a missing bracket, as the line is typed |
| Pretty-print | Lays the code out with indentation and colours for keywords, so the structure is easy to see |
| Collapsing code blocks | Hides a procedure or loop body so that a long program is easier to navigate |
| Single stepping | Runs one statement at a time so the programmer can follow what happens |
| Breakpoints | Stops the program at a chosen line so that its state can be inspected |
| Variable and expression report windows | Show the current values of variables and of expressions while the program is paused |

:::worked-solution{title="Single stepping a loop"}
Here is a short program in pseudocode and the same program in Python.

```
Total ← 0
FOR Count ← 1 TO 4
    Total ← Total + Count * Count
NEXT Count
OUTPUT Total
```

```python
total = 0
for count in range(1, 5):
    total = total + count * count
print(total)
```

The output of the Python program is:

```
30
```

If a breakpoint is set on the output statement, the variable report window shows the final values. Single stepping through the loop and reading the report window after each step gives:

| Count | Total |
|:-:|:-:|
| 0 | 0 |
| 1 | 1 |
| 2 | 5 |
| 3 | 14 |
| 4 | 30 |

1. Before the loop `Total` is 0.
2. Each step adds the square of `Count`: 1, 4, 9 and 16.
3. The values 1, 5, 14 and 30 can be compared with what the programmer expected, to find where an error begins.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Translators and the features of an IDE are Cambridge AS content (topic 5.2). ZIMSEC covers translators within programming but does not list IDE features.
:::

## Common mistakes

:::mistake{title="Saying an interpreter produces object code"}
An interpreter executes the statements directly. Only a compiler (or an assembler) produces a complete translated program.
:::

:::mistake{title="Saying a compiled program runs more slowly because it is translated as it runs"}
Translation is done in advance, so the compiled program runs faster. It is the interpreter that translates while running.
:::

:::mistake{title="Describing byte code as machine code"}
Byte code is intermediate code for a virtual machine. It must be interpreted (or further translated) before the processor can run it.
:::

:::mistake{title="Confusing breakpoints with single stepping"}
A breakpoint stops the program at a chosen line; single stepping runs it one statement at a time from there.
:::

## Exam tips

:::exam-tip
Cambridge **Paper 1** asks you to **explain** why a translator is needed (the processor runs only machine code), to **compare** a compiler and an interpreter, and to **state** or **describe** IDE features. For a comparison give a point about each translator, not two points about one.
:::

:::exam-tip
"**Explain** which translator to use": interpreter while testing, because it reports an error at once and runs part-finished programs; compiler for the finished product, because it is fast and does not reveal the source code.
:::

## Summary

:::summary
- A processor runs only machine code, so programs in other languages must be translated.
- An assembler translates assembly language; a compiler translates the whole program before it is run; an interpreter translates and executes one statement at a time.
- Compiled programs run faster and hide the source; interpreters suit development and portability.
- Some languages are compiled to byte code that a virtual machine interprets.
- An IDE provides prompts, syntax checking, pretty-print, collapsing, single stepping, breakpoints and report windows.
:::
