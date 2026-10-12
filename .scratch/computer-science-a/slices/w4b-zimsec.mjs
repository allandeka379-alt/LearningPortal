// W4b exam-format items: two ZIMSEC Paper 2 section B items (ZIM_P2_PROG, 40 marks): a Python practical with functions,
// arrays and a file; and an object-oriented practical. Every output is from a real run.
import { concept, P, EXAM, checkExam, ZIM, chk, same, mdTable, codeBlock, py } from "../lib.mjs";
import { pm, pyTmp } from "../tables/w4b-q.mjs";

const Z = { skill: EXAM.ZIM_P2_PROG.skill, secs: EXAM.ZIM_P2_PROG.secs, examStyle: true, applies: ZIM, paper: "ZIMSEC Paper 2 Section B" };
const C = (k) => `acs.${k}`;

concept(C("skills.python-practical"), { file: "exam/w4b-zimsec", keyPrefix: "exam.w4b-zimsec", applies: ZIM }, (b) => {
  // ================================================================== ITEM 1: functions, a list and a file (grain depot)
  {
    const bags = [34, 28, 41, 19, 52, 47, 30];
    // trace of the pseudocode (JS mirror)
    let max = bags[0], maxDay = 1, total = bags[0];
    const snap = {};
    for (let day = 2; day <= 7; day++) {
      total += bags[day - 1];
      if (bags[day - 1] > max) { max = bags[day - 1]; maxDay = day; }
      snap[day] = { total, max, maxDay };
    }
    same([snap[3].total, snap[3].max, snap[3].maxDay], [103, 41, 3]);
    same([snap[5].total, snap[5].max, snap[5].maxDay], [174, 52, 5]);
    same([total, max, maxDay], [251, 52, 5]);
    const pseudo = `Max ← Bags[1]
MaxDay ← 1
Total ← Bags[1]
FOR Day ← 2 TO 7
    Total ← Total + Bags[Day]
    IF Bags[Day] > Max THEN
        Max ← Bags[Day]
        MaxDay ← Day
    ENDIF
NEXT Day`;
    const model = `def read_bags(filename):
    bags = []
    try:
        with open(filename) as f:
            for line in f:
                bags.append(int(line))
    except FileNotFoundError:
        print("File not found")
    return bags


def average(values):
    return sum(values) / len(values)


def busiest_day(values):
    best = 0
    for i in range(1, len(values)):
        if values[i] > values[best]:
            best = i
    return best + 1


bags = read_bags("bags.txt")
if len(bags) > 0:
    print("Total:", sum(bags))
    print("Average:", round(average(bags), 1))
    print("Busiest day:", busiest_day(bags))
    print("Days above average:", sum(1 for b in bags if b > average(bags)))`;
    const writeFile = (lines) => (lines === null ? "" : `with open("bags.txt", "w") as f:\n${lines.length ? lines.map((l) => `    print(${l}, file=f)`).join("\n") : "    pass"}\n\n`);
    const runModel = (lines) => pyTmp(`${writeFile(lines)}${model}`).split("\n").filter((l) => l !== "");
    const out = runModel(bags);
    same(out, ["Total: 251", "Average: 35.9", "Busiest day: 5", "Days above average: 3"]);
    const t1 = runModel([10]);
    same(t1, ["Total: 10", "Average: 10.0", "Busiest day: 1", "Days above average: 0"]);
    const t2 = runModel([20, 20, 20]);
    same(t2, ["Total: 60", "Average: 20.0", "Busiest day: 1", "Days above average: 0"]);
    const t3 = runModel(null);
    same(t3, ["File not found"]);
    const t4 = runModel([]);
    same(t4, []);
    const appendCode = `while True:
    text = input("Bags delivered today: ")
    if text.isdigit():
        break
    print("Enter a whole number, 0 or more")
with open("bags.txt", "a") as f:
    print(int(text), file=f)`;
    same(pyTmp(`${appendCode}\nprint(open("bags.txt").read().split())`, "x\n-4\n38"), "Bags delivered today: Enter a whole number, 0 or more\nBags delivered today: Enter a whole number, 0 or more\nBags delivered today: ['38']");
    b.struct({
      ...Z, d: 4,
      concepts: [C("skills.python-practical"), C("prog.procedures-functions"), C("prog.file-processing-exceptions"), C("ds.arrays")],
      hints: ["Follow the pseudocode one day at a time for the trace.", "Test the program with a single value, equal values and no file."],
      stem: `A grain depot in Shurugwi records the number of bags delivered on each day of a week. The seven numbers are stored, one per line, in the text file \`bags.txt\`:\n\n${codeBlock(bags.join("\n"))}\n\nThe manager wants a Python program that reads the file into a list, and outputs the total number of bags, the average per day, the number of the busiest day (the first day if there is a tie) and the number of days above the average. The program must not stop if the file is missing.\n\nAn algorithm to find the busiest day is designed in pseudocode, with the array \`Bags\` holding the seven numbers (indexes 1 to 7).\n\n${codeBlock(pseudo)}`,
      parts: checkExam(EXAM.ZIM_P2_PROG, [
        P.match({ label: "(a)", marks: 4, stem: "Match each variable in the program to the most suitable data type.", pairs: [["The list of bags delivered each day", "List (array) of INTEGER"], ["The number of the busiest day", "INTEGER"], ["The average number of bags per day", "REAL"], ["The name of the file, `bags.txt`", "STRING"]], extraRight: ["BOOLEAN"], explanation: "A list of whole numbers, a whole-number day, an average with a fraction and a name as text." }),
        P.fib({ label: "(b)", marks: 6, stem: "Complete the values of the variables of the pseudocode after the passes of the loop for `Day` = 3 and `Day` = 5.", template: "After Day = 3: Total = {{blank:a}}, Max = {{blank:b}}, MaxDay = {{blank:c}}\n\nAfter Day = 5: Total = {{blank:d}}, Max = {{blank:e}}, MaxDay = {{blank:f}}", blanks: [{ id: "a", input: "number", accepted: [String(snap[3].total)] }, { id: "b", input: "number", accepted: [String(snap[3].max)] }, { id: "c", input: "number", accepted: [String(snap[3].maxDay)] }, { id: "d", input: "number", accepted: [String(snap[5].total)] }, { id: "e", input: "number", accepted: [String(snap[5].max)] }, { id: "f", input: "number", accepted: [String(snap[5].maxDay)] }], wrong: [["34", "34", "1", "34", "34", "1"]], explanation: "After day 3: 34 + 28 + 41 = 103, the largest so far is 41 on day 3. After day 5: 103 + 19 + 52 = 174, and the largest is 52 on day 5." }),
        P.manual({ label: "(c)", marks: 10, stem: "Write a Python program that does what the manager wants. Use a function `read_bags(filename)` that returns the list of numbers and outputs `File not found` if the file is missing, a function `average(values)`, and a function `busiest_day(values)` that returns the day number.", points: ["A function read_bags with a parameter and an empty list to hold the numbers", "Opens the file and reads every line, converting each to an integer, and adds it to the list", "Handles a missing file with try and except FileNotFoundError, outputs File not found and still returns the list", "A function average that divides the total by the number of values and returns it", "A function busiest_day that loops through the list comparing each value with the largest so far", "busiest_day uses a strict comparison so the first of equal days is kept, and returns the day number (index + 1)", "The main program calls read_bags and tests that the list is not empty before calculating", "Outputs the total with a suitable message", "Outputs the average and the busiest day with messages", "Counts the days above the average with a loop or a comprehension and outputs the count"], modelAnswer: codeBlock(model, "python"), explanation: "Functions for the three jobs, an exception handler for the file and a test for an empty list." }),
        P.group({ label: "(d)", stem: "The program from part (c) is run with the file `bags.txt` above. State each line of output.", parts: out.map((line, i) => P.short({ label: `(${["i", "ii", "iii", "iv"][i]})`, marks: 1, stem: `Line ${i + 1} of the output.`, accepted: [line], normalise: ["trim", "collapse_whitespace"], explanation: ["34 + 28 + 41 + 19 + 52 + 47 + 30 = 251.", "251 ÷ 7 = 35.857, which rounds to 35.9.", "The largest number is 52, on day 5.", "The days above 35.857 are the days with 41, 52 and 47: three days."][i] })) }),
        P.fib({ label: "(e)", marks: 6, stem: "The program is tested with other files. Complete the expected results.", template: "File holding only 10: the average output is {{blank:a}}\n\nFile holding 20, 20, 20: the busiest day output is {{blank:b}}\n\nFile holding 20, 20, 20: the number of days above the average is {{blank:c}}\n\nFile holding only 10: the number of days above the average is {{blank:d}}\n\nFile missing: the number of lines output is {{blank:e}}\n\nFile exists but is empty: the number of lines output is {{blank:f}}", blanks: [{ id: "a", input: "number", accepted: ["10"] }, { id: "b", input: "number", accepted: ["1"] }, { id: "c", input: "number", accepted: ["0"] }, { id: "d", input: "number", accepted: ["0"] }, { id: "e", input: "number", accepted: [String(t3.length)] }, { id: "f", input: "number", accepted: [String(t4.length)] }], wrong: [["0", "3", "3", "1", "0", "4"]], explanation: "One value of 10 gives the average 10.0 and no day above it. Equal values keep the first day (1), and none is above the average. A missing file outputs one line (File not found); an empty file outputs nothing because the list is empty." }),
        P.manual({ label: "(f)", marks: 5, stem: "Write the Python statements that ask the user for today's number of bags, repeat the request until a whole number of 0 or more is typed, and then add the number as a new line at the end of `bags.txt`.", points: ["A loop that repeats until a valid value is entered", "Reads the input and tests that it is a whole number of 0 or more (for example isdigit())", "Outputs a message when the input is not valid", "Opens bags.txt in append mode", "Writes the number as a new line and closes the file"], modelAnswer: codeBlock(appendCode, "python"), explanation: "Validation, then append mode." }),
        P.manual({ label: "(g)", marks: 5, stem: "The depot later wants to store the deliveries of several depots for a whole year. Discuss two limitations of storing this data in text files and why a database would be better.", points: ["A text file has to be read from the beginning to find a record, which is slow when there is a lot of data", "There is no way to link or query the data by depot, month or day without writing code for every question", "Several users cannot safely change the same file at the same time", "A database stores the data in related tables with validation and keys, which reduces duplication and errors", "A database allows queries (for example SQL) to answer new questions without changing the program"], modelAnswer: "A text file must be read from the beginning to find data, which is slow with a lot of data, and there is no way to query the data by depot or month without writing new code. Several users cannot safely change one file at the same time. A database stores the data in related tables with keys and validation, supports many users, and answers new questions with queries such as SQL.", explanation: "Files suit small data; databases suit large, shared, related data." }),
      ]),
      explanation: "Trace: total 103, max 41 on day 3 after three days, then 174, 52 on day 5; the program outputs Total 251, Average 35.9, Busiest day 5 and 3 days above average.",
    });
  }

  // ================================================================== ITEM 2: object-oriented practical (savings club)
  {
    const accountCls = `class Account:
    def __init__(self, owner, balance):
        self.__owner = owner
        self.__balance = balance

    def get_balance(self):
        return self.__balance

    def deposit(self, amount):
        if amount > 0:
            self.__balance = self.__balance + amount
            return True
        return False

    def withdraw(self, amount):
        if 0 < amount <= self.__balance:
            self.__balance = self.__balance - amount
            return True
        return False`;
    const savingsCls = `class SavingsAccount(Account):
    def __init__(self, owner, balance, rate):
        super().__init__(owner, balance)
        self.__rate = rate

    def add_interest(self):
        self.deposit(round(self.get_balance() * self.__rate, 2))`;
    const mainO = `a = Account("Tendai", 100)
print(a.deposit(50))
print(a.withdraw(300))
print(a.withdraw(30))
print(a.get_balance())
s = SavingsAccount("Rudo", 200, 0.05)
s.add_interest()
print(s.deposit(-10))
print(s.get_balance())`;
    const full = [accountCls, savingsCls, mainO].join("\n\n");
    const out = py(full).split("\n");
    same(out, ["True", "False", "True", "120", "False", "210.0"]);
    const ev = (expr, pre = "") => py([accountCls, savingsCls, `${pre}\nprint(${expr})`].join("\n\n"));
    const tests = [
      ev('a.deposit(0)', 'a = Account("T", 10)'),
      ev('a.withdraw(100)', 'a = Account("T", 100)'),
      ev('a.get_balance()', 'a = Account("T", 100)\na.withdraw(100)'),
      ev('s.get_balance()', 's = SavingsAccount("R", 80, 0.1)\ns.add_interest()'),
      ev('a.withdraw(-5)', 'a = Account("T", 50)'),
      ev('a.get_balance()', 'a = Account("T", 10)\na.deposit(25.5)'),
    ];
    same(tests, ["False", "True", "0", "88.0", "False", "35.5"]);
    const fixedCls = `class FixedAccount(Account):
    def withdraw(self, amount):
        return False`;
    same(py([accountCls, fixedCls, `accounts = [Account("A", 100), FixedAccount("B", 100)]
print([x.withdraw(20) for x in accounts])`].join("\n\n")), "[True, False]");
    b.struct({
      ...Z, d: 5,
      concepts: [C("prog.oop-programming"), C("prog.oop-concepts"), C("skills.python-practical")],
      hints: ["Keep the balance private and change it only through the methods.", "A subclass calls the superclass constructor first."],
      stem: "A savings club in Chiredzi wants a program to manage the accounts of its members. An account has an owner and a balance. A deposit is accepted only when the amount is greater than zero. A withdrawal is accepted only when the amount is greater than zero and not more than the balance. Each of these methods returns `True` when it was accepted and `False` otherwise. A savings account is an account that also has an interest rate and a method `add_interest` that adds the balance multiplied by the rate (rounded to 2 decimal places) as a deposit. The program is written in Python with private properties.",
      parts: checkExam(EXAM.ZIM_P2_PROG, [
        P.match({ label: "(a)", marks: 4, stem: "Match each object-oriented term to the item of the design that it describes.", pairs: [["Superclass", "Account"], ["Subclass", "SavingsAccount"], ["Private property", "The balance of an account"], ["Method that only the subclass has", "add_interest"]], extraRight: ["deposit"], explanation: "Account is the superclass, SavingsAccount inherits from it, the balance is private, and add_interest is added in the subclass." }),
        P.manual({ label: "(b)", marks: 8, stem: "Write the Python class `Account` with a constructor that sets the owner and balance as private properties, a method `get_balance`, a method `deposit(amount)` and a method `withdraw(amount)` that follow the rules above.", points: ["Class header and a constructor with owner and balance parameters", "Owner and balance stored as private properties", "get_balance returns the balance", "deposit tests that the amount is greater than zero", "deposit adds the amount to the balance and returns True, otherwise False", "withdraw tests that the amount is greater than zero and not more than the balance", "withdraw subtracts the amount and returns True, otherwise False", "Methods use self and the private property correctly"], modelAnswer: codeBlock(accountCls, "python"), explanation: "Validation lives in the methods, so the balance can never become invalid." }),
        P.manual({ label: "(c)", marks: 8, stem: "Write the Python class `SavingsAccount` as a subclass of `Account`, with a constructor that takes the owner, the balance and the interest rate, and the method `add_interest`. `add_interest` must use the `deposit` method.", points: ["Class header showing inheritance from Account", "Constructor with owner, balance and rate parameters", "Calls the superclass constructor with the owner and the balance", "Stores the rate as a private property of the subclass", "add_interest is a method of SavingsAccount", "Calculates the balance multiplied by the rate using get_balance", "Rounds the interest to 2 decimal places", "Adds the interest by calling deposit"], modelAnswer: codeBlock(savingsCls, "python"), explanation: "The subclass reuses the superclass methods instead of touching the private balance." }),
        P.group({ label: "(d)", stem: `The classes from parts (b) and (c) are correct. This main program is run.\n\n${codeBlock(mainO, "python")}\n\nState each line of output.`, parts: out.map((line, i) => P.short({ label: `(${["i", "ii", "iii", "iv", "v", "vi"][i]})`, marks: 1, stem: `Line ${i + 1} of the output.`, accepted: [line], normalise: ["trim", "collapse_whitespace"], explanation: ["The deposit of 50 is accepted.", "The withdrawal of 300 is more than the balance of 150.", "The withdrawal of 30 is accepted.", "150 - 30 = 120.", "The deposit of -10 is not greater than zero, so it is refused.", "The interest is 200 × 0.05 = 10.0, so the balance is 210.0."][i] })) }),
        P.fib({ label: "(e)", marks: 6, stem: "The classes are tested. Complete the expected result of each test.", template: "An account with balance 10: deposit(0) returns {{blank:a}}\n\nAn account with balance 100: withdraw(100) returns {{blank:b}}\n\nThe balance of that account afterwards is {{blank:c}}\n\nA savings account with balance 80 and rate 0.1, after add_interest, has balance {{blank:d}}\n\nAn account with balance 50: withdraw(-5) returns {{blank:e}}\n\nAn account with balance 10 after deposit(25.5) has balance {{blank:f}}", blanks: [{ id: "a", accepted: [tests[0]], choices: ["True", "False"] }, { id: "b", accepted: [tests[1]], choices: ["True", "False"] }, { id: "c", input: "number", accepted: [tests[2]] }, { id: "d", input: "number", accepted: [tests[3]] }, { id: "e", accepted: [tests[4]], choices: ["True", "False"] }, { id: "f", input: "number", accepted: [tests[5]] }], wrong: [["True", "False", "100", "80", "True", "10"]], explanation: "A deposit of 0 is refused; a withdrawal equal to the balance is allowed and leaves 0; the interest on 80 at 0.1 is 8.0, giving 88.0; a negative withdrawal is refused; 10 + 25.5 = 35.5." }),
        P.manual({ label: "(f)", marks: 4, stem: "Explain why the balance is a private property that can be changed only through the methods.", points: ["Private data cannot be changed directly by other parts of the program", "All changes pass through deposit and withdraw, which check the amount", "So the balance cannot become invalid (for example negative) by mistake", "A fault in the rules can be corrected in one place"], modelAnswer: "A private property cannot be changed directly by other parts of the program. Every change must pass through deposit or withdraw, which check the amount, so the balance cannot become invalid by mistake, and any fault in the rules is corrected in one place.", explanation: "Encapsulation protects the data." }),
        P.manual({ label: "(g)", marks: 4, stem: "The club adds a `FixedAccount` from which withdrawals are never allowed. Describe how the class is written and how a list of both kinds of account can be processed without testing the class of each object.", points: ["FixedAccount inherits from Account", "It overrides withdraw so that it always returns False", "A loop can call withdraw on every object in one list", "Each object uses the version of withdraw from its own class (polymorphism)"], modelAnswer: "FixedAccount inherits from Account and overrides withdraw so that it always returns False. A loop can call withdraw on every object in a list, and each object uses the version from its own class, which is polymorphism.", explanation: "Overriding and polymorphism." }),
      ]),
      explanation: "Account validates deposits and withdrawals, SavingsAccount inherits and uses deposit for interest; the program outputs True, False, True, 120, False and 210.0.",
    });
  }
});
