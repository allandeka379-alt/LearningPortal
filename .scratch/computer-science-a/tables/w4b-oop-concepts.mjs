import { run, writeLesson, mdTable, codeBlock, same } from "./w4b-q.mjs";

// ---- inheritance / polymorphism demo (library items)
const demo = run(`class Item:
    def __init__(self, title, item_id):
        self.__title = title
        self.__item_id = item_id

    def get_title(self):
        return self.__title

    def describe(self):
        return "Item " + str(self.__item_id) + ": " + self.__title

class Book(Item):
    def __init__(self, title, item_id, pages):
        super().__init__(title, item_id)
        self.__pages = pages

    def describe(self):
        return super().describe() + " (book, " + str(self.__pages) + " pages)"

class Dvd(Item):
    def __init__(self, title, item_id, minutes):
        super().__init__(title, item_id)
        self.__minutes = minutes

    def describe(self):
        return super().describe() + " (DVD, " + str(self.__minutes) + " minutes)"

shelf = [Book("Shona Folk Tales", 101, 240), Dvd("Great Zimbabwe", 102, 55), Item("Map of Harare", 103)]
for thing in shelf:
    print(thing.describe())`);
same(demo.out, "Item 101: Shona Folk Tales (book, 240 pages)\nItem 102: Great Zimbabwe (DVD, 55 minutes)\nItem 103: Map of Harare");

// ---- encapsulation demo
const enc = run(`class Account:
    def __init__(self, owner):
        self.__owner = owner
        self.__balance = 0

    def deposit(self, amount):
        if amount > 0:
            self.__balance = self.__balance + amount

    def get_balance(self):
        return self.__balance

acc = Account("Tatenda")
acc.deposit(50)
acc.deposit(-20)
print(acc.get_balance())
try:
    print(acc.__balance)
except AttributeError:
    print("The balance cannot be reached directly")`);
same(enc.out, "50\nThe balance cannot be reached directly");

// ---- containment demo
const cont = run(`class Engine:
    def __init__(self, litres):
        self.litres = litres

class Car:
    def __init__(self, reg, litres):
        self.reg = reg
        self.engine = Engine(litres)

car = Car("ADX 1234", 2)
print(car.reg, car.engine.litres)`);
same(cont.out, "ADX 1234 2");

const classTable = mdTable(["Class", "Inherits from", "Properties", "Methods"], [
  ["`Item`", "none", "`Title`, `ItemID` (private)", "`NEW`, `GetTitle`, `Describe`"],
  ["`Book`", "`Item`", "`Pages` (private)", "`NEW`, `Describe` (overrides)"],
  ["`Dvd`", "`Item`", "`Minutes` (private)", "`NEW`, `Describe` (overrides)"],
]);

const terms = mdTable(["Term", "Meaning", "Example from the library classes"], [
  ["Class", "A template that defines the properties and methods of a kind of object", "`Book`"],
  ["Object (instance)", "One thing created from a class, holding its own values", "the book \"Shona Folk Tales\""],
  ["Property (attribute)", "A data item held by an object", "`Pages`"],
  ["Method", "A procedure or function that belongs to a class", "`Describe`"],
  ["Constructor", "A special method that runs when an object is created and sets its starting values", "`NEW` in pseudocode, `__init__` in Python"],
]);

const body = `
## Introduction

A school library in Mutare holds books, DVDs and maps. Each has a title and an identity number, a book also has a number of pages and a DVD a running time, and each has to be able to describe itself on a catalogue screen. Writing separate variables and routines for every kind of item would repeat a lot of work. **Object-oriented programming** (OOP) organises the program around **objects** that bundle data and behaviour, and it lets new kinds of object reuse what already exists.

This lesson is about the ideas and the terms: classes and objects, properties and methods, constructors, encapsulation, inheritance, polymorphism, overriding and containment, and how to design the classes for a problem. Writing and running full programs is the subject of the next lesson. You should know procedures, functions and records.

## Key definitions

:::definition{term="Class"}
A template, or blueprint, that defines the properties and the methods shared by all objects of one kind. A class is a type; it does not hold data itself.
:::

:::definition{term="Object (instance)"}
A single item created from a class, with its own values for the properties. The process of creating one is called instantiation.
:::

:::definition{term="Encapsulation"}
Combining data and methods in one class and hiding the data by making the properties private, so that it can be read or changed only through the class's public methods.
:::

:::definition{term="Inheritance"}
A mechanism by which a new class (the subclass or derived class) takes the properties and methods of an existing class (the superclass or base class) and can add to them or change them.
:::

:::definition{term="Polymorphism"}
The ability of the same method name to behave differently for objects of different classes, so that one call, such as \`Describe()\`, does the right thing for each kind of object.
:::

:::definition{term="Overriding"}
Redefining in a subclass a method that is inherited from the superclass, so that the subclass gives its own version of the behaviour.
:::

## Classes and objects

${terms}

A class is declared once, and any number of objects can be created from it. Each object has its own copy of the properties, but they share the methods. In 9618-style pseudocode a class lists its properties as \`PRIVATE\` or \`PUBLIC\` and its methods as procedures and functions:

${codeBlock(`CLASS Item
    PRIVATE Title : STRING
    PRIVATE ItemID : INTEGER
    PUBLIC PROCEDURE NEW(GivenTitle : STRING, GivenID : INTEGER)
        Title ← GivenTitle
        ItemID ← GivenID
    ENDPROCEDURE
    PUBLIC FUNCTION GetTitle() RETURNS STRING
        RETURN Title
    ENDFUNCTION
ENDCLASS

Thing ← NEW Item("Map of Harare", 103)`)}

The procedure called \`NEW\` is the **constructor**: it runs when the object is created with the keyword \`NEW\`.

## Encapsulation

If the properties of an object were public, any part of the program could set a bank balance to a wrong value. With encapsulation the properties are private and the class offers **getter** methods to read them and **setter** (or other) methods to change them under control. A setter can reject bad data, which keeps the object in a valid state.

:::worked-solution{title="Private data and a controlled method"}
In this Python program a double underscore makes a property private. The \`deposit\` method refuses a negative amount, and an attempt to reach the balance directly fails.

${enc.code}

Output:

${enc.outBlock}

The valid deposit of 50 was accepted and the deposit of -20 was ignored, so the balance is 50. The statement \`acc.__balance\` is not allowed from outside the class, so the program catches the error and reports it. All changes to the balance must pass through the method that checks them.
:::

## Inheritance, overriding and polymorphism

Suppose the library needs books and DVDs. Both are items, with a title and an ID, so they should not repeat that code. The superclass \`Item\` holds what they share and the subclasses \`Book\` and \`Dvd\` add their own properties. A class design can be described with a table (a class diagram in words):

${classTable}

Both subclasses override \`Describe\` to add their own details, calling the superclass version first. In pseudocode the subclass is declared with \`INHERITS\` and calls the superclass constructor with \`SUPER.NEW\`:

${codeBlock(`CLASS Book INHERITS Item
    PRIVATE Pages : INTEGER
    PUBLIC PROCEDURE NEW(GivenTitle : STRING, GivenID : INTEGER, GivenPages : INTEGER)
        SUPER.NEW(GivenTitle, GivenID)
        Pages ← GivenPages
    ENDPROCEDURE
ENDCLASS`)}

:::worked-solution{title="Polymorphism in action"}
A list holds three different kinds of item. The loop calls the same method, \`describe\`, on every one, and each object responds in the way its own class defines.

${demo.code}

Output:

${demo.outBlock}

The loop does not need to know which kind of item it is looking at. The book and DVD lines show the extra detail from their overridden methods, and the plain item uses the version it inherits unchanged from the superclass. That is polymorphism: one method name, different behaviour. Adding a new class, such as \`Map\`, would need no change to the loop.
:::

## Containment (aggregation)

Not every relationship is "is a kind of". A car *has* an engine. When one object contains another object as a property, the relationship is **containment** (aggregation), not inheritance. A good test is to say the sentence: "a Book *is an* Item" suggests inheritance; "a Car *has an* Engine" suggests containment.

${cont.code}

Output:

${cont.outBlock}

## Designing classes for a problem

1. Read the description and list the nouns; these are candidate classes (\`Learner\`, \`Teacher\`, \`Class\`).
2. For each class, list the data it must hold (properties) and the actions it must do (methods).
3. Look for shared properties and methods and move them to a superclass.
4. Decide which relationships are "is a" (inheritance) and which are "has a" (containment).
5. Make properties private and decide which methods are public.

**Benefits of OOP:** code is reused through inheritance; encapsulation protects data; classes model real things, which makes large programs easier to understand; and each class can be tested and maintained separately.

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards expect the terms class, object, instance, property or attribute, method, constructor, encapsulation, inheritance, polymorphism, overriding and containment, and class designs (ZIMSEC Form 6; Cambridge A Level only, Paper 3). ZIMSEC may also ask for the singleton pattern, in which a class allows only one object; this is covered in the programming lesson. Cambridge writes class definitions with \`CLASS\`, \`INHERITS\` and \`NEW\` in the pseudocode guide.
:::

## Common mistakes

:::mistake{title="Confusing a class with an object"}
\`Book\` is a class (a template); the book "Shona Folk Tales" is an object. A class does not hold data about a particular book.
:::

:::mistake{title="Using inheritance where the relationship is has-a"}
A car is not a kind of engine. Use containment when one object is a part of another.
:::

:::mistake{title="Describing polymorphism as having many classes"}
Polymorphism is the same method name behaving differently for different classes, not simply having several classes.
:::

:::mistake{title="Leaving properties public"}
Public properties can be changed from anywhere, so a bad value can enter the object. Make properties private and use methods.
:::

## Exam tips

:::exam-tip
Cambridge Paper 3 and ZIMSEC Paper 1 ask you to **define** the OOP terms, **explain** encapsulation, inheritance and polymorphism with an example from the question, **complete** or **draw up a class design** (given as a table of properties and methods) and **explain the benefits** of OOP. Use the names in the stem, not generic ones: "the subclass \`Dvd\` inherits \`Title\` from \`Item\`".
:::

:::exam-tip
For a **class design**, list each class with its properties (and types) and methods, show inheritance by stating the superclass, and mark private and public members. Write a full sentence for each point in an "explain" question.
:::

## Summary

:::summary
- A class is a template of properties and methods; an object is one instance of it, created by a constructor.
- Encapsulation keeps properties private and gives access through public methods that can check the data.
- Inheritance lets a subclass reuse and extend a superclass; overriding replaces an inherited method.
- Polymorphism: one method name, different behaviour for different classes.
- Containment is a "has a" relationship; inheritance is an "is a" relationship.
- Design classes from the nouns of a problem, then list properties, methods and relationships.
:::
`;
writeLesson({ key: "prog.oop-concepts", title: "Object-oriented programming: classes, objects, inheritance and polymorphism", summary: "The terminology of object-oriented programming: class, object, property, method, constructor, encapsulation, inheritance, polymorphism, overriding and containment, with a class design table, a worked polymorphism example and the benefits of OOP.", concept: "acs.prog.oop-concepts", minutes: 55 }, body);
