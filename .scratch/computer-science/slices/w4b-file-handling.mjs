// Slice w4b: file handling (comp.prog.file-handling, Cambridge only).
import { concept, P } from "../lib.mjs";
import { fence, mdTable, sum } from "./w4b-0-kit.mjs";

const fileMd = (name, lines) => mdTable(["Line", `Contents of ${name}`], lines.map((l, i) => [String(i + 1), String(l)]));
// Total of 4 lines.
const sales = [125, 98, 143, 110];
const salesTotal = sum(sales);
// Copy > 30.
const temps = [28, 33, 31, 26, 35, 30];
const hot = temps.filter((t) => t > 30);
// Terminator file.
const names = ["Rudo", "Sipho", "Nyasha", "END", "Tendai"];
const beforeEnd = names.indexOf("END");
// Struct: products file read into arrays.
const prodLines = ["Soap", "1.50", "Rice", "4.25", "Salt", "0.80"];
const prodPrices = [1.5, 4.25, 0.8];
const dearestP = prodLines[prodPrices.indexOf(Math.max(...prodPrices)) * 2];
// Struct 2: visitor log append via copy.
const oldLog = ["Mon 14", "Tue 22", "Wed 17"];

concept("comp.prog.file-handling", { file: "prog/file-handling", keyPrefix: "prog.file-handling" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Why does a program store data in a file rather than only in variables?",
    options: [
      ["Data in a file is kept after the program ends", "Correct: variables are lost when the program closes."],
      ["Files are faster to access than variables", "Main memory is faster than secondary storage."],
      ["Variables cannot hold text data", "STRING variables hold text."],
      ["Files make the program use less code", "Using files adds statements; the benefit is permanence."],
    ],
    answer: "A",
    explanation: "Files are on secondary storage, so the data survives after the program stops or the power goes off.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which statement opens the existing file `stock.txt` so that data can be taken from it?",
    options: [
      ["`OPENFILE \"stock.txt\" FOR READ`", "Correct: READ mode is for taking data from a file."],
      ["`OPENFILE \"stock.txt\" FOR WRITE`", "WRITE creates a new file and loses the existing data."],
      ["`READFILE \"stock.txt\" FOR READ`", "READFILE reads an item; it does not open the file."],
      ["`OPENFILE stock.txt READ`", "The name needs quotes and the keyword FOR."],
    ],
    answer: "A",
    explanation: "`OPENFILE <file name> FOR READ`.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Opening an existing file `FOR WRITE` keeps its data and adds new lines after it.",
    answer: false,
    explanation: "False. WRITE mode creates a new file; any data already in a file with that name is lost.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "After one `READFILE` statement, the next `READFILE` on the same open file reads the following line.",
    answer: true,
    explanation: "True. Each READFILE takes the next data item in order.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each statement to what it does.",
    pairs: [
      ["`OPENFILE \"a.txt\" FOR READ`", "Prepares an existing file so data can be read from it"],
      ["`READFILE \"a.txt\", Item`", "Copies the next line of the file into a variable"],
      ["`WRITEFILE \"a.txt\", Item`", "Adds the value as a new line in the file"],
      ["`CLOSEFILE \"a.txt\"`", "Finishes using the file and releases it"],
    ],
    explanation: "Open, read or write, then close.",
  });
  b.fib({
    d: 3, skill: "APPLICATION",
    hints: ["Open once before the loop and close once after it."],
    stem: "Complete the algorithm, which saves the 10 values of `Scores[1:10]` in `scores.txt`, one per line.\n\n```\nOPENFILE \"scores.txt\" FOR [1]\nFOR Index ← 1 TO 10\n    [2] \"scores.txt\", Scores[Index]\nNEXT Index\n[3] \"scores.txt\"\n```",
    template: "[1] {{blank:a}} [2] {{blank:b}} [3] {{blank:c}}",
    blanks: [
      { id: "a", accepted: ["WRITE"], choices: ["READ", "WRITE"] },
      { id: "b", accepted: ["WRITEFILE"], choices: ["WRITEFILE", "READFILE", "OUTPUT", "OPENFILE"] },
      { id: "c", accepted: ["CLOSEFILE"], choices: ["CLOSEFILE", "ENDFILE", "OPENFILE", "NEXT"] },
    ],
    explanation: "Open FOR WRITE, WRITEFILE each element, CLOSEFILE at the end.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    hints: ["What does WRITE mode do to a file each time it is opened?"],
    stem: `What does \`names.txt\` contain after this algorithm runs, if \`Names[1:3]\` holds Chipo, Farai and Rudo?\n\n${fence('FOR Index ← 1 TO 3\n    OPENFILE "names.txt" FOR WRITE\n    WRITEFILE "names.txt", Names[Index]\n    CLOSEFILE "names.txt"\nNEXT Index')}`,
    options: [
      ["Only Rudo", "Correct: each pass creates a new file, so only the last name remains."],
      ["Chipo, Farai and Rudo on three lines", "That needs the file opened once, before the loop."],
      ["Only Chipo", "Later passes replace the file."],
      ["Nothing, because the file is closed", "Closing saves the data that was written."],
    ],
    answer: "A",
    explanation: "Opening FOR WRITE starts an empty file every time. Open before the loop and close after it.",
  });
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    hints: ["Each READFILE takes the next line."],
    stem: `The file \`sales.txt\` holds:\n\n${fileMd("sales.txt", sales)}\n\n${fence('Total ← 0\nOPENFILE "sales.txt" FOR READ\nFOR Day ← 1 TO 4\n    READFILE "sales.txt", Amount\n    Total ← Total + Amount\nNEXT Day\nCLOSEFILE "sales.txt"\nOUTPUT Total')}\n\nWhat is output?`,
    value: salesTotal,
    wrong: [sales.at(-1)],
    explanation: `${sales.join(" + ")} = ${salesTotal}.`,
    workedSolution: `1. The four lines are read in order: ${sales.join(", ")}.\n2. Total = ${salesTotal}.`,
  });
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    hints: ["Only values greater than 30 are written."],
    stem: `The file \`temps.txt\` holds:\n\n${fileMd("temps.txt", temps)}\n\n${fence('OPENFILE "temps.txt" FOR READ\nOPENFILE "hot.txt" FOR WRITE\nFOR Day ← 1 TO 6\n    READFILE "temps.txt", Reading\n    IF Reading > 30\n        THEN\n            WRITEFILE "hot.txt", Reading\n    ENDIF\nNEXT Day\nCLOSEFILE "temps.txt"\nCLOSEFILE "hot.txt"')}\n\nHow many lines does \`hot.txt\` contain afterwards?`,
    value: hot.length,
    wrong: [temps.filter((x) => x >= 30).length],
    explanation: `Readings over 30: ${hot.join(", ")}: ${hot.length} lines. 30 itself is not greater than 30.`,
    workedSolution: `1. Check each reading: ${temps.map((x) => `${x}${x > 30 ? " (written)" : ""}`).join(", ")}.\n2. ${hot.length} lines.`,
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    hints: ["Which mode allows READFILE?"],
    stem: `Why does this algorithm fail?\n\n${fence('OPENFILE "log.txt" FOR WRITE\nREADFILE "log.txt", Entry\nOUTPUT Entry\nCLOSEFILE "log.txt"')}`,
    options: [
      ["The file is opened for writing but then read", "Correct: READFILE needs the file opened FOR READ."],
      ["CLOSEFILE must come before OUTPUT", "The file can be closed after the output."],
      ["Entry has not been declared as an array", "A single variable receives one line."],
      ["File names cannot end in .txt", "Any valid file name can be used."],
    ],
    answer: "A",
    explanation: "Open FOR READ to read. (Opening FOR WRITE has also wiped the log.)",
  });
  b.short({
    d: 2, skill: "RECALL", daily: true,
    stem: "Which pseudocode keyword is used to finish using a file once a program no longer needs it?",
    accepted: ["CLOSEFILE"],
    wrong: ["ENDFILE"],
    explanation: "`CLOSEFILE <file name>`.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "Which statement correctly writes the value of `Total` to the file `report.txt`, which is already open for writing?",
    options: [
      ["`WRITEFILE \"report.txt\", Total`", "Correct: file name in quotes, a comma, then the data."],
      ["`WRITEFILE Total, \"report.txt\"`", "The file name comes first."],
      ["`OUTPUT \"report.txt\", Total`", "OUTPUT displays on the screen; it does not write to a file."],
      ["`WRITEFILE report.txt, Total`", "The file name is a string, so it needs quotes."],
    ],
    answer: "A",
    explanation: "`WRITEFILE <file identifier>, <variable>`.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    hints: ["What is in best.txt at the moment READFILE runs?"],
    stem: `A game keeps its high score in \`best.txt\`.\n\n${fence('OPENFILE "best.txt" FOR WRITE\nREADFILE "best.txt", Best\nIF Score > Best\n    THEN\n        WRITEFILE "best.txt", Score\nENDIF\nCLOSEFILE "best.txt"')}\n\nWhat is the main logic problem?`,
    options: [
      ["The old high score is lost before it can be read", "Correct: WRITE mode empties the file first."],
      ["Score and Best should both be strings", "Numbers can be compared and written."],
      ["The IF statement needs an ELSE branch for when Score is lower", "No ELSE is required here."],
      ["CLOSEFILE should be inside the IF", "The file must be closed whichever branch runs."],
    ],
    answer: "A",
    explanation: "Open FOR READ, read Best, close; then, only if needed, open FOR WRITE and write the new score.",
  });
  b.num({
    d: 4, skill: "ANALYSIS", calculator: false,
    hints: ["The loop stops when the line read is END.", "Is the END line counted?"],
    stem: `The file \`club.txt\` holds:\n\n${fileMd("club.txt", names)}\n\n${fence('Count ← 0\nOPENFILE "club.txt" FOR READ\nREADFILE "club.txt", Member\nWHILE Member <> "END" DO\n    Count ← Count + 1\n    READFILE "club.txt", Member\nENDWHILE\nCLOSEFILE "club.txt"\nOUTPUT Count')}\n\nWhat is output?`,
    value: beforeEnd,
    wrong: [names.length - 1],
    explanation: `${names.slice(0, beforeEnd).join(", ")} are counted; reading "END" stops the loop, so line 5 is never read. Output ${beforeEnd}.`,
    workedSolution: `1. Lines before END: ${names.slice(0, beforeEnd).join(", ")}.\n2. The terminator is not counted and the loop stops.\n3. Count = ${beforeEnd}.`,
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 2,
    hints: ["What happens to variables when the program closes?"],
    stem: "A school's library program stores its list of books in a file. Explain **two** reasons why.",
    points: [
      "The data is kept permanently / after the program closes or the computer is switched off, so it is available next time",
      "The data can be shared with / used by another program or copied / backed up / prepared in advance without retyping",
    ],
    explanation: "Permanence plus one further reason.",
    modelAnswer: "The book list must still exist when the program is next run; in a file on secondary storage it is not lost when the program closes. The file can also be backed up or used by another program, such as one that prints reports.",
  });
  b.manualShort({
    d: 4, skill: "CREATION", marks: 5,
    hints: ["Open once, loop 20 times, close once."],
    stem: "Write pseudocode that inputs 20 rainfall readings from the user and stores them in a new text file `rain.txt`, one reading per line.",
    points: [
      "Opens \"rain.txt\" FOR WRITE before the loop",
      "Loop that runs 20 times",
      "Prompts and inputs a reading inside the loop",
      "WRITEFILE \"rain.txt\" with the reading inside the loop",
      "CLOSEFILE \"rain.txt\" after the loop",
    ],
    explanation: "Open, loop with input and write, close.",
    modelAnswer: "```\nDECLARE Reading : REAL\nDECLARE Count : INTEGER\nOPENFILE \"rain.txt\" FOR WRITE\nFOR Count ← 1 TO 20\n    OUTPUT \"Enter rainfall reading \", Count\n    INPUT Reading\n    WRITEFILE \"rain.txt\", Reading\nNEXT Count\nCLOSEFILE \"rain.txt\"\n```",
  });
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true, marks: 6, secs: 540, calculator: false,
    hints: ["Lines alternate: a name, then its price.", "Each pass of the loop reads two lines."],
    stem: `A shop in Masvingo stores its products in \`products.txt\`: each product name is followed on the next line by its price.\n\n${fileMd("products.txt", prodLines)}\n\n${fence('OPENFILE "products.txt" FOR READ\nFOR Item ← 1 TO 3\n    READFILE "products.txt", ProductName[Item]\n    READFILE "products.txt", Price[Item]\nNEXT Item\nCLOSEFILE "products.txt"')}`,
    parts: [
      P.short({ label: "(a)", stem: "State the value of `ProductName[2]` after the algorithm runs.", accepted: [prodLines[2]], wrong: [prodLines[1]], explanation: `Pass 2 reads lines 3 and 4: ProductName[2] = "${prodLines[2]}".` }),
      P.num({ label: "(b)", stem: "State the value of `Price[3]`.", value: prodPrices[2], wrong: [prodPrices[1]], explanation: `Pass 3 reads lines 5 and 6: Price[3] = ${prodPrices[2]}.`, workedSolution: "1. Pass 3 reads lines 5 and 6.\n2. Line 6 is the price of Salt: 0.8." }),
      P.mcq({
        label: "(c)", stem: "Why must the loop run exactly 3 times?",
        options: [["The file holds exactly 3 products and has no end marker", "Correct: reading more lines than exist would fail."], ["A FOR loop that reads a file can only run 3 times", "There is no such limit."], ["Each READFILE statement reads three lines", "Each READFILE reads one line."], ["The arrays can only hold 3 characters", "The arrays hold whole names and prices."]],
        answer: "A", explanation: "The number of records must be known (or a terminator used).",
      }),
      P.manual({
        label: "(d)", marks: 3, stem: `Write pseudocode that writes the name of every product costing more than 1.00 to a new file \`dear.txt\`, using the arrays filled above.`,
        points: ["Opens \"dear.txt\" FOR WRITE before the loop and closes it after", "Loop 1 to 3 with IF Price[Item] > 1.00", "WRITEFILE \"dear.txt\", ProductName[Item] inside the IF"],
        modelAnswer: "```\nOPENFILE \"dear.txt\" FOR WRITE\nFOR Item ← 1 TO 3\n    IF Price[Item] > 1.00\n        THEN\n            WRITEFILE \"dear.txt\", ProductName[Item]\n    ENDIF\nNEXT Item\nCLOSEFILE \"dear.txt\"\n```",
      }),
    ],
    explanation: `ProductName[2] = ${prodLines[2]}; Price[3] = ${prodPrices[2]}; the dearest product is ${dearestP}.`,
  });
  b.struct({
    d: 5, skill: "ANALYSIS", examStyle: true, marks: 8, secs: 720,
    hints: ["WRITE mode empties a file.", "Copy the old lines into an array first, or write to a second file."],
    stem: `A museum in Harare keeps a visitor log in \`log.txt\`, one line per day. The file currently holds 3 lines:\n\n${fileMd("log.txt", oldLog)}\n\nThe programmer wants to add today's line, \`"Thu 19"\`, and writes:\n\n${fence('OPENFILE "log.txt" FOR WRITE\nWRITEFILE "log.txt", "Thu 19"\nCLOSEFILE "log.txt"')}`,
    parts: [
      P.num({ label: "(a)", stem: "How many lines does `log.txt` contain after this runs?", value: 1, wrong: [oldLog.length + 1], explanation: "WRITE mode creates a new file, so only the new line remains.", workedSolution: "1. OPENFILE FOR WRITE empties the file.\n2. One WRITEFILE: 1 line." }),
      P.tf({ label: "(b)", stem: "The lines for Mon, Tue and Wed are still in the file.", answer: false, explanation: "False. They were lost when the file was opened FOR WRITE." }),
      P.manual({
        label: "(c)", marks: 6,
        stem: "Write pseudocode that adds the new line correctly. It should read the 3 existing lines into an array `Days[1:4]`, store the new line as the 4th element and write all 4 lines back to `log.txt`.",
        points: [
          "Opens \"log.txt\" FOR READ",
          "Loop 1 to 3 with READFILE \"log.txt\", Days[Index]",
          "Closes the file after reading",
          "Days[4] ← \"Thu 19\"",
          "Opens \"log.txt\" FOR WRITE and loops 1 to 4 with WRITEFILE \"log.txt\", Days[Index]",
          "Closes the file after writing",
        ],
        modelAnswer: "```\nDECLARE Days : ARRAY[1:4] OF STRING\nDECLARE Index : INTEGER\nOPENFILE \"log.txt\" FOR READ\nFOR Index ← 1 TO 3\n    READFILE \"log.txt\", Days[Index]\nNEXT Index\nCLOSEFILE \"log.txt\"\nDays[4] ← \"Thu 19\"\nOPENFILE \"log.txt\" FOR WRITE\nFOR Index ← 1 TO 4\n    WRITEFILE \"log.txt\", Days[Index]\nNEXT Index\nCLOSEFILE \"log.txt\"\n```",
      }),
    ],
    explanation: "Only 1 line remains, because WRITE mode starts a new file. Read the old lines first, then write them all back with the new one.",
  });

  b.card("CONCEPT", "Why use files?", "Data in a file is kept after the program ends or the power is off; it can be reused, shared and backed up.");
  b.card("FORMULA", "Open a file", "OPENFILE \"name.txt\" FOR READ  or  OPENFILE \"name.txt\" FOR WRITE");
  b.card("FACT", "WRITE mode", "Creates a new file: any existing data in a file of that name is lost.");
  b.card("FORMULA", "Read a line", "READFILE \"name.txt\", Variable reads the next line into the variable.");
  b.card("FORMULA", "Write a line", "WRITEFILE \"name.txt\", Value adds the value as the next line.");
  b.card("FORMULA", "Close a file", "CLOSEFILE \"name.txt\" when the program has finished with it.");
  b.card("CONCEPT", "Files and loops", "Open before the loop, read or write inside it, close after it.");
  b.card("FACT", "No end-of-file test", "0478 pseudocode has no EOF function: the number of lines is given or a terminator line (e.g. \"END\") is used.");
  b.card("CONCEPT", "One mode at a time", "To read a file you have just written, close it and reopen it FOR READ.");
});
