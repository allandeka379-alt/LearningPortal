// Slice w4b: declarative programming, facts, rules and goals (acs.prog.declarative-programming, Cambridge only).
import { concept, P, chk, same, mdTable, codeBlock } from "../lib.mjs";
import { mc, pm } from "../tables/w4b-q.mjs";
import { ask } from "../tables/w4b-prolog.mjs";

concept("acs.prog.declarative-programming", { file: "prog/declarative-programming", keyPrefix: "prog.declarative-programming" }, (b) => {
  // ---- flights database
  const flights = String.raw`flight(harare, bulawayo).
flight(harare, mutare).
flight(bulawayo, victoria_falls).
flight(victoria_falls, johannesburg).
flight(mutare, johannesburg).
flight(harare, johannesburg).`;
  const flightRules = String.raw`connection(X, Z) :- flight(X, Y), flight(Y, Z).
route(X, Y) :- flight(X, Y).
route(X, Y) :- flight(X, Z), route(Z, Y).`;
  const fl = flights + "\n" + flightRules;
  const A = (prog, g) => ask(prog, g).solutions;
  const f1 = A(fl, "flight(harare, X).").map((s) => s.X);
  same(f1, ["bulawayo", "mutare", "johannesburg"]);
  const f2 = A(fl, "connection(harare, Z).").map((s) => s.Z);
  same(f2, ["victoria_falls", "johannesburg"]);
  const f3 = A(fl, "connection(X, johannesburg).").map((s) => s.X);
  same(f3, ["harare", "bulawayo"]);
  const f4 = A(fl, "route(harare, W).").map((s) => s.W);
  same(f4, ["bulawayo", "mutare", "johannesburg", "victoria_falls", "johannesburg", "johannesburg"]);
  const f5 = A(fl, "route(bulawayo, johannesburg).").length;
  chk(f5, 1);
  const f6 = A(fl, "flight(johannesburg, X).").length;
  chk(f6, 0);
  const f7 = A(fl, "flight(X, johannesburg).").map((s) => s.X);
  same(f7, ["victoria_falls", "mutare", "harare"]);
  const flightTable = mdTable(["From", "To"], A(flights, "flight(F, T).").map((s) => [s.F, s.T]));

  // ---- register database
  const reg = String.raw`student(tatenda, 5).
student(nyasha, 6).
student(chipo, 5).
student(farai, 6).
student(sipho, 5).
takes(tatenda, computing).
takes(chipo, computing).
takes(nyasha, history).
takes(farai, computing).
classmate(X, Y) :- student(X, F), student(Y, F), X \= Y.
computing_pupil(X) :- takes(X, computing).`;
  const r1 = A(reg, "classmate(tatenda, Who).").map((s) => s.Who);
  same(r1, ["chipo", "sipho"]);
  const r2 = A(reg, "computing_pupil(X), student(X, 6).").map((s) => s.X);
  same(r2, ["farai"]);
  const r3 = A(reg, "computing_pupil(X).").map((s) => s.X);
  same(r3, ["tatenda", "chipo", "farai"]);
  const r4 = A(reg, "student(N, 5).").map((s) => s.N);
  same(r4, ["tatenda", "chipo", "sipho"]);
  const r5 = A(reg, "classmate(nyasha, Who).").map((s) => s.Who);
  same(r5, ["farai"]);
  const regFacts = reg.split("\n").slice(0, 9).join("\n");

  // ---- multiple choice
  mc(b, 2, "RECALL", "In a Prolog-style program, what does the symbol `:-` mean in a rule?",
    ["\"if\": the head is true when the body is true", "The head follows from the conditions in the body."],
    [["\"and\": both sides are always true", "A comma means and."], ["\"not\": the head is false", "Negation is a different construct."], ["\"equals\": both sides have the same value", "Equality is a test, not a rule symbol."]],
    ":- separates the head of a rule from its conditions and reads as 'if'.", { daily: true });
  mc(b, 2, "RECALL", "Which of these is a variable in a Prolog-style program?",
    ["`Who`", "It starts with a capital letter."],
    [["`tendai`", "An atom starting with a lower-case letter is a constant."], ["`parent`", "That is the name of a predicate."], ["`rudo.`", "That is a constant with a full stop."]],
    "Variables begin with a capital letter.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "What is a fact in a logic program?",
    ["A statement that is taken to be true", "For example flight(harare, bulawayo)."],
    [["A question that the program must answer", "That is a goal."], ["A condition that must be satisfied first", "That is part of a rule body."], ["A loop that repeats until a goal is true", "Logic programs do not use loops of this kind."]],
    "Facts record data that is true without conditions.", { daily: true });
  mc(b, 3, "APPLICATION", "The database contains the facts\n\n" + codeBlock(flights) + "\n\nWhat are the solutions of the goal `flight(harare, X).`, in order?",
    [f1.join(", "), "The facts are matched from top to bottom."],
    [[[...f1].reverse().join(", "), "Solutions follow the order of the facts, not the reverse."], [[...f1].sort().join(", "), "The solutions are not sorted."], [f1.slice(0, 2).join(", "), "The third fact also matches."]],
    "All matching facts are found, in the order they appear.", { hints: ["Look for the facts whose first argument is harare."] });
  mc(b, 3, "ANALYSIS", "What happens when a goal in the body of a rule cannot be satisfied?",
    ["The system backtracks to the last choice and tries the next clause", "That is how alternatives are searched."],
    [["The program stops with an error message", "Failing is normal in logic programming."], ["The goal is changed so that it is true", "The system never changes the facts to suit a goal."], ["The system starts again from the first clause with the same bindings", "The bindings made since the last choice are undone."]],
    "Backtracking undoes bindings and tries another alternative.", { hints: ["Which choice was made most recently?"] });
  mc(b, 2, "UNDERSTANDING", "What is the main difference between declarative and imperative programming?",
    ["Declarative states what is wanted; imperative states how", "The system works out the method in a declarative program."],
    [["A declarative program is always written in machine code", "Machine code is low-level."], ["An imperative program cannot use variables", "Imperative programs use variables."], ["A declarative program always runs faster", "Speed depends on the problem."]],
    "What versus how.");
  mc(b, 3, "ANALYSIS", "Why does a recursive rule such as `route(X, Y) :- flight(X, Z), route(Z, Y).` need a base-case clause?",
    ["Without it the search would not stop at a direct flight", "The base case route(X, Y) :- flight(X, Y). ends the recursion."],
    [["Recursive rules are not allowed to be written without facts", "Recursive rules are allowed."], ["The base case makes the whole program run much faster", "It is needed for correctness."], ["Variables cannot be used in the recursive clause", "Variables are used in both clauses."]],
    "The base case is where the recursion stops.", { hints: ["How does the search end when there is a direct flight?"] });

  // ---- true / false
  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "In a Prolog-style program, the comma in the body of a rule means \"and\".", answer: true,
    explanation: "True. All the goals separated by commas must be satisfied, from left to right." });
  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "The goal `flight(johannesburg, X).` succeeds with the answer `X = harare`, because there is a flight from harare to johannesburg.", answer: false,
    explanation: "False. The first argument is the starting city. There is no fact with johannesburg as the first argument, so the goal fails." });

  // ---- fib, num, short, match
  b.fib({ d: 3, skill: "APPLICATION", hints: ["The solutions come in the order of the facts."],
    stem: "Use these facts.\n\n" + codeBlock(flights) + "\nState the three solutions of `flight(harare, X).` in the order the system gives them.",
    template: "First: {{blank:a}}\n\nSecond: {{blank:b}}\n\nThird: {{blank:c}}",
    blanks: f1.map((v, i) => ({ id: "abc"[i], accepted: [v], choices: ["bulawayo", "mutare", "johannesburg", "victoria_falls"] })),
    explanation: "The facts with harare first are matched in the order written: bulawayo, mutare, johannesburg." });
  b.num({ d: 3, skill: "APPLICATION", calculator: false, hints: ["Find each fact with johannesburg as the second argument."],
    stem: "Use these facts.\n\n" + codeBlock(flights) + "\nHow many solutions does the goal `flight(X, johannesburg).` have?",
    value: f7.length, wrong: [2, 6], workedSolution: "Three facts end in johannesburg: from victoria_falls, from mutare and from harare.", explanation: "There are three solutions." });
  b.short({ d: 2, skill: "RECALL", stem: "Name the process by which a logic program undoes its latest bindings and tries the next alternative when a goal fails.", accepted: ["backtracking", "back tracking", "backtrack"], wrong: ["iteration"], explanation: "The process is backtracking." });
  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each part of a logic program to its description.",
    pairs: [["`parent(tendai, rudo).`", "A fact"], ["`grandparent(X, Z) :- parent(X, Y), parent(Y, Z).`", "A rule"], ["`grandparent(sipho, W).`", "A goal (query)"], ["`W`", "A variable"]],
    explanation: "Facts and rules form the program; a goal is the question; capitalised names are variables." });

  // ---- self-marked
  b.manualShort({ d: 3, skill: "CREATION", marks: 3, hints: ["Facts have lower-case atoms and a full stop."],
    stem: "A school has the students Tatenda (form 5), Nyasha (form 6) and Chipo (form 5). Write three facts in the form `student(Name, Form).` [3]",
    points: ["student(tatenda, 5).", "student(nyasha, 6).", "student(chipo, 5)."],
    modelAnswer: codeBlock("student(tatenda, 5).\nstudent(nyasha, 6).\nstudent(chipo, 5)."), explanation: "One fact per student, lower-case names and a full stop." });
  b.manualShort({ d: 4, skill: "CREATION", marks: 3, hints: ["The rule has a head, :- and a body with a comma."],
    stem: "Using the facts `flight(From, To).`, write a rule `connection(X, Z)` that is true when there is a flight from X to some city Y and a flight from Y to Z. [3]",
    points: ["The head connection(X, Z) followed by :-", "The first body goal flight(X, Y) using a shared variable Y", "The second goal flight(Y, Z) separated by a comma and ending with a full stop"],
    modelAnswer: codeBlock("connection(X, Z) :- flight(X, Y), flight(Y, Z)."), explanation: "The shared variable Y links the two flights." });
  b.manualShort({ d: 4, skill: "ANALYSIS", marks: 4, hints: ["Use the goal connection(harare, Z)."],
    stem: "The rule `connection(X, Z) :- flight(X, Y), flight(Y, Z).` is used with these facts.\n\n" + codeBlock(flights) + "\nExplain how the system finds the solutions of the goal `connection(harare, Z).`, naming each fact that is tried first and what happens when a goal fails. [4]",
    points: ["The first goal flight(harare, Y) matches the facts for harare in order: bulawayo, mutare, johannesburg", "For Y = bulawayo the second goal flight(bulawayo, Z) matches and gives Z = victoria_falls", "For Y = mutare the second goal gives Z = johannesburg", "For Y = johannesburg there is no flight from there, so the goal fails and the system backtracks; the solutions are victoria_falls and johannesburg"],
    modelAnswer: "The system first finds the flights from harare: Y = bulawayo, mutare and johannesburg. For bulawayo it finds the flight to victoria_falls; for mutare it finds johannesburg; for johannesburg there is no flight, so that goal fails and it backtracks. The solutions are victoria_falls and johannesburg.", explanation: "Match, try the second goal, backtrack on failure." });
  b.manualShort({ d: 3, skill: "EVALUATION", marks: 3, hints: ["Compare who decides the method of searching."],
    stem: "Compare writing a program to find all the pairs of connected cities in a logic language with writing it in an imperative language. [3]",
    points: ["In the logic language the programmer states facts and rules (what is true), and the system finds the answers by matching and backtracking", "In the imperative language the programmer writes the steps: loops, tests and variables", "The logic version is shorter and easier to extend by adding rules, but the programmer has less control over the search and its efficiency"],
    modelAnswer: "In a logic language the programmer states the facts and rules and the system finds the answers by matching and backtracking. In an imperative language the programmer writes the loops and tests. The logic version is shorter and easier to extend, but the programmer has less control over how the search is done.", explanation: "Declarative versus imperative." });

  // ---- structured practice
  b.struct({ d: 4, skill: "APPLICATION", examStyle: true, calculator: false, hints: ["List the solutions in the order of the facts.", "For the rule, read the body from left to right."],
    explanation: "Facts, a rule and goals about flights.",
    stem: `An airline in Harare stores its direct flights as facts in a Prolog-style program.\n\n${codeBlock(flights)}\n\nThe table shows the same facts.\n\n${flightTable}\n\nThe program also contains the rule\n\n${codeBlock(flightRules.split("\n")[0])}`,
    parts: [
      P.fib({ label: "(a)", marks: 2, stem: "State the two solutions of the goal `connection(harare, Z).` in the order given by the system.", template: "First: {{blank:a}}\n\nSecond: {{blank:b}}", blanks: f2.map((v, i) => ({ id: "ab"[i], accepted: [v], choices: ["bulawayo", "mutare", "johannesburg", "victoria_falls"] })), explanation: "Y = bulawayo gives victoria_falls; Y = mutare gives johannesburg; Y = johannesburg gives nothing." }),
      P.fib({ label: "(b)", marks: 2, stem: "State the two solutions of the goal `connection(X, johannesburg).` in order.", template: "First: {{blank:a}}\n\nSecond: {{blank:b}}", blanks: f3.map((v, i) => ({ id: "ab"[i], accepted: [v], choices: ["harare", "bulawayo", "mutare", "victoria_falls"] })), explanation: "harare reaches johannesburg through mutare, and bulawayo through victoria_falls; harare comes first because its facts are written first." }),
      pm("(c)", "State the result of the goal `flight(johannesburg, X).`", ["false: there is no solution", "No fact has johannesburg as its first argument."], [["X = harare", "That reads the arguments the wrong way round."], ["true, with X unbound", "A goal that fails has no solution."], ["X = victoria_falls", "That flight arrives at johannesburg, it does not leave it."]], "The goal fails because no fact matches."),
      P.manual({ label: "(d)", marks: 2, stem: "Write a goal that finds every city that has a direct flight to mutare.", points: ["The predicate flight with the variable first and mutare second", "flight(X, mutare). written with a capital-letter variable and a full stop"], modelAnswer: "`flight(X, mutare).`", explanation: "A variable in the position to be found." }),
    ] });
  b.struct({ d: 4, skill: "CREATION", examStyle: true, calculator: false, hints: ["Check the capital letters and full stops in the rule.", "A goal with two conditions must satisfy both."],
    explanation: "Facts, a rule with a test and goals about a school register.",
    stem: `A school keeps its register as facts. \`takes(Name, Subject).\` shows who studies a subject. In the rule, \`X \\= Y\` is true when X and Y are different.\n\n${codeBlock(reg)}`,
    parts: [
      P.fib({ label: "(a)", marks: 2, stem: "State the solutions of the goal `classmate(tatenda, Who).` in order.", template: "First: {{blank:a}}\n\nSecond: {{blank:b}}", blanks: r1.map((v, i) => ({ id: "ab"[i], accepted: [v], choices: ["nyasha", "chipo", "farai", "sipho"] })), explanation: "The students in form 5 other than tatenda are chipo and sipho." }),
      P.short({ label: "(b)", marks: 1, stem: "State the one solution of the goal `computing_pupil(X), student(X, 6).`", accepted: r2, wrong: ["nyasha"], explanation: "Both conditions must be true: tatenda, chipo and farai take computing, and only farai is in form 6." }),
      P.manual({ label: "(c)", marks: 2, stem: "Explain why `X \\= Y` is needed in the rule for `classmate`.", points: ["Without it a student would be listed as their own classmate", "Because student(X, F) and student(Y, F) can match the same fact with X and Y the same"], modelAnswer: "Without it every student would be a classmate of themselves, because both student goals can match the same fact.", explanation: "The test removes the case where X and Y are the same student." }),
      P.manual({ label: "(d)", marks: 1, stem: "Write one fact to record that sipho studies history.", points: ["takes(sipho, history)."], modelAnswer: "`takes(sipho, history).`", explanation: "A fact has lower-case atoms and a full stop." }),
    ] });

  // ---- flashcards
  b.card("DEFINITION", "Fact", "A statement taken to be true, e.g. parent(tendai, rudo). It ends with a full stop.");
  b.card("DEFINITION", "Rule", "Head :- body: the head is true if all the goals in the body are true (a comma means and).");
  b.card("DEFINITION", "Goal (query)", "A question for the system, e.g. parent(tendai, X). It succeeds with values for the variables, or fails.");
  b.card("FACT", "Names and variables", "Atoms and predicate names start with a lower-case letter; variables start with a capital letter.");
  b.card("DEFINITION", "Backtracking", "When a goal fails, the system undoes the latest bindings and tries the next alternative clause.");
  b.card("CONCEPT", "Order of solutions", "Clauses are tried from top to bottom, so solutions come in the order of the facts.");
  b.card("CONCEPT", "Recursion in rules", "A base-case rule ends the search; a recursive rule refers to itself, e.g. ancestor(X, Y) :- parent(X, Z), ancestor(Z, Y).");
  b.card("CONCEPT", "Declarative and imperative", "Declarative: state what is true and what is wanted. Imperative: state the steps to follow.");
  b.card("FACT", "Instantiation", "A variable is instantiated when it is matched with a value; backtracking removes the binding.");
});
