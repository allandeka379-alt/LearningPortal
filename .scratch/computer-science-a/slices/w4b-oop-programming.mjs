// Slice w4b: writing object-oriented programs (acs.prog.oop-programming, both boards).
import { concept, P, chk, same, mdTable, codeBlock, py, ZIM } from "../lib.mjs";
import { mc, pm } from "../tables/w4b-q.mjs";

concept("acs.prog.oop-programming", { file: "prog/oop-programming", keyPrefix: "prog.oop-programming" }, (b) => {
  // ---- computed: shop program
  const shopCode = `class Product:
    def __init__(self, name, price, stock):
        self.__name = name
        self.__price = price
        self.__stock = stock

    def sell(self, qty):
        if qty <= self.__stock:
            self.__stock = self.__stock - qty
            return qty * self.__price
        return 0

    def describe(self):
        return self.__name + ": " + str(self.__stock) + " left"

class Perishable(Product):
    def __init__(self, name, price, stock, days):
        super().__init__(name, price, stock)
        self.__days = days

    def describe(self):
        return super().describe() + ", " + str(self.__days) + " days"

shop = [Product("Soap", 2, 10), Perishable("Milk", 3, 6, 4)]
income = 0
income = income + shop[0].sell(4)
income = income + shop[1].sell(8)
income = income + shop[1].sell(5)
for item in shop:
    print(item.describe())
print("Income:", income)`;
  const shopOut = py(shopCode).split("\n");
  same(shopOut, ["Soap: 6 left", "Milk: 1 left, 4 days", "Income: 23"]);
  chk(4 * 2 + 0 + 5 * 3, 23);

  // ---- bank account trace
  let bal = 100; bal += 50;
  const w = (a) => (a <= bal ? ((bal -= a), true) : false);
  const r1 = w(200); const r2 = w(120);
  same([r1, r2, bal], [false, true, 30]);
  const accCode = `CLASS Account
    PRIVATE Balance : INTEGER
    PUBLIC PROCEDURE NEW(Start : INTEGER)
        Balance ← Start
    ENDPROCEDURE
    PUBLIC PROCEDURE Deposit(Amount : INTEGER)
        Balance ← Balance + Amount
    ENDPROCEDURE
    PUBLIC FUNCTION Withdraw(Amount : INTEGER) RETURNS BOOLEAN
        IF Amount <= Balance THEN
            Balance ← Balance - Amount
            RETURN TRUE
        ELSE
            RETURN FALSE
        ENDIF
    ENDFUNCTION
    PUBLIC FUNCTION GetBalance() RETURNS INTEGER
        RETURN Balance
    ENDFUNCTION
ENDCLASS

A ← NEW Account(100)
A.Deposit(50)
First ← A.Withdraw(200)
Second ← A.Withdraw(120)
OUTPUT A.GetBalance()`;

  // ---- singleton (ZIMSEC)
  const singleOut = py(`class Config:
    _only = None
    def __new__(cls):
        if cls._only is None:
            cls._only = super().__new__(cls)
            cls._only.limit = 5
        return cls._only
x = Config()
y = Config()
y.limit = 9
print(x.limit, x is y)`);
  same(singleOut, "9 True");

  // ---- multiple choice
  mc(b, 2, "RECALL", "Which keyword shows, in 9618-style pseudocode, that the class `Prefect` is a subclass of `Learner`?",
    ["`INHERITS`", "CLASS Prefect INHERITS Learner."],
    [["`EXTENDS`", "That is Java's keyword, not the pseudocode guide's."], ["`SUPER`", "SUPER calls the superclass, it does not declare the subclass."], ["`NEW`", "NEW creates an object."]],
    "A subclass is declared with INHERITS.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "Why does the constructor of a subclass call `SUPER.NEW`?",
    ["To set the properties inherited from the superclass", "The superclass constructor initialises them."],
    [["To create a second object of the superclass", "It initialises the same object, not a second one."], ["To delete the properties of the superclass", "Nothing is deleted."], ["To make the subclass private", "It does not affect access."]],
    "The subclass constructor must initialise the inherited properties first.", { daily: true });
  mc(b, 2, "APPLICATION", "Which statement creates an object of the class `Learner` in pseudocode?",
    ["`Pupil ← NEW Learner(\"Nyasha\", 55, 61)`", "NEW calls the constructor with its arguments."],
    [["`Pupil ← Learner`", "That does not call the constructor."], ["`NEW Pupil ← Learner(\"Nyasha\", 55, 61)`", "NEW comes before the class name."], ["`CALL Learner(\"Nyasha\", 55, 61)`", "CALL is for procedures."]],
    "An object is created with NEW and the constructor's arguments.", { daily: true });
  mc(b, 3, "ANALYSIS", "The property `Balance` of the class `Account` is `PRIVATE`. What happens if the main program contains `OUTPUT A.Balance`?",
    ["It is an error: a private property is hidden", "The main program must use GetBalance()."],
    [["It outputs the balance as a whole number of dollars", "Private data cannot be read directly."], ["It outputs 0 because the property has no value yet", "The value is not read at all."], ["It changes the property into a public property", "Access rules are not changed by a statement."]],
    "Private properties are reached through public methods.", { hints: ["Which part of the program may use a private property?"] });
  mc(b, 3, "APPLICATION", "In a Python class, what is the purpose of `self` in `def sell(self, qty):`?",
    ["It is the object the method is called on", "self gives the method access to that object's properties."],
    [["It is the name of the class that the method belongs to", "The class name is written after class."], ["It is the value that the method returns to the caller", "A method returns with return."], ["It makes the method private", "Privacy is shown by the double underscore."]],
    "self is the object the method is working on.", { hints: ["How does the method reach the properties of one particular object?"] });
  mc(b, 3, "ANALYSIS", "A class `Wallet` is a singleton. A program runs `a = Wallet()` and `b = Wallet()`. Which statement is true?",
    ["`a` and `b` refer to the same object", "The class returns its one and only object."],
    [["`a` and `b` are two different objects", "A singleton allows only one object."], ["The second statement causes a syntax error", "The statement is valid; it returns the existing object."], ["`b` is a copy of `a` with new values", "No copy is made."]],
    "A singleton returns the same object every time.", { hints: ["How many objects can exist?"], applies: ZIM });
  mc(b, 3, "APPLICATION", "A class `Dvd` inherits from `Item`, and both define `Describe()`. An object of the class `Dvd` is held in an array with other items. Which version of `Describe()` runs when it is called on this `Dvd` object?",
    ["The version in `Dvd`", "The object's own class decides, because the method is overridden."],
    [["The version in `Item`", "That would ignore the override."], ["Both versions, one after the other", "Only the object's version runs, unless it calls the other with SUPER."], ["Neither, because it is an error", "Overriding is allowed."]],
    "The overridden version in the object's class runs.", { hints: ["Which class does the object belong to?"] });

  // ---- true / false
  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "In a Python class, a property whose name starts with a double underscore, such as `self.__stock`, cannot be accessed directly from outside the class.", answer: true,
    explanation: "True. The double underscore makes the property private; it can be reached only through methods of the class." });
  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "A subclass constructor does not need to set the properties it inherits, because Python and the pseudocode set them automatically.", answer: false,
    explanation: "False. The subclass constructor must call the superclass constructor (SUPER.NEW or super().__init__) to set the inherited properties." });

  // ---- fib, num, short, match
  b.fib({ d: 3, skill: "APPLICATION", hints: ["Which keyword declares a subclass?", "Which keyword hides a property?"],
    stem: "Complete the pseudocode class header and property by choosing the correct keywords.",
    template: "CLASS Dvd {{blank:a}} Item\n\n    {{blank:b}} Minutes : INTEGER\n\n    PUBLIC PROCEDURE {{blank:c}}(GivenMinutes : INTEGER)\n\n{{blank:d}}",
    blanks: [{ id: "a", accepted: ["INHERITS"], choices: ["INHERITS", "NEW", "PRIVATE", "ENDCLASS"] }, { id: "b", accepted: ["PRIVATE"], choices: ["INHERITS", "NEW", "PRIVATE", "ENDCLASS"] }, { id: "c", accepted: ["NEW"], choices: ["INHERITS", "NEW", "PRIVATE", "ENDCLASS"] }, { id: "d", accepted: ["ENDCLASS"], choices: ["INHERITS", "NEW", "PRIVATE", "ENDCLASS"] }],
    explanation: "A subclass uses INHERITS, a hidden property is PRIVATE, the constructor is NEW, and the class ends with ENDCLASS." });
  b.num({ d: 4, skill: "APPLICATION", calculator: false, hints: ["Check each sale against the stock before the amount is added."],
    stem: "Use the Python classes below.\n\n" + codeBlock(shopCode.split("\nshop =")[0], "python") + "\nThe main program runs these statements.\n\n" + codeBlock(`shop = [Product("Soap", 2, 10), Perishable("Milk", 3, 6, 4)]
income = 0
income = income + shop[0].sell(4)
income = income + shop[1].sell(8)
income = income + shop[1].sell(5)`, "python") + "\nState the value of `income` after these statements.",
    value: 23, wrong: [31, 8], workedSolution: "Soap sells 4 at 2 = 8. The sale of 8 milk is refused (stock is 6), so 0 is added. The sale of 5 milk gives 5 × 3 = 15. 8 + 0 + 15 = 23.", explanation: "Income is 23." });
  b.short({ d: 2, skill: "RECALL", stem: "State the name of the method that runs when an object is created in 9618-style pseudocode.", accepted: ["NEW", "new", "the constructor", "constructor"], wrong: ["INIT"], explanation: "The constructor is the procedure NEW." });
  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each pseudocode item to its purpose.",
    pairs: [["`CLASS ... ENDCLASS`", "Encloses the definition of a class"], ["`NEW`", "Creates an object and calls its constructor"], ["`PRIVATE`", "Restricts a property to the class"], ["`SUPER.NEW(...)`", "Calls the constructor of the superclass"]],
    explanation: "The four keywords of a class definition." });

  // ---- self-marked
  b.manualShort({ d: 4, skill: "CREATION", marks: 5, hints: ["Class header, private properties, constructor, method, end of class."],
    stem: "Write pseudocode for a class `Plot` with the private properties `Length` and `Width` (both INTEGER), a constructor that sets them, and a function `Area` that returns the area. [5]",
    points: ["CLASS header and ENDCLASS", "Both properties declared PRIVATE with the INTEGER type", "Constructor NEW with two parameters", "Constructor assigns both properties", "Function Area returns Length * Width, with RETURNS INTEGER"],
    modelAnswer: codeBlock(`CLASS Plot
    PRIVATE Length : INTEGER
    PRIVATE Width : INTEGER
    PUBLIC PROCEDURE NEW(GivenLength : INTEGER, GivenWidth : INTEGER)
        Length ← GivenLength
        Width ← GivenWidth
    ENDPROCEDURE
    PUBLIC FUNCTION Area() RETURNS INTEGER
        RETURN Length * Width
    ENDFUNCTION
ENDCLASS`), explanation: "A complete class definition." });
  b.manualShort({ d: 4, skill: "CREATION", marks: 4, hints: ["Use class Name(Superclass), call super().__init__, then set the new property."],
    stem: "A Python class `Animal` has a constructor `__init__(self, name)` and a method `speak()`. Write a subclass `Dog` that adds a property `tricks` set in its constructor and overrides `speak()` to return \"Woof\". [4]",
    points: ["class Dog(Animal): header", "Constructor with name and tricks parameters calls super().__init__(name)", "Sets self.tricks", "Overrides speak() to return \"Woof\""],
    modelAnswer: codeBlock(`class Dog(Animal):
    def __init__(self, name, tricks):
        super().__init__(name)
        self.tricks = tricks

    def speak(self):
        return "Woof"`, "python"), explanation: "Subclass constructor, new property, overridden method." });
  b.manualShort({ d: 3, skill: "CREATION", marks: 3, hints: ["A setter should check the new value before changing the property."],
    stem: "Write a pseudocode method `SetMark` for a class with a private property `Mark` that accepts a new mark only if it is from 0 to 100. [3]",
    points: ["A public procedure with a parameter", "A condition testing that the mark is from 0 to 100 (both limits)", "Assigns the property only inside the condition"],
    modelAnswer: codeBlock(`PUBLIC PROCEDURE SetMark(NewMark : INTEGER)
    IF NewMark >= 0 AND NewMark <= 100 THEN
        Mark ← NewMark
    ENDIF
ENDPROCEDURE`), explanation: "A setter protects the property by validating." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 3, applies: ZIM, hints: ["Say what is allowed, how the class enforces it, and one use."],
    stem: "Explain what a singleton is and give one example of a program where it would be used. [3]",
    points: ["A class that allows only one object of it to exist", "Every request for an object returns that same object", "Example: the settings (or configuration or database connection) of a whole program"],
    modelAnswer: "A singleton is a class that allows only one object to exist, so every request returns that same object. It could be used for the settings of a whole program.", explanation: "One object, shared." });

  // ---- structured practice
  b.struct({ d: 4, skill: "ANALYSIS", examStyle: true, calculator: false, hints: ["Check each sale against the stock.", "Perishable.describe calls Product.describe first."],
    explanation: "Tracing a Python program with a subclass.",
    stem: `A shop in Chinhoyi uses this Python program.\n\n${codeBlock(shopCode, "python")}`,
    parts: [
      P.short({ label: "(a)", marks: 1, stem: "State the first line of output.", accepted: [shopOut[0]], normalise: ["trim", "collapse_whitespace"], explanation: "4 soaps are sold from 10, leaving 6." }),
      P.short({ label: "(b)", marks: 1, stem: "State the second line of output.", accepted: [shopOut[1]], normalise: ["trim", "collapse_whitespace"], explanation: "The sale of 8 milk is refused; the sale of 5 leaves 1; the Perishable describe adds the days." }),
      P.num({ label: "(c)", marks: 1, stem: "State the number output after `Income:`.", value: 23, wrong: [8, 31], workedSolution: "8 + 0 + 15 = 23.", explanation: "Income is 23." }),
      P.manual({ label: "(d)", marks: 2, stem: "Explain why the call `shop[1].sell(8)` adds 0 to `income`.", points: ["The milk stock is 6, which is less than the quantity 8, so the condition qty <= stock is false", "The method then reaches the line return 0 and the stock is not changed"], modelAnswer: "The stock of milk is 6, less than the 8 requested, so the condition is false. The method returns 0 and the stock is not changed.", explanation: "The method validates the quantity." }),
      P.manual({ label: "(e)", marks: 3, stem: "Write the constructor of the class `Perishable` in 9618-style pseudocode, with the parameters `GivenName`, `GivenPrice`, `GivenStock` and `GivenDays`.", points: ["PUBLIC PROCEDURE NEW with the four parameters", "Calls SUPER.NEW with the name, price and stock", "Assigns the new property Days"], modelAnswer: codeBlock(`PUBLIC PROCEDURE NEW(GivenName : STRING, GivenPrice : INTEGER, GivenStock : INTEGER, GivenDays : INTEGER)
    SUPER.NEW(GivenName, GivenPrice, GivenStock)
    Days ← GivenDays
ENDPROCEDURE`), explanation: "Call the superclass constructor first." }),
    ] });
  b.struct({ d: 4, skill: "APPLICATION", examStyle: true, calculator: false, hints: ["Deposit first, then each withdrawal in order."],
    explanation: "Tracing a pseudocode class with a validating method.",
    stem: `A savings club uses this pseudocode.\n\n${codeBlock(accCode)}`,
    parts: [
      P.fib({ label: "(a)", marks: 2, stem: "State the values of `First` and `Second`.", template: "First = {{blank:a}}\n\nSecond = {{blank:b}}", blanks: [{ id: "a", accepted: ["FALSE"], choices: ["TRUE", "FALSE"] }, { id: "b", accepted: ["TRUE"], choices: ["TRUE", "FALSE"] }], explanation: "After the deposit the balance is 150. The withdrawal of 200 is refused (FALSE); the withdrawal of 120 is allowed (TRUE)." }),
      P.num({ label: "(b)", marks: 1, stem: "State the value output.", value: 30, wrong: [150, 100], workedSolution: "100 + 50 = 150; the first withdrawal fails; 150 - 120 = 30.", explanation: "The balance is 30." }),
      pm("(c)", "Why is `Balance` declared as `PRIVATE`?", ["So that only the checking methods can change it", "Encapsulation protects the data."], [["So that it is stored in a smaller amount of memory by the computer", "Privacy does not change storage."], ["So that it can be read by any part of the whole program", "Private means the opposite."], ["So that the constructor is not needed for the class", "A constructor is still needed."]], "Private data is changed only through checked methods."),
      P.manual({ label: "(d)", marks: 2, stem: "Explain how the method `Withdraw` protects the balance.", points: ["It tests that the amount is not greater than the balance before subtracting", "It returns FALSE and does not change the balance if the amount is too large"], modelAnswer: "It tests that the amount is not more than the balance before subtracting. If it is too large it returns FALSE and the balance does not change.", explanation: "Validation inside the method." }),
    ] });

  // ---- flashcards
  b.card("FACT", "Class in pseudocode", "CLASS Name ... ENDCLASS, with PRIVATE/PUBLIC properties, PUBLIC PROCEDURE NEW as constructor and methods.");
  b.card("FACT", "Creating an object", "Pupil ← NEW Learner(\"Nyasha\", 55, 61); call a method with Pupil.Average().");
  b.card("FACT", "Subclass", "CLASS Prefect INHERITS Learner; the constructor calls SUPER.NEW(...) first, then sets its own properties.");
  b.card("FACT", "Python classes", "class Prefect(Learner): __init__(self, ...) with super().__init__(...); self.__x is private.");
  b.card("DEFINITION", "Getter and setter", "Public methods that read (get) or change (set) a private property; a setter can validate the new value.");
  b.card("CONCEPT", "Array or list of objects", "One array can hold objects of a class and its subclasses; a loop calling the same method is polymorphism.");
  b.card("CONCEPT", "Tracing an OOP program", "Record each object's property values, use the subclass version of an overridden method, follow SUPER calls.");
  b.card("DEFINITION", "Singleton", "A class that allows only one object; every request returns that same object (ZIMSEC detail).", undefined, { applies: ZIM });
  b.card("CONCEPT", "Common errors", "Forgetting self, not calling the superclass constructor, using a private property directly.");
});
