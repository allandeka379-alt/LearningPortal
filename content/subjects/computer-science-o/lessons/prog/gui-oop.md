---
{
  "key": "prog.gui-oop",
  "title": "Visual programming: interfaces, events and objects",
  "summary": "Designing graphical user interfaces with forms, menus and controls; how event-driven programs respond to clicks and key presses; and the object-oriented ideas behind them: objects, properties, methods, classes, encapsulation, inheritance and polymorphism.",
  "concepts": ["comp.prog.gui-oop"],
  "estimatedMinutes": 50,
  "level": "core"
}
---
## Introduction

Think about the app a learner might use to pay school fees by mobile money. There is a box to type the learner's number, a list to choose the term, a button marked *Pay* and a label that shows "Payment received". Nobody types commands; the user clicks, chooses and types, in any order they like, and the program reacts.

Programs like this are built with **visual programming**: the programmer draws the screen (the interface) from ready-made controls and then writes short blocks of code that run when the user does something, such as clicking a button. Behind every control is an **object** with properties and methods. ZIMSEC Form 3 asks learners to create user interfaces with menus and sub-menus, to declare functions and use objects in interface design, and to understand the main ideas of object-oriented programming in outline, usually using Visual Basic .NET or Python.

## Key definitions

:::definition{term="Graphical user interface (GUI)"}
An interface in which the user interacts with the program through windows, icons, menus and controls such as buttons and text boxes, using a pointer, touch or the keyboard.
:::

:::definition{term="Event-driven programming"}
A style of programming in which the order of execution is decided by events, such as a button click or a key press, each of which runs its own block of code (an event handler).
:::

:::definition{term="Object"}
A self-contained item in a program that has data (properties) and actions it can perform (methods); a button on a form is an object.
:::

:::definition{term="Class"}
A template that defines the properties and methods that every object of that type will have; each object is an instance of a class.
:::

## Designing the interface

A **form** is a window that holds the controls. Common controls and their uses:

| Control | Use | Example in a fees app |
|:--|:--|:--|
| Label | displays text the user cannot change | "Learner number", or the result message |
| Text box | lets the user type a value | the amount to pay |
| Button | runs code when clicked | *Pay*, *Clear* |
| List box / combo box | lets the user choose from a list | the term: Term 1, Term 2, Term 3 |
| Check box | an on/off choice, several can be ticked | "Send receipt by SMS" |
| Radio (option) button | one choice from a group | payment method |
| Menu and sub-menu | groups commands at the top of a form | *File → Print receipt*, *Help → About* |

Good interface design keeps the layout simple and consistent, labels every input clearly, uses lists and option buttons instead of typing wherever the choices are known (which also reduces input errors), groups related controls, gives clear feedback and error messages, and uses readable fonts and colours with enough contrast. A **menu** with **sub-menus** keeps many commands available without cluttering the form.

:::example{title="Planning a form"}
Tendai designs a form for a library to issue books. He plans each control's name, a key property and the event it responds to.

| Control | Name | Property set | Event used |
|:--|:--|:--|:--|
| Text box | txtBorrower | Text (the borrower's number) | none |
| Combo box | cboBook | Items (the book titles) | none |
| Button | btnIssue | Text = "Issue book" | Click |
| Label | lblMessage | Text (set by the program) | none |
| Menu item | mnuExit | Text = "Exit" | Click |

Naming controls with a short prefix (`txt`, `btn`, `lbl`, `cbo`) makes the code easier to read, which is the same idea as meaningful identifiers.
:::

## Event-driven programs

A traditional (procedural) program runs from top to bottom in an order fixed by the programmer. An event-driven program shows its form and then **waits**. When an event occurs, such as a click, a key press, a choice from a list or the form loading, the matching **event handler** runs, and then the program waits again. The user, not the programmer, decides the order in which handlers run.

In Visual Basic .NET an event handler for a button looks like this:

```
Private Sub btnAdd_Click(sender As Object, e As EventArgs) Handles btnAdd.Click
    Dim Total As Integer
    Total = Val(txtFirst.Text) + Val(txtSecond.Text)
    lblAnswer.Text = "Total: " & Total
End Sub
```

The handler reads the `Text` property of two text boxes, converts them to numbers with `Val`, and sets the `Text` property of a label. `txtFirst.Text` uses **dot notation**: object name, a dot, then the property.

:::worked-solution[Why the conversion matters]
A text box always holds text. If the values are not converted, `+` may join the two strings instead of adding them. In Python, which ZIMSEC learners may also use:

```
print("3" + "4")
print(int("3") + int("4"))
```

Output:

```
34
7
```

1. `"3" + "4"` joins two strings, giving `34`.
2. `int()` converts each string to an integer first, so `+` adds them, giving `7`.
3. In Visual Basic, `Val()` does the same job for the contents of a text box.
:::

## Objects, properties and methods

Every control is an object. Its **properties** describe it: `Text`, `Width`, `Height`, `Visible`, `Enabled`, `BackColor`, `Font`. Its **methods** are actions it can carry out, such as `Clear` for a text box, `Focus` to move the cursor to it, or `Show` and `Hide` for a form. Properties can be set at design time (in the properties window) or at run time (in code, `btnPay.Enabled = False`).

## Classes and object-oriented ideas in outline

Programmers can create their own classes. A class such as `Learner` defines what every learner object holds (name, form) and can do (describe itself). Three ideas make object-oriented programs easier to build and maintain:

- **Encapsulation**: an object keeps its data and the methods that work on that data together, and other parts of the program use the methods instead of changing the data directly.
- **Inheritance**: a new class (a subclass) is based on an existing class and automatically has its properties and methods, adding or changing only what is different.
- **Polymorphism**: different classes can have a method with the same name that behaves in its own way; calling the method on an object runs the version for that object's class.

:::worked-solution[A class, a subclass and polymorphism in Python]
```
class Learner:
    def __init__(self, name, form):
        self.name = name
        self.form = form

    def describe(self):
        return self.name + " is in Form " + str(self.form)


class Prefect(Learner):
    def __init__(self, name, form, duty):
        super().__init__(name, form)
        self.duty = duty

    def describe(self):
        return self.name + " is a prefect in charge of " + self.duty


people = [Learner("Rudo", 3), Prefect("Farai", 4, "the library")]
for person in people:
    print(person.describe())
```

Output:

```
Rudo is in Form 3
Farai is a prefect in charge of the library
```

1. `Learner` is a class; `Learner("Rudo", 3)` creates an object (an instance) whose properties `name` and `form` are set by `__init__`.
2. `Prefect(Learner)` **inherits** from `Learner`: it reuses the learner's `__init__` through `super()` and adds a `duty`.
3. Both classes have a `describe` method. The same call, `person.describe()`, gives a different result for each object: this is **polymorphism**.
4. Each object holds its own data and the methods that use it: **encapsulation**.
:::

## Common mistakes

:::mistake{title="Mixing up properties and methods"}
A property is a value an object has (`Text`, `Visible`); a method is something it does (`Clear`, `Show`). "The button's colour" is a property; "clearing the text box" is a method.
:::

:::mistake{title="Confusing a class with an object"}
The class is the template; objects are the individual instances made from it. `Learner` is a class; Rudo's record is an object.
:::

:::mistake{title="Forgetting to convert text-box input"}
Whatever the user types is text. Convert it (`Val` in Visual Basic, `int()` or `float()` in Python) before doing arithmetic.
:::

## Exam tips

:::exam-tip
When asked to *describe* an event-driven program, mention that the program waits for events, that each event triggers its own handler, and that the user decides the order. Give a concrete example such as "clicking the *Pay* button runs the code that records the payment".
:::

:::exam-tip
When asked to name suitable controls, match each to the data: a fixed list of choices suggests a list box, combo box or radio buttons; free text suggests a text box; an action suggests a button. Justify each choice briefly.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Visual programming, interface design with menus and sub-menus, objects and event-driven programming belong to ZIMSEC Form 3 (topic 6.8). Cambridge IGCSE 0478 does not examine GUI design or object-oriented programming.
:::

## Summary

:::summary
- A GUI is built from controls on forms: labels, text boxes, buttons, list and combo boxes, check boxes, radio buttons, menus and sub-menus.
- Good design is simple, consistent and clearly labelled, uses lists where choices are known and gives clear feedback.
- Event-driven programs wait for events; each event runs its own handler, in an order chosen by the user.
- Objects have properties (data) and methods (actions); a class is the template for objects.
- Encapsulation keeps data with its methods; inheritance builds new classes from existing ones; polymorphism lets one method name behave differently for different classes.
:::
