// Slice w2a: syntax diagrams and BNF (acs.translation.bnf-syntax-diagrams, Cambridge A Level).
import { concept, P, chk, same, CAM, mdTable, codeBlock } from "../lib.mjs";
import { mc } from "../tables/w2a-q.mjs";
import { accepts, derive, bnfText, digits } from "../tables/w2a-bnf.mjs";

const codeInline = (x) => "`" + x + "`";
const OK = (G, s, str) => (accepts(G, s, str) ? 1 : 0);
const tbl = (G, s, list) => mdTable(["String", "Valid?"], list.map((x) => [`\`${x}\``, accepts(G, s, x) ? "valid" : "not valid"]));

concept("acs.translation.bnf-syntax-diagrams", { file: "translation/bnf-syntax-diagrams", keyPrefix: "translation.bnf-syntax-diagrams", applies: CAM }, (b) => {
  // grammar W: invented words of consonant-vowel syllables
  const W = { "<vowel>": ["a", "e", "i", "o", "u"].map((x) => [x]), "<consonant>": ["b", "d", "m", "n", "t"].map((x) => [x]), "<syllable>": [["<consonant>", "<vowel>"]], "<word>": [["<syllable>"], ["<syllable>", "<word>"]] };
  const WR = bnfText(W);
  chk(OK(W, "<word>", "mata"), 1); chk(OK(W, "<word>", "baba"), 1); chk(OK(W, "<word>", "mat"), 0); chk(OK(W, "<word>", "ama"), 0); chk(OK(W, "<word>", "tunedo"), 1);
  const dW = derive(W, "<word>", "mata");
  chk(dW.length - 1, 8);
  const dTab = mdTable(["Step", "Sentential form"], dW.map((f, i) => [i, `\`${f}\``]));
  const dBt = derive(W, "<word>", "bi");
  chk(dBt.length - 1, 4);
  chk(5 * 5 * 5 * 5, 625);
  // grammar D: declarations
  const D = { "<type>": [["INTEGER"], ["REAL"], ["CHAR"]], "<letter>": "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((x) => [x]), "<name>": [["<letter>"], ["<letter>", "<name>"]], "<declaration>": [["DECLARE ", "<name>", " : ", "<type>"]] };
  const dList = ["DECLARE Count : INTEGER", "DECLARE x : REAL", "DECLARE Count: INTEGER", "DECLARE Count : STRING", "DECLARE 2x : CHAR"];
  same(dList.map((s) => OK(D, "<declaration>", s)), [1, 1, 0, 0, 0]);
  const dTable = tbl(D, "<declaration>", dList);
  // grammar M: mobile
  const M = { "<digit>": digits.map((x) => [x]), "<mobile>": [["07", "<digit>", "<digit>", "<digit>", "<digit>", "<digit>", "<digit>", "<digit>", "<digit>"]] };
  same(["0771234567", "071234567", "0871234567"].map((s) => OK(M, "<mobile>", s)), [1, 0, 0]);
  // grammar E: simple conditions
  const Gtime = { "<digit>": digits.map((x) => [x]), "<hours>": [["0", "<digit>"], ["1", "<digit>"], ["2", "0"], ["2", "1"], ["2", "2"], ["2", "3"]], "<minutes>": [["0", "<digit>"], ["1", "<digit>"], ["2", "<digit>"], ["3", "<digit>"], ["4", "<digit>"], ["5", "<digit>"]], "<time>": [["<hours>", ":", "<minutes>"]] };
  same(["07:45", "23:59", "24:00", "7:45", "12:60"].map((s) => OK(Gtime, "<time>", s)), [1, 1, 0, 0, 0]);
  const timeTable = tbl(Gtime, "<time>", ["07:45", "23:59", "24:00", "7:45", "12:60"]);

  // ---- multiple choice
  mc(b, 1, "RECALL", "In BNF, what does the symbol ::= mean?",
    ["Is defined as", "Correct: the left side is defined by the right side."],
    [["Is equal to in value", "BNF defines the form of a string, not a value."], ["Is followed by", "Symbols side by side mean followed by."], ["Is repeated", "Repetition is shown by recursion."]],
    "A rule has the form non-terminal ::= definition.");
  mc(b, 2, "UNDERSTANDING", "In BNF, what is a non-terminal?",
    ["A name in angle brackets, replaced using its rule", "Correct, for example `<digit>`."],
    [["A symbol that appears in the final string of the language", "That is a terminal."], ["The last rule that is written in a grammar", "Position in the grammar is not what defines it."], ["A rule that can never be completed by the user", "A non-terminal is replaced by its definition."]],
    "Non-terminals are replaced until only terminals remain.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "What does the vertical bar | mean in a BNF rule?",
    ["Or: it separates the alternatives", "Correct."],
    [["And: both parts must follow each other", "Symbols side by side mean followed by."], ["Not: the following part is not allowed", "BNF has no negation."], ["End of the rule", "A rule ends at the end of its line."]],
    "Each alternative is a possible definition.", { daily: true });
  mc(b, 3, "UNDERSTANDING", "`<number>` ::= `<digit>` | `<number>``<digit>` is a recursive rule. What does the recursion allow?",
    ["A number with any number of digits", "Correct: the second alternative can be used again and again."],
    [["A number that can never be finished or written down", "The first alternative ends it."], ["Only numbers with two digits", "Each use adds one digit, so any length is possible."], ["Only the digits 0 and 1", "`<digit>` decides which digits are allowed."]],
    "Recursion gives repetition.", { hints: ["How many times can the second alternative be used?"] });
  mc(b, 2, "UNDERSTANDING", "In a syntax diagram, what does a path that loops back to an earlier point represent?",
    ["Repetition, as in a recursive rule", "Correct."],
    [["The end of the language being described", "The exit is where the path leaves."], ["A syntax error in the grammar itself", "A loop is part of the grammar."], ["A terminal symbol", "Terminals are in boxes."]],
    "A loop lets part of the rule be repeated.");
  mc(b, 3, "APPLICATION", "The rules of a grammar are:\n\n" + WR + "\nUsing these rules, which of these strings is a valid `<word>`?",
    ["tunedo", "Correct: tu, ne, do are each a consonant followed by a vowel."],
    [["mat", "The last syllable is incomplete."], ["ama", "The string starts with a vowel."], ["bdae", "The first syllable is two consonants."]],
    "A word is one or more consonant-vowel syllables.", { hints: ["Split the string into pairs of letters."] });
  mc(b, 3, "ANALYSIS", "What is wrong with a grammar in which the only rule for `<list>` is `<list> ::= <list> <item>`?",
    ["There is no alternative that ends the repetition", "Correct."],
    [["It uses angle brackets, which are not allowed in BNF", "Angle brackets are the correct notation."], ["It has only one rule, and a grammar needs two or more", "A grammar can have one rule per non-terminal."], ["The item is a terminal, and terminals cannot be used", "That would not be a fault."]],
    "A recursive rule needs a base alternative.", { hints: ["How could the derivation ever end?"] });

  // ---- true / false, matching, fill in the blank
  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "A string that is valid according to a BNF grammar must also have a sensible meaning.", answer: false,
    explanation: "False. BNF describes only the form of a string, not its meaning." });
  b.tf({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "In a derivation, every non-terminal is eventually replaced by terminals.", answer: true,
    explanation: "True. The derivation of a valid string ends with only terminals." });
  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each BNF feature to the matching feature of a syntax diagram.",
    pairs: [["A terminal", "A rounded box containing the symbol"], ["A non-terminal", "A rectangle containing its name"], ["Alternatives separated by a bar", "Separate parallel paths"], ["A recursive rule", "A path that loops back"], ["Symbols side by side", "Boxes joined in sequence along a path"]],
    explanation: "BNF and syntax diagrams describe the same rules in different ways." });
  b.fib({ d: 3, skill: "APPLICATION", hints: ["A time has hours, a colon and minutes."],
    stem: "Complete the BNF rule so that the string 07:45 is a valid `<time>`, where `<hours>` and `<minutes>` are defined elsewhere.",
    template: "`<time>` ::= `<hours>` {{blank:a}} `<minutes>`",
    blanks: [{ id: "a", accepted: [":"], choices: [":", "|", "::=", "<digit>"] }],
    explanation: "The colon is a terminal between the two non-terminals." });

  // ---- numerical
  b.num({ d: 3, skill: "APPLICATION", calculator: false, hints: ["Count each replacement, starting from the non-terminal `<word>`."],
    stem: "The rules of a grammar are:\n\n" + WR + "\nUsing these rules, a leftmost derivation of the string `bi` is made. How many replacement steps does it take?",
    value: dBt.length - 1, wrong: [3, 7], workedSolution: ["The derivation is:", "", ...dBt.map((f, i) => i + ". " + codeInline(f)), "","There are 4 replacement steps."].join("\n"),explanation: "Four replacements: `<word>`, `<syllable>`, `<consonant>`, `<vowel>`." });
  b.num({ d: 4, skill: "APPLICATION", calculator: false, hints: ["How many choices are there for each position?"],
    stem: "With the same rules, how many different valid words are made of exactly two syllables? There are 5 consonants and 5 vowels.",
    value: 625, wrong: [100, 50], workedSolution: "1. One syllable has 5 × 5 = 25 possibilities.\n2. Two syllables: 25 × 25 = 625.", explanation: "25 × 25 = 625." });
  b.num({ d: 3, skill: "APPLICATION", calculator: false, hints: ["Each step replaces one non-terminal; the derivation shown has the sentential forms listed."],
    stem: "A leftmost derivation of `mata` is made with the same rules. How many steps does it take?",
    value: dW.length - 1, wrong: [4, 6], workedSolution: "The derivation:\n\n" + dW.map((f, i) => i + ". " + codeInline(f)).join("\n"), explanation: "Eight steps." });
  b.short({ d: 2, skill: "RECALL", stem: "What name is given to a rule that is defined in terms of itself?", accepted: ["recursive", "recursive rule", "recursion"], wrong: ["terminal", "iterative"], explanation: "A recursive rule." });

  // ---- self-marked
  b.manualShort({ d: 3, skill: "CREATION", marks: 3, hints: ["Define the digit, the two groups and put them together."],
    stem: "A school in Chinhoyi gives each student a code made of the letters ST, then a hyphen, then exactly four digits, for example ST-4071. Write BNF rules for a `<studentcode>`, defining any other non-terminals you use. [3]",
    points: ["A rule for `<digit>` with the alternatives 0 to 9", "A rule `<studentcode>` with the terminals ST and - in order", "Followed by exactly four `<digit>`s"],
    modelAnswer: "\n" + codeBlock("<digit> ::= 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9\n<studentcode> ::= ST - <digit> <digit> <digit> <digit>"),
    explanation: "Digit rule, prefix, four digits." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 3, hints: ["Explain recursion and the way it ends."],
    stem: "Explain how the rule  `<integer>` ::= `<digit>` | `<integer>``<digit>`  allows integers of any length. [3]",
    points: ["The second alternative contains `<integer>` itself, so it is recursive", "Each use of it adds one more digit", "The first alternative `<digit>` has no recursion and ends the repetition"],
    modelAnswer: "The second alternative contains `<integer>` itself, so it is recursive, and each use adds one more digit. The first alternative, `<digit>`, does not use the rule again, so it ends the repetition.",
    explanation: "Recursion, repetition, ending." });
  b.manualShort({ d: 4, skill: "APPLICATION", marks: 4, hints: ["Replace the leftmost non-terminal each time and show the new string."],
    stem: "The rules of a grammar are:\n\n" + WR + "\nUsing these rules, show that `no` is a valid `<word>` by writing a derivation. [4]",
    points: ["Start with `<word>` and replace it by `<syllable>`", "Replace `<syllable>` by `<consonant>``<vowel>`", "Replace `<consonant>` by n", "Replace `<vowel>` by o, leaving the string no"],
    modelAnswer: "`<word>` → `<syllable>` → `<consonant>` `<vowel>` → n `<vowel>` → n o",
    explanation: "Each step replaces the leftmost non-terminal." });

  // ---- structured practice
  b.struct({ d: 4, skill: "APPLICATION", examStyle: true, hints: ["Test each string against the rules, part by part."],
    explanation: "A time is two hour digits, a colon and two minute digits within limits.",
    stem: "A program accepts times in the form HH:MM. The rules are:\n\n" + bnfText(Gtime) + "\nThe results of testing some strings are shown:\n\n" + timeTable,
    parts: [
      P.mcq({ label: "(a)", marks: 1, stem: "Why is `24:00` not valid?", options: [["No alternative of `<hours>` starts with 24", "Correct: 2 can only be followed by 0 to 3."], ["The colon is missing from the string given", "The colon is there."], ["The minutes are not valid for a time of day", "00 is a valid minute value."], ["The characters in the string are not all digits", "They are digits."]], answer: "A", explanation: "`<hours>` allows 20 to 23 only after the 2." }),
      P.mcq({ label: "(b)", marks: 1, stem: "Why is `7:45` not valid?", options: [["`<hours>` needs two characters", "Correct: every alternative has two characters."], ["Seven is not a digit", "7 is a digit."], ["The minutes are too small", "45 is valid."], ["There is no terminal", "The colon is present."]], answer: "A", explanation: "Each hour is two characters, so 07 would be needed." }),
      P.manual({ label: "(c)", marks: 2, stem: "Explain why `12:60` is not valid.", points: ["`<minutes>` can start only with 0 to 5", "So 60 is not an alternative of `<minutes>`"], modelAnswer: "`<minutes>` can start only with a digit from 0 to 5, so 60 does not match any alternative.", explanation: "The first minute digit must be 0 to 5." }),
      P.manual({ label: "(d)", marks: 2, stem: "State whether `09:30` is valid and show the first three steps of a leftmost derivation.", points: ["Valid", "`<time>` → `<hours>` : `<minutes>` → 0 `<digit>` : `<minutes>` → ..."], modelAnswer: "Valid. `<time>` → `<hours>` : `<minutes>` → 0 `<digit>` : `<minutes>` → 0 9 : `<minutes>` ...", explanation: "Replace the leftmost non-terminal each time." }),
    ] });
  b.struct({ d: 3, skill: "APPLICATION", examStyle: true, hints: ["Decide which parts are fixed text and which are variable."],
    explanation: "BNF rules for a Zimbabwean mobile number format used by the program.",
    stem: "A program checks mobile numbers entered on a form. A valid number is 07 followed by exactly eight digits. The rules are:\n\n" + bnfText(M) + "\n",
    parts: [
      P.fib({ label: "(a)", marks: 2, stem: "Which of these strings are valid?", template: "0771234567 is {{blank:a}}.\n\n071234567 is {{blank:b}}.", blanks: [{ id: "a", accepted: ["valid"], choices: ["valid", "not valid"] }, { id: "b", accepted: ["not valid"], choices: ["valid", "not valid"] }], wrong: [["not valid", "valid"]], explanation: "The second string has only seven digits after 07." }),
      P.num({ label: "(b)", marks: 1, stem: "How many `<digit>`s follow the terminal 07 in a valid number?", value: 8, wrong: [7, 9], workedSolution: "The rule lists `<digit>` eight times.", explanation: "Eight." }),
      P.manual({ label: "(c)", marks: 3, stem: "A new rule is wanted for numbers that begin 07 and end with any number of extra digits (at least one). Write a recursive rule `<digits>` for one or more digits.", points: ["A non-recursive alternative containing just `<digit>`", "A recursive alternative that contains `<digits>` itself, such as `<digit>` `<digits>`", "The two alternatives separated by | in one rule with ::="], modelAnswer: "`<digits>` ::= `<digit>` | `<digit>` `<digits>`", explanation: "Base case and recursive case." }),
    ] });

  // ---- flashcards
  b.card("DEFINITION", "Backus-Naur Form (BNF)", "A notation for writing the syntax of a language: non-terminal ::= alternatives separated by |.");
  b.card("DEFINITION", "Terminal and non-terminal", "A terminal appears in the language itself; a non-terminal is a name in angle brackets that is replaced by its definition.");
  b.card("DEFINITION", "Syntax diagram", "Rules drawn as paths: terminals in rounded boxes, non-terminals in rectangles, alternatives as parallel paths, repetition as a loop.");
  b.card("CONCEPT", "Recursion in BNF", "A rule that uses its own name allows repetition; a non-recursive alternative ends it.");
  b.card("CONCEPT", "Derivation", "Replacing the leftmost non-terminal at each step until only terminals remain; shows that a string is valid.");
  b.card("FACT", "What a grammar describes", "The form of valid strings only, not their meaning.");
  b.card("CONCEPT", "Symbols side by side", "In BNF, symbols written next to each other mean 'followed by'.");
  b.card("CONCEPT", "BNF to diagram", "Sequence = boxes in order; | = parallel paths; recursion = loop back.");
});
