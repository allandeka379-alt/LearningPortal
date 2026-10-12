import { mdTable, codeBlock, pyBlock, chk, same } from "../lib.mjs";

const types = mdTable(["Data type", "Holds", "Example values"], [
  ["INTEGER", "a whole number", "`0`, `47`, `-12`"],
  ["REAL", "a number that may have a fractional part", "`58.5`, `-0.25`, `3.0`"],
  ["CHAR", "a single character", "`'A'`, `'7'`, `'?'`"],
  ["STRING", "zero or more characters (text)", "`\"Harare\"`, `\"0771234567\"`"],
  ["BOOLEAN", "one of two values", "`TRUE`, `FALSE`"],
  ["DATE", "a calendar date", "`12/01/2026`"],
]);
const choose = mdTable(["Data item", "Suitable type", "Reason"], [
  ["Number of pupils in a class", "INTEGER", "always a whole number"],
  ["Mean mark of a class", "REAL", "can have a fractional part"],
  ["Mobile telephone number", "STRING", "has a leading zero, and is never used in a calculation"],
  ["Grade A to E", "CHAR", "one character"],
  ["Whether a pupil boards", "BOOLEAN", "two possible values"],
  ["Date a pupil joined", "DATE", "a calendar date that can be compared"],
]);
const recPseudo = `TYPE TStudent
    DECLARE StudentID : STRING
    DECLARE Name : STRING
    DECLARE Form : INTEGER
    DECLARE Average : REAL
    DECLARE Boarder : BOOLEAN
ENDTYPE

DECLARE Pupil : TStudent
Pupil.StudentID ← "S104"
Pupil.Name ← "Chipo Mlambo"
Pupil.Form ← 5
Pupil.Average ← 63.5
Pupil.Boarder ← FALSE
OUTPUT Pupil.Name, " is in Form ", Pupil.Form`;
const arrPseudo = `DECLARE Class : ARRAY[1:3] OF TStudent
DECLARE Total : REAL
DECLARE Index : INTEGER
Class[1].Name ← "Tendai Ncube"
Class[1].Average ← 58.5
Class[2].Name ← "Rudo Dube"
Class[2].Average ← 47.0
Class[3].Name ← "Farai Sibanda"
Class[3].Average ← 71.25
Total ← 0
FOR Index ← 1 TO 3
    Total ← Total + Class[Index].Average
    IF Class[Index].Average >= 50 THEN
        OUTPUT Class[Index].Name, " ", Class[Index].Average
    ENDIF
NEXT Index
OUTPUT "Mean average: ", Total / 3`;
const pyCode = `from dataclasses import dataclass

@dataclass
class Student:
    student_id: str
    name: str
    form: int
    average: float
    boarder: bool

pupils = [
    Student("S101", "Tendai Ncube", 5, 58.5, True),
    Student("S102", "Rudo Dube", 5, 47.0, False),
    Student("S103", "Farai Sibanda", 6, 71.25, False),
]
total = 0
for pupil in pupils:
    total = total + pupil.average
    if pupil.average >= 50:
        print(pupil.name, pupil.average)
print("Mean average:", total / len(pupils))`;
const run = pyBlock(pyCode);
chk((58.5 + 47 + 71.25) / 3, 58.916666666666664, 1e-9);
same(run.text, "Tendai Ncube 58.5\nFarai Sibanda 71.25\nMean average: 58.916666666666664");
const clinicPseudo = `TYPE TAppointment
    DECLARE PatientName : STRING
    DECLARE Phone : STRING
    DECLARE AppointmentDate : DATE
    DECLARE Fee : REAL
    DECLARE Attended : BOOLEAN
ENDTYPE`;
const clinicTable = mdTable(["Field", "Data type", "Reason"], [["PatientName", "STRING", "text"], ["Phone", "STRING", "a leading zero must be kept and it is not used in sums"], ["AppointmentDate", "DATE", "a calendar date"], ["Fee", "REAL", "an amount of money with cents"], ["Attended", "BOOLEAN", "yes or no"]]);
const dictPy = pyBlock(`pupil = {"name": "Chipo Mlambo", "form": 5, "average": 63.5}
pupil["average"] = pupil["average"] + 1
print(pupil["name"], pupil["average"])`);
same(dictPy.text, "Chipo Mlambo 64.5");
export const snips = { types, choose, recPseudo: codeBlock(recPseudo), arrPseudo: codeBlock(arrPseudo), py: run.code, out: run.output, clinicPseudo: codeBlock(clinicPseudo), clinicTable, dictPy: dictPy.code, dictOut: dictPy.output };
if (process.argv[1].endsWith("w4a-data-types-records.mjs")) console.log(Object.values(snips).join("\n\n"));
