// Slice w4a: recursion (acs.algo.recursion, both boards).
import { concept, P, chk, same, mdTable, codeBlock, py } from "../lib.mjs";
import { mc, pm } from "../tables/w4a-q.mjs";

concept("acs.algo.recursion", { file: "algo/recursion", keyPrefix: "algo.recursion" }, (b) => {
  const mystery = (n) => (n === 0 ? 0 : n + mystery(n - 1));
  chk(mystery(5), 15); chk(mystery(3), 6);
  const fact = (n) => (n <= 1 ? 1 : n * fact(n - 1));
  chk(fact(5), 120);
  const gcdCalls = []; const gcd = (a, c) => { gcdCalls.push([a, c]); return c === 0 ? a : gcd(c, a % c); };
  chk(gcd(48, 18), 6); const g2 = (a, c) => (c === 0 ? a : g2(c, a % c)); chk(g2(84, 36), 12); same(gcdCalls, [[48, 18], [18, 12], [12, 6], [6, 0]]);
  const showOut = py(`def show(n):
    if n > 0:
        print(n)
        show(n - 1)
        print(n * 10)
show(3)`);
  same(showOut.split("\n"), ["3", "2", "1", "10", "20", "30"]);
  const cd = py(`def count_digits(n):
    if n < 10:
        return 1
    return 1 + count_digits(n // 10)
print(count_digits(48213))`);
  same(cd, "5");
  const pw = (b2, e) => (e === 0 ? 1 : b2 * pw(b2, e - 1));
  chk(pw(2, 6), 64);

  // ---- multiple choice
  mc(b, 2, "RECALL", "What is the base case of a recursive subroutine?",
    ["The case solved without another call", "Correct."],
    [["The first call that is made by the main program", "That is the initial call, not the base case."], ["The case in which the subroutine calls itself again", "That is the general case."], ["The case that causes an error in the program", "A correct recursive subroutine reaches its base case without an error."]],
    "The base case ends the recursion.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "What happens if a recursive function has no base case?",
    ["The calls go on until the stack is full", "Correct."],
    [["The function returns 0 automatically at the end", "No value is returned automatically."], ["The function runs once and then stops by itself", "It keeps calling itself."], ["The compiler adds a base case when it translates", "A compiler does not change the logic of a program."]],
    "Each call adds a frame and none is removed, so the stack overflows.", { daily: true });
  mc(b, 3, "UNDERSTANDING", "What is stored in a stack frame when a subroutine is called?",
    ["The return address, parameters and local variables", "Correct."],
    [["The source code of the whole subroutine", "The code is stored elsewhere and is not copied for each call."], ["Only the value that the subroutine will return later", "The result is known only when the call finishes."], ["The names of all the global variables in the program", "Global variables are not stored in the frame."]],
    "Each call has its own frame so that it keeps its own values.", { hints: ["What must be remembered so that the call can return?"] });
  mc(b, 3, "ANALYSIS", "Which is a disadvantage of a recursive solution compared with a loop?",
    ["It uses more memory, as each call needs a frame", "Correct."],
    [["It cannot be used to solve problems that suit a loop", "Loop problems can usually be solved recursively."], ["It cannot return a value", "A recursive function can return values."], ["It always needs many more lines of code", "It is often shorter."]],
    "Memory use grows with the depth of the calls.", { hints: ["What does each call add to the stack?"] });
  mc(b, 3, "APPLICATION", "A recursive procedure `Show(N)` outputs `N` first and then calls `Show(N - 1)` while `N > 0`. What is the output of `CALL Show(3)`?",
    ["3, 2, 1", "Correct: the output comes before the recursive call."],
    [["1, 2, 3", "That order would need the output after the recursive call."], ["3, 2, 1, 0", "The output happens only when N is greater than 0."], ["3", "The procedure calls itself with N − 1."]],
    "Statements before the recursive call run in the order of the calls.", { hints: ["Where is the OUTPUT statement in relation to the call?"] });
  mc(b, 3, "APPLICATION", "Which line is the general case in this function?\n\n" + codeBlock(`FUNCTION Total(N : INTEGER) RETURNS INTEGER
    IF N = 0 THEN
        RETURN 0
    ELSE
        RETURN N + Total(N - 1)
    ENDIF
ENDFUNCTION`),
    ["`RETURN N + Total(N - 1)`", "Correct: it calls the function with a smaller argument."],
    [["`RETURN 0` in the first branch", "That is the base case."], ["`IF N = 0 THEN` at the top", "That tests for the base case."], ["`ENDFUNCTION` at the end", "That ends the definition."]],
    "The general case makes the recursive call.", { hints: ["Which line calls Total again?"] });
  mc(b, 4, "UNDERSTANDING", "How does a compiler make recursive calls possible?",
    ["It uses a stack to store the details of each call", "Correct: return address, parameters and local variables."],
    [["It copies the whole subroutine into memory for each call it makes", "Only the data of each call is stored, not the code."], ["It converts recursion into a loop with the same machine code every time", "It uses the normal call and return mechanism."], ["It prevents a subroutine from calling itself", "Recursive calls are allowed."]],
    "Each call pushes a frame and each return pops it.", { hints: ["How does the computer remember where to return to?"] });
  mc(b, 3, "EVALUATION", "For which problem is recursion a natural choice?",
    ["Visiting every node of a binary tree", "Correct: each sub-tree is a smaller tree."],
    [["Adding up the first 5 numbers in an array", "A simple loop is clearer here."], ["Reading a file one line at a time until the end", "A loop is simpler for this."], ["Displaying a menu until the user chooses Quit", "A loop is the natural method."]],
    "Trees have a recursive structure.", { hints: ["Which structure is made of smaller copies of itself?"] });

  // ---- true / false, matching, fill in the blank
  b.tf({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "In a recursive function, each call moves closer to the base case.", answer: true,
    explanation: "True. If it did not, the base case would never be reached and the calls would not stop." });
  b.tf({ d: 3, skill: "UNDERSTANDING", hints: ["Think about the value returned by the deepest call."], stem: "In the call `Factorial(4)`, the first multiplication is completed before the call `Factorial(1)` has returned.", answer: false,
    explanation: "False. No multiplication can be completed until the base case has returned; the products are then worked out as the calls unwind." });
  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each term to its meaning.",
    pairs: [["Base case", "Solved directly, ending the recursion"], ["General case", "Calls the subroutine again with a smaller problem"], ["Stack frame", "The return address, parameters and local variables of one call"], ["Unwinding", "The returns that follow once the base case is reached"], ["Stack overflow", "The stack runs out of memory because calls never stop"]],
    explanation: "Terms used in recursion." });
  b.fib({ d: 3, skill: "APPLICATION", hints: ["Start from the base case and work back."],
    stem: "A function is defined as follows.\n\n" + codeBlock(`FUNCTION Total(N : INTEGER) RETURNS INTEGER
    IF N = 0 THEN
        RETURN 0
    ELSE
        RETURN N + Total(N - 1)
    ENDIF
ENDFUNCTION`) + "\nState the value returned by each call during the call `Total(3)`.",
    template: "Total(0) returns {{blank:a}}\n\nTotal(1) returns {{blank:b}}\n\nTotal(2) returns {{blank:c}}\n\nTotal(3) returns {{blank:d}}",
    blanks: [0, 1, 2, 3].map((n, i) => ({ id: "abcd"[i], accepted: [String(mystery(n))], input: "number" })), wrong: [["0", "1", "2", "3"]],
    explanation: "Total(0) = 0, Total(1) = 1 + 0 = 1, Total(2) = 2 + 1 = 3, Total(3) = 3 + 3 = 6." });

  // ---- numerical
  b.num({ d: 3, skill: "APPLICATION", calculator: false, hints: ["Work from the base case back up."],
    stem: "State the value returned by `Mystery(5)`.\n\n" + codeBlock(`FUNCTION Mystery(N : INTEGER) RETURNS INTEGER
    IF N = 0 THEN
        RETURN 0
    ELSE
        RETURN N + Mystery(N - 1)
    ENDIF
ENDFUNCTION`),
    value: mystery(5), wrong: [5, 120], workedSolution: "Mystery(5) = 5 + 4 + 3 + 2 + 1 + 0 = 15.", explanation: "The function adds the numbers from N down to 1: 15." });
  b.num({ d: 2, skill: "APPLICATION", calculator: false, stem: "A function `Factorial(N)` has the base case `N <= 1`. How many calls of `Factorial` are made altogether (including the first) by `Factorial(6)`?", value: 6, wrong: [5, 7], workedSolution: "The calls are for N = 6, 5, 4, 3, 2 and 1: six calls.", explanation: "6 calls." });
  b.num({ d: 3, skill: "APPLICATION", calculator: false, hints: ["The deepest point is when the base case is called."],
    stem: "The function `Power(Base, Exponent)` returns 1 when `Exponent = 0` and otherwise returns `Base * Power(Base, Exponent - 1)`. What is the greatest number of frames on the call stack during `Power(2, 6)`?", value: 7, wrong: [6, 64], workedSolution: "Calls are made for exponents 6, 5, 4, 3, 2, 1 and 0, so 7 frames are on the stack when the base case is reached.", explanation: "7 frames." });
  b.num({ d: 4, skill: "APPLICATION", calculator: false, hints: ["Take the remainder each time: Gcd(B, MOD(A, B))."],
    stem: "A function `Gcd(A, B)` returns `A` when `B = 0` and otherwise returns `Gcd(B, MOD(A, B))`. State the value of `Gcd(84, 36)`.", value: 12, wrong: [36, 6], workedSolution: "Gcd(84, 36) → Gcd(36, 12) → Gcd(12, 0) = 12.", explanation: "12." });
  // ---- self-marked
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 3, hints: ["Define each case and say what each is for."],
    stem: "Explain the purpose of the base case and the general case in a recursive function. [3]",
    points: ["The base case is solved directly, without a further recursive call", "It stops the recursion", "The general case calls the function with a smaller or simpler argument, moving closer to the base case"],
    modelAnswer: "The base case is answered directly without another call, so it stops the recursion. The general case calls the function again with a smaller argument, moving towards the base case.", explanation: "Stop and move towards stopping." });
  b.manualShort({ d: 4, skill: "CREATION", marks: 4, hints: ["The base case is a number with one digit.", "Remove the last digit with DIV 10."],
    stem: "Write a recursive function `CountDigits(N)` in pseudocode that returns the number of digits in the positive whole number `N`. [4]",
    points: ["Function header with an INTEGER parameter and RETURNS INTEGER", "Base case: if N < 10 then return 1", "General case: calls CountDigits(DIV(N, 10))", "Adds 1 to the value returned by the recursive call and returns it"],
    modelAnswer: codeBlock(`FUNCTION CountDigits(N : INTEGER) RETURNS INTEGER
    IF N < 10 THEN
        RETURN 1
    ELSE
        RETURN 1 + CountDigits(DIV(N, 10))
    ENDIF
ENDFUNCTION`) + "\nFor 48213 this returns 5 (checked by running the Python equivalent).", explanation: "One digit is removed each call." });
  b.manualShort({ d: 4, skill: "ANALYSIS", marks: 3, hints: ["Think about what is stored for each call."],
    stem: "Explain why a recursive function that makes 10 000 nested calls may fail where a loop would not. [3]",
    points: ["Each call places a stack frame (return address, parameters, local variables) on the call stack", "10 000 frames use a large amount of memory, more than the loop which uses a fixed amount", "The stack can run out of space (stack overflow), which stops the program"],
    modelAnswer: "Every call adds a stack frame holding its return address, parameters and local variables. With 10 000 nested calls the stack may run out of space (a stack overflow), whereas a loop uses a fixed amount of memory.", explanation: "Memory grows with depth." });
  b.manualShort({ d: 3, skill: "EVALUATION", marks: 4, hints: ["Give two points for each."],
    stem: "Give two advantages and two disadvantages of using recursion rather than iteration. [4]",
    points: ["Advantage: the code is often shorter and clearer for problems that are naturally recursive (such as trees)", "Advantage: the solution follows the definition of the problem, so it is easier to prove and maintain", "Disadvantage: each call uses a stack frame, so it needs more memory and may overflow the stack", "Disadvantage: calls have an overhead, so it is usually slower than a loop"],
    modelAnswer: "Advantages: the code is short and clear for naturally recursive problems such as trees, and follows the definition of the problem. Disadvantages: every call uses a stack frame, so it needs more memory and may overflow, and the call overhead makes it slower than a loop.", explanation: "Clarity against memory and speed." });

  // ---- structured practice
  b.struct({ d: 5, skill: "ANALYSIS", examStyle: true, hints: ["Replace A and B by B and MOD(A, B) at each call.", "Stop when B is 0."],
    explanation: "A recursive greatest common divisor function.",
    stem: "A recursive function finds the greatest common divisor of two positive whole numbers.\n\n" + codeBlock(`FUNCTION Gcd(A : INTEGER, B : INTEGER) RETURNS INTEGER
    IF B = 0 THEN
        RETURN A
    ELSE
        RETURN Gcd(B, MOD(A, B))
    ENDIF
ENDFUNCTION`) + "\nThe function is called with `Gcd(48, 18)`.",
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "State the value returned by `Gcd(48, 18)`.", value: 6, wrong: [18, 12], workedSolution: "The calls are (48, 18), (18, 12), (12, 6) and (6, 0); the last returns 6.", explanation: "6." }),
      P.num({ label: "(b)", marks: 1, stem: "State the total number of calls of `Gcd`, including the first.", value: gcdCalls.length, wrong: [3, 6], workedSolution: "The four calls have arguments (48, 18), (18, 12), (12, 6) and (6, 0).", explanation: "4 calls." }),
      P.fib({ label: "(c)", marks: 2, stem: "State the arguments of the third call.", template: "A = {{blank:a}}, B = {{blank:b}}", blanks: [{ id: "a", accepted: ["12"], input: "number" }, { id: "b", accepted: ["6"], input: "number" }], wrong: [["18", "12"]], explanation: "The second call is Gcd(18, 12); the third is Gcd(12, MOD(18, 12)) = Gcd(12, 6)." }),
      pm("(d)", "Which condition is the base case?", ["`B = 0`", "Correct."], [["`A = 0`", "A is not tested."], ["`MOD(A, B) = 0`", "This is the remainder used by the general case."], ["`A = B`", "The function does not test for equal values."]], "The recursion stops when B is 0."),
      P.num({ label: "(e)", marks: 1, stem: "State the greatest number of stack frames in use at the same time.", value: 4, wrong: [1, 6], workedSolution: "All four calls are on the stack when the base case is reached.", explanation: "4 frames." }),
      P.manual({ label: "(f)", marks: 3, stem: "Explain why the recursion must eventually stop for any positive whole numbers.", points: ["MOD(A, B) is always less than B", "So the second argument gets smaller with every call", "It must reach 0, which is the base case"], modelAnswer: "MOD(A, B) is always less than B, so the second argument gets smaller each call. It cannot decrease for ever, so it reaches 0, the base case.", explanation: "The argument moves towards the base case." }),
    ] });
  b.struct({ d: 3, skill: "APPLICATION", examStyle: true, hints: ["The first print happens on the way down, the second on the way back up."],
    explanation: "Output order of a recursive procedure with statements before and after the call.",
    stem: "The Python program below was run.\n\n" + codeBlock(`def show(n):
    if n > 0:
        print(n)
        show(n - 1)
        print(n * 10)

show(3)`, "python"),
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "State how many times the function `show` is called, including the first call.", value: 4, wrong: [3, 6], workedSolution: "The calls are for n = 3, 2, 1 and 0.", explanation: "4 calls." }),
      P.num({ label: "(b)", marks: 1, stem: "State the number of lines output.", value: 6, wrong: [3, 4], workedSolution: "Each of the calls with n = 3, 2 and 1 prints two lines; the call with n = 0 prints nothing.", explanation: "6 lines." }),
      P.num({ label: "(c)", marks: 1, stem: "State the fourth value output.", value: 10, wrong: [1, 30], workedSolution: "The output is 3, 2, 1, 10, 20, 30.", explanation: "10." }),
      pm("(d)", "Which is the last value output?", ["30", "Correct: the call with n = 3 is the last to finish."], [["3", "That is the first value."], ["10", "That is printed by the call with n = 1."], ["0", "Nothing is printed when n is 0."]], "The first call finishes last."),
      P.manual({ label: "(e)", marks: 2, stem: "Explain why the values 10, 20 and 30 are output in that order.", points: ["The second print comes after the recursive call, so it runs as the calls return (unwind)", "The innermost call (n = 1) returns first, so its value 10 is output first, then 20 and then 30"], modelAnswer: "The second print is after the recursive call, so it runs during unwinding. The call with n = 1 returns first and prints 10, then n = 2 prints 20 and n = 3 prints 30.", explanation: "Unwinding reverses the order." }),
    ] });

  // ---- flashcards
  b.card("DEFINITION", "Recursion", "A subroutine that calls itself with a smaller version of the problem until a case is reached that is answered directly.");
  b.card("DEFINITION", "Base case", "The case answered without a recursive call; it stops the recursion.");
  b.card("DEFINITION", "General case", "The case that calls the subroutine again with an argument closer to the base case.");
  b.card("DEFINITION", "Call stack", "Memory holding a frame (return address, parameters, local variables) for each active subroutine call.");
  b.card("CONCEPT", "Unwinding", "Once the base case returns, each call completes in reverse order and passes its value to the call that made it.");
  b.card("CONCEPT", "No base case", "The calls never stop and the stack overflows (RecursionError in Python).");
  b.card("FACT", "Output order", "Statements before the recursive call run in call order; statements after it run in reverse order.");
  b.card("CONCEPT", "Recursion against iteration", "Recursion: clear for trees and divide and conquer, but uses stack memory and is slower. Iteration: fixed memory and usually faster.");
  b.card("CONCEPT", "Compiler and recursion", "Each call pushes a frame and jumps to the subroutine; each return pops the frame and jumps back.");
});
