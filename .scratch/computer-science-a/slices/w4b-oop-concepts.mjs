// Slice w4b: object-oriented programming concepts (acs.prog.oop-concepts, both boards).
import { concept, P, chk, same, mdTable, codeBlock, py } from "../lib.mjs";
import { mc, pm } from "../tables/w4b-q.mjs";

concept("acs.prog.oop-concepts", { file: "prog/oop-concepts", keyPrefix: "prog.oop-concepts" }, (b) => {
  // ---- computed: vehicle program
  const vCode = `class Vehicle:
    def __init__(self, reg, seats):
        self._reg = reg
        self._seats = seats

    def label(self):
        return self._reg + " carries " + str(self._seats)

    def daily_cost(self):
        return 10

class Kombi(Vehicle):
    def daily_cost(self):
        return super().daily_cost() + 5

class Bus(Vehicle):
    def daily_cost(self):
        return super().daily_cost() * 3

fleet = [Vehicle("AAB 111", 4), Kombi("ABC 222", 15), Bus("ACD 333", 60)]
total = 0
for v in fleet:
    print(v.label(), "- cost", v.daily_cost())
    total = total + v.daily_cost()
print("Total:", total)`;
  const vOut = py(vCode).split("\n");
  same(vOut, ["AAB 111 carries 4 - cost 10", "ABC 222 carries 15 - cost 15", "ACD 333 carries 60 - cost 30", "Total: 55"]);
  const costs = [10, 15, 30];
  chk(costs.reduce((a, c) => a + c, 0), 55);
  const vPseudo = `CLASS Vehicle
    PRIVATE Reg : STRING
    PRIVATE Seats : INTEGER
    PUBLIC PROCEDURE NEW(GivenReg : STRING, GivenSeats : INTEGER)
        Reg ← GivenReg
        Seats ← GivenSeats
    ENDPROCEDURE
    PUBLIC FUNCTION DailyCost() RETURNS INTEGER
        RETURN 10
    ENDFUNCTION
ENDCLASS`;

  // ---- multiple choice
  mc(b, 2, "RECALL", "What is the difference between a class and an object?",
    ["A class is a template; an object is an instance of it", "The class defines properties and methods; the object holds values."],
    [["A class is one item; an object is a template", "That reverses the terms."], ["A class holds the data; an object holds only the methods", "An object holds its own data."], ["They mean the same thing", "A class is a type; an object is an instance."]],
    "A class is a blueprint; an object is an instance of it.", { daily: true });
  mc(b, 2, "RECALL", "What is the purpose of encapsulation?",
    ["To hide the data and allow access only through methods", "Private properties protect the data."],
    [["To allow every part of a program to change the data directly", "That is what encapsulation prevents."], ["To let a new class reuse an existing class", "That is inheritance."], ["To give the same method different behaviour in different classes", "That is polymorphism."]],
    "Encapsulation = private data + public methods.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "What does a subclass receive from its superclass through inheritance?",
    ["Its properties and methods, which it can add to or override", "A subclass reuses and extends what the superclass defines."],
    [["Nothing, because the subclass must define everything again", "That would make inheritance pointless."], ["Only the objects that were created from the superclass", "Objects are not inherited."], ["Only the private data of one object", "Inheritance applies to the class, not to one object."]],
    "A subclass inherits the superclass's properties and methods.", { daily: true });
  mc(b, 3, "APPLICATION", "Which relationship between two classes is best described by containment (aggregation) rather than inheritance?",
    ["A `Clinic` has many `Patient` objects", "A clinic has patients as parts; it is not a kind of patient."],
    [["A `Nurse` is a kind of `Employee`", "That is inheritance."], ["A `Bus` is a kind of `Vehicle`", "That is inheritance."], ["A `Dvd` is a kind of `Item`", "That is inheritance."]],
    "Use the test \"has a\" for containment and \"is a\" for inheritance.", { hints: ["Which pair of classes fits the sentence 'X has a Y'?"] });
  mc(b, 2, "RECALL", "What is a constructor?",
    ["A method that runs when an object is created", "In pseudocode it is called NEW."],
    [["A method that deletes an object when it is no longer needed", "That is a destructor."], ["A property that cannot be changed", "That is a constant."], ["A class that has no subclasses", "That is not a constructor."]],
    "The constructor initialises a new object.");
  mc(b, 3, "UNDERSTANDING", "What is meant by overriding a method?",
    ["A subclass supplies its own version of a method it inherits", "The subclass method replaces the superclass version for its objects."],
    [["Two classes share one method with the same code and cannot change it", "That is simple inheritance, not overriding."], ["A method is made private so it cannot be used", "That is hiding, not overriding."], ["An object is deleted and created again", "That has nothing to do with methods."]],
    "Overriding redefines an inherited method in the subclass.", { hints: ["Which class supplies the new version of the method?"] });
  mc(b, 3, "UNDERSTANDING", "A program calls `Print()` on a `Circle` object and on a `Square` object, and each draws a different shape. This is an example of",
    ["polymorphism", "One method name, different behaviour by class."],
    [["encapsulation", "That hides data."], ["containment", "That is a has-a relationship."], ["instantiation", "That is creating an object."]],
    "Polymorphism: the same call behaves differently for different classes.", { hints: ["The same method name does different things in different classes."] });
  mc(b, 2, "UNDERSTANDING", "Which is a benefit of object-oriented programming?",
    ["Classes can be reused and extended by inheritance", "Reuse reduces repeated code."],
    [["Programs always run much faster than any other style", "OOP does not guarantee speed."], ["Programs need no testing because classes cannot have errors", "Every program needs testing."], ["No design is needed beforehand", "OOP needs good class design."]],
    "Reuse and easier maintenance are benefits of OOP.");

  // ---- true / false
  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "In an inheritance relationship, the subclass is a more specialised kind of the superclass.", answer: true,
    explanation: "True. A Bus is a kind of Vehicle; it has all the properties and methods of a Vehicle plus its own." });
  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "If the properties of a class are made public, code outside the class cannot change them.", answer: false,
    explanation: "False. Public properties can be read and changed from anywhere. To protect them they must be private." });

  // ---- fib, num, short, match
  b.fib({ d: 2, skill: "RECALL", stem: "Complete the sentences by choosing the correct term.",
    template: "A {{blank:a}} is a template for objects.\n\nA procedure or function that belongs to a class is called a {{blank:b}}.\n\nA data item held by an object is a {{blank:c}}.",
    blanks: [{ id: "a", accepted: ["class"], choices: ["class", "method", "property", "constructor"] }, { id: "b", accepted: ["method"], choices: ["class", "method", "property", "constructor"] }, { id: "c", accepted: ["property"], choices: ["class", "method", "property", "constructor"] }],
    explanation: "A class is a template; a method is a routine of the class; a property is a data item." });
  b.num({ d: 3, skill: "APPLICATION", calculator: false, hints: ["Work out the daily cost of each kind of vehicle from its method."],
    stem: "A fleet has one `Vehicle`, one `Kombi` and one `Bus`. The `Vehicle` method `DailyCost` returns 10. The `Kombi` overrides it to return the superclass value plus 5, and the `Bus` overrides it to return the superclass value multiplied by 3. State the total of the three daily costs.",
    value: 55, wrong: [45, 30], workedSolution: "Vehicle 10, Kombi 10 + 5 = 15, Bus 10 × 3 = 30; 10 + 15 + 30 = 55.", explanation: "The total is 55." });
  b.short({ d: 2, skill: "RECALL", stem: "State the term for creating an object from a class.", accepted: ["instantiation", "instantiating", "creating an instance", "instance creation"], wrong: ["inheritance"], explanation: "Creating an object from a class is instantiation." });
  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each term to its meaning.",
    pairs: [["Encapsulation", "Data is private and accessed through methods"], ["Inheritance", "A subclass reuses the properties and methods of a superclass"], ["Polymorphism", "The same method name behaves differently in different classes"], ["Containment", "An object has another object as one of its properties"]],
    explanation: "The four ideas of an object-oriented design." });

  // ---- self-marked
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 3, hints: ["Give a reason, a how, and an example."],
    stem: "Explain how encapsulation protects the balance of a bank account object. [3]",
    points: ["The balance property is private, so other code cannot change it directly", "It can be changed only through public methods such as deposit and withdraw", "These methods can check the data (for example reject a negative deposit or an overdraft) so the balance stays valid"],
    modelAnswer: "The balance is a private property, so other code cannot change it directly. It can be changed only through public methods such as deposit and withdraw, which check the data and reject invalid amounts.", explanation: "Private data + checking methods." });
  b.manualShort({ d: 4, skill: "CREATION", marks: 4, hints: ["Put the shared properties in the superclass."],
    stem: "A school system holds learners and teachers. Both have a name and an ID number; a learner also has a form and a teacher has a subject. Describe a class design that uses inheritance. [4]",
    points: ["A superclass such as Person with the properties Name and ID", "A subclass Learner that inherits from Person and adds Form", "A subclass Teacher that inherits from Person and adds Subject", "The shared properties are defined once, so they are not repeated in the subclasses"],
    modelAnswer: "Person is the superclass with the properties Name and ID. Learner inherits from Person and adds Form. Teacher inherits from Person and adds Subject. The shared properties are written once in Person.", explanation: "Move shared properties to a superclass." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 3, hints: ["Think of reuse, protection of data and maintenance."],
    stem: "State three benefits of using an object-oriented approach to write a large program. [3]",
    points: ["Inheritance allows code to be reused", "Encapsulation protects data from accidental change", "Classes can be tested and maintained separately (or model real-world things, making the design easier to understand)"],
    modelAnswer: "Inheritance lets code be reused, encapsulation protects data from accidental change, and each class can be tested and maintained separately.", explanation: "Reuse, protection and maintenance." });
  b.manualShort({ d: 4, skill: "ANALYSIS", marks: 3, hints: ["Use the words 'is a' and 'has a'."],
    stem: "Distinguish between inheritance and containment, using the classes `Car`, `Engine` and `Vehicle` as examples. [3]",
    points: ["Inheritance is an \"is a\" relationship: a Car is a kind of Vehicle, so Car can inherit from Vehicle", "Containment is a \"has a\" relationship: a Car has an Engine, so a Car object contains an Engine object as a property", "A Car does not inherit from Engine, because it is not a kind of engine"],
    modelAnswer: "Inheritance is an is-a relationship: Car is a kind of Vehicle, so Car inherits from Vehicle. Containment is a has-a relationship: a Car has an Engine, so the Car object holds an Engine object as a property.", explanation: "Is-a versus has-a." });

  // ---- structured practice
  b.struct({ d: 3, skill: "APPLICATION", examStyle: true, calculator: false, hints: ["Read the program top to bottom: which class defines each method?", "The loop calls the same method on each object."],
    explanation: "Reading an inheritance program and its output.",
    stem: `A transport office in Gweru uses this Python program.\n\n${codeBlock(vCode, "python")}`,
    parts: [
      pm("(a)", "Which class is the superclass in the program?", ["`Vehicle`", "Kombi and Bus both inherit from Vehicle."], [["`Kombi`", "Kombi is a subclass of Vehicle."], ["`Bus`", "Bus is a subclass of Vehicle."], ["`fleet`", "fleet is a list of objects, not a class."]], "The classes `Kombi` and `Bus` inherit from `Vehicle`."),
      P.short({ label: "(b)", marks: 1, stem: "State the third line of output.", accepted: [vOut[2]], normalise: ["trim", "collapse_whitespace"], explanation: "For the Bus, daily_cost is 10 × 3 = 30 and label is inherited." }),
      P.num({ label: "(c)", marks: 1, stem: "State the number output after `Total:`.", value: 55, wrong: [45, 30], workedSolution: "10 + 15 + 30 = 55.", explanation: "The total is 55." }),
      P.manual({ label: "(d)", marks: 2, stem: "Identify the method that is overridden in this program and explain what is shown by the fact that the same call `v.daily_cost()` gives different values.", points: ["daily_cost is overridden (in Kombi and Bus)", "This is polymorphism: the same method call behaves differently depending on the class of the object"], modelAnswer: "daily_cost is overridden in Kombi and Bus. The same call gives different values for different objects, which is polymorphism.", explanation: "Overriding makes polymorphism possible." }),
      P.manual({ label: "(e)", marks: 1, stem: "Give one reason why `label` is not written again in the `Kombi` and `Bus` classes.", points: ["It is inherited from Vehicle, so the code is reused"], modelAnswer: "It is inherited from Vehicle, so the code does not have to be repeated.", explanation: "Inheritance gives reuse." }),
    ] });
  b.struct({ d: 4, skill: "CREATION", examStyle: true, hints: ["The class design is a table of properties and methods.", "Decide which relationship is 'is a' and which is 'has a'."],
    explanation: "Designing classes for a clinic system.",
    stem: "A clinic in Masvingo wants a program that stores its patients and staff. Every person has a name and a phone number. A patient also has a date of birth, and a nurse has a ward. The clinic keeps a list of the patients it is treating, and each patient has a medical record that holds the diagnosis and the treatment.",
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "Identify a suitable superclass and two subclasses and state one property of each of the three classes.", points: ["Superclass Person (with the properties Name and Phone)", "Subclasses Patient (DateOfBirth) and Nurse (Ward)"], modelAnswer: "Person (Name, Phone) is the superclass; Patient (DateOfBirth) and Nurse (Ward) are its subclasses.", explanation: "Shared properties go in the superclass." }),
      P.manual({ label: "(b)", marks: 2, stem: "State the relationship between the classes `Patient` and `MedicalRecord` and justify it.", points: ["Containment (aggregation), a has-a relationship", "A patient has a medical record; a patient is not a kind of record, so inheritance is wrong"], modelAnswer: "Containment: a patient has a medical record. A patient is not a kind of record, so inheritance would not fit.", explanation: "Use has-a for containment." }),
      pm("(c)", "Which property of `Patient` should be private to protect it?", ["The diagnosis in the medical record", "Medical information is sensitive and should be accessed only through checked methods."], [["The name of the class", "A class name is not a property."], ["The keyword NEW", "NEW is the constructor, not a property."], ["The length of the list of patients", "The size of a list does not need protection in the same way."]], "Private properties are changed only through methods that check the data."),
      P.manual({ label: "(d)", marks: 2, stem: "Explain how polymorphism could be used when the clinic prints a badge for each person.", points: ["Each class (Person, Patient, Nurse) has a method such as PrintBadge, overridden to show its own details", "One loop can call PrintBadge on every object in a list and each prints the right badge"], modelAnswer: "Each class has its own version of PrintBadge. A loop calls PrintBadge on every object in a list and each object prints the correct badge.", explanation: "Same call, different behaviour." }),
    ] });

  // ---- flashcards
  b.card("DEFINITION", "Class", "A template defining the properties and methods of a kind of object.");
  b.card("DEFINITION", "Object (instance)", "One item created from a class, with its own values for the properties.");
  b.card("DEFINITION", "Encapsulation", "Private data accessed only through public methods, which can check it.");
  b.card("DEFINITION", "Inheritance", "A subclass takes the properties and methods of a superclass and can add or override them.");
  b.card("DEFINITION", "Polymorphism", "The same method name behaves differently for objects of different classes.");
  b.card("DEFINITION", "Overriding", "A subclass redefines a method inherited from the superclass.");
  b.card("DEFINITION", "Containment (aggregation)", "An object has another object as a property: a has-a relationship.");
  b.card("FACT", "Constructor", "The method that runs when an object is created: NEW in 9618 pseudocode, __init__ in Python.");
  b.card("CONCEPT", "Is-a and has-a", "Is-a (a Bus is a Vehicle) means inheritance; has-a (a Car has an Engine) means containment.");
});
