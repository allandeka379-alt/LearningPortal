// Slice w4a: text files (acs.ds.text-files, both boards).
import { concept, P, chk, same, mdTable, codeBlock, py } from "../lib.mjs";
import { mc, pm } from "../tables/w4a-q.mjs";

// run Python in a temporary folder so that no file is left behind
const inTemp = (code) => py(`import os, tempfile\nos.chdir(tempfile.mkdtemp())\n${code}`);

concept("acs.ds.text-files", { file: "ds/text-files", keyPrefix: "ds.text-files" }, (b) => {
  const ages = [34, 12, 51, 8, 27, 45];
  const adults = ages.filter((a) => a >= 18);
  const adultTotal = adults.reduce((x, y) => x + y, 0);
  chk(adults.length, 4); chk(adultTotal, 157);
  const scoresPy = `with open("scores.txt", "w") as f:
    print(12, file=f)
    print(15, file=f)
with open("scores.txt", "a") as f:
    print(9, file=f)
with open("scores.txt", "r") as f:
    total = 0
    for line in f:
        total = total + int(line)
print(total)
with open("scores.txt", "w") as f:
    print(20, file=f)
with open("scores.txt", "r") as f:
    print(f.read().strip())`;
  same(inTemp(scoresPy), "36\n20");
  const temps = [21, 25, 19, 30, 24];
  const hot = temps.filter((t) => t > 22).length; chk(hot, 3);
  const tTotal = temps.reduce((x, y) => x + y, 0); chk(tTotal, 119);
  const visitorPseudo = `DECLARE Line : STRING
DECLARE Age, Adults, Total : INTEGER
Adults ← 0
Total ← 0
OPENFILE "visitors.txt" FOR READ
WHILE NOT EOF("visitors.txt") DO
    READFILE "visitors.txt", Line
    Age ← STR_TO_NUM(Line)
    IF Age >= 18 THEN
        Adults ← Adults + 1
        Total ← Total + Age
    ENDIF
ENDWHILE
CLOSEFILE "visitors.txt"
OUTPUT Adults, Total`;

  // ---- multiple choice
  mc(b, 2, "RECALL", "Why do programs store data in files?",
    ["So that the data is kept after the program ends", "Correct: it persists on secondary storage."],
    [["So that the data can be processed faster than in memory", "Files on a disk are slower than memory."], ["So that the program needs no variables", "Variables are still needed to process the data."], ["So that the data is automatically sorted", "A file does not sort its contents."]],
    "Data in variables is lost when the program ends.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "A file already holds 20 lines. What happens when it is opened for writing and one line is written?",
    ["The old lines are erased, leaving only the new line", "Correct."],
    [["The new line is added after the 20 lines that are there", "That is the effect of append mode."], ["The new line is inserted at the start and the others stay as they were", "Write mode does not insert."], ["An error occurs because the file exists", "Opening an existing file for write is allowed."]],
    "Write mode starts with an empty file.", { daily: true });
  mc(b, 2, "RECALL", "Which file mode adds new lines to the end of a file and keeps the existing lines?",
    ["Append", "Correct."],
    [["Read", "Read mode cannot add anything."], ["Write", "Write mode erases the existing lines."], ["Close", "Close is not a mode."]],
    "Append keeps the contents and adds to the end.");
  mc(b, 2, "UNDERSTANDING", "What does the function `EOF(\"marks.txt\")` return when every line of the file has been read?",
    ["TRUE", "Correct: the end of the file has been reached."],
    [["FALSE", "FALSE means that there are still lines to read."], ["0", "EOF returns a Boolean value."], ["The last line of the file", "EOF tests for the end; it does not return data."]],
    "EOF is TRUE at the end of the file.");
  mc(b, 3, "APPLICATION", "A line read from a text file holds the characters `58`. Which statement adds it to `Total`?",
    ["`Total ← Total + STR_TO_NUM(Line)`", "Correct: the string is converted to a number first."],
    [["`Total ← Total + Line`", "A string cannot be added to a number."], ["`Total ← Total + NUM_TO_STR(Line)`", "This converts in the wrong direction."], ["`Total ← Line`", "This would replace the total."]],
    "Everything read from a text file is a string.", { hints: ["What is the data type of a line read from a file?"] });
  mc(b, 3, "ANALYSIS", "A program writes results to a file but does not close the file. Which problem may occur?",
    ["Some data may not be saved", "Correct: it may still be in a buffer."],
    [["The program will not translate into machine code", "A missing close does not cause a translation error."], ["The data in the file will be sorted into order", "Closing does not sort data."], ["The file will be deleted from the disk at once", "The file is not deleted."]],
    "Closing writes any buffered data and releases the file.", { hints: ["Where is the data held before it reaches the disk?"] });
  mc(b, 3, "APPLICATION", "Which Python statement opens `log.txt` so that a new line can be added to the end without losing the existing lines?",
    ["`open(\"log.txt\", \"a\")`", "Correct: \"a\" is append mode."],
    [["`open(\"log.txt\", \"r\")`", "\"r\" opens the file for reading only."], ["`open(\"log.txt\", \"w\")`", "\"w\" erases the existing contents."], ["`open(\"log.txt\")`", "With no mode the file is opened for reading."]],
    "Append mode is \"a\".", { hints: ["Which mode keeps the contents?"] });
  mc(b, 3, "UNDERSTANDING", "A file of unknown length is to be read line by line. Which loop is most suitable?",
    ["A loop that runs until the end of the file", "Correct."],
    [["A FOR loop from 1 to 100 with a fixed count", "The file may hold more or fewer lines."], ["A loop that repeats exactly once and then stops", "Only one line would be read."], ["A loop that never reads any lines from the file", "The loop must read the data."]],
    "Use WHILE NOT EOF(…).", { hints: ["How does the program know the file has ended?"] });

  // ---- true / false, matching, fill in the blank
  b.tf({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "Data stored in an array is still available after the computer is switched off and on again.", answer: false,
    explanation: "False. An array is in memory and is lost; data in a file on a disk persists." });
  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "Opening a file for reading when the file does not exist causes an error.", answer: true,
    explanation: "True. There is nothing to read, so the program should check that the file exists first." });
  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each pseudocode statement to its purpose.",
    pairs: [["`OPENFILE`", "Prepares a file for reading, writing or appending"], ["`READFILE`", "Reads the next line of the file into a variable"], ["`WRITEFILE`", "Writes a line of text to the file"], ["`CLOSEFILE`", "Finishes with the file and saves the data"], ["`EOF`", "Tests whether all the lines have been read"]],
    explanation: "The five file statements of the pseudocode guide." });
  b.fib({ d: 3, skill: "APPLICATION", hints: ["Open, loop until the end, read, then finish with the matching close."],
    stem: "Complete the pseudocode that outputs every line of `names.txt`.",
    template: "OPENFILE \"names.txt\" FOR {{blank:a}}\n\nWHILE NOT {{blank:b}}(\"names.txt\") DO\n\n{{blank:c}} \"names.txt\", Name\n\nOUTPUT Name\n\nENDWHILE\n\n{{blank:d}} \"names.txt\"",
    blanks: [
      { id: "a", accepted: ["READ"], choices: ["READ", "WRITE", "APPEND", "CLOSE"] },
      { id: "b", accepted: ["EOF"], choices: ["EOF", "READFILE", "LENGTH", "END"] },
      { id: "c", accepted: ["READFILE"], choices: ["READFILE", "WRITEFILE", "OPENFILE", "INPUT"] },
      { id: "d", accepted: ["CLOSEFILE"], choices: ["CLOSEFILE", "OPENFILE", "ENDFILE", "EOF"] },
    ], explanation: "Open for read, loop while not EOF, READFILE each line, CLOSEFILE." });

  // ---- numerical
  b.num({ d: 2, skill: "APPLICATION", calculator: false, stem: "A file contains the lines below. How many times does a loop `WHILE NOT EOF` that reads one line each time execute its body?\n\n" + codeBlock([7, 12, 9, 15].join("\n")), value: 4, wrong: [3, 5], workedSolution: "There is one pass for each of the 4 lines.", explanation: "4 passes." });
  b.num({ d: 3, skill: "APPLICATION", calculator: false, hints: ["Add the five numbers."],
    stem: "The file `temps.txt` contains these lines:\n\n" + codeBlock(temps.join("\n")) + "\nA program reads every line and adds the numbers. State the total.", value: tTotal, wrong: [24, 95], workedSolution: "21 + 25 + 19 + 30 + 24 = 119.", explanation: "119." });
  b.num({ d: 3, skill: "APPLICATION", calculator: false, hints: ["Count the numbers greater than 22."],
    stem: "The file `readings.txt` contains these lines:" + "\n\n" + codeBlock([16, 28, 17, 31, 26, 23].join("\n")) + "\nHow many of the numbers are greater than 22?", value: 4, wrong: [2, 3], workedSolution: "28, 31, 26 and 23 are greater than 22.", explanation: "4 numbers." });
  b.num({ d: 3, skill: "APPLICATION", calculator: false, hints: ["Write mode erased the file, so count what was written after that."],
    stem: "The file `log.txt` holds 4 lines. A program opens it for append and writes 2 lines, then closes it. State the number of lines in the file.", value: 6, wrong: [2, 8], workedSolution: "Append keeps the 4 lines and adds 2: 6.", explanation: "6 lines." });
  // ---- self-marked
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 3, hints: ["Think about memory and power loss."],
    stem: "Explain why a program that records pupils' marks should store them in a file. [3]",
    points: ["Variables and arrays are held in memory, which is cleared when the program ends or the power is off", "A file on secondary storage keeps the data permanently (persistence)", "The data can be used again later or by another program"],
    modelAnswer: "Data in variables and arrays is lost when the program ends or the power goes off. A file on a disk keeps the data, so it can be used again later or by another program.", explanation: "Persistence." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 2, hints: ["What happens to the existing lines?"], stem: "Describe the difference between opening a file for write and opening it for append. [2]",
    points: ["Write erases any existing contents before writing", "Append keeps the existing contents and adds new data at the end"],
    modelAnswer: "Write erases the existing contents and starts again. Append keeps the existing contents and adds the new data at the end.", explanation: "Erase against keep." });
  b.manualShort({ d: 5, skill: "CREATION", marks: 5, hints: ["Read until EOF and keep a counter and a total.", "Convert each line with STR_TO_NUM."],
    stem: "The file `sales.txt` holds one whole-number amount on each line. Write pseudocode that reads all the lines and outputs the number of lines and the total of the amounts. [5]",
    points: ["Opens the file for reading", "Sets the count and total to 0 before the loop", "A loop that continues while NOT EOF, reading a line each time", "Converts the line to a number, adds it to the total and adds 1 to the count", "Closes the file and outputs the count and total"],
    modelAnswer: codeBlock(`Count ← 0
Total ← 0
OPENFILE "sales.txt" FOR READ
WHILE NOT EOF("sales.txt") DO
    READFILE "sales.txt", Line
    Total ← Total + STR_TO_NUM(Line)
    Count ← Count + 1
ENDWHILE
CLOSEFILE "sales.txt"
OUTPUT Count, Total`), explanation: "Open, loop to EOF, convert and add, close, output." });
  b.manualShort({ d: 4, skill: "CREATION", marks: 4, hints: ["Open for APPEND so the old lines are kept."],
    stem: "A program must add the name stored in `NewName` to the end of the file `visitors.txt` without losing the names already in it. Write the pseudocode. [4]",
    points: ["Opens visitors.txt for APPEND", "Uses WRITEFILE with the file name and NewName", "Closes the file with CLOSEFILE", "Statements are in the order open, write, close"],
    modelAnswer: codeBlock(`OPENFILE "visitors.txt" FOR APPEND
WRITEFILE "visitors.txt", NewName
CLOSEFILE "visitors.txt"`), explanation: "Append keeps the old lines." });

  // ---- structured practice
  b.struct({ d: 5, skill: "APPLICATION", examStyle: true, hints: ["Only ages of 18 or more are counted.", "The file contains six lines."],
    explanation: "Reading a file of ages and counting the adults.",
    stem: "A museum in Bulawayo stores the age of each visitor on a separate line of `visitors.txt`. The file contains the lines 34, 12, 51, 8, 27 and 45. The pseudocode below reads the file.\n\n" + codeBlock(visitorPseudo),
    parts: [
      pm("(a)", "Which file mode is used by the `OPENFILE` statement?", ["Read", "Correct."], [["Write", "Write would erase the visitors."], ["Append", "Append would add to the file."], ["Close", "Close is not a file mode."]], "The program only reads the file."),
      P.num({ label: "(b)", marks: 1, stem: "State how many lines are read.", value: 6, wrong: [4, 5], workedSolution: "The loop runs until EOF, once per line: 6.", explanation: "6 lines." }),
      P.num({ label: "(c)", marks: 1, stem: "State the value of `Adults` that is output.", value: adults.length, wrong: [6, 3], workedSolution: "34, 51, 27 and 45 are at least 18.", explanation: "4 adults." }),
      P.num({ label: "(d)", marks: 1, stem: "State the value of `Total` that is output.", value: adultTotal, wrong: [177, 34], workedSolution: "34 + 51 + 27 + 45 = 157.", explanation: "157." }),
      P.manual({ label: "(e)", marks: 2, stem: "Explain why `STR_TO_NUM` is used on each line.", points: ["Each line read from a text file is a string", "It must be converted to a number before it can be compared with 18 or added to Total"], modelAnswer: "A line read from a text file is a string, so it must be converted into a number before it can be compared with 18 or added to `Total`.", explanation: "Text must be converted." }),
      P.manual({ label: "(f)", marks: 3, stem: "Write pseudocode to write the ages of the adults, one per line, to a new file `adults.txt` (as the adults are found).", points: ["Opens adults.txt for WRITE before the loop", "Uses WRITEFILE with NUM_TO_STR(Age) inside the IF", "Closes adults.txt after the loop"], modelAnswer: codeBlock(`OPENFILE "adults.txt" FOR WRITE
// inside the IF Age >= 18 THEN
WRITEFILE "adults.txt", NUM_TO_STR(Age)
// after the loop
CLOSEFILE "adults.txt"`), explanation: "A second file written inside the loop." }),
    ] });
  b.struct({ d: 3, skill: "ANALYSIS", examStyle: true, hints: ["Trace the file contents after each block.", "Write mode erases the file."],
    explanation: "Tracing the effect of write and append on a file.",
    stem: "The Python program below was run in an empty folder.\n\n" + codeBlock(scoresPy, "python"),
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "State the number of lines in `scores.txt` just before it is read for the first time.", value: 3, wrong: [2, 1], workedSolution: "Write gives 2 lines and append adds 1.", explanation: "3 lines." }),
      P.num({ label: "(b)", marks: 1, stem: "State the first value printed.", value: 36, wrong: [27, 21], workedSolution: "12 + 15 + 9 = 36.", explanation: "36." }),
      P.num({ label: "(c)", marks: 1, stem: "State the second value printed.", value: 20, wrong: [56, 36], workedSolution: "Opening for write erased the file, leaving only 20.", explanation: "20." }),
      pm("(d)", "Why does the file contain only one line at the end?", ["Mode \"w\" erased the old contents", "Correct."], [["The file was not closed after the append had finished", "The `with` statement closes the file."], ["The line 20 replaced the line 9 only, and the rest stayed", "The whole file was erased."], ["Python only keeps the last line that was ever written", "All lines written in one session are kept."]], "Write mode starts with an empty file."),
      P.manual({ label: "(e)", marks: 2, stem: "State the change that would keep the earlier lines and add the line 20 to the file.", points: ["Change the mode of the last write from \"w\" to \"a\" (append)", "So that the line 20 is added after the existing three lines"], modelAnswer: "Open the file with mode \"a\" instead of \"w\", so that 20 is added after the three existing lines.", explanation: "Append instead of write." }),
    ] });

  // ---- flashcards
  b.card("DEFINITION", "Text file", "A file of lines of characters stored on secondary storage; each line ends with an end-of-line marker.");
  b.card("CONCEPT", "Why use files", "Data in memory is lost when the program ends; data in a file persists and can be reused or shared.");
  b.card("CONCEPT", "File steps", "Open (read, write or append), process (read or write lines), close.");
  b.card("FACT", "File modes", "Read: existing data, file must exist. Write: erases old contents. Append: keeps contents and adds to the end.");
  b.card("FACT", "Pseudocode file statements", "OPENFILE f FOR READ|WRITE|APPEND; READFILE f, Var; WRITEFILE f, Text; CLOSEFILE f; EOF(f).");
  b.card("CONCEPT", "Reading to the end", "WHILE NOT EOF(f) DO: READFILE f, Line … ENDWHILE.");
  b.card("CONCEPT", "Python files", "open(name, mode); read(), readline(), write(text); close(); with open(...) as f closes the file automatically.");
  b.card("CONCEPT", "Converting lines", "Lines read are strings: use STR_TO_NUM (int() in Python) before arithmetic and NUM_TO_STR (str()) before writing a number.");
  b.card("CONCEPT", "Why close a file", "Data may be buffered until the file is closed; an open file may be locked for other programs.");
});
