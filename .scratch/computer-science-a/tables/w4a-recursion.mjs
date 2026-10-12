import { mdTable, codeBlock, pyBlock, py, chk, same } from "../lib.mjs";

const factPseudo = `FUNCTION Factorial(N : INTEGER) RETURNS INTEGER
    IF N <= 1 THEN
        RETURN 1
    ELSE
        RETURN N * Factorial(N - 1)
    ENDIF
ENDFUNCTION

OUTPUT Factorial(4)`;
const factPy = `def factorial(n):
    if n <= 1:
        return 1
    else:
        return n * factorial(n - 1)

print(factorial(4))`;
const factRun = pyBlock(factPy);
same(factRun.text, "24");

// events for Factorial(4)
const events = [];
const stack = [];
function fact(n) {
  stack.push(`Factorial(${n})`);
  events.push([`Call Factorial(${n})`, `${stack.join(" > ")}`, ""]);
  let r;
  if (n <= 1) r = 1; else r = n * fact(n - 1);
  const name = stack.pop();
  events.push([`${name} returns ${r}`, stack.length ? stack.join(" > ") : "(empty)", r]);
  return r;
}
chk(fact(4), 24);
const stackTable = mdTable(["Event", "Call stack (oldest call on the left)", "Value returned"], events);
// summary: calls and returns
chk(events.length, 8);

// countdown and show: order of output
const cdPy = `def countdown(n):
    if n == 0:
        print("Lift off")
    else:
        print(n)
        countdown(n - 1)

def show(n):
    if n > 0:
        show(n - 1)
        print(n)

countdown(3)
print("---")
show(3)`;
const cdRun = pyBlock(cdPy);
same(cdRun.text, "3\n2\n1\nLift off\n---\n1\n2\n3");

// missing base case
const badPy = `def bad(n):
    return n + bad(n + 1)

try:
    bad(1)
except RecursionError:
    print("Stack overflow: too many calls")`;
const badRun = pyBlock(badPy);
same(badRun.text, "Stack overflow: too many calls");

// recursive sum of array
const data = [7, 4, 9, 2];
const sumPseudo = `DECLARE Data : ARRAY[1:4] OF INTEGER

FUNCTION SumList(Index : INTEGER) RETURNS INTEGER
    IF Index > 4 THEN
        RETURN 0
    ELSE
        RETURN Data[Index] + SumList(Index + 1)
    ENDIF
ENDFUNCTION

OUTPUT SumList(1)`;
const sumPy = `data = [7, 4, 9, 2]

def sum_list(index):
    if index >= len(data):
        return 0
    return data[index] + sum_list(index + 1)

print(sum_list(0))`;
const sumRun = pyBlock(sumPy);
same(sumRun.text, "22");
const sumEvents = [];
function sumList(i) {
  sumEvents.push(`SumList(${i})`);
  if (i > 4) return 0;
  return data[i - 1] + sumList(i + 1);
}
chk(sumList(1), 22);
const sumRows = [];
{
  // unwinding values
  const vals = [0]; for (let i = 4; i >= 1; i--) vals.unshift(data[i - 1] + vals[0]);
  // vals = [22, 15, 11, 2, 0] for SumList(1..5)
  for (let i = 1; i <= 5; i++) sumRows.push([`SumList(${i})`, i > 4 ? "base case" : `Data[${i}] + SumList(${i + 1}) = ${data[i - 1]} + ${vals[i]}`, vals[i - 1]]);
  same(vals, [22, 15, 11, 2, 0]);
}
const sumTable = mdTable(["Call", "Working", "Value returned"], sumRows);

// power function
const powPseudo = `FUNCTION Power(Base : INTEGER, Exponent : INTEGER) RETURNS INTEGER
    IF Exponent = 0 THEN
        RETURN 1
    ELSE
        RETURN Base * Power(Base, Exponent - 1)
    ENDIF
ENDFUNCTION`;
chk(3 ** 4, 81);

// power trace
const powRows = []; const powStack = [];
function pw(b, e) {
  powStack.push(`Power(${b}, ${e})`);
  let r; if (e === 0) r = 1; else r = b * pw(b, e - 1);
  const name = powStack.pop();
  powRows.push([name, e === 0 ? "base case" : `${b} × Power(${b}, ${e - 1})`, r]);
  return r;
}
chk(pw(3, 4), 81);
const powTable = mdTable(["Call (in the order the calls finish)", "Working", "Value returned"], powRows);
same(powRows.map((r) => r[2]), [1, 3, 9, 27, 81]);
const compare = mdTable(["Feature", "Recursion", "Iteration"], [
  ["Repeats by", "a subroutine calling itself", "a loop (`FOR`, `WHILE`, `REPEAT`)"],
  ["Stops at", "the base case", "the loop condition"],
  ["Memory", "a stack frame for every call, so memory grows with the depth", "a fixed amount"],
  ["Speed", "slower: each call has set-up and return cost", "usually faster"],
  ["Best for", "problems that split into smaller copies of themselves: trees, divide and conquer", "simple repetition over a known range or a list"],
]);
export const snips = { factPseudo: codeBlock(factPseudo), factPy: factRun.code, factOut: factRun.output, stackTable, cdPy: cdRun.code, cdOut: cdRun.output, badPy: badRun.code, badOut: badRun.output, sumPseudo: codeBlock(sumPseudo), sumPy: sumRun.code, sumOut: sumRun.output, sumTable, powPseudo: codeBlock(powPseudo), powTable, compare };
if (process.argv[1].endsWith("w4a-recursion.mjs")) console.log(Object.values(snips).join("\n\n"));
