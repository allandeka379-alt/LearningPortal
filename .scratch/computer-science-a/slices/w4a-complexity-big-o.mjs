// Slice w4a: comparing algorithms and Big O notation (acs.algo.complexity-big-o, Cambridge only).
import { concept, P, chk, same, mdTable, codeBlock, CAM } from "../lib.mjs";
import { mc, pm } from "../tables/w4a-q.mjs";

concept("acs.algo.complexity-big-o", { file: "algo/complexity-big-o", keyPrefix: "algo.complexity-big-o", applies: CAM }, (b) => {
  const halve = (n) => { let c = 0; while (n > 1) { n = Math.floor(n / 2); c++; } return c; };
  chk(halve(1024), 10); chk(halve(256), 8);
  const tri = (n) => { let c = 0; for (let r = 1; r <= n; r++) for (let k = 1; k <= r; k++) c++; return c; };
  chk(tri(10), 55);
  chk(16 * Math.log2(16), 64);
  const pairs = (n) => { let c = 0; for (let o = 1; o <= n; o++) for (let i = 1; i <= n; i++) c++; return c; };
  chk(pairs(12), 144); chk(pairs(24), 576);
  let cross = 0; for (let n = 1; n < 2000; n++) if (200 * n < n * n) { cross = n; break; }
  chk(cross, 201); chk(50 * 50, 2500);
  chk(2 ** 10, 1024); chk(3 * 100 + 5, 305);

  // ---- multiple choice
  mc(b, 2, "RECALL", "What does Big O notation describe?",
    ["How the work of an algorithm grows with the input size", "Correct."],
    [["The exact time in seconds that a program takes on one computer", "Big O ignores the speed of the computer."], ["The number of lines in the source code of an algorithm", "Length of code is not what Big O measures."], ["The number of errors left in a program after testing", "Errors are not part of complexity."]],
    "Big O gives the order of growth of time or space with n.", { daily: true });
  mc(b, 2, "RECALL", "What is the time complexity of reading one element of an array using its index?",
    ["O(1)", "Correct: one step whatever the size of the array."],
    [["O(n)", "That would mean the time grows with the number of items."], ["O(log n)", "No halving takes place."], ["O(n²)", "No loops are involved."]],
    "Direct access takes constant time.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "Which of these orders grows fastest as n increases?",
    ["O(2ⁿ)", "Correct: exponential growth."],
    [["O(n²)", "Quadratic growth is slower than exponential."], ["O(n log n)", "This grows more slowly than O(n²)."], ["O(log n)", "This is the slowest growth of the four."]],
    "The order from slowest to fastest is O(1), O(log n), O(n), O(n log n), O(n²), O(2ⁿ).");
  mc(b, 3, "APPLICATION", "An algorithm has a loop that runs n times, and inside it another loop that also runs n times. What is its time complexity?",
    ["O(n²)", "Correct: n × n repetitions."],
    [["O(n)", "That would be one loop only."], ["O(2n)", "The loops are nested, not one after the other."], ["O(log n)", "No halving takes place."]],
    "Nested loops multiply.", { hints: ["How many times does the inner statement run altogether?"] });
  mc(b, 3, "APPLICATION", "An algorithm takes 3n + 5 steps for n items. Which is its time complexity?",
    ["O(n)", "Correct: the constants are ignored."],
    [["O(3n + 5)", "Big O keeps only the fastest-growing term and no constants."], ["O(5)", "The constant term does not decide the growth."], ["O(n²)", "There is no n² term."]],
    "Drop the constant factor and the smaller term.", { hints: ["Which term grows with n, and what happens to the constants?"] });
  mc(b, 2, "RECALL", "What is the time complexity of a binary search?",
    ["O(log n)", "Correct: the list is halved each comparison."],
    [["O(n)", "That is a linear search."], ["O(n²)", "That is the worst case for a bubble sort."], ["O(1)", "That is only the best case."]],
    "Halving the remaining items gives logarithmic growth.");
  mc(b, 4, "ANALYSIS", "A teacher says that algorithm X is better than algorithm Y because X took 2 seconds and Y took 3 seconds on one computer. Why is this not a good way to compare their complexity?",
    ["The times depend on the computer used, not on how the work grows", "Correct."],
    [["Seconds can only be measured for sorting algorithms and searches", "Any program can be timed."], ["Algorithm Y must always be better because it took longer to run", "A longer time is not a sign of a better algorithm, and one timing does not show growth."], ["Complexity is only about the amount of memory that is used", "Complexity covers time and memory."]],
    "Big O counts steps as n grows and does not depend on the machine.", { hints: ["Would the same two timings be found on a faster computer or with larger data?"] });
  mc(b, 3, "UNDERSTANDING", "What is the worst-case time complexity of a linear search of n items?",
    ["O(n)", "Correct: the item is last or missing."],
    [["O(1)", "That is the best case, the item is first."], ["O(log n)", "That is a binary search."], ["O(n log n)", "No sorting is involved."]],
    "In the worst case every item is compared.", { hints: ["Which item takes the most comparisons to find?"] });

  // ---- true / false, matching, fill in the blank
  b.tf({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "In Big O notation, O(n²) represents faster growth than O(n log n).", answer: true,
    explanation: "True. For large n, n² is much larger than n × log n." });
  b.tf({ d: 3, skill: "UNDERSTANDING", hints: ["Compare 50n with n² for small n."], stem: "An algorithm with a lower order of growth is always faster than one with a higher order, whatever the value of n.", answer: false,
    explanation: "False. A large constant can make it slower for small n; for example 50n steps is more than n² steps when n is less than 50. The order decides only for large n." });
  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each notation to its name.",
    pairs: [["O(1)", "Constant"], ["O(log n)", "Logarithmic"], ["O(n)", "Linear"], ["O(n²)", "Polynomial (quadratic)"], ["O(2ⁿ)", "Exponential"]],
    explanation: "The common orders of complexity." });
  b.fib({ d: 3, skill: "APPLICATION", hints: ["Use n² = 16 × 16 and n × log₂ n = 16 × 4."],
    stem: "Complete the values for n = 16 (log₂ 16 = 4).",
    template: "n × log₂ n = {{blank:a}}, n² = {{blank:b}}, 2ⁿ = {{blank:c}}",
    blanks: [{ id: "a", accepted: ["64"], input: "number" }, { id: "b", accepted: ["256"], input: "number" }, { id: "c", accepted: ["65536"], input: "number" }], wrong: [["16", "32", "256"]],
    explanation: "16 × 4 = 64; 16² = 256; 2¹⁶ = 65 536." });

  // ---- numerical
  b.num({ d: 3, skill: "APPLICATION", calculator: false, hints: ["Halve the number repeatedly: 1024, 512, ..."],
    stem: "How many times does the body of this loop run when `N` starts at 1024?\n\n" + codeBlock(`WHILE N > 1 DO
    N ← DIV(N, 2)
    Steps ← Steps + 1
ENDWHILE`),
    value: halve(1024), wrong: [1023, 512], workedSolution: "1024 = 2¹⁰, so it can be halved 10 times before reaching 1.", explanation: "10 times, because log₂ 1024 = 10." });
  b.num({ d: 4, skill: "APPLICATION", calculator: false, hints: ["Add the number of passes of the inner loop for each value of Row."],
    stem: "How many times does `Count ← Count + 1` run when `N` is 10?\n\n" + codeBlock(`FOR Row ← 1 TO N
    FOR Col ← 1 TO Row
        Count ← Count + 1
    NEXT Col
NEXT Row`),
    value: tri(10), wrong: [100, 10], workedSolution: "1 + 2 + … + 10 = 10 × 11 ÷ 2 = 55.", explanation: "55 times." });
  b.num({ d: 3, skill: "APPLICATION", calculator: false, hints: ["Doubling n multiplies n² by 2 × 2."],
    stem: "An O(n²) algorithm takes 2 000 steps for 100 items. How many steps does it take for 200 items?", value: 8000, wrong: [4000, 16000], workedSolution: "Doubling n multiplies the steps by 2² = 4: 2 000 × 4 = 8 000.", explanation: "8 000 steps." });
  b.short({ d: 2, skill: "RECALL", stem: "State the Big O notation for an algorithm whose number of steps does not change as the amount of data increases.", accepted: ["O(1)", "O1", "constant"], wrong: ["O(n)", "O(log n)"], explanation: "O(1), constant time." });

  // ---- self-marked
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 3, hints: ["Mention steps, the effect of n and the computer."],
    stem: "Explain what is meant by the time complexity of an algorithm. [3]",
    points: ["It describes how the number of steps (the time taken) grows", "as the size of the input n grows", "It does not depend on the speed of a particular computer"],
    modelAnswer: "It describes how the number of steps an algorithm takes grows as the size of the input n grows. It is independent of the speed of any particular computer.", explanation: "Growth of steps with n." });
  b.manualShort({ d: 4, skill: "EVALUATION", marks: 4, hints: ["Compare 1 000 000 items for each."],
    stem: "Algorithm A is O(n log n) and algorithm B is O(n²). A company has to sort a million records. Explain which algorithm should be chosen. [4]",
    points: ["Algorithm A should be chosen", "For n = 1 000 000, n² is about 10¹² steps", "whereas n log n is only about 20 million steps (n × log₂ n with log₂ n about 20)", "So B would take thousands of times longer, which is not practical"],
    modelAnswer: "Algorithm A. For a million records n² is about a million million steps, but n log n is only about twenty million steps, so B would take tens of thousands of times longer.", explanation: "Large n makes the order decisive." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 3, hints: ["Refer to best and worst cases."],
    stem: "Explain why the best case and the worst case of the linear search have different time complexities. [3]",
    points: ["Best case: the item is the first one, so one comparison is needed, O(1)", "Worst case: the item is last or missing, so n comparisons are needed, O(n)", "The amount of work depends on where (or whether) the item is in the list, not just on n"],
    modelAnswer: "In the best case the item is first, needing one comparison, O(1). In the worst case it is last or missing, needing n comparisons, O(n). The work depends on where the item is as well as on n.", explanation: "Same algorithm, different inputs." });
  b.manualShort({ d: 4, skill: "ANALYSIS", marks: 3, hints: ["Think of the extra memory needed besides the data."],
    stem: "A function copies a list of n items into a new list before sorting it. State the space complexity of the copy and explain your answer. [3]",
    points: ["O(n)", "The new list needs one memory location for each of the n items", "So the memory needed grows in proportion to n"],
    modelAnswer: "O(n). The new list needs a location for each of the n items, so the memory grows in proportion to n.", explanation: "Linear space." });

  // ---- structured practice
  b.struct({ d: 5, skill: "ANALYSIS", examStyle: true, hints: ["The inner statement runs for every pair of positions.", "Doubling N multiplies the pairs by 4."],
    explanation: "Analysing the complexity of a nested loop that counts matching values.",
    stem: "The array `Data` holds N whole numbers. The algorithm below counts how many pairs of positions hold equal values (a position is also compared with itself).\n\n" + codeBlock(`Count ← 0
FOR Outer ← 1 TO N
    FOR Inner ← 1 TO N
        IF Data[Outer] = Data[Inner] THEN
            Count ← Count + 1
        ENDIF
    NEXT Inner
NEXT Outer
OUTPUT Count`),
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "State how many times the condition in the IF statement is tested when N is 12.", value: pairs(12), wrong: [12, 24], workedSolution: "12 × 12 = 144.", explanation: "144 tests." }),
      pm("(b)", "Which is the time complexity of the algorithm?", ["O(n²)", "Correct."], [["O(n)", "There are two nested loops."], ["O(log n)", "No halving is done."], ["O(1)", "The work depends on N."]], "A loop inside a loop gives n × n tests."),
      P.num({ label: "(c)", marks: 1, stem: "State how many times the condition is tested when N is 24.", value: pairs(24), wrong: [288, 48], workedSolution: "24 × 24 = 576, which is 4 times as many as for 12.", explanation: "576 tests." }),
      pm("(d)", "Which is the space complexity of the algorithm, not counting the array `Data`?", ["O(1)", "Correct: a fixed number of variables."], [["O(n)", "No extra array is created."], ["O(n²)", "No table of pairs is stored."], ["O(log n)", "There is no recursion or halving."]], "Only `Count`, `Outer` and `Inner` are used."),
      P.manual({ label: "(e)", marks: 2, stem: "Suggest how the number of pairs could be counted faster, and state the new time complexity.", points: ["Sort the data first so that equal values are next to each other, then count the equal runs in one pass", "The sort is O(n log n) and the pass is O(n), so the complexity is O(n log n)"], modelAnswer: "Sort the data so equal values are next to each other, then count the runs in one pass. The sort dominates, so the algorithm is O(n log n).", explanation: "Sorting reduces n² comparisons." }),
      P.manual({ label: "(f)", marks: 2, stem: "Explain why this algorithm would be unsuitable for a list of one million values.", points: ["It would need about one million million (10¹²) tests", "Which would take too long to complete in practice"], modelAnswer: "It would make about a million million (10¹²) tests, which would take far too long.", explanation: "n² grows too quickly." }),
    ] });
  b.struct({ d: 3, skill: "EVALUATION", examStyle: true, hints: ["Find where 200n becomes smaller than n²."],
    explanation: "Comparing a linear and a quadratic algorithm.",
    stem: "Algorithm A takes 200 × n steps to process n records. Algorithm B takes n² steps.",
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "State the number of steps taken by algorithm B for 50 records.", value: 2500, wrong: [10000, 100], workedSolution: "50² = 2 500.", explanation: "2 500 steps." }),
      P.num({ label: "(b)", marks: 1, stem: "State the smallest number of records for which A takes fewer steps than B.", value: cross, wrong: [200, 400], workedSolution: "At n = 200 both take 40 000 steps; at n = 201, A takes 40 200 and B takes 40 401.", explanation: "201 records." }),
      pm("(c)", "Which is the time complexity of algorithm A?", ["O(n)", "Correct: the constant 200 is ignored."], [["O(200n)", "Constants are not written in Big O."], ["O(n²)", "That is algorithm B."], ["O(1)", "The steps grow with n."]], "A grows in proportion to n."),
      P.manual({ label: "(d)", marks: 2, stem: "A school will process 10 000 records. Explain which algorithm to use.", points: ["Algorithm A, because 10 000 is far above 201", "A needs 2 000 000 steps whereas B needs 100 000 000 steps"], modelAnswer: "Algorithm A. For 10 000 records it needs 2 000 000 steps whereas B needs 100 000 000.", explanation: "Use A for large n." }),
      pm("(e)", "Which statement about algorithm B is true?", ["It is faster than A for fewer than 200 records", "Correct: n² is less than 200n when n < 200."], [["It is faster than A for every number of records", "A is faster beyond 200 records."], ["It is slower than A for fewer than 200 records", "It takes fewer steps there."], ["It has the same order as A", "B is O(n²), A is O(n)."]], "Below 200 records B needs fewer steps."),
    ] });

  // ---- flashcards
  b.card("DEFINITION", "Time complexity", "How the number of steps of an algorithm grows as the input size n grows.");
  b.card("DEFINITION", "Space complexity", "How the memory needed by an algorithm grows as the input size n grows.");
  b.card("CONCEPT", "Big O rules", "Keep only the fastest-growing term and drop constants: 3n + 5 is O(n); n² + n is O(n²).");
  b.card("FACT", "Order of growth", "O(1) < O(log n) < O(n) < O(n log n) < O(n²) < O(2ⁿ).");
  b.card("FACT", "Examples of orders", "O(1) array access; O(log n) binary search; O(n) linear search; O(n²) bubble sort; O(2ⁿ) naive Fibonacci.");
  b.card("CONCEPT", "Identifying the order", "One loop over n: O(n). Nested loops each over n: O(n²). A loop that halves n: O(log n).");
  b.card("CONCEPT", "Best, average and worst case", "The same algorithm can take different amounts of work for different inputs of the same size; the worst case is the safe guide.");
  b.card("FACT", "Effect of doubling n", "O(n): twice the work. O(n²): four times. O(log n): one more step.");
  b.card("CONCEPT", "Constants and small n", "A lower order does not win for small n if its constant is large; the order decides for large n.");
});
