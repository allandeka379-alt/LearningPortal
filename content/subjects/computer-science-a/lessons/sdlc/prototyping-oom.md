---
{
  "key": "sdlc.prototyping-oom",
  "title": "Prototyping and object-oriented methodology",
  "summary": "Software process models beyond the waterfall model: throwaway and evolutionary prototyping, and object-oriented methodology with objects, classes, use cases and class diagrams described in words, with benefits, drawbacks and a comparison for a given project.",
  "concepts": ["acs.sdlc.prototyping-oom"],
  "estimatedMinutes": 50,
  "level": "core"
}
---
## Introduction

A new school in Masvingo wants software to run its administration, but nobody on the staff has used such a system before. The head cannot write a list of requirements, because she does not know what is possible. A waterfall project would take months to deliver a system that might not suit her.

Two other **software process models** deal with this. **Prototyping** builds an early, partial version that the users can try. **Object-oriented methodology (OOM)** builds the system around the objects of the real world, such as learners, teachers and fees, so that parts can be reused. This lesson explains both, compares them with the waterfall model and explains how to choose.

You should know the waterfall, iterative and RAD models from the life cycles lesson, and what an object and a class are in programming.

## Key definitions

:::definition{term="Prototype"}
An early, working model of part or all of a system, built quickly so that the users can try it and say what they need.
:::

:::definition{term="Throwaway prototyping"}
A prototype is built to find out the requirements and is then discarded; the real system is built from scratch using what was learned.
:::

:::definition{term="Evolutionary prototyping"}
A prototype is improved after each round of user feedback until it becomes the final system.
:::

:::definition{term="Object-oriented methodology (OOM)"}
A way of developing software in which the system is analysed, designed and programmed as a set of interacting objects, each an instance of a class.
:::

## Prototyping

The steps are: find the basic requirements, build a quick prototype, let the users try it, collect their comments, refine the requirements and the prototype, and repeat until the users are satisfied. A prototype often shows the screens and a few working functions, but not all of the processing behind them.

| Prototype | Weeks | What the users see | Outcome |
|:-:|:-:|:-:|:-:|
| 1 | 1-2 | Screens with no real data | Users ask for a search box |
| 2 | 3-4 | Search and data entry | Users ask for fewer clicks |
| 3 | 5-6 | Reports added | Layout of the report changed |
| 4 | 7-8 | All functions | Accepted as the final system |

In this plan the system was ready after 4 prototypes of 2 weeks each: 8 weeks, and the users had seen working screens in the first fortnight.

| | Throwaway | Evolutionary |
|---|---|---|
| What happens to the prototype | Discarded after the requirements are known | Developed into the final system |
| Speed of building | Very quick, because quality does not matter | Slower, because it must be well built |
| Best for | Unclear requirements, new ideas, testing a design | Systems that will change often and must be delivered early |
| Risk | Effort is thrown away; users may want to keep the prototype | May become untidy after many changes |

**Benefits of prototyping:** the users see something real early, so misunderstandings are found early; the users take part in the design, so they are more likely to accept the system; the final system is closer to the real needs.

**Drawbacks:** the users may think the prototype is nearly the whole system; a rushed prototype can have a poor design that is hard to maintain; the project can continue for too long because the users keep asking for changes; documentation is often left until late.

## Object-oriented methodology

In OOM the developer looks for the **objects** in the problem. A rule of thumb is to read the description and underline the nouns: they suggest classes; the verbs suggest methods; the facts about each noun suggest attributes.

- A **class** is a template that defines the **attributes** (data) and **methods** (actions) of a kind of object. A **Learner** class has the attributes name, ID and form.
- An **object** is one instance of a class: the learner Tendai Moyo, ID L101, form 5A.
- **Encapsulation** keeps the data and the methods that use it together, and controls access to the data.
- **Inheritance** lets a class take over the attributes and methods of another class, called its parent. A `Learner` and a `Teacher` both inherit `name` and `person_id` from `Person`.
- **Polymorphism** lets the same method name behave differently in different classes: `describe` works for every kind of person but gives a different text for a learner.

The class diagram is written here as a table.

| Class | Attributes (data) | Methods (actions) | Inherits from |
|:-:|:-:|:-:|:-:|
| Person | name, person_id | describe | none |
| Learner | form | describe (overrides) | Person |
| Teacher | subject | none of its own | Person |
| Clerk | office | none of its own | Person |

```python
class Person:
    def __init__(self, name, person_id):
        self.name = name
        self.person_id = person_id

    def describe(self):
        return self.name + " (" + self.person_id + ")"

class Learner(Person):
    def __init__(self, name, person_id, form):
        super().__init__(name, person_id)
        self.form = form

    def describe(self):
        return Person.describe(self) + ", form " + self.form

class Teacher(Person):
    def __init__(self, name, person_id, subject):
        super().__init__(name, person_id)
        self.subject = subject

people = [Learner("Tendai Moyo", "L101", "5A"),
          Teacher("Mrs Sibanda", "T07", "Physics")]
for p in people:
    print(p.describe())
```

```
Tendai Moyo (L101), form 5A
Mrs Sibanda (T07)
```

:::worked-solution{title="How much does inheritance save?"}
Suppose the school needs the classes Learner, Teacher and Clerk, and each person has a name and an ID.
1. Without inheritance, each of the 3 classes would define its own 2 shared attributes plus 1 of its own: 3 × 3 = 9 attributes in total.
2. With inheritance, the shared attributes are defined once in `Person` (2) and each subclass defines only its own (3 × 1): 2 + 3 = 5 attributes.
3. Inheritance removes 4 attribute definitions. If a shared attribute changes, it is changed in one class only.
:::

A **use case diagram** shows what the system does for each type of user. An **actor** is a user (or another system); a **use case** is one thing that the actor does with the system. Because a drawing cannot be given here, it is described as a table.

| Actor | Use case (what the actor does with the system) |
|:-:|:-:|
| Bursar | Record a payment |
| Bursar | Print a fee statement |
| Teacher | Enter a mark |
| Learner | View own marks |

**Reuse** is a main aim of OOM. Classes written for one project can be used in another, and well-tested classes make the new system more reliable.

**Benefits of OOM:** the model follows the real world, so it is easier for users and developers to understand; code is reused, which saves time and reduces faults; changes are limited to one class; large projects can be shared between teams.

**Drawbacks:** the analysis and design need more skill and time at the start; the design of classes is hard to get right; a small project may not need the overhead; the programmers must know an object-oriented language.

## Comparing the models

| Feature | Waterfall | Prototyping | Object-oriented |
|---|---|---|---|
| Main idea | Stages in order | Build, try, refine | Build from reusable classes |
| Users' involvement | At the start and the end | Throughout | At analysis; as needed |
| Requirements | Must be clear at the start | May be unclear | Must be understood enough to find the objects |
| Best for | Stable, well-defined projects | New systems where users are unsure | Large systems that will be extended or reuse parts |
| Main risk | Wrong system delivered late | Never finishing; poor design | Costly to design; needs skills |

:::example{title="Choosing for the school administration project"}
The head does not know what is possible, so **prototyping** will help her decide. The school may later extend the system with a library and transport, so building it from **classes** (OOM) will make the extensions easier. A pure waterfall plan would be a poor fit, because the requirements cannot be written down in advance.
:::

:::keyfact{title="ZIMSEC only"}
This lesson is ZIMSEC only (Form 6). It extends the waterfall, iterative and RAD models with throwaway and evolutionary prototyping and object-oriented methodology. Cambridge examines the object-oriented programming concepts under programming, not as a development methodology.
:::

## Common mistakes

:::mistake{title="Saying the prototype is always thrown away"}
A throwaway prototype is discarded, but an evolutionary prototype is developed into the final system.
:::

:::mistake{title="Confusing a class with an object"}
A class is the template (`Learner`). An object is one example (the learner Tendai Moyo).
:::

:::mistake{title="Giving a benefit without a reason"}
"Prototyping is good" earns no marks. Say why: "users see a working version early, so misunderstandings are found early".
:::

:::mistake{title="Listing every noun as a class"}
Some nouns are attributes (a learner's name is an attribute, not a class). Ask whether the noun has its own data and actions.
:::

## Exam tips

:::exam-tip
In Paper 1 the question is usually "**compare** prototyping with the waterfall model" or "**choose** a model for this project and justify it". Use a table of two or three points, each with a comparison word (whereas, but, however) and a link to the scenario.
:::

:::exam-tip
For an OOM question, identify the classes from the nouns, give two attributes and one method for each class, and state which class inherits from which.
:::

## Summary

:::summary
- A prototype is an early working model that users try; throwaway prototypes are discarded, evolutionary prototypes become the system.
- Prototyping suits unclear requirements; drawbacks are untidy design and projects that never finish.
- OOM builds a system from classes (attributes and methods) and objects, using encapsulation, inheritance and polymorphism.
- A class diagram lists classes with attributes, methods and parents; a use case diagram lists actors and what they do.
- Choose the model from the scenario: waterfall for stable requirements, prototyping for unclear ones, OOM for reuse and large systems.
:::
