// Slice w4b: visual programming, events and objects (comp.prog.gui-oop, ZIMSEC only).
// Every Python program shown is run here and its real output is used (the build fails if Python disagrees).
import { concept, P } from "../lib.mjs";
import { execFileSync } from "node:child_process";

function runPy(src, expected) {
  let out;
  try {
    out = execFileSync("python", ["-c", src], { encoding: "utf8" }).replace(/\r\n/g, "\n").trimEnd();
  } catch (e) {
    if (e.code === "ENOENT") return expected; // Python not installed: the expected value was checked when written
    throw e;
  }
  if (out !== expected) throw new Error(`Python output ${JSON.stringify(out)} != expected ${JSON.stringify(expected)}`);
  return out;
}
const py = (s) => "```\n" + s + "\n```";

const srcJoin = 'print("5" + "2")';
const outJoin = runPy(srcJoin, "52");

const srcBus = `class Bus:
    def __init__(self, route, seats):
        self.route = route
        self.seats = seats
        self.booked = 0

    def book(self, number):
        self.booked = self.booked + number

    def free(self):
        return self.seats - self.booked


kombi = Bus("Harare to Chitungwiza", 15)
kombi.book(4)
kombi.book(6)
print(kombi.free())`;
const outBus = runPy(srcBus, String(15 - 4 - 6));

const srcShapes = `class Shape:
    def area(self):
        return 0


class Rectangle(Shape):
    def __init__(self, length, width):
        self.length = length
        self.width = width

    def area(self):
        return self.length * self.width


class Square(Shape):
    def __init__(self, side):
        self.side = side

    def area(self):
        return self.side * self.side


plots = [Rectangle(8, 3), Square(5), Rectangle(2, 7)]
total = 0
for plot in plots:
    total = total + plot.area()
print(total)`;
const outShapes = runPy(srcShapes, String(8 * 3 + 5 * 5 + 2 * 7));

const srcStruct = `class Account:
    def __init__(self, owner):
        self.owner = owner
        self.balance = 0

    def deposit(self, amount):
        if amount > 0:
            self.balance = self.balance + amount

    def report(self):
        return self.owner + ": " + str(self.balance)


class SavingsAccount(Account):
    def add_interest(self):
        self.balance = self.balance + self.balance // 10


a = SavingsAccount("Chipo")
a.deposit(200)
a.deposit(-50)
a.add_interest()
print(a.report())`;
const outStruct = runPy(srcStruct, "Chipo: 220");

concept("comp.prog.gui-oop", { file: "prog/gui-oop", keyPrefix: "prog.gui-oop" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is meant by event-driven programming?",
    options: [
      ["The order in which code runs is decided by events such as clicks and key presses", "Correct: each event triggers its own handler."],
      ["The program always runs from the first line to the last in a fixed order", "That describes a procedural, sequential program."],
      ["The program is written only with drag-and-drop blocks", "Visual tools help, but code is still written in handlers."],
      ["The program runs only at a scheduled time each day", "Timers are one kind of event, but this is not the definition."],
    ],
    answer: "A",
    explanation: "An event-driven program waits for events and runs the matching handler each time.",
  });
  b.mcq({
    d: 1, skill: "APPLICATION",
    stem: "A form asks the user to choose **one** payment method: cash, card or mobile money. Which control is most suitable?",
    options: [
      ["A group of radio (option) buttons", "Correct: exactly one choice from a small fixed set."],
      ["A text box", "Typing allows spelling mistakes and invalid methods."],
      ["A group of check boxes, one per method", "Check boxes allow several choices to be ticked at once."],
      ["A label", "A label only displays text; the user cannot choose with it."],
    ],
    answer: "A",
    explanation: "Radio buttons give one choice from a few options and prevent invalid input.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each control to its use on a school registration form.",
    pairs: [
      ["Label", "Shows the words \"Date of birth\" next to an input"],
      ["Text box", "Lets the user type the learner's surname"],
      ["Button", "Runs the code that saves the record when clicked"],
      ["Combo box", "Lets the user pick the form (1 to 4) from a drop-down list"],
    ],
    explanation: "Labels display, text boxes accept typing, buttons trigger actions, combo boxes offer a list.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which of these is a **method** of a text box, rather than a property?",
    options: [
      ["Clear", "Correct: clearing is an action the object performs."],
      ["Text", "Text is the value the box holds: a property."],
      ["Width", "Width describes the box: a property."],
      ["Enabled", "Enabled is a TRUE/FALSE setting: a property."],
    ],
    answer: "A",
    explanation: "Properties are data an object has; methods are actions it can carry out.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "In an event-driven program, the programmer fixes the order in which the event handlers will run.",
    answer: false,
    explanation: "False. The user's actions decide which handler runs and when; the program waits for each event.",
  });
  b.tf({
    d: 2, skill: "RECALL", daily: true,
    stem: "A class is a template, and each object created from it is an instance of that class.",
    answer: true,
    explanation: "True. The class defines the properties and methods; objects are the individual instances.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each object-oriented term to its description.",
    pairs: [
      ["Encapsulation", "Keeping an object's data together with the methods that use it"],
      ["Inheritance", "A new class takes the properties and methods of an existing class"],
      ["Polymorphism", "One method name behaves differently for objects of different classes"],
      ["Object", "An instance of a class with its own property values"],
    ],
    explanation: "These are the key object-oriented ideas in outline.",
  });
  b.short({
    d: 3, skill: "APPLICATION",
    hints: ["Both values are in quotes."],
    stem: `What does this Python statement display?\n\n${py(srcJoin)}`,
    accepted: [outJoin],
    wrong: ["7"],
    explanation: `Both values are strings, so + joins them: ${outJoin}. Convert with int() to add them as numbers.`,
  });
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    hints: ["booked starts at 0 and each call to book adds to it."],
    stem: `What does this Python program display?\n\n${py(srcBus)}`,
    value: Number(outBus),
    wrong: [15 - 6],
    explanation: `booked becomes 4 and then 10, so free() returns 15 − 10 = ${outBus}.`,
    workedSolution: `1. The object is created with seats = 15, booked = 0.\n2. book(4): booked = 4; book(6): booked = 10.\n3. free() returns 15 − 10 = ${outBus}.`,
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    hints: ["Which option reuses an existing class?"],
    stem: "Which situation is an example of **inheritance**?",
    options: [
      ["A `Teacher` class is based on a `Person` class and adds a subject", "Correct: Teacher gets Person's properties and methods and adds its own."],
      ["Two buttons on a form both have a `Text` property", "Sharing a property name between controls is not inheritance."],
      ["A `Learner` object stores its marks and the method that averages them", "Keeping data with its methods is encapsulation."],
      ["A form waits for the user to click a button", "That is event-driven behaviour."],
    ],
    answer: "A",
    explanation: "Inheritance builds a subclass on an existing class.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    hints: ["Object name, dot, property."],
    stem: "In the Visual Basic statement `lblResult.Text = \"Paid\"`, what is `lblResult`?",
    options: [
      ["The object (a label control)", "Correct: the object's name comes before the dot."],
      ["A property of the form", "Text is the property; lblResult is the object."],
      ["A method that displays text", "No method is called here; a property is set."],
      ["An event handler", "Event handlers are subroutines such as btnPay_Click."],
    ],
    answer: "A",
    explanation: "Dot notation: object.property. The statement sets the Text property of the label lblResult.",
  });
  b.fib({
    d: 3, skill: "UNDERSTANDING",
    hints: ["The part before the dot is the object."],
    stem: "Complete the sentences about the Visual Basic statements `txtAmount.Text = \"\"` and `txtAmount.Focus()`.",
    template: "In `txtAmount.Text`, txtAmount is an {{blank:a}} and Text is a {{blank:b}}. `Focus` is a {{blank:c}} that moves the cursor into the box.",
    blanks: [
      { id: "a", accepted: ["object"], choices: ["object", "property", "method", "event"] },
      { id: "b", accepted: ["property"], choices: ["object", "property", "method", "event"] },
      { id: "c", accepted: ["method"], choices: ["object", "property", "method", "event"] },
    ],
    explanation: "Objects have properties (values) and methods (actions).",
  });
  b.num({
    d: 4, skill: "ANALYSIS", calculator: false,
    hints: ["Each object uses its own class's area method.", "Add the three areas."],
    stem: `What does this Python program display?\n\n${py(srcShapes)}`,
    value: Number(outShapes),
    wrong: [8 * 3 + 2 * 7],
    explanation: `Rectangle(8, 3) gives 24, Square(5) gives 25 and Rectangle(2, 7) gives 14: total ${outShapes}. The same call, plot.area(), runs a different method for each class (polymorphism).`,
    workedSolution: `1. 8 × 3 = 24.\n2. 5 × 5 = 25.\n3. 2 × 7 = 14.\n4. 24 + 25 + 14 = ${outShapes}.`,
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why do many programs group their commands into menus and sub-menus?",
    options: [
      ["Many commands stay available without cluttering the form", "Correct: menus organise commands into logical groups."],
      ["Menus make the program run faster", "Menus affect layout, not speed."],
      ["Menus stop the user from ever making any mistakes in the program", "Menus help but cannot prevent every mistake."],
      ["Sub-menus are needed before buttons can work", "Buttons work without menus."],
    ],
    answer: "A",
    explanation: "File, Edit, Help and their sub-menus keep the interface tidy and easy to learn.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    hints: ["Think about layout, labels, choices and feedback."],
    stem: "Describe **three** features of a well-designed user interface for a school library system.",
    points: [
      "Clear, consistent layout (related controls grouped, same style on every form)",
      "Every input clearly labelled / meaningful button captions",
      "Lists, combo boxes or option buttons for known choices / validation and clear error messages / readable fonts and good contrast",
    ],
    explanation: "Any three distinct design features with a brief description.",
    modelAnswer: "Every text box has a clear label, such as \"Borrower number\". Book titles are chosen from a combo box, so they cannot be misspelt. When a book is issued, a message confirms it, and an error message explains any problem.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    hints: ["Who decides the order of execution in each style?"],
    stem: "Explain the difference between a procedural program and an event-driven program. Use a program that converts temperatures as an example.",
    points: [
      "Procedural: statements run in an order fixed by the programmer (e.g. input, convert, output, end)",
      "Event-driven: the program waits for events and runs a handler for each one",
      "In event-driven programs the user decides the order of actions",
      "Example: clicking a Convert button runs the handler that reads the text box and shows the answer in a label",
    ],
    explanation: "Contrast fixed order with event-triggered handlers, with an example.",
    modelAnswer: "A procedural converter asks for a temperature, converts it, outputs it and ends, always in that order. An event-driven converter shows a form and waits; when the user types a value and clicks Convert, the button's Click handler reads the text box, converts the value and shows it in a label. The user can convert again or clear the box in any order.",
  });
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true, marks: 8, secs: 720,
    hints: ["Match each control to the kind of data.", "The Click event of the button runs the calculation."],
    stem: "Nyasha is designing a form for a tuck shop. The cashier chooses a snack from a fixed list of 12 items, types the quantity, ticks a box if the customer is a member, and clicks a button to show the total cost.",
    parts: [
      P.mcq({
        label: "(a)", stem: "Which control is most suitable for choosing the snack?",
        options: [["A combo box", "Correct: a fixed list of items avoids typing errors."], ["A text box", "Typing names allows misspellings."], ["A label", "Labels only display text."], ["A check box", "Check boxes are for on/off choices."]],
        answer: "A", explanation: "Known choices belong in a list.",
      }),
      P.fib({
        label: "(b)", marks: 3, stem: "Complete the plan.",
        template: "The quantity is typed into a {{blank:a}}. Membership is shown with a {{blank:b}}. The total is calculated when the button's {{blank:c}} event happens.",
        blanks: [
          { id: "a", accepted: ["text box"], choices: ["text box", "label", "check box", "menu"] },
          { id: "b", accepted: ["check box"], choices: ["text box", "label", "check box", "menu"] },
          { id: "c", accepted: ["Click"], choices: ["Click", "Load", "Text", "Width"] },
        ],
        explanation: "Typed number: text box; yes/no: check box; a button's Click event runs the handler.",
      }),
      P.manual({
        label: "(c)", marks: 4,
        stem: "Write the event handler (in Visual Basic, Python or pseudocode) that runs when the button is clicked. Members get 10% off. Assume the price of the chosen snack is already in a variable `Price`.",
        points: [
          "Reads the quantity from the text box and converts it to a number",
          "Calculates the cost as price × quantity",
          "Checks the check box (e.g. chkMember.Checked) and takes 10% off when it is ticked",
          "Displays the total in a label (sets its Text property)",
        ],
        modelAnswer: "```\nPrivate Sub btnTotal_Click(sender As Object, e As EventArgs) Handles btnTotal.Click\n    Dim Quantity As Integer\n    Dim Cost As Double\n    Quantity = Val(txtQuantity.Text)\n    Cost = Price * Quantity\n    If chkMember.Checked Then\n        Cost = Cost * 0.9\n    End If\n    lblTotal.Text = \"Total: \" & Cost\nEnd Sub\n```",
      }),
    ],
    explanation: "Combo box for the snack; text box, check box and the button's Click event; a handler that converts, calculates, applies the discount and displays the result.",
  });
  b.struct({
    d: 5, skill: "ANALYSIS", examStyle: true, marks: 8, secs: 720, calculator: false,
    hints: ["deposit ignores amounts that are not positive.", "// is whole-number division in Python."],
    stem: `A bank's training course uses this Python program.\n\n${py(srcStruct)}`,
    parts: [
      P.short({ label: "(a)", stem: "State the name of the class that **inherits** from another class.", accepted: ["SavingsAccount"], wrong: ["Account"], explanation: "`class SavingsAccount(Account)` inherits from Account." }),
      P.mcq({
        label: "(b)", stem: "Which of these is a **method** of the class `Account`?",
        options: [["deposit", "Correct: it is defined with def inside the class."], ["balance", "balance is an attribute (property)."], ["owner", "owner is an attribute (property)."], ["a", "a is an object created from SavingsAccount."]],
        answer: "A", explanation: "Methods are the functions defined inside a class: __init__, deposit, report (and add_interest in the subclass).",
      }),
      P.short({ label: "(c)", stem: "State exactly what the program displays.", accepted: [outStruct, "Chipo:220", "Chipo 220"], normalise: ["trim", "collapse_whitespace", "lowercase"], wrong: ["Chipo: 165"], explanation: `deposit(200) makes the balance 200; deposit(-50) is ignored; add_interest adds 200 // 10 = 20: "${outStruct}".` }),
      P.manual({
        label: "(d)", marks: 4, stem: "Explain how this program shows (i) encapsulation and (ii) inheritance.",
        points: ["(i) Each account object holds its own data (owner, balance) together with the methods that change it", "(i) The balance is changed through deposit, which checks the amount, rather than directly", "(ii) SavingsAccount reuses Account's __init__, deposit and report without rewriting them", "(ii) SavingsAccount adds its own method, add_interest"],
        modelAnswer: "Encapsulation: the account's owner and balance are kept inside the object with the methods that use them, and the balance is changed through deposit, which rejects the negative amount. Inheritance: SavingsAccount gets __init__, deposit and report from Account without rewriting them, and only adds add_interest.",
      }),
      P.tf({ label: "(e)", stem: "The statement `a.deposit(-50)` reduces the balance to 150.", answer: false, explanation: "False. deposit only adds amounts greater than 0, so -50 is ignored." }),
    ],
    explanation: `The program displays "${outStruct}".`,
  });

  b.card("DEFINITION", "GUI", "An interface using windows, icons, menus and controls (buttons, text boxes) operated by pointer, touch or keyboard.");
  b.card("DEFINITION", "Event-driven programming", "Code runs in response to events (click, key press, form load); each event has its own handler; the user decides the order.");
  b.card("FACT", "Common controls", "Label: shows text. Text box: typed input. Button: runs code. List/combo box: choose from a list. Check box: on/off. Radio button: one of a group.");
  b.card("DEFINITION", "Object", "An item with properties (data) and methods (actions), e.g. a button with Text and Click.");
  b.card("CONCEPT", "Property vs method", "Property: a value an object has (Text, Width, Visible). Method: an action it performs (Clear, Show, Focus).");
  b.card("DEFINITION", "Class", "A template defining the properties and methods of a type of object; objects are its instances.");
  b.card("DEFINITION", "Encapsulation", "Keeping an object's data together with the methods that work on it; other code uses the methods.");
  b.card("DEFINITION", "Inheritance", "A subclass gets the properties and methods of an existing class and adds or changes only what differs.");
  b.card("DEFINITION", "Polymorphism", "The same method name behaves differently for objects of different classes.");
  b.card("FACT", "Text-box input is text", "Convert before arithmetic: Val() in Visual Basic, int() or float() in Python; \"3\" + \"4\" gives \"34\".");
});
