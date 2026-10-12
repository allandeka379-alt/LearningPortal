// W3b exam-format items: two Cambridge Paper 2 structured questions (CAM_P2_SHORT, 12 marks) on testing and program design.
import { concept, P, EXAM, checkExam, CAM, chk, same, mdTable, codeBlock } from "../lib.mjs";

const Z = { skill: EXAM.CAM_P2_SHORT.skill, secs: EXAM.CAM_P2_SHORT.secs, examStyle: true, applies: CAM };
const C = (k) => `acs.${k}`;

concept(C("sdlc.testing-maintenance"), { file: "exam/w3b-cambridge", keyPrefix: "exam.w3b-cambridge", applies: CAM }, (b) => {
  // ------------------------------------------------------------------ 1. Testing: test data, expected results and error type
  {
    const pseudo = `DECLARE Mark, Count, Passes : INTEGER
Count ← 0
Passes ← 0
REPEAT
    INPUT Mark
    IF Mark >= 0 AND Mark < 100 THEN
        Count ← Count + 1
        IF Mark >= 50 THEN
            Passes ← Passes + 1
        ENDIF
    ENDIF
UNTIL Mark = -1
OUTPUT "Passes: ", Passes, " of ", Count`;
    // JS mirror of the program as written (bug) and as specified
    const inputs = [62, 100, 49, 50, -1];
    const run = (upper) => {
      let count = 0;
      let passes = 0;
      for (const m of inputs) {
        if (m >= 0 && (upper ? m <= 100 : m < 100)) {
          count++;
          if (m >= 50) passes++;
        }
        if (m === -1) break;
      }
      return { count, passes };
    };
    const asWritten = run(false);
    const asSpecified = run(true);
    same(asWritten, { count: 3, passes: 2 });
    same(asSpecified, { count: 4, passes: 3 });
    // expected results with the corrected condition for three tests
    const counted = (m) => (m >= 0 && m <= 100 ? "counted" : "not counted");
    same([counted(0), counted(100), counted(101)], ["counted", "counted", "not counted"]);
    b.struct({
      ...Z, d: 4, paper: "Cambridge Paper 2",
      concepts: [C("sdlc.testing-maintenance")],
      stem: `A teacher's program counts the marks entered and how many of them are passes. The specification says that a valid mark is a whole number from 0 to 100 inclusive, that a mark of 50 or more is a pass, and that -1 ends the input (it is not a mark). This pseudocode was written.\n\n${codeBlock(pseudo)}\n\nThe teacher enters the values 62, 100, 49, 50 and -1. According to the specification, the correct output is \`Passes: 3 of 4\`.`,
      parts: checkExam(EXAM.CAM_P2_SHORT, [
        P.fib({ label: "(a)", marks: 2, stem: "State the output of the pseudocode as written for these inputs.", template: "Passes: {{blank:a}} of {{blank:b}}", blanks: [{ id: "a", input: "number", accepted: [String(asWritten.passes)] }, { id: "b", input: "number", accepted: [String(asWritten.count)] }], explanation: "62, 49 and 50 are counted (3) and 62 and 50 are passes (2); 100 is rejected because the test is Mark < 100." }),
        P.short({ label: "(b)", marks: 1, stem: "State the type of error in the pseudocode.", accepted: ["logic error", "logic", "a logic error"], explanation: "The program runs but gives a wrong result." }),
        P.short({ label: "(c)", marks: 1, stem: "Rewrite the condition `Mark < 100` so that the program meets the specification.", accepted: ["Mark <= 100", "Mark < 101"], normalise: ["trim", "lowercase", "remove_whitespace"], explanation: "100 must be accepted, so use <= 100." }),
        P.fib({ label: "(d)", marks: 3, stem: "The error is corrected. Complete the expected result for each test: state whether the mark is counted by the corrected program.", template: "Test 1, mark 0: {{blank:a}}\n\nTest 2, mark 100: {{blank:b}}\n\nTest 3, mark 101: {{blank:c}}", blanks: [{ id: "a", accepted: ["counted"], choices: ["counted", "not counted"] }, { id: "b", accepted: ["counted"], choices: ["counted", "not counted"] }, { id: "c", accepted: ["not counted"], choices: ["counted", "not counted"] }], explanation: "0 and 100 are valid boundary values; 101 is invalid." }),
        P.manual({ label: "(e)", marks: 2, stem: "Explain why 100 was a good choice of test data to find this error.", points: ["100 is the upper boundary of the valid range (extreme data)", "Errors with < and <= occur at the boundary, and the test with 100 shows that a valid mark was wrongly rejected"], modelAnswer: "100 is the upper boundary of the valid range. Mistakes with < and <= happen at the boundary, and the test with 100 shows that a valid mark was wrongly rejected.", explanation: "Boundary data finds comparison errors." }),
        P.manual({ label: "(f)", marks: 3, stem: "Describe how the programmer could use a dry run to find the error.", points: ["Follow the pseudocode by hand with the inputs 62, 100, 49, 50 and -1", "Record the values of Mark, Count and Passes in a trace table after each input", "Compare the final values with the expected result and see that the input 100 was not counted at the IF statement"], modelAnswer: "Follow the pseudocode by hand with the inputs, recording Mark, Count and Passes in a trace table after each input. Comparing the final values with the expected result shows that the input 100 was not counted at the IF statement.", explanation: "Trace table and comparison." }),
      ]),
      hints: ["Is 100 accepted by the condition Mark < 100?", "A valid mark is 0 to 100 inclusive."],
      explanation: "As written the program outputs Passes: 2 of 3, because 100 is rejected; the correct condition is Mark <= 100.",
    });
  }
  // ------------------------------------------------------------------ 2. Structure chart, state-transition and life-cycle choice
  {
    const chart = mdTable(["Module", "Data passed in", "Data returned"], [
      ["ReadScores", "none", "Scores"],
      ["FindTotal", "Scores", "Total"],
      ["FindAverage", "Total, Count", "Average"],
      ["PrintReport", "Average", "none"],
    ]);
    const trans = { Locked: { Coin: "Unlocked", Push: "Locked" }, Unlocked: { Coin: "Unlocked", Push: "Locked" } };
    const seq = ["Push", "Coin", "Push", "Push", "Coin"];
    let s = "Locked";
    const after = [];
    for (const i of seq) {
      s = trans[s][i];
      after.push(s);
    }
    same(after, ["Locked", "Unlocked", "Locked", "Locked", "Unlocked"]);
    const stateTable = mdTable(["Current state", "Input: Coin", "Input: Push"], Object.keys(trans).map((st) => [st, trans[st].Coin, trans[st].Push]));
    const pseudoAvg = `FUNCTION FindAverage(Total : INTEGER, Count : INTEGER) RETURNS REAL
    IF Count = 0 THEN
        RETURN 0
    ELSE
        RETURN Total / Count
    ENDIF
ENDFUNCTION`;
    b.struct({
      ...Z, d: 3, paper: "Cambridge Paper 2",
      concepts: [C("sdlc.program-design"), C("sdlc.life-cycles")],
      stem: `A football club in Gweru is developing a program to report on the entry gates and the scores of its matches. The club secretary is not sure which reports she needs and will try a new version of the program every two weeks.\n\nPart of the program is designed with this structure chart, shown as a table.\n\n${chart}\n\nA turnstile at a gate is controlled by this state-transition table. It starts in the state Locked.\n\n${stateTable}`,
      parts: checkExam(EXAM.CAM_P2_SHORT, [
        P.fib({ label: "(a)", marks: 3, stem: "Complete the structure chart by choosing the missing data items.", template: "ReadScores returns: {{blank:a}}\n\nFindTotal is passed: {{blank:b}}\n\nFindAverage returns: {{blank:c}}", blanks: [{ id: "a", accepted: ["Scores"], choices: ["Scores", "Total", "Average", "Count"] }, { id: "b", accepted: ["Scores"], choices: ["Scores", "Total", "Average", "Count"] }, { id: "c", accepted: ["Average"], choices: ["Scores", "Total", "Average", "Count"] }], explanation: "The table gives ReadScores returning Scores, FindTotal passed Scores, FindAverage returning Average." }),
        P.manual({ label: "(b)", marks: 3, stem: "Write the pseudocode for the module `FindAverage` as a function that returns 0 if `Count` is 0.", points: ["Function header with the parameters Total and Count and RETURNS REAL", "Selection testing Count = 0 and returning 0", "Otherwise returns Total / Count, with ENDIF and ENDFUNCTION"], modelAnswer: `\n${codeBlock(pseudoAvg)}`, explanation: "A guard against dividing by zero." }),
        P.fib({ label: "(c)", marks: 3, stem: "The turnstile receives the inputs Push, Coin, Push, Push, Coin in that order. State the state after the 2nd, 3rd and 5th inputs.", template: "After the 2nd input: {{blank:a}}\n\nAfter the 3rd input: {{blank:b}}\n\nAfter the 5th input: {{blank:c}}", blanks: [{ id: "a", accepted: [after[1]], choices: ["Locked", "Unlocked"] }, { id: "b", accepted: [after[2]], choices: ["Locked", "Unlocked"] }, { id: "c", accepted: [after[4]], choices: ["Locked", "Unlocked"] }], explanation: "Locked → Locked (Push) → Unlocked (Coin) → Locked (Push) → Locked (Push) → Unlocked (Coin)." }),
        P.manual({ label: "(d)", marks: 3, stem: "State which development life cycle model is the most suitable for the club's program and justify your choice.", points: ["Iterative (or RAD)", "The secretary is not sure of the requirements, so each version can be changed after she has tried it", "She will test a new version every two weeks, so feedback is frequent (waterfall would show the program too late)"], modelAnswer: "An iterative model is suitable. The secretary is unsure of the requirements, so each version can be changed after she has tried it, and she tests a new version every two weeks, so feedback is frequent.", explanation: "Choice linked to the scenario." }),
      ]),
      hints: ["Read the data in the table for each module.", "Follow the inputs one at a time."],
      explanation: "Structure chart items; the turnstile ends Unlocked after the fifth input; an iterative model suits unclear requirements.",
    });
  }
});
