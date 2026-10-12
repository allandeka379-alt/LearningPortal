// Slice w4b: procedures, functions and parameters (acs.prog.procedures-functions, both boards).
import { concept, P, chk, same, mdTable, codeBlock, py } from "../lib.mjs";
import { mc, pm } from "../tables/w4b-q.mjs";

concept("acs.prog.procedures-functions", { file: "prog/procedures-functions", keyPrefix: "prog.procedures-functions" }, (b) => {
  // ---- computed values
  const discount = (p) => (p >= 50 ? p * 0.1 : 0);
  chk(discount(80), 8); chk(discount(30), 0);
  let total = 0;
  for (const p of [80, 30]) total = total + p - discount(p);
  chk(total, 102);
  const billCode = `FUNCTION Discount(Price : REAL) RETURNS REAL
    IF Price >= 50 THEN
        RETURN Price * 0.1
    ELSE
        RETURN 0
    ENDIF
ENDFUNCTION

PROCEDURE AddBill(BYVAL Price : REAL, BYREF Total : REAL)
    Total ← Total + Price - Discount(Price)
ENDPROCEDURE

Total ← 0
CALL AddBill(80, Total)
CALL AddBill(30, Total)
OUTPUT Total`;
  same(py(`def discount(p):
    return p * 0.1 if p >= 50 else 0
t = [0]
def add_bill(p, t):
    t[0] = t[0] + p - discount(p)
add_bill(80, t)
add_bill(30, t)
print(t[0])`), "102.0");
  const areaCode = `def area(length, width):
    return length * width

def report(name, value):
    print(name, "area:", value)

plot = area(12, 5)
report("Plot A", plot)
report("Plot B", area(8, 7))`;
  const areaOut = py(areaCode).split("\n");
  same(areaOut, ["Plot A area: 60", "Plot B area: 56"]);
  const dbl = (() => { let V = 7; V = V * 2; return V; })();
  chk(dbl, 14);
  const maxOf = (a, c) => (a > c ? a : c);
  chk(maxOf(maxOf(4, 9), 6), 9);
  const swapRes = (() => { let X = 3, Y = 8; const t = X; X = Y; Y = t; return [X, Y]; })();
  same(swapRes, [8, 3]);

  // ---- multiple choice
  mc(b, 2, "RECALL", "What is the main difference between a function and a procedure?",
    ["A function returns a value to the place where it is called", "A procedure does not return a value."],
    [["A function can only be called once", "Both can be called as many times as needed."], ["A procedure cannot have parameters", "Procedures may have parameters."], ["A function cannot contain a selection statement", "Functions can contain any statements."]],
    "A function returns a value and is used in an expression.", { daily: true });
  mc(b, 2, "RECALL", "In the header `FUNCTION Total(Mark1 : INTEGER, Mark2 : INTEGER) RETURNS INTEGER`, what are `Mark1` and `Mark2`?",
    ["Parameters", "They are variables in the header that receive the data."],
    [["Arguments", "Arguments are the actual values given in the call."], ["Return values", "The value returned is the INTEGER after RETURNS."], ["Global variables", "Parameters are local to the routine."]],
    "A parameter is named in the header; an argument is supplied in the call.", { daily: true });
  mc(b, 2, "APPLICATION", "Which statement correctly uses the function `Discount` in an expression?",
    ["`Saving ← Discount(80)`", "A function call produces a value that can be stored."],
    [["`CALL Discount(80)`", "CALL is used for procedures; the returned value would be lost."], ["`Discount ← 80`", "That assigns to a name; it does not call the function."], ["`OUTPUT Discount`", "Without brackets and an argument the function is not called."]],
    "A function is called inside an expression and returns a value.");
  mc(b, 3, "ANALYSIS", "A procedure `Double(BYREF N : INTEGER)` sets `N ← N * 2`. The main program sets `V ← 7` and then runs `CALL Double(V)`. What is the value of `V` afterwards?",
    [String(dbl), "The reference parameter changes the original variable."],
    [["7", "That would be true for BYVAL, which changes only a copy."], ["49", "The parameter is doubled, not squared."], ["0", "The variable is not reset."]],
    "Changing a BYREF parameter changes the argument variable.", { calculator: false, hints: ["Is N a copy of V or another name for V?"] });
  mc(b, 3, "ANALYSIS", "The same procedure is changed to `Double(BYVAL N : INTEGER)` and called with `CALL Double(V)` where `V` is 7. What is the value of `V` afterwards?",
    ["7", "A copy of V is doubled and then discarded."],
    [["14", "That would need BYREF."], ["49", "The procedure doubles; it does not square."], ["It is undefined", "V keeps its value."]],
    "A BYVAL parameter is a copy, so the original variable does not change.", { hints: ["What does the procedure change: V or a copy of V?"] });
  mc(b, 2, "UNDERSTANDING", "Which is a benefit of dividing a large program into procedures and functions?",
    ["Each routine can be tested separately and reused", "Smaller parts are easier to check and may be used again."],
    [["The program always runs faster", "Routines make a program clearer but not necessarily faster."], ["Variables no longer need data types", "Every variable still has a type."], ["The program no longer needs a main program", "Something must still call the routines."]],
    "Routines support testing, reuse, maintenance and teamwork.", { daily: true });
  mc(b, 3, "APPLICATION", "What happens when this Python program is run?\n\n" + codeBlock(`def total(a, b):
    return a + b

print(total(5))`, "python"),
    ["It stops with an error: an argument is missing", "The function needs two arguments."],
    [["It prints 5 because the second value defaults to zero", "The second parameter has no default value."], ["It prints 10 because the single value is used for both parameters", "Python does not repeat a single argument."], ["It prints None because the function returns nothing", "The call fails before returning anything."]],
    "The number of arguments must match the number of parameters.", { hints: ["How many parameters does the function have, and how many arguments are given?"] });
  mc(b, 2, "UNDERSTANDING", "A variable `Count` is declared inside the procedure `Reset`. Where can it be used?",
    ["Only inside `Reset`", "It is a local variable."],
    [["In the whole program", "That describes a global variable."], ["In every procedure that is called by `Reset`", "A called routine has its own scope."], ["Only in the main program", "The main program cannot see a local variable of a routine."]],
    "A local variable is visible only inside the routine that declares it.");

  // ---- true / false
  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "The values supplied in a call to a routine are called arguments, and they are matched to the parameters by position.", answer: true,
    explanation: "True. The first argument goes to the first parameter, the second to the second, and so on." });
  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "A function must contain an `OUTPUT` statement to give its result to the calling program.", answer: false,
    explanation: "False. A function gives its result back with RETURN. Output is a separate action that the caller may do with the value." });

  // ---- fib, num, short, match
  b.fib({ d: 3, skill: "APPLICATION", calculator: false, hints: ["Work out the value of Total after each call."],
    stem: "Trace this algorithm.\n\n" + codeBlock(billCode) + "\nState the value returned by `Discount(80)` and the value of `Total` at the end.",
    template: "Discount(80) = {{blank:a}}\n\nFinal Total = {{blank:b}}",
    blanks: [{ id: "a", input: "number", accepted: ["8"] }, { id: "b", input: "number", accepted: ["102"] }], wrong: [["80", "110"]],
    explanation: "Discount(80) = 8. After the first call Total = 80 - 8 = 72. The second bill of 30 has no discount, so Total = 72 + 30 = 102." });
  b.num({ d: 3, skill: "APPLICATION", calculator: false, hints: ["Start with the inner call."],
    stem: "A function `Max(A, B)` returns the larger of two numbers. What value does `Max(Max(4, 9), 6)` return?",
    value: 9, wrong: [4, 6], workedSolution: "Max(4, 9) returns 9, and then Max(9, 6) returns 9.", explanation: "The inner call is evaluated first: the result is 9." });
  b.short({ d: 2, skill: "RECALL", stem: "State the pseudocode keyword used to call a procedure.", accepted: ["CALL", "call"], wrong: ["RUN"], explanation: "A procedure is called with CALL." });
  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each term to its description.",
    pairs: [["Parameter", "A variable named in the header of a routine"], ["Argument", "A value or variable supplied when the routine is called"], ["`BYREF`", "The routine can change the original variable"], ["`RETURN`", "Sends a value back from a function"]],
    explanation: "The four terms describe the interface between a routine and its caller." });

  // ---- self-marked
  b.manualShort({ d: 3, skill: "CREATION", marks: 4, hints: ["The header needs the parameter type and the RETURNS type."],
    stem: "Write a pseudocode function `IsPass` that takes a mark (INTEGER) and returns TRUE if the mark is 50 or more and FALSE otherwise. [4]",
    points: ["Correct function header with a parameter and RETURNS BOOLEAN", "A selection or Boolean expression testing Mark >= 50", "Returns TRUE and FALSE correctly (or returns the Boolean expression)", "Ends with ENDFUNCTION"],
    modelAnswer: codeBlock(`FUNCTION IsPass(Mark : INTEGER) RETURNS BOOLEAN
    RETURN Mark >= 50
ENDFUNCTION`), explanation: "A comparison already has a Boolean value, so it can be returned directly." });
  b.manualShort({ d: 3, skill: "CREATION", marks: 4, hints: ["A procedure does not use RETURN."],
    stem: "Write a Python procedure `show_total` that takes a name and a list of three marks and outputs the name and the total of the marks, and a call that uses it. [4]",
    points: ["A def statement with two parameters", "Adds up the three marks (sum or +)", "Outputs the name and the total", "A correct call with a name and a list"],
    modelAnswer: codeBlock(`def show_total(name, marks):
    print(name, "total:", sum(marks))

show_total("Chipo", [56, 71, 64])`, "python"), explanation: "A procedure carries out an action and returns nothing." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 3, hints: ["Think about what the routine receives."],
    stem: "Explain the difference between passing a parameter by value and passing it by reference. [3]",
    points: ["By value: the routine receives a copy of the argument", "So changes made to the parameter do not affect the original variable", "By reference: the routine works on the original variable (its address), so changes made inside the routine change the original"],
    modelAnswer: "By value, the routine gets a copy, so changes do not affect the original. By reference, the routine works on the original variable, so changes made in the routine change it.", explanation: "BYVAL copies; BYREF shares." });
  b.manualShort({ d: 4, skill: "CREATION", marks: 4, hints: ["Both values must be given back, so which kind of parameter?"],
    stem: "Write a pseudocode procedure `Swap` that exchanges the values of two integer variables, and a call that swaps `X` and `Y`. [4]",
    points: ["Header with two BYREF integer parameters", "Uses a temporary variable to hold one value", "Assigns the two values correctly", "A correct CALL Swap(X, Y)"],
    modelAnswer: codeBlock(`PROCEDURE Swap(BYREF A : INTEGER, BYREF B : INTEGER)
    DECLARE Temp : INTEGER
    Temp ← A
    A ← B
    B ← Temp
ENDPROCEDURE

CALL Swap(X, Y)`), explanation: "Both parameters must be BYREF so that the change reaches the caller." });

  // ---- structured practice
  b.struct({ d: 3, skill: "APPLICATION", examStyle: true, calculator: false, hints: ["Dry run the two calls in order.", "Total is passed by reference."],
    explanation: "A function used inside a procedure with a reference parameter.",
    stem: `A shop in Kwekwe gives a discount of 10 percent on a bill of 50 or more. This pseudocode keeps a running total of the bills.\n\n${codeBlock(billCode)}`,
    parts: [
      pm("(a)", "Which routine in the algorithm is a function?", ["`Discount`", "It has a RETURNS clause and returns a value."], [["`AddBill`", "AddBill is called with CALL and returns nothing."], ["`Total`", "Total is a variable, not a routine."], ["`Price`", "Price is a parameter."]], "`Discount` returns a value; `AddBill` is a procedure."),
      P.num({ label: "(b)", marks: 1, stem: "State the value returned by `Discount(80)`.", value: 8, wrong: [80, 72], workedSolution: "80 is at least 50, so the discount is 80 × 0.1 = 8.", explanation: "The discount is 8." }),
      P.num({ label: "(c)", marks: 2, stem: "State the value output at the end of the algorithm.", value: 102, wrong: [110, 30], workedSolution: "After the first call Total = 0 + 80 - 8 = 72. The second call adds 30 with no discount: 72 + 30 = 102.", explanation: "Total is 102." }),
      P.manual({ label: "(d)", marks: 2, stem: "Explain why `Total` is passed to `AddBill` by reference.", points: ["AddBill must change the value of Total in the main program", "A BYVAL parameter would be a copy, so the main program's Total would stay at 0"], modelAnswer: "AddBill has to update Total in the main program. A value parameter is a copy, so Total would still be 0 after the calls.", explanation: "BYREF is needed for the change to reach the caller." }),
    ] });
  b.struct({ d: 4, skill: "ANALYSIS", examStyle: true, hints: ["Work out the value returned by area before report is called.", "Count the parameters of each routine."],
    explanation: "Reading a Python program with a function and a procedure.",
    stem: `A land officer in Masvingo uses this Python program.\n\n${codeBlock(areaCode, "python")}`,
    parts: [
      P.short({ label: "(a)", marks: 1, stem: "State the first line output.", accepted: [areaOut[0]], normalise: ["trim", "collapse_whitespace"], explanation: "area(12, 5) is 60, and report prints the name, the word area and the value." }),
      P.short({ label: "(b)", marks: 1, stem: "State the second line output.", accepted: [areaOut[1]], normalise: ["trim", "collapse_whitespace"], explanation: "area(8, 7) is 56." }),
      pm("(c)", "Which statement is correct?", ["`area` is a function and `report` is a procedure", "`area` returns a value; `report` only prints."], [["`area` is a procedure and `report` is a function", "It is the other way round."], ["Both `area` and `report` are functions", "report has no return statement."], ["Both `area` and `report` are procedures", "area returns a value."]], "`area` has a return statement; `report` does not."),
      pm("(d)", "What happens if the statement `report(\"Plot C\")` is added?", ["An error: one argument is missing", "report needs two arguments."], [["It prints Plot C area: 0 using a default value", "No default value is given."], ["It prints Plot C and then carries on", "The call fails before printing."], ["Nothing happens because the extra call is ignored", "Python raises an error."]], "The arguments must match the parameters."),
      P.manual({ label: "(e)", marks: 2, stem: "Write the pseudocode header for the function `area`, with INTEGER parameters and an INTEGER result.", points: ["FUNCTION Area(Length : INTEGER, Width : INTEGER) with both parameters typed", "RETURNS INTEGER"], modelAnswer: "`FUNCTION Area(Length : INTEGER, Width : INTEGER) RETURNS INTEGER`", explanation: "A function header lists typed parameters and the returned type." }),
      P.manual({ label: "(f)", marks: 2, stem: "Give two benefits of using the function `area` instead of writing `length * width` each time.", points: ["The calculation is written once, so a change (or a correction) is made in one place", "The function can be tested separately and reused in other programs"], modelAnswer: "The calculation is written once, so a correction is made in one place, and the function can be tested separately and reused.", explanation: "Reuse and maintainability." }),
    ] });

  // ---- flashcards
  b.card("DEFINITION", "Procedure", "A named block of statements that performs a task when called with CALL; it does not return a value.");
  b.card("DEFINITION", "Function", "A named block that returns one value with RETURN; it is called inside an expression.");
  b.card("DEFINITION", "Parameter and argument", "Parameter: the variable in the routine's header. Argument: the actual value supplied in the call.");
  b.card("FACT", "BYVAL", "The routine gets a copy; changes inside do not affect the original variable.");
  b.card("FACT", "BYREF", "The routine works on the original variable; changes inside change it. Used with procedures.");
  b.card("FACT", "Headers in pseudocode", "PROCEDURE Name(P : TYPE) ... ENDPROCEDURE; FUNCTION Name(P : TYPE) RETURNS TYPE ... ENDFUNCTION; CALL Name(args).");
  b.card("CONCEPT", "Local and global variables", "Local: exists only inside the routine. Global: available everywhere, but avoid changing it inside routines.");
  b.card("CONCEPT", "Benefits of routines", "Reuse, easier testing and maintenance, shorter main program, work shared between programmers.");
  b.card("CONCEPT", "Python and BYREF", "Numbers and strings cannot be changed through a parameter: return the value, or pass a list.");
});
