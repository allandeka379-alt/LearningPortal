---
{
  "key": "prog.language-paradigms",
  "title": "Programming languages and paradigms",
  "summary": "Types of high-level language and the characteristics, typical uses and trade-offs of the low-level, imperative, object-oriented and declarative paradigms, shown by solving one task in assembly, Python, a class and SQL, and choosing a paradigm for a problem.",
  "concepts": [
    "acs.prog.language-paradigms"
  ],
  "estimatedMinutes": 45,
  "level": "core"
}
---
## Introduction

A bank in Harare uses a database language to ask "which customers have a balance above 500?", a games studio builds a farming game from objects such as Cow, Field and Farmer, and the people who write the firmware for a borehole-pump controller work almost one instruction at a time. These programmers are not just using different languages; they think about programs in different ways. These ways of thinking are called **programming paradigms**.

This lesson describes the types of high-level language, then the four paradigms in the syllabus: low-level, imperative (procedural), object-oriented and declarative. To show the differences, one small task (adding up three marks) is solved in each style, and every program was run. You should be able to read short programs in pseudocode and Python.

## Key definitions

:::definition{term="Programming paradigm"}
A style, or model, of programming that decides how the solution to a problem is described, such as step-by-step instructions, interacting objects or facts and rules.
:::

:::definition{term="Imperative (procedural) language"}
A language in which a program is a sequence of statements that change the state of the program, organised into procedures and functions. The programmer states how the result is to be obtained.
:::

:::definition{term="Declarative language"}
A language in which the programmer states what result is wanted, using facts, rules or queries, and the language system decides how to obtain it.
:::

:::definition{term="Object-oriented language"}
A language in which a program is built from objects, each holding data (properties) and the methods that work on that data, created from classes.
:::

:::definition{term="Low-level language"}
A language that is close to the hardware: machine code, or assembly language that is translated one-to-one into machine code. It is specific to one type of processor.
:::

## Types of high-level language

High-level languages are written in a form close to human language and are independent of any particular processor. They can be grouped in several ways, and a language can belong to more than one group.

- A **general-purpose language** can be used for many kinds of problem, such as Python or Java.
- A **special-purpose language** is designed for one kind of task, such as SQL for working with databases.
- An **imperative or procedural language** describes the steps to follow.
- A **declarative language** describes the result wanted.
- An **object-oriented language** organises the program around objects.

## The four paradigms compared

| Paradigm | How a program is described | Typical use |
|:-:|:-:|:-:|
| Low-level | Instructions for a particular processor, one operation at a time, with direct access to registers and memory | Device drivers, embedded controllers, parts of an operating system that must be fast or small |
| Imperative (procedural) | A sequence of statements that change the program's state, organised in procedures and functions | General-purpose applications, scripts, calculations and data processing |
| Object-oriented | Objects that combine data and the methods that act on it, created from classes | Large applications with many related parts: games, business systems, graphical user interfaces |
| Declarative | Facts, rules or queries that state what result is wanted; the system works out how to find it | Database queries, expert systems and rule-based reasoning |

## One task in four styles

The task is to find the total of three marks, 40, 55 and 70. Each program was run, and each gives the total 165.

:::worked-solution{title="Low-level: assembly language"}
The program loads the first mark into the accumulator, adds the others and stores the result. Each line is one machine operation, and the programmer must manage memory addresses (here the labelled locations).

```
    LDD Mark1
    ADD Mark2
    ADD Mark3
    STO Total
    END
Mark1: 40
Mark2: 55
Mark3: 70
Total: 0
```

Run through the processor, the program ends with 165 in the accumulator and in the location `Total`. There are no loops, variables with types or functions: the programmer controls the registers and memory directly, which gives speed and control but makes the program long and tied to one processor.
:::

:::worked-solution{title="Imperative: Python statements"}
```python
marks = [40, 55, 70]
total = 0
for mark in marks:
    total = total + mark
print("Total:", total)
```

Output:

```
Total: 165
```

The program is a sequence of statements: a variable `total` is set, a loop changes it step by step, and the result is output. The programmer states *how* the total is found.
:::

:::worked-solution{title="Object-oriented: a class"}
```python
class MarkList:
    def __init__(self):
        self.marks = []

    def add(self, mark):
        self.marks.append(mark)

    def total(self):
        return sum(self.marks)

term = MarkList()
for m in (40, 55, 70):
    term.add(m)
print("Total:", term.total())
```

Output:

```
Total: 165
```

The data (the list of marks) and the actions (`add` and `total`) are combined in the class `MarkList`. The main program creates an object `term` and asks it to do the work. This is more code for a small task, but the class could be reused and extended in a larger system.
:::

:::worked-solution{title="Declarative: an SQL query"}
The marks are held in a table and the question is stated as a query:

```
SELECT SUM(Mark) AS Total
FROM Marks;
```

Running the query on the table gave a single row:

| Total |
|:-:|
| 165 |

The programmer says *what* is wanted, the sum of the `Mark` column, and the database system decides how to read the table and add the values. In a logic language such as Prolog, a program states facts and rules and the system answers a goal, which is covered in a later lesson.
:::

## Choosing a paradigm

The choice depends on the problem. A tiny controller with very little memory suggests low-level code; a data-processing script suggests imperative code; a program with many types of thing that interact (learners, teachers, classes, timetables) suggests an object-oriented design; and a question put to a store of facts, such as a database or a medical knowledge base, suggests a declarative language. Many real systems use several: a web application may be written in an object-oriented language, send queries in SQL and run on an operating system written partly in a low-level language.

:::keyfact{title="ZIMSEC and Cambridge"}
ZIMSEC (Form 5) names the types of high-level language: imperative or procedural, declarative, general purpose, special purpose and object oriented. Cambridge (A Level only) names the paradigms low-level, imperative (procedural), object-oriented and declarative, with typical uses. Both boards ask for characteristics, a typical use and a choice justified for a given problem; writing programs in a paradigm is covered in other lessons.
:::

## Common mistakes

:::mistake{title="Saying declarative programs have no steps"}
A declarative program still runs step by step inside the language system. The point is that the *programmer* does not write those steps, only the facts, rules or query.
:::

:::mistake{title="Confusing low-level with machine code only"}
Low-level includes assembly language, which uses mnemonics and labels but is still tied to one processor and translated one-to-one.
:::

:::mistake{title="Describing a language instead of a paradigm"}
Python is a language; "imperative" and "object-oriented" are paradigms, and Python supports both. Answer with the characteristics of the paradigm.
:::

:::mistake{title="Using a vague reason for a choice"}
"It is better" earns nothing. Link the paradigm to a feature of the problem: direct hardware control, a sequence of calculations, many interacting objects or a query over stored facts.
:::

## Exam tips

:::exam-tip
ZIMSEC Paper 1 and Cambridge Paper 3 ask you to **state** the types or paradigms, **describe** a characteristic, **give a typical use** and **explain why** one paradigm suits a described problem. Give one clear characteristic and one clear use for each paradigm you name, and tie the choice to the scenario.
:::

:::exam-tip
When asked to **compare** two paradigms, write a point for each and a point on the difference, for example "imperative: the programmer states how; declarative: the programmer states what".
:::

## Summary

:::summary
- A paradigm is a style of programming; the four in the syllabus are low-level, imperative (procedural), object-oriented and declarative.
- High-level languages may be general purpose or special purpose, and a language may support several paradigms.
- Low-level code controls the hardware directly and is specific to one processor; imperative code is a sequence of statements; object-oriented code is built from objects; declarative code states what is wanted.
- The choice of paradigm depends on the problem: hardware control, step-by-step processing, many interacting objects or queries over facts.
:::
