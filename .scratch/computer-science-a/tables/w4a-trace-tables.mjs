import { mdTable, codeBlock, pyBlock, chk, same } from "../lib.mjs";
import { Trace, DIV, MOD } from "./w4a-util.mjs";

// Example 1: digit sum of 2764
const digitCode = `Number ← 2764
Total ← 0
WHILE Number > 0 DO
    Digit ← MOD(Number, 10)
    Total ← Total + Digit
    Number ← DIV(Number, 10)
ENDWHILE
OUTPUT Total`;
const t1 = new Trace(["Number", "Total", "Digit", "OUTPUT"]);
{
  let Number = 2764, Total = 0, Digit;
  t1.row({ Number, Total });
  while (Number > 0) {
    Digit = MOD(Number, 10);
    Total += Digit;
    Number = DIV(Number, 10);
    t1.row({ Number, Total, Digit });
  }
  t1.row({ OUTPUT: Total });
  chk(Total, 19);
}
// Python run of the same program
const digitPy = pyBlock(`number = 2764
total = 0
while number > 0:
    digit = number % 10
    total = total + digit
    number = number // 10
print(total)`);
same(digitPy.text, "19");

// Example 2: faulty "largest" algorithm
const data = [12, 31, 7, 25];
const faulty = `Largest ← Value[1]
FOR Index ← 2 TO 4
    IF Value[Index] < Largest THEN
        Largest ← Value[Index]
    ENDIF
NEXT Index
OUTPUT Largest`;
const fixed = faulty.replace("Value[Index] < Largest", "Value[Index] > Largest");
const t2 = new Trace(["Index", "Value[Index]", "Largest", "OUTPUT"]);
{
  let Largest = data[0];
  t2.row({ Largest });
  for (let i = 2; i <= 4; i++) {
    const v = data[i - 1];
    if (v < Largest) Largest = v;
    t2.row({ Index: i, "Value[Index]": v, Largest });
  }
  t2.row({ OUTPUT: Largest });
  chk(Largest, 7);
}
const t2b = new Trace(["Index", "Value[Index]", "Largest", "OUTPUT"]);
{
  let Largest = data[0];
  t2b.row({ Largest });
  for (let i = 2; i <= 4; i++) {
    const v = data[i - 1];
    if (v > Largest) Largest = v;
    t2b.row({ Index: i, "Value[Index]": v, Largest });
  }
  t2b.row({ OUTPUT: Largest });
  chk(Largest, 31);
}

// Example 3: nested loops
const nestedCode = `FOR Row ← 1 TO 3
    FOR Col ← 1 TO 2
        OUTPUT Row * Col
    NEXT Col
NEXT Row`;
const t3 = new Trace(["Row", "Col", "OUTPUT"]);
const outs = [];
for (let Row = 1; Row <= 3; Row++) for (let Col = 1; Col <= 2; Col++) { outs.push(Row * Col); t3.row({ Row, Col, OUTPUT: Row * Col }); }
same(outs, [1, 2, 2, 4, 3, 6]);

// test data table for the digit-sum program
const cases = [[2764, "normal", 19], [5, "boundary: one digit", 5], [0, "boundary: loop never runs", 0], [10, "ends in zero", 1]];
const digitSum = (n) => { let t = 0; while (n > 0) { t += n % 10; n = Math.floor(n / 10); } return t; };
for (const [n, , e] of cases) chk(digitSum(n), e);
const testData = mdTable(["Number entered", "Type of test", "Expected Total"], cases.map(([n, ty, e]) => [n, ty, e]));

export const snips = {
  digitCode: codeBlock(digitCode),
  digitTrace: t1.md(),
  digitPy: digitPy.code,
  faulty: codeBlock(faulty),
  faultyTrace: t2.md(),
  fixed: codeBlock(fixed),
  fixedTrace: t2b.md(),
  nestedCode: codeBlock(nestedCode),
  nestedTrace: t3.md(),
  testData,
};
if (process.argv[1].endsWith("w4a-trace-tables.mjs")) console.log(Object.values(snips).join("\n\n"));
