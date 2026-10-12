// Slice w4b: file processing and exception handling (acs.prog.file-processing-exceptions, Cambridge only).
import { concept, P, chk, same, mdTable, codeBlock } from "../lib.mjs";
import { mc, pm, pyTmp } from "../tables/w4b-q.mjs";

concept("acs.prog.file-processing-exceptions", { file: "prog/file-processing-exceptions", keyPrefix: "prog.file-processing-exceptions" }, (b) => {
  // ---- computed: stock program
  const stockCode = `low = 0
with open("stock.txt", "w") as f:
    print("Soap,12", file=f)
    print("Bread,5", file=f)
    print("Milk,0", file=f)
    print("Eggs,x", file=f)
with open("stock.txt") as f:
    for line in f:
        item, qty = line.strip().split(",")
        try:
            qty = int(qty)
        except ValueError:
            print("Bad quantity for", item)
            continue
        if qty < 6:
            print("Reorder", item)
            low = low + 1
print("Low items:", low)`;
  const stockOut = pyTmp(stockCode).split("\n");
  same(stockOut, ["Reorder Bread", "Reorder Milk", "Bad quantity for Eggs", "Low items: 2"]);

  // ---- lines in a file after a sequence of operations
  const linesCode = `with open("log.txt", "w") as f:
    print("a", file=f)
    print("b", file=f)
    print("c", file=f)
with open("log.txt", "a") as f:
    print("d", file=f)
    print("e", file=f)
with open("log.txt", "w") as f:
    print("f", file=f)
with open("log.txt", "a") as f:
    print("g", file=f)
with open("log.txt") as f:
    print(len(f.readlines()))`;
  const linesOut = Number(pyTmp(linesCode));
  chk(linesOut, 2);

  // ---- record positions
  const size = 24;
  chk(7 * size, 168); chk(40 * size, 960); chk((7 - 1) * size, 144);

  // ---- multiple choice
  mc(b, 2, "RECALL", "Which file mode adds new data to the end of a text file and keeps the existing data?",
    ["`APPEND`", "New records are added after the last one."],
    [["`WRITE`", "WRITE mode replaces the existing contents."], ["`READ`", "READ mode does not allow writing."], ["`RANDOM`", "RANDOM allows direct access to any record."]],
    "Append adds to the end of a file.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "A program opens an existing file in `WRITE` mode and writes one line. What happens to the old contents?",
    ["They are removed and replaced by the new line", "Write mode starts with an empty file."],
    [["They stay, and the new line is added at the end", "That is append mode."], ["They stay, and the new line is added at the start", "Neither mode inserts at the start."], ["The program stops with an error", "Opening an existing file for writing is allowed."]],
    "WRITE mode overwrites the existing contents.", { daily: true });
  mc(b, 2, "RECALL", "What does the function `EOF(\"Marks.txt\")` return when the last line has been read?",
    ["`TRUE`", "There is no more data to read."],
    [["`FALSE`", "That is the value while data remains."], ["The last line of the file", "EOF returns a Boolean, not a line."], ["The number of lines", "EOF does not count lines."]],
    "EOF is TRUE at the end of the file.", { daily: true });
  mc(b, 3, "UNDERSTANDING", "Why can a record in a random file be reached faster than a record in a serial file?",
    ["The position of a record is calculated and the program jumps to it", "No records before it have to be read."],
    [["The records of a random file are stored in key order", "That describes a sequential file."], ["A random file stores each record in a separate file", "All records are in one file."], ["Random files are stored in main memory", "They are stored on backing storage."]],
    "Fixed-length records let the program calculate the position and use SEEK.", { hints: ["How does the program find the start of record number 50?"] });
  mc(b, 3, "ANALYSIS", "Which is the best use of exception handling?",
    ["Reacting to a file that does not exist when the program tries to open it", "The file's existence is outside the program's control."],
    [["Testing whether a counter is greater than zero before a division you control", "A simple IF test is clearer here."], ["Replacing every IF statement in the program", "Exceptions are for unusual events."], ["Making a loop run one more time", "Loops are controlled by conditions."]],
    "Use exceptions for events outside the program's control.", { hints: ["Which event can the programmer not check beforehand?"] });
  mc(b, 3, "APPLICATION", "In the Python statement block `try: ... except ValueError: ... finally: ...`, when does the `finally` block run?",
    ["Whether or not an exception occurred", "It is used for clean-up that must always happen."],
    [["Only when an exception occurred", "That is the except block."], ["Only when no exception occurred", "It also runs after an exception."], ["Only the first time the program is run", "It runs each time the try block is left."]],
    "finally always runs.", { hints: ["What is closing a file an example of?"] });
  mc(b, 2, "UNDERSTANDING", "Why should a file always be closed when the program has finished with it?",
    ["Data may still be held in a buffer and not yet saved", "Closing completes the write."],
    [["Closing deletes the file from the disk", "A file is not deleted by closing."], ["An open file cannot be copied to another computer", "The reason is data, not copying."], ["Closing changes the file's mode to random", "Closing does not change the mode."]],
    "Closing a file saves the data and releases the file.");

  // ---- true / false
  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "A sequential file stores its records in the order of a key field.", answer: true,
    explanation: "True. A serial file is in the order of arrival, a sequential file in key order." });
  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "If a handler for `FileNotFoundError` is written, the program can carry on after the file is found to be missing.", answer: true,
    explanation: "True. The except block deals with the problem (for example by showing a message), and the program continues after the try statement." });

  // ---- fib, num, short, match
  b.fib({ d: 3, skill: "APPLICATION", hints: ["The loop must stop at the end of the file."],
    stem: "Complete the pseudocode that outputs every line of the file `Stock.txt`.",
    template: "{{blank:a}} \"Stock.txt\" FOR READ\n\nWHILE NOT {{blank:b}}(\"Stock.txt\") DO\n\n    {{blank:c}} \"Stock.txt\", Line\n\n    OUTPUT Line\n\nENDWHILE\n\n{{blank:d}} \"Stock.txt\"",
    blanks: [{ id: "a", accepted: ["OPENFILE"], choices: ["OPENFILE", "CLOSEFILE", "READFILE", "EOF"] }, { id: "b", accepted: ["EOF"], choices: ["OPENFILE", "CLOSEFILE", "READFILE", "EOF"] }, { id: "c", accepted: ["READFILE"], choices: ["OPENFILE", "CLOSEFILE", "READFILE", "EOF"] }, { id: "d", accepted: ["CLOSEFILE"], choices: ["OPENFILE", "CLOSEFILE", "READFILE", "EOF"] }],
    explanation: "Open the file, loop until EOF, read each line, then close the file." });
  b.num({ d: 4, skill: "APPLICATION", calculator: false, hints: ["Write mode removes the old contents; append mode keeps them."],
    stem: "A Python program carries out these steps on the file `log.txt`, which does not exist at first.\n\n" + codeBlock(linesCode, "python") + "\nState the number printed by the last statement.",
    value: linesOut, wrong: [7, 1], workedSolution: "After the first block the file has 3 lines; appending adds 2 (5 lines). Writing again empties the file and puts in 1 line. Appending adds 1 more: 2 lines.", explanation: "The second write removed the first five lines, so 2 lines remain." });
  b.num({ d: 3, skill: "APPLICATION", calculator: false, hints: ["Position = record number × record size, counting from 0."],
    stem: "A random file has fixed-length records of 32 bytes. The first record is record number 0. At which byte position does record number 5 start?",
    value: 160, unit: "bytes", wrong: [128, 5], workedSolution: "5 × 32 = 160.", explanation: "Record 5 starts at byte 160." });
  b.short({ d: 2, skill: "RECALL", stem: "State the pseudocode statement that moves to a given record in a random file.", accepted: ["SEEK", "seek"], wrong: ["MOVE"], explanation: "SEEK moves to the address of a record." });
  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each pseudocode statement to its purpose.",
    pairs: [["`OPENFILE`", "Prepares a file for reading, writing or appending"], ["`READFILE`", "Reads one line or record from a file"], ["`WRITEFILE`", "Writes data to a file"], ["`EOF`", "Tests whether the end of the file has been reached"], ["`CLOSEFILE`", "Finishes with the file and saves the data"]],
    explanation: "The five basic file statements." });

  // ---- self-marked
  b.manualShort({ d: 4, skill: "CREATION", marks: 5, hints: ["Open, loop until EOF, convert and add, close, then output."],
    stem: "A text file `Sales.txt` holds one whole number on each line. Write pseudocode that reads the file and outputs the total of the numbers. [5]",
    points: ["Opens the file for reading with OPENFILE", "A loop that repeats until EOF is true", "Reads each line with READFILE inside the loop", "Converts the line to a number and adds it to a total that was set to 0 before the loop", "Closes the file and outputs the total"],
    modelAnswer: codeBlock(`Total ← 0
OPENFILE "Sales.txt" FOR READ
WHILE NOT EOF("Sales.txt") DO
    READFILE "Sales.txt", Line
    Total ← Total + STR_TO_NUM(Line)
ENDWHILE
CLOSEFILE "Sales.txt"
OUTPUT "Total: ", Total`), explanation: "A standard file-totalling routine." });
  b.manualShort({ d: 4, skill: "CREATION", marks: 4, hints: ["Put int(input()) in a try block."],
    stem: "Write a Python program that reads a whole number from the keyboard and outputs the number doubled. If the user types something that is not a whole number, it outputs `Not a whole number` instead of stopping. [4]",
    points: ["Uses try and except", "Converts the input to an integer inside the try block", "Outputs the doubled number when the conversion works", "Handles ValueError by outputting the message"],
    modelAnswer: codeBlock(`try:
    number = int(input())
    print(number * 2)
except ValueError:
    print("Not a whole number")`, "python"), explanation: "The try block holds the code that can fail." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 3, hints: ["Say what the program does when the exception is not handled and when it is."],
    stem: "Explain why a program that reads a file should use exception handling. [3]",
    points: ["The file may be missing, locked or contain invalid data", "Without handling, the program would stop with an error and data could be lost", "With handling, the program can report the problem and continue or close safely"],
    modelAnswer: "The file may be missing or contain invalid data. Without handling the program would stop with an error, but with exception handling it can report the problem, close files safely and carry on.", explanation: "Exceptions give controlled recovery." });
  b.manualShort({ d: 4, skill: "ANALYSIS", marks: 4, hints: ["Compare how a record is stored and how it is found."],
    stem: "Compare serial, sequential and random files. [4]",
    points: ["Serial: records in the order they were added, found by reading from the start", "Sequential: records in key order, processed in that order", "Random: fixed-length records, any record reached directly with its calculated position", "Random access is quicker for finding one record; serial and sequential are simpler and suit processing every record"],
    modelAnswer: "A serial file stores records in the order they were added and is searched from the start. A sequential file stores them in key order. A random file has fixed-length records so one record can be reached directly. Random access is faster for one record, while serial and sequential files suit processing every record.", explanation: "Order, access and use." });

  // ---- structured practice
  b.struct({ d: 4, skill: "ANALYSIS", examStyle: true, calculator: false, hints: ["Dry run the loop for each line.", "Which line makes int() fail?"],
    explanation: "Reading a stock file with an exception handler.",
    stem: `A tuck shop in Marondera stores its stock in a text file. This Python program was run.\n\n${codeBlock(stockCode, "python")}`,
    parts: [
      P.short({ label: "(a)", marks: 1, stem: "State the first line of output.", accepted: [stockOut[0]], normalise: ["trim", "collapse_whitespace"], explanation: "Soap has 12, which is not below 6; Bread has 5, so Reorder Bread comes first." }),
      P.num({ label: "(b)", marks: 1, stem: "State the number printed after `Low items:`.", value: 2, wrong: [3, 1], workedSolution: "Bread (5) and Milk (0) are below 6. Eggs is skipped because its quantity is not a number.", explanation: "Two items are low." }),
      P.short({ label: "(c)", marks: 1, stem: "State the name of the item for which the quantity cannot be converted.", accepted: ["Eggs", "eggs"], explanation: "int(\"x\") raises a ValueError for Eggs." }),
      pm("(d)", "What would happen if the `try` and `except` were removed?", ["The program would stop with a ValueError on the line for Eggs", "int(\"x\") cannot be converted and the error would not be handled."], [["The program would skip Eggs and continue", "Python does not skip a failing statement."], ["The program would treat the quantity of Eggs as 0", "No automatic conversion takes place."], ["The program would output Low items: 3", "It stops before the final output."]], "An unhandled exception stops the program."),
      P.manual({ label: "(e)", marks: 2, stem: "Explain the purpose of the `continue` statement in the `except` block.", points: ["It skips the rest of the loop body for this line", "So that the invalid quantity is not compared with 6 or counted as a low item"], modelAnswer: "It skips the rest of the loop body for this line, so the invalid quantity is not compared with 6 or counted.", explanation: "Continue moves to the next line of the file." }),
      P.manual({ label: "(f)", marks: 2, stem: "Write the Python statements that add the record `Rice,20` to the end of `stock.txt` without removing the existing records.", points: ["Opens stock.txt in append mode (\"a\")", "Writes the line Rice,20 to the file (and the file is closed, for example by using with)"], modelAnswer: codeBlock(`with open("stock.txt", "a") as f:
    print("Rice,20", file=f)`, "python"), explanation: "Append mode keeps the existing records." }),
    ] });
  b.struct({ d: 4, skill: "APPLICATION", examStyle: true, calculator: false, hints: ["Position = (record number - 1) × record size when the first record is number 1."],
    explanation: "Positions and sizes in a random file.",
    stem: "A clinic in Gweru stores patient records in a random file. Every record is exactly 24 bytes long. The first record is record number 0.",
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "State the byte position at which record number 7 starts.", value: 168, wrong: [144, 7], unit: "bytes", workedSolution: "7 × 24 = 168.", explanation: "Record 7 starts at byte 168." }),
      P.num({ label: "(b)", marks: 1, stem: "The file holds 40 records. State its size in bytes.", value: 960, wrong: [24, 1000], unit: "bytes", workedSolution: "40 × 24 = 960.", explanation: "The file is 960 bytes." }),
      P.num({ label: "(c)", marks: 1, stem: "A different system numbers its records from 1 instead of 0. State the byte position at which record number 7 starts in that system.", value: 144, wrong: [168, 7], unit: "bytes", workedSolution: "(7 - 1) × 24 = 144.", explanation: "Record 7 is the seventh record, so six records come before it." }),
      P.manual({ label: "(d)", marks: 3, stem: "Write pseudocode that reads record number 7 from the file `Patients.dat` into a variable `Patient` of the record type `PatientRecord` and outputs its field `Name`.", points: ["OPENFILE \"Patients.dat\" FOR RANDOM", "SEEK to the address of record 7, then GETRECORD into Patient", "OUTPUT Patient.Name and CLOSEFILE"], modelAnswer: codeBlock(`DECLARE Patient : PatientRecord
OPENFILE "Patients.dat" FOR RANDOM
SEEK "Patients.dat", 7
GETRECORD "Patients.dat", Patient
OUTPUT Patient.Name
CLOSEFILE "Patients.dat"`), explanation: "Open, seek, get, use, close." }),
    ] });

  // ---- flashcards
  b.card("FACT", "File modes", "READ: file must exist. WRITE: creates or empties the file. APPEND: adds to the end. RANDOM: any record can be read or written.");
  b.card("FACT", "File statements", "OPENFILE name FOR mode; READFILE name, Var; WRITEFILE name, Data; EOF(name); CLOSEFILE name.");
  b.card("CONCEPT", "Reading a whole file", "Open for READ, WHILE NOT EOF(file) read and process each line, then CLOSEFILE.");
  b.card("DEFINITION", "Serial file", "Records stored in the order they were added.");
  b.card("DEFINITION", "Sequential file", "Records stored in the order of a key field.");
  b.card("DEFINITION", "Random file", "Fixed-length records; any record is reached directly with SEEK, GETRECORD and PUTRECORD.");
  b.card("FORMULA", "Position in a random file", "Byte position = record number × record size (records numbered from 0); subtract 1 from the record number if numbering starts at 1.");
  b.card("DEFINITION", "Exception", "An event that disrupts normal flow, such as a missing file, invalid conversion or division by zero.");
  b.card("CONCEPT", "TRY, EXCEPT, FINALLY", "try: code that may fail; except: the response to a named exception; finally: clean-up that always runs.");
});
