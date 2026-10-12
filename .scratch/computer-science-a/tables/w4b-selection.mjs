import { run, writeLesson, mdTable, codeBlock, py, same } from "./w4b-q.mjs";

// ---- grade function, run over marks (bands are this lesson's own)
const gradeDef = `def grade(mark):
    if mark < 0 or mark > 100:
        return "Invalid"
    elif mark >= 70:
        return "A"
    elif mark >= 55:
        return "B"
    elif mark >= 40:
        return "C"
    else:
        return "U"
`;
const marks = [-3, 0, 39, 40, 54, 55, 69, 70, 100, 101];
const gradeOut = py(`${gradeDef}\nfor m in ${JSON.stringify(marks)}:\n    print(grade(m))`).split("\n");
same(gradeOut, ["Invalid", "U", "U", "C", "C", "B", "B", "A", "A", "Invalid"]);
const gradeTable = mdTable(["Mark entered", "Type of data", "Output"], marks.map((m, i) => [m, [-3, 101].includes(m) ? "abnormal" : [0, 40, 55, 70, 100].includes(m) ? "boundary" : "normal", gradeOut[i]]));
const gradeRun = run(`${gradeDef}
mark = int(input())
print(grade(mark))`, "55");
same(gradeRun.out, "B");

// ---- leap year compound condition
const leapDef = `def is_leap(year):
    return (year % 4 == 0 and year % 100 != 0) or year % 400 == 0
`;
const years = [1900, 2000, 2024, 2026];
const leapOut = py(`${leapDef}\nfor y in ${JSON.stringify(years)}:\n    print(is_leap(y))`).split("\n");
same(leapOut, ["False", "True", "True", "False"]);
const leapTable = mdTable(["Year", "year MOD 4 = 0", "year MOD 100 <> 0", "year MOD 400 = 0", "Leap year?"], years.map((y, i) => [y, y % 4 === 0 ? "TRUE" : "FALSE", y % 100 !== 0 ? "TRUE" : "FALSE", y % 400 === 0 ? "TRUE" : "FALSE", leapOut[i] === "True" ? "TRUE" : "FALSE"]));

// ---- menu with CASE / match
const menuCode = `def menu(choice):
    match choice:
        case 1:
            return "Check balance"
        case 2:
            return "Buy airtime"
        case 3 | 4:
            return "Send money"
        case _:
            return "Invalid choice"
`;
const menuOut = py(`${menuCode}\nfor c in [1, 2, 4, 9]:\n    print(menu(c))`).split("\n");
same(menuOut, ["Check balance", "Buy airtime", "Send money", "Invalid choice"]);

// ---- order of conditions error
const wrongOrder = run(`def band(mark):
    if mark >= 40:
        return "Pass"
    elif mark >= 70:
        return "Distinction"
    else:
        return "Fail"

print(band(85))`);
same(wrongOrder.out, "Pass");

// ---- De Morgan truth values
const dm = [];
for (const a of [0, 1]) for (const b of [0, 1]) dm.push([a ? "TRUE" : "FALSE", b ? "TRUE" : "FALSE", !(a && b) ? "TRUE" : "FALSE", (!a || !b) ? "TRUE" : "FALSE"]);
const dmMd = mdTable(["A", "B", "NOT (A AND B)", "(NOT A) OR (NOT B)"], dm);
same(dm.map((r) => r[2] === r[3]), [true, true, true, true]);

const body = `
## Introduction

A mobile-money menu sends you to a different screen depending on the number you press, a school report system prints a grade that depends on the mark, and a gate controller opens only if the card is valid **and** it is the right time of day. All of these are **selection**: the program chooses which statements to run according to a condition. Without selection a program would do exactly the same thing every time.

This lesson covers \`IF ... THEN ... ELSE ... ENDIF\`, nested and compound conditions, \`CASE OF ... OTHERWISE ... ENDCASE\`, their Python equivalents (\`if/elif/else\` and \`match\`), how to choose between them and the errors that students make in conditions. You should know the data types and operators from the previous lesson, including the relational operators and \`AND\`, \`OR\` and \`NOT\`.

## Key definitions

:::definition{term="Selection"}
A programming construct in which a condition is evaluated and one of two or more paths of statements is followed according to whether the condition is true or false.
:::

:::definition{term="Condition"}
An expression that evaluates to a Boolean value, TRUE or FALSE, usually made with relational operators (\`=\`, \`<>\`, \`<\`, \`<=\`, \`>\`, \`>=\`) and combined with the logical operators \`AND\`, \`OR\` and \`NOT\`.
:::

:::definition{term="Nested selection"}
A selection statement placed inside the true or false branch of another selection statement, so that a second decision is made only when the first has been decided.
:::

:::definition{term="Multiple selection"}
A construct (\`CASE OF\` in pseudocode, \`match\` in Python) that compares one expression against a list of values and runs the statements of the value that matches, with a default branch for all other values.
:::

## IF statements

The general form in 9618-style pseudocode has a condition, a \`THEN\` part and an optional \`ELSE\` part, closed by \`ENDIF\`. Statements inside are indented by four spaces. A chain of alternatives is written by placing a new \`IF\` in the \`ELSE\` branch; Python shortens this to \`elif\`.

${codeBlock(`IF Mark >= 70 THEN
    Grade ← "A"
ELSE
    IF Mark >= 55 THEN
        Grade ← "B"
    ELSE
        Grade ← "C"
    ENDIF
ENDIF`)}

The conditions are tested from the top. The first one that is true decides the path, and the rest are skipped. The order therefore matters, as the common mistakes below show.

:::worked-solution{title="A grading function with test data"}
A school classifies a mark from 0 to 100 as A (70 or more), B (55 to 69), C (40 to 54) or U (below 40); anything outside 0 to 100 is invalid. The function in Python:

${codeBlock(gradeDef.trim(), "python")}

The program was run with each of the following marks. The expected result of each test was worked out from the bands before running.

${gradeTable}

Boundary values (0, 40, 55, 70 and 100) are the most important tests, because errors with \`>\` and \`>=\` appear there. The abnormal values -3 and 101 must be rejected. A complete run of the program with the input 55:

${gradeRun.code}

Output:

${gradeRun.outBlock}
:::

## Compound conditions

Conditions are combined with \`AND\` (both must be true), \`OR\` (at least one must be true) and \`NOT\` (reverses the value). A range test needs \`AND\`: a mark is valid if \`Mark >= 0 AND Mark <= 100\`. A test for values outside a range needs \`OR\`: a mark is invalid if \`Mark < 0 OR Mark > 100\`. Writing \`0 <= Mark <= 100\` is not allowed in pseudocode; each comparison must be written out in full.

The two forms are connected by De Morgan's laws: \`NOT (A AND B)\` is the same as \`(NOT A) OR (NOT B)\`. The table below was computed for all four combinations and the last two columns agree on every row.

${dmMd}

:::worked-solution{title="A compound condition: the leap year"}
A year is a leap year if it is divisible by 4, except that a year divisible by 100 is a leap year only if it is also divisible by 400. In pseudocode:

${codeBlock(`IF (MOD(Year, 4) = 0 AND MOD(Year, 100) <> 0) OR MOD(Year, 400) = 0 THEN
    OUTPUT "Leap year"
ELSE
    OUTPUT "Not a leap year"
ENDIF`)}

Evaluating the condition for four years (the Python version of the condition was run to check the last column):

${leapTable}

1900 is divisible by 100 but not by 400, so it is not a leap year. 2000 is divisible by 400, so it is. 2024 passes the first bracket. 2026 is not divisible by 4. The brackets matter: without them the \`AND\` and the \`OR\` could be grouped differently, because \`AND\` is worked before \`OR\`.
:::

## Multiple selection with CASE

When one variable is compared with several fixed values, a \`CASE\` statement is clearer than a long chain of \`IF\` statements. Each branch gives a value (or a list or range of values) and the statements to run; \`OTHERWISE\` handles everything else.

${codeBlock(`CASE OF Choice
    1 : OUTPUT "Check balance"
    2 : OUTPUT "Buy airtime"
    3, 4 : OUTPUT "Send money"
    OTHERWISE : OUTPUT "Invalid choice"
ENDCASE`)}

Python 3.10 and later has \`match\` with \`case\` branches; older code uses \`if/elif\`. This function was run with the choices 1, 2, 4 and 9, and gave "Check balance", "Buy airtime", "Send money" and "Invalid choice":

${codeBlock(menuCode.trim(), "python")}

Use \`CASE\` when you test one expression against discrete values (menu options, a letter, a month number). Use \`IF\` when the conditions involve ranges, different variables or compound tests.

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards expect IF (with ELSE and nesting) and CASE in 9618-style pseudocode, compound conditions, and the Python equivalents (ZIMSEC Form 5; Cambridge AS Level, Papers 1 and 2). In a CASE statement the 9618 guide allows a value, a list of values or a range (written with TO) on each branch. Whether a practical answer may use \`match\` depends on the Python version installed; \`if/elif\` always works.
:::

## Common mistakes

:::mistake{title="Conditions in the wrong order"}
In an \`elif\` chain the first true condition wins. The function below tests \`mark >= 40\` first, so the mark 85 reaches that branch and the later test for 70 is never used:

${wrongOrder.code}

Output:

${wrongOrder.outBlock}

Put the most restrictive condition (the highest boundary) first, or add an upper limit to each test.
:::

:::mistake{title="Using AND where OR is needed"}
"A mark is invalid if it is below 0 and above 100" can never be true. A value outside a range needs \`OR\`.
:::

:::mistake{title="Using = to assign in a condition"}
In pseudocode \`IF Choice = 2\` tests equality. In Python \`=\` is assignment and a condition needs \`==\`; writing \`if choice = 2:\` is a syntax error.
:::

:::mistake{title="Missing the boundary"}
"55 or more" is \`>= 55\`, not \`> 55\`. Always test the boundary values.
:::

## Exam tips

:::exam-tip
In ZIMSEC Paper 1 and Cambridge Papers 1 and 2 you may be asked to **trace** a selection statement with given data, **complete** a CASE statement, **identify the error** in a condition or **write** the pseudocode for a rule given in words. Translate each phrase carefully: "at least" is \`>=\`, "more than" is \`>\`, "between 10 and 20 inclusive" is \`>= 10 AND <= 20\`.
:::

:::exam-tip
When you **choose test data**, give a normal value, each boundary value and an abnormal value, with the expected result of each. In the practical papers, test every branch of your program at least once.
:::

## Summary

:::summary
- Selection chooses a path by evaluating a Boolean condition; \`IF ... THEN ... ELSE ... ENDIF\` can be nested, and Python writes the chain as \`if/elif/else\`.
- Conditions are combined with \`AND\`, \`OR\` and \`NOT\`; \`AND\` is worked before \`OR\`, so use brackets; De Morgan's laws relate the forms.
- \`CASE OF ... OTHERWISE ... ENDCASE\` (Python \`match\`) compares one expression with fixed values, lists or ranges.
- Conditions in an \`elif\` chain are tested in order and the first true one wins.
- Test the boundary values of every condition, and choose abnormal data that should be rejected.
:::
`;
writeLesson({ key: "prog.selection", title: "Selection: IF statements and CASE statements", summary: "IF THEN ELSE with nesting, compound conditions with AND, OR and NOT, De Morgan's laws, CASE OF with OTHERWISE, the Python if/elif/else and match equivalents, choosing between IF and CASE, test data and common errors in conditions.", concept: "acs.prog.selection", minutes: 50 }, body);
