// W4b exam-format items: four Cambridge Paper 4 programming tasks (CAM_P4_TASK, 25 marks, Python): inheritance, file
// processing with exceptions, a record-processing program and a mixed task. Every output is from a real run.
import { concept, P, EXAM, checkExam, CAM, chk, same, mdTable, codeBlock, py } from "../lib.mjs";
import { pm, pyTmp } from "../tables/w4b-q.mjs";

const T = { skill: EXAM.CAM_P4_TASK.skill, secs: EXAM.CAM_P4_TASK.secs, examStyle: true, applies: CAM, paper: "Cambridge Paper 4" };
const C = (k) => `acs.${k}`;

concept(C("prog.oop-programming"), { file: "exam/w4b-cambridge-p4", keyPrefix: "exam.w4b-cambridge-p4", applies: CAM }, (b) => {
  // ================================================================== TASK A: OOP with inheritance
  {
    const vehicleModel = `class Vehicle:
    def __init__(self, reg, seats):
        self.__reg = reg
        self.__seats = seats

    def get_reg(self):
        return self.__reg

    def cost_per_day(self):
        return 10`;
    const busModel = `class Bus(Vehicle):
    def __init__(self, reg, seats, route_km):
        super().__init__(reg, seats)
        self.__route_km = route_km

    def cost_per_day(self):
        return super().cost_per_day() + self.__route_km * 0.5`;
    const taxi = `class Taxi(Vehicle):
    def __init__(self, reg, seats, trips):
        super().__init__(reg, seats)
        self.__trips = trips

    def cost_per_day(self):
        return super().cost_per_day() + self.__trips * 3`;
    const mainA = `fleet = [Vehicle("AAB 101", 4), Bus("BCD 202", 60, 40), Taxi("CDE 303", 4, 5)]
total = 0
for v in fleet:
    print(v.get_reg(), v.cost_per_day())
    total = total + v.cost_per_day()
print("Total", total)`;
    const totalFn = `def total_cost(vehicles):
    total = 0
    for v in vehicles:
        total = total + v.cost_per_day()
    return total`;
    const full = [vehicleModel, busModel, taxi, mainA].join("\n\n");
    const out = py(full).split("\n");
    same(out, ["AAB 101 10", "BCD 202 30.0", "CDE 303 25", "Total 65.0"]);
    // tests
    const t = (expr) => Number(py([vehicleModel, busModel, taxi, `print(${expr})`].join("\n\n")));
    const tests = [t('Vehicle("X", 4).cost_per_day()'), t('Bus("X", 60, 0).cost_per_day()'), t('Bus("X", 60, 100).cost_per_day()'), t('Taxi("X", 4, 8).cost_per_day()')];
    same(tests, [10, 10, 60, 34]);
    same(Number(py([vehicleModel, busModel, taxi, totalFn, `print(total_cost([Vehicle("A", 4), Bus("B", 60, 40), Taxi("C", 4, 5)]))`].join("\n\n"))), 65);
    b.struct({
      ...T, d: 4,
      concepts: [C("prog.oop-programming"), C("prog.oop-concepts")],
      hints: ["The subclass constructor must call the superclass constructor.", "The same method name is used for every kind of vehicle."],
      stem: "A school transport office in Harare keeps details of its vehicles. A vehicle has a registration (a string) and a number of seats (an integer). The cost per day of a plain vehicle is 10. A bus also has a route length in kilometres, and its cost per day is the cost of a plain vehicle plus 0.5 for each kilometre of the route. A taxi also has a number of trips, and its cost per day is the cost of a plain vehicle plus 3 for each trip. You will write the classes in Python, using private properties.",
      parts: checkExam(EXAM.CAM_P4_TASK, [
        P.manual({ label: "(a)", marks: 5, stem: "Write the class `Vehicle`. It has a constructor with the parameters `reg` and `seats`, private properties for both, a method `get_reg` that returns the registration and a method `cost_per_day` that returns 10.", points: ["Class header and a constructor (__init__) with self, reg and seats", "Both properties stored as private attributes (double underscore)", "get_reg returns the registration", "cost_per_day defined as a method of the class", "cost_per_day returns 10"], modelAnswer: codeBlock(vehicleModel, "python"), explanation: "A class with private properties, a getter and a cost method." }),
        P.manual({ label: "(b)", marks: 5, stem: "Write the class `Bus` as a subclass of `Vehicle`. Its constructor has the parameters `reg`, `seats` and `route_km`. It overrides `cost_per_day` so that the method returns the cost of a plain vehicle plus 0.5 for each kilometre of the route.", points: ["Class header showing inheritance from Vehicle", "Constructor with the three parameters", "Calls the superclass constructor with reg and seats", "Stores route_km as a private property", "Overrides cost_per_day and returns the superclass cost plus route_km * 0.5, using the superclass method (super())"], modelAnswer: codeBlock(busModel, "python"), explanation: "The subclass calls the superclass constructor and extends the cost method." }),
        P.group({ label: "(c)", stem: `The class \`Taxi\` and a main program are added to the classes from parts (a) and (b), which are correct.\n\n${codeBlock(taxi, "python")}\n\n${codeBlock(mainA, "python")}\n\nState each line of output, in order.`, parts: out.map((line, i) => P.short({ label: `(${["i", "ii", "iii", "iv"][i]})`, marks: 1, stem: `Line ${i + 1} of the output.`, accepted: [line], normalise: ["trim", "collapse_whitespace"], explanation: ["A plain vehicle costs 10.", "The bus costs 10 + 40 × 0.5 = 30.0; the 0.5 makes the result a real number.", "The taxi costs 10 + 5 × 3 = 25.", "10 + 30.0 + 25 = 65.0."][i] })) }),
        P.fib({ label: "(d)", marks: 4, stem: "A tester writes a test plan for the cost per day. Complete the expected result for each test.", template: "A plain vehicle: {{blank:a}}\n\nA bus with a route of 0 km: {{blank:b}}\n\nA bus with a route of 100 km: {{blank:c}}\n\nA taxi with 8 trips: {{blank:d}}", blanks: tests.map((v, i) => ({ id: "abcd"[i], input: "number", accepted: [String(v)] })), wrong: [["0", "0", "50", "24"]], explanation: "10; 10 + 0 = 10; 10 + 100 × 0.5 = 60; 10 + 8 × 3 = 34." }),
        P.manual({ label: "(e)", marks: 4, stem: "Write a function `total_cost` that takes a list of vehicle objects (plain vehicles, buses and taxis) and returns the total of their costs per day. The function must not test the type of any object.", points: ["Function header with one parameter", "A total initialised to 0 before the loop", "A loop through the list that calls cost_per_day on each object", "Adds each cost to the total and returns it after the loop, without testing the type of the object"], modelAnswer: codeBlock(totalFn, "python"), explanation: "Polymorphism: one method call works for every class." }),
        P.manual({ label: "(f)", marks: 3, stem: "Explain why using inheritance for `Bus` and `Taxi` is better than writing three completely separate classes.", points: ["The registration, seats and getter are written once in Vehicle and reused by Bus and Taxi", "A change to the shared part is made in one place", "Objects of all three classes can be used in the same way (one list, the same method call) because they share the superclass interface"], modelAnswer: "The shared registration, seats and getter are written once in Vehicle and reused. A change to the shared part is made in one place, and objects of all three classes can be handled in the same way, for example in one list, because they share the method names.", explanation: "Reuse, maintenance and polymorphism." }),
      ]),
      explanation: "Vehicle holds the shared data and cost; Bus and Taxi extend it by calling the superclass constructor and overriding cost_per_day; total_cost works for every class by polymorphism.",
    });
  }

  // ================================================================== TASK B: file processing with exceptions
  {
    const load = `def load_marks(filename):
    records = []
    try:
        with open(filename) as f:
            for line in f:
                parts = line.strip().split(",")
                if len(parts) != 2:
                    continue
                try:
                    mark = int(parts[1])
                except ValueError:
                    continue
                records.append((parts[0], mark))
    except FileNotFoundError:
        print("File not found")
        return None
    return records`;
    const mainB = `records = load_marks(FILE)
if records is None:
    print("No data")
else:
    print(len(records))
    for name, mark in records:
        if mark >= 60:
            print(name)
    print(round(sum(m for _, m in records) / len(records), 1))`;
    const marksFile = ["Nyasha,64", "Thandeka,47", "Tafara,x", "Kudzai", "Blessing,83"];
    const mk = (file) => mainB.replace("FILE", JSON.stringify(file));
    const setupFile = (name, lines) => `with open("${name}", "w") as f:\n${lines.length ? lines.map((l) => `    print(${JSON.stringify(l)}, file=f)`).join("\n") : "    pass"}`;
    const runMain = (name, lines) => {
      const code = `${load}\n\n${lines === null ? "" : setupFile(name, lines)}\n\n${mk(name)}`;
      try { return pyTmp(code).split("\n"); } catch (e) { return [`ERROR ${/ZeroDivisionError/.test(String(e.message)) ? "ZeroDivisionError" : "other"}`]; }
    };
    const outMain = runMain("marks.txt", marksFile);
    same(outMain, ["3", "Nyasha", "Blessing", "64.7"]);
    // test files
    const tMissing = (() => { try { return pyTmp(`${load}\n\n${mk("missing.txt")}`).split("\n"); } catch (e) { return ["ERR"]; } })();
    same(tMissing, ["File not found", "No data"]);
    // empty file: the program prints 0, then fails on the division
    let emptyErr = "";
    try { pyTmp(`${load}\n\n${setupFile("empty.txt", [])}\n\n${mk("empty.txt")}`); } catch (e) { emptyErr = /ZeroDivisionError/.test(String(e.message)) ? "ZeroDivisionError" : "other"; }
    same(emptyErr, "ZeroDivisionError");
    const emptyFirst = py(`records = []\nprint(len(records))`);
    same(emptyFirst, "0");
    const report = `def save_report(records, filename):
    with open(filename, "w") as f:
        for name, mark in records:
            if mark >= 60:
                print(name + ": PASS", file=f)
            else:
                print(name + ": FAIL", file=f)`;
    same(pyTmp(`${load}\n\n${setupFile("marks.txt", marksFile)}\n\n${report}\n\nsave_report(load_marks("marks.txt"), "report.txt")\nprint(open("report.txt").read().split(chr(10)))`), "['Nyasha: PASS', 'Thandeka: FAIL', 'Blessing: PASS', '']");
    b.struct({
      ...T, d: 5,
      concepts: [C("prog.file-processing-exceptions")],
      hints: ["A line with the wrong number of fields or a mark that is not a number must be skipped.", "Handle the exception where it can occur."],
      stem: `A teacher in Mutare keeps learners' marks in a text file. Each line holds a name and a mark separated by a comma. Some lines may be damaged. A program must read the file without stopping when a line is damaged or when the file is missing.\n\nThe file \`marks.txt\` holds these lines:\n\n${codeBlock(marksFile.join("\n"))}`,
      parts: checkExam(EXAM.CAM_P4_TASK, [
        P.manual({ label: "(a)", marks: 7, stem: "Write a Python function `load_marks(filename)` that reads the file and returns a list of tuples `(name, mark)`, with the mark as an integer. A line that does not have exactly two fields, or whose mark is not a whole number, must be skipped. If the file does not exist the function must output `File not found` and return `None`.", points: ["Function header with one parameter and an empty list to hold the records", "Opens the file for reading, in a try block (or with a with statement)", "Loops through every line and splits it at the comma after removing the end-of-line", "Skips a line that does not have exactly two fields", "Converts the mark with int() inside a try block and skips the line when a ValueError occurs", "Appends a (name, mark) tuple for each valid line and returns the list", "Handles FileNotFoundError by outputting File not found and returning None"], modelAnswer: codeBlock(load, "python"), explanation: "Two levels of checking: the file, and then each line." }),
        P.group({ label: "(b)", stem: `The function \`load_marks\` from part (a) is correct. The following main program is run.\n\n${codeBlock(mk("marks.txt"), "python")}\n\nState each line of output, in order.`, parts: outMain.map((line, i) => P.short({ label: `(${["i", "ii", "iii", "iv"][i]})`, marks: 1, stem: `Line ${i + 1} of the output.`, accepted: [line], normalise: ["trim", "collapse_whitespace"], explanation: ["Three lines are valid: Nyasha, Thandeka and Blessing. The lines Tafara,x and Kudzai are skipped.", "Nyasha has 64, which is at least 60.", "Blessing has 83, at least 60; Thandeka has 47, so Thandeka is not output.", "The marks 64, 47 and 83 total 194, and 194 ÷ 3 = 64.67, which rounds to 64.7."][i] })) }),
        P.fib({ label: "(c)", marks: 4, stem: "The main program from part (b) is run with two other files: `missing.txt`, which does not exist, and `empty.txt`, which exists but has no lines. Complete the expected result of each test by choosing from the list.", template: "missing.txt, the first line of output: {{blank:a}}\n\nmissing.txt, the last line of output: {{blank:b}}\n\nempty.txt, the first line of output: {{blank:c}}\n\nempty.txt, then the program stops with the error: {{blank:d}}", blanks: [{ id: "a", accepted: ["File not found"], choices: ["File not found", "No data", "0", "ZeroDivisionError"] }, { id: "b", accepted: ["No data"], choices: ["File not found", "No data", "0", "ZeroDivisionError"] }, { id: "c", accepted: ["0"], choices: ["File not found", "No data", "0", "ZeroDivisionError"] }, { id: "d", accepted: [emptyErr], choices: ["File not found", "No data", "0", "ZeroDivisionError"] }], explanation: "A missing file prints File not found, load_marks returns None, and the main program prints No data. An empty file gives an empty list, so 0 is printed and then the average divides by zero." }),
        P.manual({ label: "(d)", marks: 5, stem: "Write a Python function `save_report(records, filename)` that writes one line for each record to a new file: the name, a colon, a space and `PASS` for a mark of 60 or more or `FAIL` otherwise, for example `Tendai: PASS`.", points: ["Function header with two parameters", "Opens the file for writing (mode \"w\") and closes it (for example with a with statement)", "A loop through the records", "A selection testing the mark against 60 with the correct comparison (>=)", "Writes the correct text for each record to the file"], modelAnswer: codeBlock(report, "python"), explanation: "Open for writing, loop, test and write." }),
        P.manual({ label: "(e)", marks: 3, stem: "The program uses a `with` statement to open the file. Explain the advantage of this.", points: ["The file is closed automatically when the block ends", "Even if an exception occurs inside the block", "So data is not lost and the file is not left open, without the programmer writing close() or a finally block"], modelAnswer: "The file is closed automatically when the block ends, even if an exception occurs inside it, so the file is never left open and no close() or finally block has to be written.", explanation: "Clean-up is guaranteed." }),
        P.manual({ label: "(f)", marks: 2, stem: "Explain why `load_marks` uses exception handling to deal with a missing file instead of testing for the file with an `if` statement.", points: ["The file may be missing, locked or damaged for reasons outside the program's control", "Attempting to open it and handling the exception also covers other faults and a change between the test and the opening"], modelAnswer: "The file may be missing or unreadable for reasons outside the program's control. Trying to open it and handling the exception covers these cases and cannot be caught out by the file changing between a test and the opening.", explanation: "Exceptions cover events outside the program." }),
      ]),
      explanation: "load_marks skips damaged lines and handles a missing file; the main program prints the valid count, the learners at 60 or more and the average 64.7; an empty file shows a division-by-zero fault.",
    });
  }

  // ================================================================== TASK C: record processing (find and sort)
  {
    const rec = `from dataclasses import dataclass

@dataclass
class Learner:
    name: str
    form: int
    mark: int`;
    const findFn = `def find(learners, name):
    for learner in learners:
        if learner.name == name:
            return learner
    return None`;
    const sortFn = `def sort_by_mark(learners):
    n = len(learners)
    for i in range(n - 1):
        for j in range(n - 1 - i):
            if learners[j].mark < learners[j + 1].mark:
                learners[j], learners[j + 1] = learners[j + 1], learners[j]`;
    const dataLine = `data = [Learner("Nyasha", 5, 64), Learner("Thandeka", 6, 47), Learner("Tafara", 5, 88), Learner("Kudzai", 6, 59), Learner("Blessing", 5, 47)]`;
    const mainC = `${dataLine}
sort_by_mark(data)
for learner in data[:3]:
    print(learner.name, learner.mark)
found = find(data, "Thandeka")
print(found.form if found else "Not found")
print(find(data, "Zodwa"))`;
    const out = py([rec, findFn, sortFn, mainC].join("\n\n")).split("\n");
    same(out, ["Tafara 88", "Nyasha 64", "Kudzai 59", "6", "None"]);
    // instrumented bubble sort
    const inst = py([rec, `${dataLine}
comparisons = 0
swaps = 0
n = len(data)
for i in range(n - 1):
    for j in range(n - 1 - i):
        comparisons += 1
        if data[j].mark < data[j + 1].mark:
            data[j], data[j + 1] = data[j + 1], data[j]
            swaps += 1
names = [d.name for d in data]
print(names.index("Thandeka"), names.index("Blessing"), comparisons, swaps)`].join("\n\n")).split(" ").map(Number);
    same(inst.slice(0, 3), [3, 4, 10]);
    const orderOut = py([rec, `${dataLine}
n = len(data)
for i in range(n - 1):
    for j in range(n - 1 - i):
        if data[j].mark <= data[j + 1].mark:
            data[j], data[j + 1] = data[j + 1], data[j]
print([d.name for d in data])`].join("\n\n"));
    same(orderOut, "['Tafara', 'Nyasha', 'Kudzai', 'Blessing', 'Thandeka']");
    b.struct({
      ...T, d: 4,
      concepts: [C("ds.user-defined-types"), C("prog.oop-programming")],
      hints: ["Write the record type before the functions.", "A swap needs both elements to be exchanged at the same time."],
      stem: "A teacher in Gweru keeps a list of learners, each with a name, a form and a mark. A program must find a learner by name and list the learners with the best marks. Built-in sorting functions must not be used.",
      parts: checkExam(EXAM.CAM_P4_TASK, [
        P.manual({ label: "(a)", marks: 3, stem: "Write the definition of a record type `Learner` with the fields `name` (string), `form` (integer) and `mark` (integer). A class or a dataclass may be used.", points: ["A class or dataclass named Learner", "Fields name, form and mark defined (in __init__ or as dataclass fields)", "Suitable types or initial values used for the three fields"], modelAnswer: codeBlock(rec, "python"), explanation: "A record groups fields of different types." }),
        P.manual({ label: "(b)", marks: 4, stem: "Write a function `find(learners, name)` that uses a linear search to return the `Learner` record with the given name, or `None` if there is no such learner.", points: ["Function header with two parameters", "A loop through the list", "Compares the name field of each record with the name searched for", "Returns the record when found, and returns None after the loop when it is not found"], modelAnswer: codeBlock(findFn, "python"), explanation: "A linear search returns on the first match." }),
        P.manual({ label: "(c)", marks: 6, stem: "Write a procedure `sort_by_mark(learners)` that uses a bubble sort to put the list in descending order of mark, so that the highest mark comes first. Do not use the `sort` method or the `sorted` function.", points: ["Procedure header with one parameter", "An outer loop that makes enough passes (n - 1)", "An inner loop that compares adjacent elements, shortening on each pass or covering the whole list", "Compares the mark fields of two adjacent records in the correct direction for a descending order", "Swaps the two records when they are in the wrong order, using a temporary variable or a simultaneous assignment", "The list is changed in place (no result needs to be returned)"], modelAnswer: codeBlock(sortFn, "python"), explanation: "Adjacent comparisons and swaps, repeated." }),
        P.group({ label: "(d)", stem: `The functions from parts (b) and (c) are correct. The following program is run.\n\n${codeBlock(mainC, "python")}\n\nState each line of output, in order.`, parts: out.map((line, i) => P.short({ label: `(${["i", "ii", "iii", "iv", "v"][i]})`, marks: 1, stem: `Line ${i + 1} of the output.`, accepted: [line], normalise: ["trim", "collapse_whitespace"], explanation: ["The highest mark is Tafara's 88.", "The second highest mark is Nyasha's 64.", "The third highest is Kudzai's 59.", "Thandeka is in form 6.", "No learner is called Zodwa, so find returns None."][i] })) }),
        P.fib({ label: "(e)", marks: 4, stem: "The bubble sort in part (c) is run on the five learners in the order Nyasha, Thandeka, Tafara, Kudzai, Blessing. Complete the results of the test, counting list positions from 0 after the sort.", template: "Position of Thandeka after the sort: {{blank:a}}\n\nPosition of Blessing after the sort: {{blank:b}}\n\nNumber of comparisons made: {{blank:c}}\n\nNumber of swaps made: {{blank:d}}", blanks: [{ id: "a", input: "number", accepted: [String(inst[0])] }, { id: "b", input: "number", accepted: [String(inst[1])] }, { id: "c", input: "number", accepted: [String(inst[2])] }, { id: "d", input: "number", accepted: [String(inst[3])] }], wrong: [["4", "3", "5", "10"]], explanation: "The sorted order is Tafara 88, Nyasha 64, Kudzai 59, Thandeka 47, Blessing 47. With 5 items the passes make 4 + 3 + 2 + 1 = 10 comparisons." }),
        P.manual({ label: "(f)", marks: 3, stem: "Thandeka and Blessing both have the mark 47, and Thandeka was entered first. State whether your `sort_by_mark` keeps Thandeka before Blessing, and explain how the comparison in the inner loop decides this.", points: ["Yes: with the comparison mark < next mark, records with equal marks are not swapped", "Equal records stay in their original order, so Thandeka remains before Blessing (a stable sort)", "If the comparison were <= the equal records would be swapped, and Thandeka would then move after Blessing"], modelAnswer: "Yes. With the test `learners[j].mark < learners[j + 1].mark`, two records with equal marks are not swapped, so they stay in their original order and Thandeka remains before Blessing. If the test were <=, equal records would be swapped and Thandeka would end up after Blessing.", explanation: "A strict comparison keeps equal items in order." }),
      ]),
      explanation: "A Learner record, a linear search and a bubble sort in descending order; the output lists Tafara, Nyasha and Kudzai and then Thandeka's form and None; the sort uses 10 comparisons and keeps equal marks in order.",
    });
  }

  // ================================================================== TASK D: mixed task (class, file, exceptions)
  {
    const loanCls = `class Loan:
    def __init__(self, member, book, days_late):
        self.__member = member
        self.__book = book
        self.__days_late = days_late

    def get_member(self):
        return self.__member

    def fine(self):
        if self.__days_late <= 0:
            return 0
        return round(min(self.__days_late * 0.2, 10), 2)`;
    const readFn = `def read_loans(filename):
    loans = []
    try:
        with open(filename) as f:
            for line in f:
                parts = line.strip().split(",")
                try:
                    loans.append(Loan(parts[0], parts[1], int(parts[2])))
                except (ValueError, IndexError):
                    print("Skipped:", line.strip())
    except FileNotFoundError:
        print("Loan file not found")
    return loans`;
    const loanLines = ["Tatenda,Maths,3", "Rudo,History,12", "Farai,Physics,x", "Chipo,Biology", "Sipho,Computing,60"];
    const mainD = `loans = read_loans("loans.txt")
total = 0
for loan in loans:
    print(loan.get_member(), loan.fine())
    total = total + loan.fine()
print("Total fines:", round(total, 2))`;
    const setup = `with open("loans.txt", "w") as f:\n${loanLines.map((l) => `    print(${JSON.stringify(l)}, file=f)`).join("\n")}`;
    const out = pyTmp([loanCls, readFn, setup, mainD].join("\n\n")).split("\n");
    same(out, ["Skipped: Farai,Physics,x", "Skipped: Chipo,Biology", "Tatenda 0.6", "Rudo 2.4", "Sipho 10", "Total fines: 13.0"]);
    const fineOf = (d) => py(`${loanCls}\nprint(Loan("a", "b", ${d}).fine())`);
    const ft = [fineOf(0), fineOf(7), fineOf(50), fineOf(-3)];
    same(ft, ["0", "1.4", "10.0", "0"]);
    const biggest = `def largest_fine(loans):
    best = loans[0]
    for loan in loans:
        if loan.fine() > best.fine():
            best = loan
    return best.get_member()`;
    same(py([loanCls, biggest, `print(largest_fine([Loan("a", "x", 3), Loan("b", "y", 12), Loan("c", "z", 60)]))`].join("\n\n")), "c");
    b.struct({
      ...T, d: 5,
      concepts: [C("prog.oop-programming"), C("prog.file-processing-exceptions")],
      hints: ["Keep the fine calculation inside the class.", "Every line of the file must be read even if one of them is damaged."],
      stem: `A library in Masvingo stores its overdue loans in a text file. Each line holds the member, the book and the number of days late, separated by commas. The fine is 0.2 for each day late, to a maximum of 10, rounded to 2 decimal places, and no fine is charged when the book is not late.\n\nThe file \`loans.txt\` holds:\n\n${codeBlock(loanLines.join("\n"))}`,
      parts: checkExam(EXAM.CAM_P4_TASK, [
        P.manual({ label: "(a)", marks: 5, stem: "Write a class `Loan` with a constructor that takes `member`, `book` and `days_late` and stores them as private properties, a method `get_member` and a method `fine` that returns the fine for the loan.", points: ["Class header and a constructor with the three parameters", "All three values stored as private properties", "get_member returns the member", "fine returns 0 when days_late is 0 or less", "fine multiplies the days late by 0.2, limits the result to 10 and rounds to 2 decimal places"], modelAnswer: codeBlock(loanCls, "python"), explanation: "The calculation belongs to the class that holds the data." }),
        P.manual({ label: "(b)", marks: 6, stem: "Write a function `read_loans(filename)` that returns a list of `Loan` objects made from the lines of the file. A line that has too few fields, or whose days late is not a whole number, must be skipped after outputting `Skipped:` and the line. If the file does not exist the function outputs `Loan file not found` and returns an empty list.", points: ["Function header and an empty list for the results", "Opens the file in a try block and loops through the lines, splitting each at the commas", "Creates a Loan object from the three fields, converting the days late to an integer", "Catches ValueError and IndexError for a damaged line and outputs Skipped: with the line", "Appends only the valid loans and returns the list", "Catches FileNotFoundError, outputs the message and still returns an empty list"], modelAnswer: codeBlock(readFn, "python"), explanation: "A handler for a damaged line and one for a missing file." }),
        P.group({ label: "(c)", stem: `The class and function from parts (a) and (b) are correct. This main program is run.\n\n${codeBlock(mainD, "python")}\n\nState each line of output, in order.`, parts: out.map((line, i) => P.short({ label: `(${["i", "ii", "iii", "iv", "v", "vi"][i]})`, marks: 1, stem: `Line ${i + 1} of the output.`, accepted: [line], normalise: ["trim", "collapse_whitespace"], explanation: ["The line with x cannot be converted and is skipped.", "The line with only two fields causes an IndexError and is skipped.", "3 × 0.2 = 0.6.", "12 × 0.2 = 2.4.", "60 × 0.2 = 12, limited to the maximum of 10.", "0.6 + 2.4 + 10 = 13.0."][i] })) }),
        P.fib({ label: "(d)", marks: 4, stem: "A tester checks the method `fine`. Complete the expected fine for each number of days late.", template: "0 days late: {{blank:a}}\n\n7 days late: {{blank:b}}\n\n50 days late: {{blank:c}}\n\n-3 days late: {{blank:d}}", blanks: ft.map((v, i) => ({ id: "abcd"[i], input: "number", accepted: [v] })), wrong: [["0", "7", "50", "-3"]], explanation: "No fine at 0 or below; 7 × 0.2 = 1.4; 50 × 0.2 = 10, at the maximum; negative days are treated as not late." }),
        P.manual({ label: "(e)", marks: 2, stem: "The calculation of the fine is placed in the class `Loan` instead of in the main program. Give two benefits of this design.", points: ["The rule is written in one place, so a change of rate or maximum is made once", "The method uses the object's own private data, which is protected from other code, and can be tested on its own and reused wherever a Loan is used"], modelAnswer: "The rule is written in one place, so a change in the rate or maximum is made once. The method uses the object's own private data, and it can be tested on its own and reused wherever a Loan is used.", explanation: "Encapsulation and maintainability." }),
        P.manual({ label: "(f)", marks: 2, stem: "Write a function `largest_fine(loans)` that returns the member with the largest fine in a non-empty list of `Loan` objects.", points: ["Starts with the first loan as the best so far and loops through the list", "Compares the fine of each loan with the best and updates the best; returns the member with get_member"], modelAnswer: codeBlock(biggest, "python"), explanation: "A maximum search over objects." }),
      ]),
      explanation: "The Loan class holds the fine rule; read_loans skips damaged lines and handles a missing file; the program outputs the fines 0.6, 2.4 and 10 and the total 13.0.",
    });
  }
});
