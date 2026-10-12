---
{
  "key": "prog.declarative-programming",
  "title": "Declarative programming: facts, rules and goals",
  "summary": "Writing facts and rules in a Prolog-style language, stating goals with variables, how a query is resolved by matching and backtracking, recursion, and a comparison of the declarative and imperative approaches.",
  "concepts": [
    "acs.prog.declarative-programming"
  ],
  "estimatedMinutes": 55,
  "level": "core",
  "freePreview": true
}
---
## Introduction

When a doctor asks a medical expert system "which diseases cause a fever and a rash?", nobody has written a loop that searches for the answer. The system has been given **facts** (symptoms of diseases) and **rules** (if a patient has these symptoms, then the disease is possible), and it works out the answer itself. This is **declarative programming**, and the kind used in this lesson is **logic programming**, written in a Prolog-style language.

In imperative programming you write *how* to find the answer. In declarative programming you state *what is true* and *what you want to know*. This lesson covers facts, rules, goals and variables, how a query is answered by matching and backtracking, recursion, and a comparison with the imperative approach. Every answer was checked by running the program on a small interpreter written for this course, and every trace follows its steps. You should know the meaning of a Boolean condition and have met SQL queries.

## Key definitions

:::definition{term="Fact"}
A statement that is taken to be true, written as a predicate with its arguments and ending with a full stop, such as `parent(tendai, rudo).` It records a piece of data or a relationship.
:::

:::definition{term="Rule"}
A statement that something is true if some other conditions are true. It has a head and a body separated by `:-` (read "if"), with commas meaning "and": `grandparent(X, Z) :- parent(X, Y), parent(Y, Z).`
:::

:::definition{term="Goal (query)"}
A question put to the program: the system tries to show that the goal is true from the facts and rules, and if the goal contains variables it finds the values that make it true.
:::

:::definition{term="Variable and instantiation"}
A variable (a name that starts with a capital letter, such as `X`) stands for an unknown value. When the system matches it with a value, it is said to be instantiated to that value.
:::

:::definition{term="Backtracking"}
The way a logic program searches: when a goal cannot be satisfied, or when more solutions are wanted, the system goes back to the most recent choice, undoes the bindings made since then, and tries the next alternative.
:::

## Facts, rules and goals

By convention names of predicates and values (atoms) begin with a lower-case letter and variables with a capital letter. Every clause ends with a full stop. A family database for a fictional family has these facts:

| Fact | Meaning |
|:-:|:-:|
| `parent(sipho, tendai).` | sipho is a parent of tendai |
| `parent(tendai, rudo).` | tendai is a parent of rudo |
| `parent(tendai, farai).` | tendai is a parent of farai |
| `parent(rudo, nyasha).` | rudo is a parent of nyasha |
| `parent(farai, chipo).` | farai is a parent of chipo |

and three more facts, `female(rudo).`, `female(chipo).` and `female(nyasha).`. Rules build new relationships from facts, so the programmer does not have to list them:

```
grandparent(X, Z) :- parent(X, Y), parent(Y, Z).
mother(X, Y) :- parent(X, Y), female(X).
```

The first rule says: *X is a grandparent of Z if X is a parent of some Y and that Y is a parent of Z.* The variable `Y` links the two conditions, and each comma means "and". The second says that X is the mother of Y if X is a parent of Y and X is female.

## Asking questions

A goal with no variables gets the answer true or false. A goal with variables gets the values that make it true. The results below were produced by running each goal on the database:

| Goal | Result | Why |
|:-:|:-:|:-:|
| `parent(rudo, nyasha).` | true | this fact is in the database |
| `parent(rudo, chipo).` | false | there is no such fact and no rule can make one |
| `parent(tendai, X).` | X = rudo; X = farai | X matches the second argument of each fact whose first argument is tendai, in the order written |
| `grandparent(X, nyasha).` | X = tendai | the rule needs parent(X, Y) and parent(Y, nyasha) |
| `grandparent(sipho, W).` | W = rudo; W = farai | sipho is the parent of tendai, who has two children |
| `mother(M, nyasha).` | M = rudo | M is a parent of nyasha and is female |

When there is more than one solution, the system gives them in the order the clauses are written, and keeps going if more are requested.

## How a query is answered: matching and backtracking

To satisfy a goal the system looks through the clauses **from top to bottom** for one whose head **matches** the goal (the arguments agree, with variables able to take any value). For a fact, a match means success. For a rule, a match means the body goals must now be satisfied, one at a time from left to right. If a body goal fails, the system **backtracks**: it undoes the latest binding and tries the next matching clause.

:::worked-solution{title="Tracing the goal grandparent(X, nyasha)"}
The rule gives two goals to satisfy: `parent(X, Y)` and then `parent(Y, nyasha)`. The first goal can match each `parent` fact in turn. The table lists each attempt, in order, with the result of the second goal (checked by the interpreter):

| Try | Fact tried for parent(X, Y) | Bindings | Second goal | Result |
|:-:|:-:|:-:|:-:|:-:|
| 1 | `parent(sipho, tendai)` | X = sipho, Y = tendai | `parent(tendai, nyasha)` | false: backtrack |
| 2 | `parent(tendai, rudo)` | X = tendai, Y = rudo | `parent(rudo, nyasha)` | true: solution found |
| 3 | `parent(tendai, farai)` | X = tendai, Y = farai | `parent(farai, nyasha)` | false: backtrack |
| 4 | `parent(rudo, nyasha)` | X = rudo, Y = nyasha | `parent(nyasha, nyasha)` | false: backtrack |
| 5 | `parent(farai, chipo)` | X = farai, Y = chipo | `parent(chipo, nyasha)` | false: backtrack |

Try 1 gives Y = tendai, but parent(tendai, nyasha) is false, so the system backtracks: it undoes X = sipho and Y = tendai and moves to the next fact. Try 2 gives Y = rudo, and parent(rudo, nyasha) is a fact, so both goals are true and the first answer is X = tendai. The system would go on to rows 3 to 5 only if more solutions were requested; they show that there is no other answer, because in each of them the second goal is false.
:::

## Recursion

A rule can refer to itself, which is how relationships of any depth are defined. A person is an ancestor of another if they are a parent, or a parent of an ancestor:

```
ancestor(X, Y) :- parent(X, Y).
ancestor(X, Y) :- parent(X, Z), ancestor(Z, Y).
```

The first rule is the **base case** and the second is the **recursive case**. The goal `ancestor(sipho, Who).` was run and gave, in order: tendai, rudo, farai, nyasha, chipo. The first solution comes from the base case (a parent of sipho); the rest come from the recursive rule, which goes down one generation at a time.

## Declarative and imperative compared

The same question, "who are the grandchildren of sipho?", written in an imperative way with loops and tests:

```python
parents = [("sipho", "tendai"), ("tendai", "rudo"), ("tendai", "farai"), ("rudo", "nyasha"), ("farai", "chipo")]
result = []
for x, y in parents:
    for y2, z in parents:
        if y == y2 and x == "sipho":
            result.append(z)
print(result)
```

Output:

```
['rudo', 'farai']
```

The loop code states how to search the list of pairs. The logic program states only the rule for a grandparent and the goal `grandparent(sipho, W).`, and the system finds the same two people, rudo and farai. If the relationship needs to change (for example, to find great-grandparents) only the rules change. The cost is that the programmer has less control over the order of the search and the efficiency, and logic languages are not suited to tasks such as drawing screens.

:::keyfact{title="Cambridge only"}
Declarative programming with facts, rules and goals (Cambridge A Level, topic 20) is not in the ZIMSEC syllabus, which names declarative languages only as a type of high-level language. The syntax used here is the standard Prolog form; if a question gives a different notation, follow the notation in the question. Cambridge asks for writing facts and rules, stating a goal, and explaining the result and the process of backtracking.
:::

## Common mistakes

:::mistake{title="Starting an atom or variable with the wrong case"}
`Tendai` (capital) is a variable, not a name. Constant values and predicate names start with a lower-case letter, and variables with a capital.
:::

:::mistake{title="Forgetting the full stop"}
Every fact, rule and goal ends with a full stop. Without it the system waits for more input.
:::

:::mistake{title="Giving the solutions in the wrong order"}
Solutions follow the order of the clauses in the database. Do not sort them.
:::

:::mistake{title="Swapping the arguments"}
`parent(rudo, tendai)` is false, because the first argument is the parent. Read each predicate as it was defined.
:::

## Exam tips

:::exam-tip
Cambridge Paper 3 gives a short database of facts and asks you to **write** a fact or a rule for a stated relationship, **state the result** of a goal (all the solutions, in order) and **explain** how the system finds them. For a result, list every value of the variable in the order that the facts appear. Write full stops and remember the capital letter for variables.
:::

:::exam-tip
To **explain backtracking**, describe how the system tries a fact, fails to satisfy a later goal, undoes the binding and tries the next fact, and give one example from the question.
:::

## Summary

:::summary
- Declarative (logic) programming states facts and rules; the system finds the answers to goals.
- Facts and rules end with a full stop; `:-` means "if" and a comma means "and"; variables begin with a capital letter.
- A goal is answered by matching clauses from the top and, for a rule, satisfying its body goals from left to right.
- If a goal fails the system backtracks to the last choice and tries the next clause; solutions come in clause order.
- Recursive rules need a base case and a recursive case.
- The programmer states what is true, not how to search, which is the difference from imperative programming.
:::
