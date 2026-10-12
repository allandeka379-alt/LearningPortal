import { mdTable, codeBlock, py, chk, same } from "../lib.mjs";

// run Python in a temporary folder so no file is left in the repository
const inTemp = (code) => py(`import os, tempfile\nos.chdir(tempfile.mkdtemp())\n${code}`);
const run = (code) => ({ code: codeBlock(code, "python"), output: codeBlock(inTemp(code)), text: inTemp(code) });

const writePseudo = `DECLARE Mark : INTEGER
OPENFILE "marks.txt" FOR WRITE
FOR Count ← 1 TO 6
    INPUT Mark
    WRITEFILE "marks.txt", NUM_TO_STR(Mark)
NEXT Count
CLOSEFILE "marks.txt"`;
const marks = [58, 47, 71, 63, 39, 80];
const writePy = `marks = [58, 47, 71, 63, 39, 80]
file = open("marks.txt", "w")
for mark in marks:
    print(mark, file=file)
file.close()
file = open("marks.txt", "r")
print(file.read())
file.close()`;
const w = run(writePy);
same(w.text.trim().split("\n"), marks.map(String));

const readPseudo = `DECLARE Line : STRING
DECLARE Total, Count : INTEGER
Total ← 0
Count ← 0
OPENFILE "marks.txt" FOR READ
WHILE NOT EOF("marks.txt") DO
    READFILE "marks.txt", Line
    Total ← Total + STR_TO_NUM(Line)
    Count ← Count + 1
ENDWHILE
CLOSEFILE "marks.txt"
OUTPUT "Marks read: ", Count
OUTPUT "Total: ", Total
OUTPUT "Average: ", Total / Count`;
const readPy = `with open("marks.txt", "w") as file:
    for mark in [58, 47, 71, 63, 39, 80]:
        print(mark, file=file)

total = 0
count = 0
with open("marks.txt", "r") as file:
    for line in file:
        total = total + int(line)
        count = count + 1
print("Marks read:", count)
print("Total:", total)
print("Average:", round(total / count, 2))`;
const r = run(readPy);
const tot = marks.reduce((a, b) => a + b, 0);
chk(tot, 358); chk(Math.round(tot / 6 * 100) / 100, 59.67);
same(r.text, "Marks read: 6\nTotal: 358\nAverage: 59.67");

const appendPy = `with open("log.txt", "w") as file:
    print("Monday", file=file)
    print("Tuesday", file=file)
with open("log.txt", "a") as file:
    print("Wednesday", file=file)
with open("log.txt", "r") as file:
    print(file.read())
with open("log.txt", "w") as file:
    print("Thursday", file=file)
with open("log.txt", "r") as file:
    print(file.read())`;
const a = run(appendPy);
same(a.text.trim().split("\n"), ["Monday", "Tuesday", "Wednesday", "", "Thursday"]);

const modes = mdTable(["Mode", "Pseudocode", "Python", "Effect"], [
  ["Read", "`OPENFILE f FOR READ`", "`open(name, \"r\")`", "reads existing contents from the start; the file must exist"],
  ["Write", "`OPENFILE f FOR WRITE`", "`open(name, \"w\")`", "creates the file, or erases the old contents first"],
  ["Append", "`OPENFILE f FOR APPEND`", "`open(name, \"a\")`", "adds new lines at the end and keeps the old contents"],
]);
const readLinePy = run(`with open("names.txt", "w") as file:
    print("Rudo", file=file)
    print("Sipho", file=file)
    print("Thandeka", file=file)
with open("names.txt", "r") as file:
    first = file.readline()
    rest = file.read()
print(first.strip())
print(rest.split())`);
same(readLinePy.text, "Rudo\n['Sipho', 'Thandeka']");
export const snips = { writePseudo: codeBlock(writePseudo), writePy: w.code, writeOut: w.output, readPseudo: codeBlock(readPseudo), readPy: r.code, readOut: r.output, appendPy: a.code, appendOut: a.output, modes, readLinePy: readLinePy.code, readLineOut: readLinePy.output };
if (process.argv[1].endsWith("w4a-text-files.mjs")) console.log(Object.values(snips).join("\n\n"));
