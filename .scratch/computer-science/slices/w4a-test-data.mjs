// Slice w4a: test data and test plans (comp.algorithms.test-data). Expected and actual results are computed.
import { concept, P, ZIM } from "../lib.mjs";
import { fence, mdTable } from "./w4a-0-kit.mjs";

const res = (ok) => (ok ? "accepted" : "rejected");

// Rule A: hours of homework per week, whole number 0 to 30.
const okA = (x) => Number.isInteger(x) && x >= 0 && x <= 30;
// Rule B: quantity 5 to 25 inclusive, but the code uses > 5.
const okB = (x) => x >= 5 && x <= 25;
const actB = (x) => x > 5 && x <= 25;
const testsB = [12, 30, 5, 25, 4, 26];
const failsB = testsB.filter((x) => okB(x) !== actB(x));
// Rule C: score > 4 AND <= 20 (whole numbers).
const loC = 5;
const hiC = 20;
// Rule D: at least 18.
// Rule E: price 0.50 to 99.99 (2 dp).

// Struct: marks 0 to 100 with a faulty check.
const codeM = `REPEAT
    OUTPUT "Enter mark"
    INPUT Mark
UNTIL Mark >= 0 AND Mark < 100`;
const okM = (x) => x >= 0 && x <= 100;
const actM = (x) => x >= 0 && x < 100;
const testsM = [[57, "Normal"], [100, "Extreme"], [0, "Extreme"], [-1, "Abnormal"], [101, "Abnormal"]];
const failM = testsM.filter(([x]) => okM(x) !== actM(x)).map(([x]) => x);
if (failM.length !== 1 || failM[0] !== 100) throw new Error("marks test");
const planM = mdTable(["Test", "Test data", "Type", "Expected result"], testsM.map(([x, t], i) => [String(i + 1), String(x), t, i < 2 ? "?" : res(okM(x))]));

concept("comp.algorithms.test-data", { file: "algorithms/test-data", keyPrefix: "algorithms.test-data" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is **normal** test data?",
    options: [
      ["Sensible, valid data that the program should accept", "Correct."],
      ["Data of the wrong type that should be rejected", "That is abnormal data."],
      ["The largest and smallest values that are accepted", "That is extreme data."],
      ["Pairs of values either side of a limit", "That is boundary data."],
    ],
    answer: "A",
    explanation: "Normal data is typical, valid input that tests that the program does its ordinary job.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "A program accepts the hours of homework done in a week as a whole number from 0 to 30. Which value is **extreme** test data?",
    options: [
      ["30", "Correct: the largest value that is still accepted."],
      ["31", "31 is rejected; it is part of a boundary pair, not extreme data."],
      ["15", "15 is normal data."],
      ["-30", "-30 is abnormal data."],
    ],
    answer: "A",
    explanation: "Extreme data is the largest or smallest acceptable value: here 0 and 30.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "For the same rule (whole number from 0 to 30), which pair is **boundary** test data for the upper limit?",
    options: [
      ["30 and 31", "Correct: the last accepted and the first rejected value."],
      ["29 and 30", "Both are accepted; a boundary pair includes a rejected value."],
      ["0 and 30", "These are the two extreme values."],
      ["31 and 32", "Both are rejected; 30 must be included."],
    ],
    answer: "A",
    explanation: "Boundary data is given as a pair: the largest accepted value (30) and the smallest rejected value above it (31).",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "A program asks for the number of children in a family. Which input is **abnormal** data?",
    options: [
      ["\"three\"", "Correct: text where a whole number is expected should be rejected."],
      ["3", "3 is a sensible value: normal data."],
      ["0", "A family can have no children; 0 is valid."],
      ["5", "5 is a sensible value: normal data."],
    ],
    answer: "A",
    explanation: "Abnormal data should be rejected: out-of-range values or the wrong data type.",
  });
  b.match({
    d: 3, skill: "APPLICATION",
    hints: ["Is the value accepted? Is it at a limit?"],
    stem: "A program accepts a learner's height in centimetres as a whole number from 100 to 220. Classify each test value.",
    pairs: ["165", "220", "\"tall\"", "-150"],
    right: ["Normal", "Abnormal", "Extreme"],
    rightIndex: [0, 2, 1, 1],
    explanation: "165 is ordinary and valid; 220 is the largest accepted value; text and negative values are abnormal.",
  });
  b.fib({
    d: 3, skill: "APPLICATION",
    hints: ["Check each value against both limits.", "Are the limits included?"],
    stem: "A shop's program should accept an order quantity from 5 to 25 inclusive. State the **expected** result for each test.",
    template: testsB.map((x, i) => `${x}: {{blank:t${i}}}`).join("\n\n"),
    blanks: testsB.map((x, i) => ({ id: `t${i}`, accepted: [res(okB(x))], choices: ["accepted", "rejected"] })),
    explanation: testsB.map((x) => `${x} ${res(okB(x))}`).join("; ") + ".",
  });
  b.num({
    d: 4, skill: "ANALYSIS",
    hints: ["Work out the actual result for each test from the code.", "Compare it with the expected result."],
    stem: `The shop's programmer wrote this check for quantities that should be from 5 to 25 inclusive:\n\n${fence(`REPEAT\n    INPUT Quantity\nUNTIL Quantity > 5 AND Quantity <= 25`)}\n\nThe test data is ${testsB.join(", ")}. How many of these tests give an actual result that differs from the expected result?`,
    value: failsB.length,
    wrong: [0],
    explanation: `Only ${failsB.join(", ")} is treated wrongly: it should be accepted, but \`${failsB[0]} > 5\` is false, so it is rejected. The condition should be \`Quantity >= 5\`.`,
    workedSolution: testsB.map((x, i) => `${i + 1}. ${x}: expected ${res(okB(x))}, actual ${res(actB(x))}.`).join("\n") + `\n${testsB.length + 1}. Differences: ${failsB.length}.`,
  });
  b.num({
    d: 3, skill: "APPLICATION",
    hints: ["> 4 does not include 4."],
    stem: "A validation check accepts whole-number scores when `Score > 4 AND Score <= 20`. What is the **smallest** extreme test value?",
    value: loC,
    wrong: [4],
    explanation: `\`Score > 4\` excludes 4, so the smallest accepted whole number is ${loC}. The largest is ${hiC}.`,
    workedSolution: `1. Score > 4 means 5 and above.\n2. Smallest accepted whole number: ${loC}.`,
  });
  b.short({
    d: 2, skill: "APPLICATION",
    stem: "A program accepts the age of a new driver if it is **at least 18**. Ages are whole numbers. State the rejected value that forms a boundary pair with 18.",
    accepted: ["17"],
    rejected: ["19", "18"],
    wrong: ["19"],
    explanation: "18 is the smallest accepted age; the value just below it, 17, should be rejected, so 17 and 18 are the boundary pair.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    hints: ["Prices have two decimal places."],
    stem: "A program accepts prices from 0.50 to 99.99, entered to two decimal places. Which value should be rejected and forms a boundary pair with 99.99?",
    options: [
      ["100.00", "Correct: the next possible price above 99.99."],
      ["100.99", "The next possible price is only one cent higher."],
      ["99.98", "99.98 is accepted."],
      ["101.00", "This is abnormal, but not next to the limit."],
    ],
    answer: "A",
    explanation: "With two decimal places the step is 0.01, so the first rejected price above 99.99 is 100.00.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    hints: ["Which mistakes in conditions only show at the limits?"],
    stem: "Why is boundary data especially useful when testing a validation check?",
    options: [
      ["It finds conditions that use < or > where <= or >= was needed", "Correct: off-by-one errors only show at the limits."],
      ["It checks the program can handle data of the wrong type", "That is the job of abnormal data such as text."],
      ["It is the quickest data to type in during testing", "Speed of typing is not the reason."],
      ["It proves that the program has no errors at all", "Testing can show errors exist, not prove there are none."],
    ],
    answer: "A",
    explanation: "A wrong comparison operator still handles ordinary values correctly; only values at and just beyond the limit reveal it.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Extreme test data should be accepted by the program.",
    answer: true,
    explanation: "True. Extreme data is the largest or smallest acceptable value, so it must be accepted.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Abnormal test data means only data of the wrong data type, such as letters instead of numbers.",
    answer: false,
    explanation: "False. Abnormal data also includes values of the right type that are outside the allowed range, such as -3 or 150.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING", applies: ZIM,
    stem: "Match each column of a test plan to what it records.",
    pairs: [
      ["Purpose", "What the test is checking"],
      ["Test data", "The values to be entered"],
      ["Expected result", "What should happen, decided before the test"],
      ["Actual result", "What did happen when the test was run"],
    ],
    explanation: "A test plan is written before testing; the actual results are added afterwards and compared with the expected ones.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 4,
    hints: ["One value of each type, with whether it is accepted.", "Boundary data is a pair."],
    stem: "A school canteen in Harare accepts orders of 1 to 6 meals per learner (whole numbers). Give one example of each type of test data (normal, abnormal, extreme, boundary) and state whether it should be accepted.",
    points: [
      "Normal: a value from 2 to 5 (e.g. 3), accepted",
      "Abnormal: a value out of range (e.g. 9 or -2) or of the wrong type (e.g. \"two\"), rejected",
      "Extreme: 1 or 6, accepted",
      "Boundary: 0 and 1 (0 rejected, 1 accepted) or 6 and 7 (6 accepted, 7 rejected)",
    ],
    explanation: "Each type has a role: ordinary use, rejection of bad input, and the limits.",
    modelAnswer: "Normal: 4, accepted. Abnormal: \"six\", rejected. Extreme: 6, accepted. Boundary: 6 and 7, with 6 accepted and 7 rejected.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 2,
    stem: "Explain the difference between extreme data and boundary data.",
    points: [
      "Extreme data is the largest / smallest value that is accepted",
      "Boundary data is a pair: the largest / smallest accepted value and the matching value just outside the limit, which is rejected",
    ],
    explanation: "Both test the limits; boundary data also tests the first value that must be rejected.",
    modelAnswer: "Extreme data is the highest or lowest value that should be accepted, such as 10 for a range of 1 to 10. Boundary data tests both sides of a limit, such as 10 (accepted) and 11 (rejected).",
  });
  b.manualShort({
    d: 4, skill: "CREATION", marks: 4, applies: ZIM,
    hints: ["Include a purpose and an expected result in each row."],
    stem: "A program for a library in Bulawayo accepts the number of days a book is borrowed, a whole number from 1 to 14. Write a test plan with **four** tests, one of each type of test data, giving the purpose, test data, type and expected result of each.",
    points: [
      "Normal test (e.g. 7) with expected result accepted",
      "Abnormal test (e.g. 20, -1 or text) with expected result rejected / error message",
      "Extreme test (1 or 14) with expected result accepted",
      "Boundary test (0 and 1, or 14 and 15) with the expected result for both values, and every row has a sensible purpose",
    ],
    explanation: "A test plan sets the expected result before testing so the actual result can be compared with it.",
    modelAnswer: "| Test | Purpose | Test data | Type | Expected result |\n|:-:|:--|:-:|:-:|:--|\n| 1 | Ordinary loan | 7 | Normal | Accepted |\n| 2 | Too long a loan | 20 | Abnormal | Rejected with an error message |\n| 3 | Longest loan allowed | 14 | Extreme | Accepted |\n| 4 | Upper limit | 14 and 15 | Boundary | 14 accepted, 15 rejected |",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 8, secs: 720,
    hints: ["Work out what the code actually does with 100.", "Expected results come from the rule, not from the code."],
    stem: `Marks in a Form 3 test must be whole numbers from 0 to 100. Nyasha writes this check:\n\n${fence(codeM)}\n\nShe plans these tests:\n\n${planM}`,
    parts: [
      P.fib({
        label: "(a)", marks: 2, stem: "State the expected result of tests 1 and 2.",
        template: "Test 1: {{blank:a}}\n\nTest 2: {{blank:b}}",
        blanks: [
          { id: "a", accepted: [res(okM(testsM[0][0]))], choices: ["accepted", "rejected"] },
          { id: "b", accepted: [res(okM(testsM[1][0]))], choices: ["accepted", "rejected"] },
        ],
        explanation: `${testsM[0][0]} and ${testsM[1][0]} are both valid marks, so both should be accepted.`,
      }),
      P.num({
        label: "(b)", stem: "State the test number whose actual result will differ from the expected result.",
        value: testsM.findIndex(([x]) => x === failM[0]) + 1, wrong: [testsM.length],
        explanation: `With \`Mark < 100\`, the mark ${failM[0]} is rejected although it is valid.`,
        workedSolution: testsM.map(([x], i) => `${i + 1}. ${x}: expected ${res(okM(x))}, actual ${res(actM(x))}.`).join("\n"),
      }),
      P.mcq({
        label: "(c)", stem: "Which correction should be made?",
        options: [["`UNTIL Mark >= 0 AND Mark <= 100`", "Correct: 100 is now accepted."], ["`UNTIL Mark > 0 AND Mark < 100`", "This would also reject 0."], ["`UNTIL Mark >= 0 OR Mark <= 100`", "With OR every number is accepted."], ["`UNTIL Mark <= 0 AND Mark >= 100`", "No number satisfies both parts."]],
        answer: "A", explanation: "Both limits are included, so use >= and <=.",
      }),
      P.short({
        label: "(d)", stem: "State the value that should be added to test 2 to make it a boundary test pair.",
        accepted: ["101"], rejected: ["99", "100"], wrong: ["99"],
        explanation: "100 is the largest accepted mark; 101 is the first rejected value above it.",
      }),
      P.manual({
        label: "(e)", marks: 3, stem: "Nyasha's normal, abnormal and extreme tests are planned. Explain why she should still include test data of the wrong type, and suggest a suitable value and its expected result.",
        points: [
          "A user might type a non-numeric value (e.g. letters) by mistake",
          "The program should reject it with a message rather than crash / store invalid data",
          "Suitable value such as \"fifty\" (or a decimal such as 57.5 for whole-number marks) with expected result rejected",
        ],
        modelAnswer: "A teacher could type letters such as \"fifty\" by mistake. Testing this checks that the program rejects the entry with an error message instead of crashing or storing it. Test: \"fifty\", expected result rejected.",
      }),
    ],
    explanation: `(b) Test ${testsM.findIndex(([x]) => x === failM[0]) + 1}: 100 is wrongly rejected.`,
  });
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, marks: 5, secs: 450,
    hints: ["Extreme values are accepted.", "Boundary is a pair."],
    stem: "A weather station records wind speeds as whole numbers from 0 to 150 km/h.",
    parts: [
      P.short({
        label: "(a)", stem: "State the largest extreme test value.",
        accepted: ["150"], rejected: ["151", "0"], wrong: ["151"],
        explanation: "150 is the largest value accepted.",
      }),
      P.mcq({
        label: "(b)", stem: "Which value is abnormal data?",
        options: [["-5", "Correct: wind speed cannot be negative here."], ["0", "0 is accepted (extreme)."], ["75", "75 is normal."], ["150", "150 is accepted (extreme)."]],
        answer: "A", explanation: "-5 is outside the range and should be rejected.",
      }),
      P.fib({
        label: "(c)", stem: "Complete the boundary pair for the lower limit.",
        template: "{{blank:a}} (rejected) and {{blank:b}} (accepted)",
        blanks: [
          { id: "a", accepted: ["-1"], input: "number", wrong: "1" },
          { id: "b", accepted: ["0"], input: "number", wrong: "1" },
        ],
        explanation: "0 is the smallest accepted value and -1 the value just below it.",
      }),
      P.manual({
        label: "(d)", marks: 1, stem: "Give one example of normal data.",
        points: ["Any whole number from 1 to 149 (e.g. 40)"],
        modelAnswer: "40",
      }),
    ],
    explanation: "150; -5; -1 and 0.",
  });

  b.card("DEFINITION", "Normal data", "Sensible, valid data that should be accepted and processed correctly.");
  b.card("DEFINITION", "Abnormal data", "Data that should be rejected: out of range or the wrong type (also called erroneous data).");
  b.card("DEFINITION", "Extreme data", "The largest and smallest values that are still accepted.");
  b.card("DEFINITION", "Boundary data", "A pair either side of a limit: the last accepted value and the first rejected value (e.g. 10 and 11 for 1 to 10).");
  b.card("CONCEPT", "Why boundary data", "Finds off-by-one errors such as < used instead of <=, which only show at the limits.");
  b.card("DEFINITION", "Test plan", "Table of tests: number, purpose, test data, type, expected result; actual result added when run.");
  b.card("CONCEPT", "Expected vs actual result", "Expected is decided from the requirements before testing; a different actual result shows an error.");
  b.card("FACT", "Decimal limits", "The first rejected value depends on precision: for two decimal places, the value next to 99.99 is 100.00.");
});
