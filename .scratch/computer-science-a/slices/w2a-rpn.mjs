// Slice w2a: Reverse Polish Notation (acs.translation.rpn, Cambridge A Level).
import { concept, P, chk, same, CAM, evalRpn, mdTable, codeBlock } from "../lib.mjs";
import { mc } from "../tables/w2a-q.mjs";
import { shunt, shuntMd, evalMd } from "../tables/w2a-rpn.mjs";

const rpnOf = (infix) => shunt(infix.split(" ")).out;
const stackMax = (rpn) => Math.max(...evalRpn(rpn).steps.map((s) => s.stack.length));

concept("acs.translation.rpn", { file: "translation/rpn", keyPrefix: "translation.rpn", applies: CAM }, (b) => {
  const e1 = "7 + 3 * 4 - 2", r1 = rpnOf(e1);
  same(r1, ["7", "3", "4", "*", "+", "2", "-"]); chk(evalRpn(r1).value, 17);
  const e2 = "( 9 - 5 ) * ( 2 + 6 )", r2 = rpnOf(e2);
  same(r2.join(" "), "9 5 - 2 6 + *"); chk(evalRpn(r2).value, 32); chk(stackMax(r2), 3);
  const e3 = "20 / 4 / 5", r3 = rpnOf(e3);
  same(r3.join(" "), "20 4 / 5 /"); chk(evalRpn(r3).value, 1);
  const e4 = "6 * 2 - ( 8 - 3 ) * 2", r4 = rpnOf(e4);
  same(r4.join(" "), "6 2 * 8 3 - 2 * -"); chk(evalRpn(r4).value, 2);
  const e5 = "( 15 + 5 ) / ( 7 - 3 )", r5 = rpnOf(e5);
  same(r5.join(" "), "15 5 + 7 3 - /"); chk(evalRpn(r5).value, 5);
  const pf1 = "5 1 2 + 4 * + 3 -".split(" ");
  chk(evalRpn(pf1).value, 14); chk(stackMax(pf1), 3);
  const pf2 = "4 6 + 3 2 - *".split(" ");
  chk(evalRpn(pf2).value, 10);
  const infixOf = (rpn) => { const st = []; for (const tk of rpn) { if (["+", "-", "*", "/", "^"].includes(tk)) { const r = st.pop(), l = st.pop(); st.push(`(${l} ${tk} ${r})`); } else st.push(tk); } return st[0]; };
  same(infixOf(pf2), "((4 + 6) * (3 - 2))");

  // ---- multiple choice
  mc(b, 1, "RECALL", "In Reverse Polish Notation, where is the operator written?",
    ["After its operands", "Correct: for example 3 4 + means 3 + 4."],
    [["Before its operands", "That is prefix (Polish) notation."], ["Between its operands", "That is infix notation."], ["At the end of the line only", "Each operator follows its own operands."]],
    "Postfix places each operator after its operands.");
  mc(b, 2, "UNDERSTANDING", "Which data structure is used to evaluate a postfix expression?",
    ["A stack", "Correct: operands are pushed and popped by operators."],
    [["A queue", "A queue would give the operands in the wrong order."], ["A binary tree", "A tree is used to build the expression, not to evaluate postfix."], ["A linked list of operators", "The operands are held, not only the operators."]],
    "Numbers are pushed; an operator pops two values and pushes the result.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "What is an advantage of Reverse Polish Notation for a compiler?",
    ["No brackets or precedence rules are needed when the expression is evaluated", "Correct."],
    [["The expressions are shorter than in infix because every operator is removed", "The same operators are used."], ["Operators can be written in any order", "The order is fixed by the postfix form."], ["It can be evaluated without any memory", "A stack is needed."]],
    "The order of evaluation is built into the order of the tokens.", { daily: true });
  mc(b, 3, "APPLICATION", "What is the postfix form of the infix expression " + e1.replace(/\*/g, "×") + "?",
    [r1.join(" "), "Correct: 3 4 * is done first, then added to 7, then 2 is subtracted."],
    [["7 3 + 4 * 2 -", "That would give (7 + 3) × 4 - 2."], ["7 3 4 + * 2 -", "That would give 7 × (3 + 4) - 2."], ["7 3 4 * 2 - +", "That would give 7 + (3 × 4 - 2)."]],
    "The multiplication has higher precedence, so it comes first in the postfix.", { hints: ["Which operator is applied first?"] });
  mc(b, 3, "APPLICATION", "What is the value of the postfix expression " + pf1.join(" ") + "?",
    [String(evalRpn(pf1).value), "Correct: 1 2 + = 3; 3 4 * = 12; 5 + 12 = 17; 17 - 3 = 14."],
    [["17", "That ignores the final - 3."], ["29", "That adds 5, 1 and 2 before multiplying by 4."], ["12", "That is 3 × 4 only."]],
    "Work through the stack: 5, then 1 2 + gives 3, ...", { hints: ["Push the numbers, apply each operator to the top two values."], calculator: false });
  mc(b, 3, "ANALYSIS", "In the infix expression 20 / 4 / 5 the operators have the same precedence. Which is the correct postfix form?",
    [r3.join(" "), "Correct: operators of equal precedence are applied from left to right."],
    [["20 4 5 / /", "That would give 20 ÷ (4 ÷ 5)."], ["4 5 / 20 /", "That would give (4 ÷ 5) ÷ 20."], ["/ / 20 4 5", "The operators cannot all come first."]],
    "Equal precedence: the left operator is output first.", { hints: ["Which division is performed first?"] });
  mc(b, 3, "UNDERSTANDING", "While converting infix to postfix, what happens when a closing bracket is read?",
    ["Operators are popped to the output down to the opening bracket", "Correct."],
    [["The closing bracket is added to the output", "Brackets never appear in postfix."], ["All the numbers are popped from the stack and output", "The stack holds operators in this method."], ["Conversion starts again from the first token read", "The conversion carries on."]],
    "The operators inside the brackets are completed first.", { hints: ["What does the opening bracket mark on the stack?"] });
  mc(b, 2, "UNDERSTANDING", "When evaluating the postfix expression 10 4 -, which calculation is carried out?",
    ["10 - 4", "Correct: the first value popped is the right-hand operand, 4."],
    [["4 - 10", "The operands would then be in the wrong order."], ["10 + 4", "The operator is a subtraction."], ["10 × 4", "The operator is a subtraction."]],
    "The second operand is the one popped first.");

  // ---- true / false, matching, fill in the blank
  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "A correct postfix expression may contain brackets to show the order of operations.", answer: false,
    explanation: "False. The order of the tokens already fixes the order of the operations, so brackets are never needed." });
  b.tf({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "Evaluating a valid postfix expression leaves exactly one value on the stack at the end.", answer: true,
    explanation: "True. That value is the result." });
  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each infix expression to its postfix form.",
    pairs: [["3 + 4 * 2", "3 4 2 * +"], ["( 3 + 4 ) * 2", "3 4 + 2 *"], ["3 * 4 + 2", "3 4 * 2 +"], ["3 - 4 - 2", "3 4 - 2 -"]],
    explanation: "Convert with an operator stack; brackets and precedence decide the order." });
  b.fib({ d: 3, skill: "APPLICATION", hints: ["Which operations are done before the final one?"],
    stem: "Complete the postfix form of `" + e5 + "`.",
    template: "15 5 {{blank:a}} 7 3 {{blank:b}} {{blank:c}}",
    blanks: [
      { id: "a", accepted: ["+"], choices: ["+", "-", "*", "/"] },
      { id: "b", accepted: ["-"], choices: ["+", "-", "*", "/"] },
      { id: "c", accepted: ["/"], choices: ["+", "-", "*", "/"] },
    ], explanation: "15 5 + 7 3 - /" });

  // ---- numerical
  b.num({ d: 3, skill: "APPLICATION", calculator: false, hints: ["Use a stack: push numbers, and for each operator pop two values."],
    stem: "Evaluate the postfix expression `" + r2.join(" ") + "`.",
    value: 32, wrong: [20, 8], workedSolution: "1. 9 5 - = 4.\n2. 2 6 + = 8.\n3. 4 × 8 = 32.", explanation: "The two brackets give 4 and 8, and 4 × 8 = 32." });
  b.num({ d: 3, skill: "APPLICATION", calculator: false, hints: ["10 below 4 means 10 − 4... apply the operator to the right operands."],
    stem: "Evaluate the postfix expression `" + pf2.join(" ") + "`.",
    value: 10, wrong: [9, 24], workedSolution: "1. 4 6 + = 10.\n2. 3 2 - = 1.\n3. 10 × 1 = 10.", explanation: "(4 + 6) × (3 - 2) = 10." });
  b.num({ d: 4, skill: "ANALYSIS", calculator: false, hints: ["Count the values on the stack after each token and find the largest."],
    stem: "The postfix expression `" + pf1.join(" ") + "` is evaluated using a stack. What is the greatest number of values on the stack at any time?",
    value: stackMax(pf1), wrong: [2, 5], workedSolution: "Stack sizes after each token: " + evalRpn(pf1).steps.map((s) => s.stack.length).join(", ") + ". The greatest is " + stackMax(pf1) + ".", explanation: "The stack holds 5, 1 and 2 together: 3 values." });
  b.num({ d: 4, skill: "APPLICATION", calculator: false, hints: ["Convert to postfix, then evaluate it."],
    stem: "Convert `" + e4 + "` to postfix and evaluate it. What is the value?",
    value: 2, wrong: [4, 7], workedSolution: "1. Postfix: " + r4.join(" ") + ".\n2. 6 × 2 = 12; (8 - 3) = 5; 5 × 2 = 10.\n3. 12 - 10 = 2.", explanation: "12 - 10 = 2." });
  b.short({ d: 2, skill: "RECALL", stem: "Name the data structure that holds the values while a postfix expression is evaluated.", accepted: ["stack", "a stack"], wrong: ["queue", "array"], explanation: "A stack." });

  // ---- self-marked
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 3, hints: ["Think about brackets, precedence and the number of passes."],
    stem: "Explain why Reverse Polish Notation is used by compilers and calculators. [3]",
    points: ["No brackets or precedence rules are needed when the expression is evaluated", "It can be evaluated with a simple stack in one pass from left to right", "It is simple for the compiler to generate code in the order that the operations are to be done"],
    modelAnswer: "No brackets or precedence rules are needed during evaluation, because the order of the tokens gives the order of the operations. It can be evaluated in one left-to-right pass with a stack, and code can be generated in the same order.",
    explanation: "No brackets, one pass with a stack, easy code generation." });
  b.manualShort({ d: 4, skill: "APPLICATION", marks: 4, hints: ["Show the stack after each token."],
    stem: "Show how the postfix expression `4 6 + 3 2 - *` is evaluated using a stack. [4]",
    points: ["4 and 6 are pushed, then the `+` replaces them by 10", "3 and 2 are pushed", "The `-` replaces 3 and 2 by 1 (3 - 2)", "The `*` replaces 10 and 1 by 10; the final value is 10"],
    modelAnswer: "Push 4, 6; + gives 10. Push 3, 2; - gives 1 (stack 10, 1). * gives 10. The result is 10.",
    explanation: "The stack contents are shown at each step." });
  b.manualShort({ d: 4, skill: "APPLICATION", marks: 4, hints: ["Use an output list and an operator stack."],
    stem: "Convert the infix expression `" + e5 + "` to postfix using an operator stack. Show the output and the stack as you go. [4]",
    points: ["The opening bracket is pushed; 15 goes to the output; `+` is pushed", "5 goes to the output; `)` pops `+` to the output, giving `15 5 +`", "`/` is pushed; `(` is pushed; 7 is output; `-` is pushed; 3 is output; `)` pops `-` to the output", "At the end `/` is popped, giving `15 5 + 7 3 - /`"],
    modelAnswer: "Output grows as 15, 5, +, then 7, 3, -, and finally /, giving 15 5 + 7 3 - /. The brackets force the + and - to be output before the /.",
    explanation: "Operands to the output; operators wait on the stack." });

  // ---- structured practice
  b.struct({ d: 4, skill: "APPLICATION", examStyle: true, hints: ["Operators in the postfix expression are applied in order from the left."],
    explanation: "Evaluating the postfix expression with a stack.",
    stem: "A program in Mutare evaluates the postfix expression\n\n" + codeBlock(pf1.join(" ")) + "\nusing a stack. The values pushed are whole numbers.",
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "State the top value on the stack after the token `+` (the first operator) has been processed.", value: 3, wrong: [2, 8], workedSolution: "The stack was 5, 1, 2. + pops 2 and 1 and pushes 3.", explanation: "1 + 2 = 3." }),
      P.num({ label: "(b)", marks: 1, stem: "State the top value on the stack after the token `*` has been processed.", value: 12, wrong: [7, 3], workedSolution: "The stack was 5, 3, 4. * pops 4 and 3 and pushes 12.", explanation: "3 × 4 = 12." }),
      P.num({ label: "(c)", marks: 1, stem: "State the final result.", value: 14, wrong: [17, 12], workedSolution: "5 + 12 = 17; 17 - 3 = 14.", explanation: "14." }),
      P.num({ label: "(d)", marks: 1, stem: "What is the greatest number of values on the stack?", value: 3, wrong: [2, 4], workedSolution: "5, 1 and 2 are on the stack together.", explanation: "3." }),
      P.manual({ label: "(e)", marks: 2, stem: "Write the infix expression, using brackets where needed.", points: ["5 + ((1 + 2) * 4) - 3 (or equivalent) with the correct operations", "Brackets give (1 + 2) before the multiplication"], modelAnswer: "5 + (1 + 2) * 4 - 3", explanation: "The bracket forces the addition before the multiplication." }),
    ] });
  b.struct({ d: 3, skill: "APPLICATION", examStyle: true, hints: ["Operators wait on the stack until one of lower precedence arrives."],
    explanation: "Conversion with an operator stack.",
    stem: "An expression `" + e2 + "` is converted to postfix by a compiler. The conversion is shown below:\n\n" + shuntMd(e2.split(" ")),
    parts: [
      P.fib({ label: "(a)", marks: 2, stem: "Complete the postfix expression.", template: "9 5 {{blank:a}} 2 6 {{blank:b}} {{blank:c}}", blanks: [{ id: "a", accepted: ["-"], choices: ["-", "+", "*", "/"] }, { id: "b", accepted: ["+"], choices: ["-", "+", "*", "/"] }, { id: "c", accepted: ["*"], choices: ["-", "+", "*", "/"] }], wrong: [["+", "-", "-"]], explanation: "9 5 - 2 6 + *" }),
      P.num({ label: "(b)", marks: 1, stem: "Evaluate the expression.", value: 32, wrong: [4, 8], workedSolution: "(9 - 5) = 4; (2 + 6) = 8; 4 × 8 = 32.", explanation: "32." }),
      P.manual({ label: "(c)", marks: 3, stem: "Explain why the operator stack was empty after the first closing bracket.", points: ["The closing bracket pops operators to the output until the opening bracket", "The + was popped to the output", "The opening bracket was then discarded, leaving the stack empty"], modelAnswer: "The closing bracket pops operators to the output until the opening bracket. The + was popped and the opening bracket discarded, leaving the stack empty.", explanation: "Brackets mark the start of a sub-expression." }),
    ] });

  // ---- flashcards
  b.card("DEFINITION", "Reverse Polish Notation", "A way of writing expressions with each operator after its operands; needs no brackets or precedence rules.");
  b.card("CONCEPT", "Evaluating postfix", "Read left to right: push numbers; for an operator pop two values, apply it (first popped is the right operand) and push the result.");
  b.card("CONCEPT", "Infix to postfix", "Operands go to the output; an operator pops higher or equal precedence operators from the stack first; ( is pushed; ) pops to (; empty the stack at the end.");
  b.card("CONCEPT", "Postfix to infix", "Push operands as strings; for an operator pop two strings and push (left operator right).");
  b.card("FACT", "Why RPN is used", "No brackets or precedence at evaluation time; one left-to-right pass with a stack; easy for compilers and calculators.");
  b.card("FACT", "Operator order", "Postfix 10 4 - means 10 - 4: the value popped first is the right-hand operand.");
  b.card("FACT", "Brackets in postfix", "Postfix never contains brackets.");
  b.card("CONCEPT", "Equal precedence", "Operators of equal precedence are applied left to right, so 20 / 4 / 5 becomes 20 4 / 5 /.");
});
