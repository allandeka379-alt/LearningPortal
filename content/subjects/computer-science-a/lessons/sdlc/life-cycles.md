---
{
  "key": "sdlc.life-cycles",
  "title": "Development life cycles: waterfall, iterative and RAD",
  "summary": "The stages of a program or system development life cycle (including the nine ZIMSEC stages), the waterfall, iterative and rapid application development models, their benefits and drawbacks, and how to choose a model for a described project.",
  "concepts": ["acs.sdlc.life-cycles"],
  "estimatedMinutes": 45,
  "level": "core",
  "freePreview": true
}
---
## Introduction

A bus company in Bulawayo wants a program to sell tickets and track seats. If the programmer starts typing code on the first day, one of two things usually happens: the program does something the company did not want, or it does the right thing but breaks when a new route is added. Large programs are built by teams over months, and nobody can keep all the details in their head.

A **development life cycle** is an agreed series of stages that a project passes through, from the first idea to a working, maintained system. Following one makes a project predictable: everybody knows what must be done next, what documents are produced and when the customer will see something. This lesson covers the stages, three models for organising them (**waterfall**, **iterative** and **rapid application development**) and how to choose between them.

You should already know what a program is and be able to describe in general terms what testing is.

## Key definitions

:::definition{term="Program development life cycle"}
The series of stages through which a program or system passes from the first idea to its retirement, normally analysis, design, coding, testing and maintenance.
:::

:::definition{term="Waterfall model"}
A life cycle in which the stages are carried out once, in order, and each stage is finished and signed off before the next begins.
:::

:::definition{term="Iterative model"}
A life cycle in which the system is developed in repeated cycles. Each cycle delivers a working version that is reviewed and then improved or extended in the next cycle.
:::

:::definition{term="Rapid application development (RAD)"}
A life cycle that builds quickly by making working prototypes with the user, reusing components and tools, and refining the prototypes until they become the final system.
:::

## The stages of the life cycle

The five stages that Cambridge names are:

1. **Analysis**: find out what the system must do (the requirements) and record them in a requirements specification.
2. **Design**: decide how the system will meet the requirements: structure charts, algorithms, data structures, screens and the test plan.
3. **Coding**: write the program from the design (in a high-level language).
4. **Testing**: run the program with test data to find and correct faults, and check it against the requirements.
5. **Maintenance**: correct faults and change the system after it has been put to use.

ZIMSEC describes a longer, nine-stage cycle for a system development project. The five stages above are included in it, with the earlier and later activities spelt out.

| No. | Stage | Main question answered |
|:-:|:-:|:-:|
| 1 | Preliminary investigation | Is there a problem worth solving? Who asked for it? |
| 2 | Feasibility study | Is the solution possible, affordable and acceptable? |
| 3 | Analysis | What must the new system do? How does the present system work? |
| 4 | Design | How will the system work? Inputs, outputs, files, screens, test plan |
| 5 | Development | Write and build the programs and files |
| 6 | Testing | Find and remove faults; check against the requirements |
| 7 | Implementation | Install the system, convert the data, train the users |
| 8 | Maintenance | Correct faults, adapt to change and improve the system |
| 9 | Evaluation | Judge whether the system meets its objectives |

ZIMSEC and Cambridge differ only in how finely the stages are divided. Preliminary investigation and feasibility come before analysis; implementation (installing and starting to use the system) and evaluation come after testing.

## The waterfall model

In the **waterfall model** the output of each stage flows to the next, like water over a series of steps: analysis, design, coding, testing, maintenance. Each stage is documented and approved before the next starts. Going back is possible but expensive.

**Benefits:**

- it is simple to understand and to manage, with clear stages and documents;
- progress is easy to measure (a stage is either finished or not);
- it works well when the requirements are clear and will not change;
- thorough documentation helps the maintainers later.

**Drawbacks:**

- the customer sees nothing working until near the end;
- if the requirements are wrong or change, finding out late is costly;
- testing is left until after all the coding;
- it does not suit projects where the user cannot say in advance what they need.

## The iterative model

In the **iterative model** a basic version is built first. After each cycle (iteration) the users try the working version and the developers use their comments to improve it or add the next feature. Every iteration contains a mini analysis, design, code and test.

**Benefits:** users see working software early; changes of requirements are welcome; risk is reduced because problems are found early; the most important features are built first.

**Drawbacks:** the final cost and end date are harder to predict; the overall design can become untidy if it is not managed; it needs frequent contact with the users; documentation is easier to neglect.

:::worked-solution{title="When can users first use the system?"}
A project takes 12 weeks. The first plan builds it as one waterfall build. The second plan builds it in 4-week iterations, each adding one third of the features.

| Iteration | Weeks | Share of the final system working |
|:-:|:-:|:-:|
| Iteration 1 | weeks 1 to 4 | 33% |
| Iteration 2 | weeks 5 to 8 | 67% |
| Iteration 3 | weeks 9 to 12 | 100% |

1. With the waterfall plan the system is used for the first time after 12 weeks.
2. With the iterative plan a working system (one third of the features) is in use after 4 weeks, and the users' comments can change what is built in iterations 2 and 3.
3. The total effort may be similar, but the iterative plan gives earlier feedback.
:::

## Rapid application development (RAD)

RAD is a variation designed for speed. Developers and users meet in short workshops. The developers build **prototypes** quickly, often using tools that generate screens and code and **reusing** existing components. The users test each prototype, and the prototype is refined until it becomes the final system. Time is fixed (it is set in a short timebox) and features are adjusted to fit.

**Benefits:** a working system is delivered quickly; the users are involved throughout, so the result is closer to what they want; reuse saves effort.

**Drawbacks:** it needs users who are available and knowledgeable; the quality and the ability to cope with growth can suffer from the speed; it is unsuitable for large, safety-critical systems; the documentation can be thin.

## Choosing a model

| Situation | Suitable model | Reason |
|---|---|---|
| Requirements are fixed and well understood, as in a payroll program | Waterfall | Little to discover; documents and sign-off matter |
| Requirements are unclear or likely to change, as in a new mobile app | Iterative | Users' feedback shapes later cycles |
| A working system is needed quickly, and users are available | RAD | Prototypes and reuse give speed |
| A safety-critical system, such as controlling a medical device | Waterfall with strict testing | Each stage must be proved correct |

:::example{title="A choice for a school fees system"}
A school wants a system to record fees. The bursar knows exactly what reports are needed and does not expect them to change. A waterfall approach is suitable because the requirements are stable. If the bursar says "I will know what I need when I see it", an iterative approach would be better.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards expect the purpose of a life cycle, the stages, and the waterfall, iterative and RAD models with benefits, drawbacks and the choice of a model for a scenario. ZIMSEC states the longer nine-stage cycle (preliminary investigation to evaluation), which the other lessons of this topic develop; Cambridge names analysis, design, coding, testing and maintenance.
:::

## Common mistakes

:::mistake{title="Saying the waterfall model has no testing"}
It has testing, but as a separate stage after coding. The criticism is that faults are found late.
:::

:::mistake{title="Listing the stages out of order"}
The order is analysis, design, coding, testing, maintenance. Testing is not done before coding, and analysis is not part of coding.
:::

:::mistake{title="Describing a drawback without a reason"}
"It is slow" earns nothing. Say why: "the customer cannot see the system until the end, so wrong requirements are found late".
:::

:::mistake{title="Confusing iterative development with repeating the whole project"}
Each iteration adds to or improves the working version; the project does not start again from the beginning.
:::

## Exam tips

:::exam-tip
This topic is in Paper 1 for both boards (ZIMSEC Paper 1 software development; Cambridge Paper 1 topic 12). "**State** the stages" asks for the names in order. "**Describe** the waterfall model" needs the idea of stages in sequence, each finished before the next, and one consequence. "**Compare**" needs a point about both models.
:::

:::exam-tip
For "**choose a model for this project**", name the model, quote a fact from the scenario (for example "the requirements will change"), and give the reason. A choice without a link to the scenario earns few marks.
:::

## Summary

:::summary
- A life cycle gives structure to development: analysis, design, coding, testing and maintenance (nine stages in ZIMSEC, with investigation, feasibility, implementation and evaluation).
- Waterfall: stages in order, each finished first; good when requirements are stable; users see the system late.
- Iterative: repeated cycles of working versions improved with feedback; handles change; cost and end date are harder to predict.
- RAD: fast prototypes with users and reuse; needs available users; quality and documentation may suffer.
- Choose a model by the scenario: stable requirements, changing requirements, speed or safety.
:::
