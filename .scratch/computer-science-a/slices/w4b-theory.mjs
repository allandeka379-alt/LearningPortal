// W4b exam-format items: four THEORY10 and three THEORY5 (Paper 1 / Paper 3 style) on programming.
import { concept, P, EXAM, checkExam, CAM, ZIM, chk, same, mdTable, codeBlock, py } from "../lib.mjs";
import { pm, pyTmp } from "../tables/w4b-q.mjs";
import { ask } from "../tables/w4b-prolog.mjs";

const TH10 = { skill: EXAM.THEORY10.skill, secs: EXAM.THEORY10.secs, examStyle: true };
const TH5 = { skill: EXAM.THEORY5.skill, secs: EXAM.THEORY5.secs, examStyle: true };
const C = (k) => `acs.${k}`;

concept(C("prog.procedures-functions"), { file: "exam/w4b-theory", keyPrefix: "exam.w4b-theory" }, (b) => {
  // ------------------------------------------------------------------ 1. Constructs and procedures with parameters (both)
  {
    const fee = (age, zone) => { const base = zone * 0.5; return age < 12 ? base / 2 : base; };
    let total = 0;
    const fees = [];
    for (let zone = 1; zone <= 3; zone++) { const age = zone * 5; const f = fee(age, zone); fees.push(f); total += f; }
    same(fees, [0.25, 0.5, 1.5]);
    chk(total, 2.25);
    const pcode = `FUNCTION Fee(Age : INTEGER, Zone : INTEGER) RETURNS REAL
    DECLARE Base : REAL
    Base ← Zone * 0.5
    IF Age < 12 THEN
        RETURN Base / 2
    ELSE
        RETURN Base
    ENDIF
ENDFUNCTION

PROCEDURE AddTo(BYREF Total : REAL, BYVAL Amount : REAL)
    Total ← Total + Amount
ENDPROCEDURE

Total ← 0
FOR Zone ← 1 TO 3
    Age ← Zone * 5
    CALL AddTo(Total, Fee(Age, Zone))
NEXT Zone
OUTPUT Total`;
    same(py(`def fee(age, zone):
    base = zone * 0.5
    return base / 2 if age < 12 else base
t = [0]
def add_to(t, amount):
    t[0] = t[0] + amount
for zone in range(1, 4):
    age = zone * 5
    add_to(t, fee(age, zone))
print(t[0])`), "2.25");
    b.struct({
      ...TH10, d: 3, paper: "ZIMSEC P1 / Cambridge P1", calculator: false,
      concepts: [C("prog.procedures-functions"), C("prog.iteration"), C("prog.selection")],
      stem: `A minibus operator in Chitungwiza calculates fares in USD with this pseudocode. The age of the passenger and the number of the zone travelled to decide the fare.\n\n${codeBlock(pcode)}`,
      parts: checkExam(EXAM.THEORY10, [
        pm("(a)", "Which of the routines is a function?", ["`Fee`", "It has a RETURNS clause and returns a value."], [["`AddTo`", "AddTo is called with CALL and returns nothing."], ["`Total`", "Total is a variable."], ["`Zone`", "Zone is the loop variable."]], "`Fee` returns a value; `AddTo` is a procedure."),
        P.fib({ label: "(b)", marks: 3, stem: "State the value returned by `Fee(Age, Zone)` on each of the three passes of the loop.", template: "Zone 1: {{blank:a}}\n\nZone 2: {{blank:b}}\n\nZone 3: {{blank:c}}", blanks: [{ id: "a", input: "number", accepted: ["0.25"] }, { id: "b", input: "number", accepted: ["0.5"] }, { id: "c", input: "number", accepted: ["1.5"] }], wrong: [["0.5", "1", "1.5"]], explanation: "Zone 1: age 5 is under 12, so 0.5 / 2 = 0.25. Zone 2: age 10, so 1.0 / 2 = 0.5. Zone 3: age 15, so the base 1.5." }),
        P.num({ label: "(c)", marks: 1, stem: "State the value output at the end.", value: 2.25, wrong: [2.5, 0], workedSolution: "0.25 + 0.5 + 1.5 = 2.25.", explanation: "The total is 2.25." }),
        pm("(d)", "What is the effect of passing `Total` to `AddTo` by reference?", ["The procedure changes the main program variable", "BYREF gives the procedure access to the original variable."], [["The procedure receives only a copy of Total", "That is passing by value."], ["The procedure cannot read the value of Total at all", "It can read and change it."], ["The procedure returns a value to the main program as a result", "A procedure does not return a value."]], "BYREF lets the procedure change the original variable."),
        P.manual({ label: "(e)", marks: 2, stem: "State and explain what would be output if `Total` were passed by value instead.", points: ["The output would be 0", "Because the procedure would add to a copy of Total, and the Total in the main program would not change"], modelAnswer: "The output would be 0, because the procedure would add to a copy and the main program's Total would stay at 0.", explanation: "BYVAL changes only the copy." }),
        P.manual({ label: "(f)", marks: 2, stem: "Give two benefits of dividing the program into the routines `Fee` and `AddTo`.", points: ["Each routine does one job and can be tested separately", "The routines can be reused (or changed) without rewriting the rest of the program"], modelAnswer: "Each routine does one job and can be tested on its own, and a routine can be reused or changed without rewriting the rest of the program.", explanation: "Modular design." }),
      ]),
      hints: ["A function is called inside an expression and returns a value.", "Work through each pass of the loop in turn."],
      explanation: "The fares are 0.25, 0.5 and 1.5 and the total is 2.25; AddTo changes Total because it is passed by reference.",
    });
  }

  // ------------------------------------------------------------------ 2. OOP design with classes (both)
  {
    const farmCode = `class Animal:
    def __init__(self, name):
        self.__name = name

    def describe(self):
        return self.__name + " is an animal"

    def produce(self):
        return 0

class Cow(Animal):
    def __init__(self, name, litres):
        super().__init__(name)
        self.__litres = litres

    def describe(self):
        return super().describe() + " that gives milk"

    def produce(self):
        return self.__litres

class Hen(Animal):
    def __init__(self, name, eggs):
        super().__init__(name)
        self.__eggs = eggs

    def produce(self):
        return self.__eggs

farm = [Cow("Mbuya", 12), Hen("Pepe", 3), Animal("Rex")]
total = 0
for a in farm:
    print(a.describe())
    total = total + a.produce()
print(total)`;
    const fo = py(farmCode).split("\n");
    same(fo, ["Mbuya is an animal that gives milk", "Pepe is an animal", "Rex is an animal", "15"]);
    b.struct({
      ...TH10, d: 3, paper: "ZIMSEC P1 / Cambridge P3",
      concepts: [C("prog.oop-concepts"), C("prog.oop-programming")],
      stem: `A farm record system in Bindura uses this Python program.\n\n${codeBlock(farmCode, "python")}`,
      parts: checkExam(EXAM.THEORY10, [
        pm("(a)", "Which class is the superclass in the program?", ["`Animal`", "Cow and Hen inherit from Animal."], [["`Cow`", "Cow is a subclass."], ["`Hen`", "Hen is a subclass."], ["`farm`", "farm is a list of objects."]], "`Animal` is the class from which the others inherit."),
        P.short({ label: "(b)", marks: 1, stem: "State the second line of output.", accepted: [fo[1]], normalise: ["trim", "collapse_whitespace"], explanation: "Hen does not override describe, so the version in Animal is used." }),
        P.num({ label: "(c)", marks: 1, stem: "State the last number output.", value: 15, wrong: [12, 3], workedSolution: "12 litres from the cow + 3 eggs from the hen + 0 from the animal = 15.", explanation: "The total is 15." }),
        pm("(d)", "What name is given to the way `Cow` provides its own version of `describe`?", ["Overriding", "A subclass replaces an inherited method."], [["Encapsulation", "Encapsulation hides the data."], ["Instantiation", "Instantiation is creating an object."], ["Containment", "Containment is a has-a relationship."]], "A subclass method with the same name replaces the inherited one: overriding."),
        P.short({ label: "(e)", marks: 1, stem: "State the term for creating an object from a class, such as `Cow(\"Mbuya\", 12)`.", accepted: ["instantiation", "instantiating", "creating an instance", "instance creation"], explanation: "Instantiation." }),
        P.manual({ label: "(f)", marks: 2, stem: "Explain how the loop in the program shows polymorphism.", points: ["The same method calls (describe and produce) are made on every object in the list", "Each object responds in the way defined by its own class, giving different results"], modelAnswer: "The loop makes the same calls, describe and produce, on every object, and each object responds as its own class defines, giving different results.", explanation: "One call, different behaviour." }),
        P.manual({ label: "(g)", marks: 3, stem: "Write the header and constructor of the class `Hen` in 9618-style pseudocode.", points: ["CLASS Hen INHERITS Animal with a private Eggs property", "A constructor NEW with parameters for the name and the eggs", "Calls SUPER.NEW with the name and then sets Eggs"], modelAnswer: codeBlock(`CLASS Hen INHERITS Animal
    PRIVATE Eggs : INTEGER
    PUBLIC PROCEDURE NEW(GivenName : STRING, GivenEggs : INTEGER)
        SUPER.NEW(GivenName)
        Eggs ← GivenEggs
    ENDPROCEDURE
ENDCLASS`), explanation: "Inherit, call the superclass constructor, then set the new property." }),
      ]),
      hints: ["Which class do the other classes inherit from?", "Check which classes override each method."],
      explanation: "Hen inherits describe from Animal, so the second line is Pepe is an animal; the total is 12 + 3 + 0 = 15.",
    });
  }

  // ------------------------------------------------------------------ 3. Paradigms and declarative reasoning (CAM)
  {
    const prog = String.raw`sells(chipo, tomatoes).
sells(rudo, onions).
sells(farai, tomatoes).
sells(farai, onions).
sells(tendai, rice).
cheap(tomatoes).
cheap(rice).
bargain(S) :- sells(S, P), cheap(P).`;
    const bar = ask(prog, "bargain(S).").solutions.map((s) => s.S);
    same(bar, ["chipo", "farai", "tendai"]);
    const fp = ask(prog, "sells(farai, P).").solutions.length;
    chk(fp, 2);
    same(ask(prog, "sells(rudo, tomatoes).").solutions.length, 0);
    same(ask(prog, "sells(S, tomatoes), sells(S, onions).").solutions.map((s) => s.S), ["farai"]);
    b.struct({
      ...TH10, d: 3, applies: CAM, paper: "Cambridge Paper 3",
      concepts: [C("prog.language-paradigms"), C("prog.declarative-programming")],
      stem: `A market association keeps a program of the stalls in a Prolog-style language.\n\n${codeBlock(prog)}\n\nThe facts \`sells(Owner, Product).\` and \`cheap(Product).\` give the data, and the rule says that a stall is a bargain if it sells a cheap product.`,
      parts: checkExam(EXAM.THEORY10, [
        pm("(a)", "Which programming paradigm does this program use?", ["Declarative", "It states facts and rules, and the system finds the answers."], [["Low-level", "Low-level code uses processor instructions."], ["Imperative", "There is no sequence of statements."], ["Object-oriented", "There are no classes or objects."]], "Facts, rules and goals are declarative programming."),
        P.fib({ label: "(b)", marks: 3, stem: "State the three solutions of the goal `bargain(S).` in the order the system gives them.", template: "First: {{blank:a}}\n\nSecond: {{blank:b}}\n\nThird: {{blank:c}}", blanks: bar.map((v, i) => ({ id: "abc"[i], accepted: [v], choices: ["chipo", "rudo", "farai", "tendai"] })), explanation: "The stalls are tested in the order of the facts: chipo (tomatoes), rudo (onions are not cheap), farai (tomatoes), tendai (rice)." }),
        P.num({ label: "(c)", marks: 1, stem: "State the number of solutions of the goal `sells(farai, P).`", value: fp, wrong: [1, 3], workedSolution: "Two facts have farai as the owner: tomatoes and onions.", explanation: "There are two solutions." }),
        P.tf({ label: "(d)", marks: 1, stem: "The goal `sells(rudo, tomatoes).` succeeds.", answer: false, explanation: "False. There is no such fact, and no rule defines sells." }),
        P.manual({ label: "(e)", marks: 2, stem: "Write a rule `mixed(S)` that is true when the stall S sells both tomatoes and onions.", points: ["The head mixed(S) followed by :-", "The two goals sells(S, tomatoes) and sells(S, onions) separated by a comma and ending with a full stop"], modelAnswer: codeBlock("mixed(S) :- sells(S, tomatoes), sells(S, onions)."), explanation: "A comma means and." }),
        P.manual({ label: "(f)", marks: 2, stem: "Describe how an imperative program would differ from this program in finding the bargain stalls.", points: ["The imperative program would contain statements such as loops and conditions that say how to search the data", "In this program only facts, a rule and a goal are given, and the system decides how to find the solutions"], modelAnswer: "An imperative program would use loops and conditions to say how to search the data. Here only facts, a rule and a goal are given, and the system decides how to find the solutions.", explanation: "How versus what." }),
      ]),
      hints: ["Test the stalls in the order of the facts.", "A rule's body goals must all be true."],
      explanation: "The bargain stalls are chipo, farai and tendai; the paradigm is declarative.",
    });
  }

  // ------------------------------------------------------------------ 4. Files and exceptions (CAM)
  {
    const fcode = `with open("sales.txt", "w") as f:
    print(40, file=f)
    print(25, file=f)
    print("n/a", file=f)
    print(35, file=f)

total = 0
bad = 0
try:
    with open("sales.txt") as f:
        for line in f:
            try:
                total = total + int(line)
            except ValueError:
                bad = bad + 1
    print("Total:", total)
except FileNotFoundError:
    print("No file")
finally:
    print("Bad lines:", bad)`;
    const fo = pyTmp(fcode).split("\n");
    same(fo, ["Total: 100", "Bad lines: 1"]);
    b.struct({
      ...TH10, d: 4, applies: CAM, paper: "Cambridge Paper 3",
      concepts: [C("prog.file-processing-exceptions")],
      stem: `A shop in Zvishavane stores each day's takings, one per line, in a text file. This Python program was run.\n\n${codeBlock(fcode, "python")}`,
      parts: checkExam(EXAM.THEORY10, [
        P.num({ label: "(a)", marks: 1, stem: "State the number printed after `Total:`.", value: 100, wrong: [125, 40], workedSolution: "40 + 25 + 35 = 100; the line n/a is skipped.", explanation: "The total is 100." }),
        P.num({ label: "(b)", marks: 1, stem: "State the number printed after `Bad lines:`.", value: 1, wrong: [0, 4], workedSolution: "Only the line n/a cannot be converted to an integer.", explanation: "One bad line." }),
        pm("(c)", "Which exception is handled by the inner `except` block?", ["ValueError", "int(\"n/a\") cannot be converted."], [["FileNotFoundError", "That is handled by the outer except block."], ["ZeroDivisionError", "There is no division."], ["IndexError", "No list index is used."]], "A failed conversion raises ValueError."),
        pm("(d)", "What is the effect of opening `sales.txt` with the mode `\"w\"` in the first lines?", ["The file is created, or emptied if it already exists", "Write mode starts with an empty file."], [["The file is opened for reading only", "That is read mode."], ["New lines are added at the end of the existing lines", "That is append mode."], ["The file is deleted when the program ends", "Write mode does not delete the file."]], "Write mode overwrites the existing contents."),
        P.fib({ label: "(e)", marks: 2, stem: "Complete the pseudocode that reads every line of the file.", template: "OPENFILE \"Sales.txt\" FOR READ\n\nWHILE NOT {{blank:a}}(\"Sales.txt\") DO\n\n    {{blank:b}} \"Sales.txt\", Line", blanks: [{ id: "a", accepted: ["EOF"], choices: ["EOF", "READFILE", "OPENFILE", "SEEK"] }, { id: "b", accepted: ["READFILE"], choices: ["EOF", "READFILE", "OPENFILE", "SEEK"] }], explanation: "EOF tests for the end of the file and READFILE reads a line." }),
        P.manual({ label: "(f)", marks: 2, stem: "Explain why the program uses an inner `try ... except` statement inside the loop.", points: ["A line that is not a number would raise a ValueError and stop the program", "The inner handler counts the bad line and lets the loop go on to the next line"], modelAnswer: "A line that is not a number raises a ValueError and would stop the program. The inner handler counts the bad line and lets the loop carry on with the next line.", explanation: "Handle the exception where it occurs." }),
        P.manual({ label: "(g)", marks: 2, stem: "State what the program would output if the file `sales.txt` could not be found when it is opened for reading, and give the reason the `finally` block still runs.", points: ["It would output No file, and then Bad lines: 0", "The finally block runs whether or not an exception occurred"], modelAnswer: "It would output \"No file\" and then \"Bad lines: 0\". The finally block always runs, whether or not an exception occurred.", explanation: "finally is for clean-up that always happens." }),
      ]),
      hints: ["Follow the lines of the file one at a time.", "Which handler catches which exception?"],
      explanation: "Total 100 and one bad line; the inner handler stops one bad line ending the program.",
    });
  }

  // ------------------------------------------------------------------ 5. Variables, data types and expressions (both)
  {
    const v = Number(py("print(47 % 8 + 47 // 8)"));
    chk(v, 12);
    b.struct({
      ...TH5, d: 2, paper: "ZIMSEC P1 / Cambridge P1",
      concepts: [C("prog.programming-basics")],
      stem: "A program for a school in Rusape stores data about each learner.",
      parts: checkExam(EXAM.THEORY5, [
        P.match({ label: "(a)", marks: 3, stem: "Match each item of data to the most suitable data type.", pairs: [["The number of subjects taken", "INTEGER"], ["The average mark, such as 61.5", "REAL"], ["Whether the fees are paid", "BOOLEAN"]], extraRight: ["STRING"], explanation: "A count is INTEGER, an average has a fraction (REAL) and paid/unpaid is BOOLEAN." }),
        P.num({ label: "(b)", marks: 1, stem: "State the value of `MOD(47, 8) + DIV(47, 8)`.", value: v, wrong: [5, 6], workedSolution: "MOD(47, 8) is 7 and DIV(47, 8) is 5; 7 + 5 = 12.", explanation: "The value is 12." }),
        pm("(c)", "In a Python program, `age = input()` is followed by `age + 1`. Why does this cause an error?", ["input() gives a string; a string plus 1 fails", "The value must be converted with int()."], [["input() returns a real number that is too large", "It always returns a string."], ["1 is not a valid number to use in Python", "1 is valid."], ["age was not declared as an integer before use", "Python does not need a declaration."]], "Convert the input with int() before the addition."),
      ]),
      explanation: "Data types are matched to the data; MOD(47, 8) + DIV(47, 8) = 7 + 5 = 12; input() returns a string.",
    });
  }

  // ------------------------------------------------------------------ 6. Interface design (ZIM)
  b.struct({
    ...TH5, d: 2, applies: ZIM, paper: "ZIMSEC Paper 1",
    concepts: [C("prog.interface-design")],
    stem: "A clinic in Mutare is developing a screen on which a nurse registers a new patient. The nurse uses the screen all day and wants to work quickly.",
    parts: checkExam(EXAM.THEORY5, [
      P.manual({ label: "(a)", marks: 2, stem: "State two items that would be included in a profile of the nurse as a user.", points: ["Uses the system all day, so is experienced (skill level)", "Needs speed, e.g. few clicks or keyboard use (needs), or the device and place of use"], modelAnswer: "The nurse uses the system all day, so is experienced, and needs to work quickly, with few clicks and keyboard use.", explanation: "A profile lists skills, needs, device and conditions." }),
      pm("(b)", "Which input control is the most suitable for the field `Ward`, which has the choices A, B and C?", ["A drop-down list", "Only the listed wards can be chosen."], [["A text box", "Anything could be typed."], ["A heading", "A heading is only a title."], ["A scroll bar", "A scroll bar is not used to choose a value from a list."]], "A fixed choice is best made from a list."),
      P.manual({ label: "(c)", marks: 2, stem: "The nurse types a phone number with only 9 digits instead of 10. Describe a suitable validation check and message.", points: ["A length check (or format check) that the number has exactly 10 digits", "A message that says what is wrong and how to fix it, such as \"Enter 10 digits\""], modelAnswer: "A length check that the number has exactly 10 digits, with the message \"Enter 10 digits\".", explanation: "A helpful message says what to do." }),
    ]),
    explanation: "A user profile, a drop-down list for a fixed choice, and a length check with a helpful message.",
  });

  // ------------------------------------------------------------------ 7. User-defined types (CAM)
  b.struct({
    ...TH5, d: 2, applies: CAM, paper: "Cambridge Paper 3",
    concepts: [C("ds.user-defined-types")],
    stem: "A program for a clinic in Gweru stores the following.",
    parts: checkExam(EXAM.THEORY5, [
      P.fib({ label: "(a)", marks: 2, stem: "Choose the most suitable user-defined type for each item of data.", template: "The days of the week on which the clinic is open: {{blank:a}}\n\nA patient's name, age and ward: {{blank:b}}", blanks: [{ id: "a", accepted: ["enumerated"], choices: ["enumerated", "record", "pointer", "set"] }, { id: "b", accepted: ["record"], choices: ["enumerated", "record", "pointer", "set"] }], explanation: "A fixed list of names is enumerated; fields of different types form a record." }),
      P.short({ label: "(b)", marks: 1, stem: "State the pseudocode keyword that ends the definition of a record type.", accepted: ["ENDTYPE", "endtype"], explanation: "A record type is closed with ENDTYPE." }),
      P.manual({ label: "(c)", marks: 2, stem: "Give two reasons why a record is better than separate arrays for storing a patient's details.", points: ["The fields of one patient are kept together as one item", "The data cannot get out of step, and the record can be passed to a routine as a single item"], modelAnswer: "The fields of one patient are kept together as one item, so the data cannot get out of step, and the record can be passed to a routine as one item.", explanation: "Related data in one structure." }),
    ]),
    explanation: "An enumerated type for the days, a record for the patient, and ENDTYPE closes the record.",
  });
});
