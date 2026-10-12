import { run, writeLesson, mdTable, codeBlock, same, py } from "./w4b-q.mjs";

const prog = run(`class Learner:
    def __init__(self, name, mark1, mark2):
        self.__name = name
        self.__mark1 = mark1
        self.__mark2 = mark2

    def get_name(self):
        return self.__name

    def average(self):
        return (self.__mark1 + self.__mark2) / 2

    def describe(self):
        return self.__name + " has average " + str(self.average())

class Prefect(Learner):
    def __init__(self, name, mark1, mark2, duty):
        super().__init__(name, mark1, mark2)
        self.__duty = duty

    def describe(self):
        return super().describe() + " and duty " + self.__duty

form = [Learner("Tendai", 60, 72), Prefect("Rudo", 80, 58, "Library"), Learner("Farai", 45, 51)]
best = form[0]
for pupil in form:
    print(pupil.describe())
    if pupil.average() > best.average():
        best = pupil
print("Highest:", best.get_name())`);
same(prog.out, "Tendai has average 66.0\nRudo has average 69.0 and duty Library\nFarai has average 48.0\nHighest: Rudo");

const single = run(`class SchoolSettings:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance.school = "Mutare Girls"
        return cls._instance

first = SchoolSettings()
second = SchoolSettings()
second.school = "Mutare Boys"
print(first is second)
print(first.school)`);
same(single.out, "True\nMutare Boys");

const objTable = mdTable(["Array element", "Class of object", "Name", "Mark1", "Mark2", "Duty", "Average"], [
  ["`Form[1]`", "`Learner`", "Tendai", 60, 72, "none", (60 + 72) / 2],
  ["`Form[2]`", "`Prefect`", "Rudo", 80, 58, "Library", (80 + 58) / 2],
  ["`Form[3]`", "`Learner`", "Farai", 45, 51, "none", (45 + 51) / 2],
]);

const body = `
## Introduction

Knowing what a class is does not yet let you write one. When a school in Mutare needs a program that stores learners and prefects, calculates averages and finds the best learner, the programmer has to write the class definitions, create the objects, store them in an array or list, and call their methods. This lesson is about doing that, in 9618-style pseudocode and in Python, and about tracing an object-oriented program by hand.

You should already know the object-oriented terms from the previous lesson (class, object, property, method, constructor, encapsulation, inheritance, polymorphism, overriding) and how to write procedures and functions. Every program shown here was run and the output pasted.

## Key definitions

:::definition{term="Constructor"}
The method that runs when an object is created. In 9618 pseudocode it is the procedure \`NEW\` of the class; in Python it is \`__init__\`. It sets the starting values of the properties.
:::

:::definition{term="Getter and setter"}
A getter is a public method that returns the value of a private property. A setter is a public method that changes it, and can check the new value first.
:::

:::definition{term="Singleton"}
A class that is designed so that only one object of it can ever exist, and every request for an object returns that same object.
:::

## Writing a class

A class definition gives, in order, the properties (with \`PRIVATE\` or \`PUBLIC\`), the constructor and the other methods. Inside a method the properties are used by name in pseudocode; in Python the property is reached through \`self\`. An object is created with \`NEW\`, and a method is called with the object name, a full stop and the method name.

${codeBlock(`CLASS Learner
    PRIVATE Name : STRING
    PRIVATE Mark1 : INTEGER
    PRIVATE Mark2 : INTEGER
    PUBLIC PROCEDURE NEW(GivenName : STRING, GivenMark1 : INTEGER, GivenMark2 : INTEGER)
        Name ← GivenName
        Mark1 ← GivenMark1
        Mark2 ← GivenMark2
    ENDPROCEDURE
    PUBLIC FUNCTION GetName() RETURNS STRING
        RETURN Name
    ENDFUNCTION
    PUBLIC FUNCTION Average() RETURNS REAL
        RETURN (Mark1 + Mark2) / 2
    ENDFUNCTION
    PUBLIC FUNCTION Describe() RETURNS STRING
        RETURN Name & " has average " & NUM_TO_STR(Average())
    ENDFUNCTION
ENDCLASS`)}

The constructor takes **parameters** to set the starting values, and the properties are private, so the main program cannot read \`Name\` directly; it uses \`GetName()\`. Methods can call other methods of the same class, as \`Describe\` calls \`Average\`.

## Inheritance and overriding in code

A subclass is declared with \`INHERITS\`. Its constructor first calls the superclass constructor with \`SUPER.NEW\` to set the inherited properties, then sets its own. The method \`Describe\` is overridden to add the duty:

${codeBlock(`CLASS Prefect INHERITS Learner
    PRIVATE Duty : STRING
    PUBLIC PROCEDURE NEW(GivenName : STRING, GivenMark1 : INTEGER, GivenMark2 : INTEGER, GivenDuty : STRING)
        SUPER.NEW(GivenName, GivenMark1, GivenMark2)
        Duty ← GivenDuty
    ENDPROCEDURE
    PUBLIC FUNCTION Describe() RETURNS STRING
        RETURN SUPER.Describe() & " and duty " & Duty
    ENDFUNCTION
ENDCLASS`)}

Python writes the same with \`class Prefect(Learner):\` and \`super().__init__(...)\`. A double underscore at the start of a property name (\`self.__name\`) makes it private.

## Objects in an array

Objects are created with \`NEW\` and stored in an array (a list in Python). A loop can then call a method on each element; because \`Prefect\` is a \`Learner\`, one array can hold both.

${codeBlock(`DECLARE Form : ARRAY[1:3] OF Learner
Form[1] ← NEW Learner("Tendai", 60, 72)
Form[2] ← NEW Prefect("Rudo", 80, 58, "Library")
Form[3] ← NEW Learner("Farai", 45, 51)
Best ← 1
FOR Index ← 1 TO 3
    OUTPUT Form[Index].Describe()
    IF Form[Index].Average() > Form[Best].Average() THEN
        Best ← Index
    ENDIF
NEXT Index
OUTPUT "Highest: ", Form[Best].GetName()`)}

:::worked-solution{title="A complete program and its output"}
The Python version of the classes and main program was run:

${prog.code}

Output:

${prog.outBlock}

The three objects created at the start hold these values:

${objTable}

In the loop, \`pupil.describe()\` is called on each object. For Tendai it is the version in \`Learner\`. For Rudo it is the version in \`Prefect\`, which calls the superclass version through \`super()\` and adds the duty: this is polymorphism. The averages are 66.0, 69.0 and 48.0, so \`best\` changes from Tendai to Rudo in the second pass and stays there. The last line shows the best learner's name, obtained through the getter because the name is private.
:::

## Tracing an object-oriented program

To trace a program: (1) note the order in which the objects are created and write down their property values; (2) when a method is called, find the class of the object, and if the method is overridden use the subclass version; (3) follow \`SUPER\` calls up to the superclass; (4) record the output. A table of the property values of each object, like the one above, helps.

## The singleton (ZIMSEC detail)

Sometimes a program must have only one object of a class, for example the settings of the whole school. A **singleton** class stores its single object and returns it every time a new one is requested. In this Python program the second request returns the first object, so changing \`second\` changes \`first\`:

${single.code}

Output:

${single.outBlock}

\`first is second\` is \`True\` because both names refer to the same object, and the school name changed through one name is seen through the other.

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards expect classes with constructors, methods, inheritance and polymorphism written in pseudocode and a language (ZIMSEC Form 6; Cambridge A Level only, Papers 3 and 4). Cambridge uses \`CLASS\`, \`INHERITS\`, \`NEW\`, \`PUBLIC\` and \`PRIVATE\` as in the pseudocode guide. The singleton is a ZIMSEC detail; Cambridge does not name it.
:::

## Common mistakes

:::mistake{title="Forgetting self in Python"}
Inside a method every property must be written \`self.name\`, and every method has \`self\` as its first parameter. Without it the name is a local variable that disappears when the method ends.
:::

:::mistake{title="Not calling the superclass constructor"}
If a subclass constructor does not call \`SUPER.NEW\` (\`super().__init__\`), the inherited properties are never set and later calls fail.
:::

:::mistake{title="Reading a private property directly"}
\`Form[1].Name\` is not allowed when \`Name\` is private. Use the getter \`Form[1].GetName()\`.
:::

:::mistake{title="Tracing the superclass method for an overridden call"}
When an object belongs to a subclass that overrides a method, the subclass version runs, not the superclass one.
:::

## Exam tips

:::exam-tip
Cambridge Paper 4 and ZIMSEC Paper 2 ask you to **write** class definitions with a constructor and methods, **create** objects and **call** methods, often from a table of properties. Name every class, property and method exactly as given. Cambridge Paper 3 asks you to **trace** or **complete** OOP pseudocode, and to explain the effect of inheritance and overriding. Show the constructor call with all its arguments.
:::

:::exam-tip
When you **write a subclass**, state \`INHERITS\`, call the superclass constructor first, and only then set the new properties. Check that every private property has a getter if the main program needs it.
:::

## Summary

:::summary
- A class lists its properties (private or public), a constructor \`NEW\` (Python \`__init__\`), and its methods; objects are created with \`NEW\`.
- A subclass uses \`INHERITS\`, calls \`SUPER.NEW\` in its constructor, and may override methods.
- Objects can be stored in an array or list; a loop calling the same method on each uses polymorphism.
- Private properties are reached through getters and setters.
- To trace an OOP program, record each object's values and use the subclass version of an overridden method.
- A singleton allows only one object of its class.
:::
`;
writeLesson({ key: "prog.oop-programming", title: "Writing object-oriented programs", summary: "Writing classes with constructors, methods, private properties, inheritance and overriding in 9618-style pseudocode and Python, creating objects, arrays of objects, tracing an object-oriented program and the singleton.", concept: "acs.prog.oop-programming", minutes: 60 }, body);
