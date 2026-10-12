// Slice w4b: user-defined data types (acs.ds.user-defined-types, Cambridge only).
import { concept, P, chk, same, mdTable, codeBlock, py } from "../lib.mjs";
import { mc, pm } from "../tables/w4b-q.mjs";

concept("acs.ds.user-defined-types", { file: "ds/user-defined-types", keyPrefix: "ds.user-defined-types" }, (b) => {
  // ---- computed values
  const turn = py(`from enum import Enum
class Direction(Enum):
    NORTH = 0
    EAST = 1
    SOUTH = 2
    WEST = 3
d = Direction.EAST
for _ in range(3):
    d = Direction((d.value + 1) % 4)
print(d.name)`);
  same(turn, "NORTH");
  const setOut = py(`a = {"Maths", "Physics", "Chemistry"}
b = {"Maths", "Computing", "Physics"}
print(sorted(a & b))
print(len(a | b))
print(sorted(a - b))`).split("\n");
  same(setOut, ["['Maths', 'Physics']", "4", "['Chemistry']"]);
  const stockCode = `from dataclasses import dataclass

@dataclass
class Stock:
    item: str
    qty: int
    price: float

shop = [Stock("Soap", 10, 2.5), Stock("Bread", 4, 1.5), Stock("Milk", 6, 3.0)]
total = 0
for s in shop:
    total = total + s.qty * s.price
shop[1].qty = shop[1].qty + 6
print(shop[1].item, shop[1].qty)
print(total)`;
  const stockOut = py(stockCode).split("\n");
  same(stockOut, ["Bread 10", "49.0"]);
  chk(10 * 2.5 + 4 * 1.5 + 6 * 3, 49);
  const ptr = py(`memory = {500: 12, 504: 7}
p = 500
q = 504
memory[p] = memory[p] + 3
p = q
memory[p] = memory[p] * 2
print(memory[500], memory[504], p)`);
  same(ptr, "15 14 504");

  // ---- multiple choice
  mc(b, 2, "RECALL", "What is an enumerated data type?",
    ["A type whose values are a list of named constants", "For example (Mon, Tue, Wed)."],
    [["A type that stores the address of another variable in memory", "That is a pointer."], ["A type that groups fields of different types", "That is a record."], ["A type that holds only the values TRUE and FALSE as a built-in", "That is BOOLEAN, a built-in type."]],
    "An enumerated type lists its allowed values by name.", { daily: true });
  mc(b, 2, "RECALL", "What does a pointer variable hold?",
    ["The memory address of another value", "It points to a location."],
    [["A copy of another variable's value", "That would be an ordinary variable."], ["A list of the fields of a record", "That describes a record."], ["The data type of another variable", "A type is not stored as a value."]],
    "A pointer holds an address.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "Which is a composite data type?",
    ["Record", "A record is made of several fields."],
    [["Enumerated", "An enumerated type is non-composite."], ["INTEGER", "INTEGER holds one value."], ["Pointer", "A pointer holds one address and is non-composite."]],
    "Records, sets and classes are composite types.", { daily: true });
  mc(b, 3, "APPLICATION", "A program stores the rainy, dry and cold seasons of a farm. Which user-defined type is the most suitable?",
    ["An enumerated type of the three seasons", "The values are a fixed list of names."],
    [["A pointer to an integer", "A pointer holds an address."], ["A record with three INTEGER fields", "Seasons are alternatives, not parts of one item."], ["A set of three real numbers", "The seasons are names, not real numbers."]],
    "A fixed list of names is an enumerated type.", { hints: ["Is the data a fixed list of names, an address or several parts?"] });
  mc(b, 3, "APPLICATION", "A school stores each teacher's name (STRING), years of service (INTEGER) and whether they are a form teacher (BOOLEAN). Which type keeps these items together?",
    ["A record", "Fields of different types under one name."],
    [["An array of STRING", "An array holds one type."], ["An enumerated type", "That has a list of names only."], ["A set of INTEGER", "A set holds one kind of value without duplicates."]],
    "A record groups fields of different types.", { hints: ["How many different types of data are there in one teacher's details?"] });
  mc(b, 3, "ANALYSIS", "A set contains the values 2, 4, 4, 6 and 6 when it is created from a list. How many values does the set hold?",
    ["3", "Duplicates are stored once: 2, 4 and 6."],
    [["5", "That counts the duplicates."], ["2", "Two values are repeated, but the other values remain."], ["6", "That is the largest value."]],
    "A set has no duplicate values.", { hints: ["How many different values are in the list?"] });
  mc(b, 2, "UNDERSTANDING", "Which is a benefit of an enumerated type compared with using the integers 0 to 4 for days of the week?",
    ["Only listed values are allowed and the names are clear", "Both safety and readability improve."],
    [["It always uses less memory than an integer in every language", "Memory use depends on the language."], ["It lets the days be stored in any order that is wanted", "The list has a fixed order."], ["It removes the need for any declarations in the program", "A variable of the type must still be declared."]],
    "Enumerated types limit the values and make code readable.");

  // ---- true / false
  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "The fields of a record can be of different data types.", answer: true,
    explanation: "True. A record may combine a STRING name, an INTEGER form and a REAL amount." });
  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "The elements of a set are stored in a fixed order, and the same value can appear in a set more than once.", answer: false,
    explanation: "False. A set is unordered and has no duplicates." });

  // ---- fib, num, short, match
  b.fib({ d: 3, skill: "APPLICATION", calculator: false, hints: ["P and Q hold addresses. The pointer's value is the address."],
    stem: "Memory location 500 holds 12 and location 504 holds 7. A program is run.\n\n" + codeBlock(`p = 500
q = 504
memory[p] = memory[p] + 3
p = q
memory[p] = memory[p] * 2`, "python") + "\nState the final values.",
    template: "Value at address 500: {{blank:a}}\n\nValue at address 504: {{blank:b}}\n\nAddress held by p: {{blank:c}}",
    blanks: [{ id: "a", input: "number", accepted: ["15"] }, { id: "b", input: "number", accepted: ["14"] }, { id: "c", input: "number", accepted: ["504"] }], wrong: [["12", "7", "500"]],
    explanation: "memory[500] becomes 12 + 3 = 15. Then p holds 504, so memory[504] becomes 7 × 2 = 14." });
  b.num({ d: 3, skill: "APPLICATION", calculator: false, hints: ["Combine the sets and count the different values."],
    stem: "Set A holds the subjects Maths, Physics and Chemistry. Set B holds Maths, Computing and Physics. How many values are in the union of A and B (all subjects in either set, with none counted twice)?",
    value: 4, wrong: [6, 2], workedSolution: "Maths and Physics are in both sets. The union is Maths, Physics, Chemistry and Computing: 4 values.", explanation: "The union has 4 values." });
  b.num({ d: 3, skill: "APPLICATION", calculator: false, hints: ["Multiply the quantity by the price for each record and add."],
    stem: "A store holds the records Rice (quantity 8, price 2), Salt (quantity 5, price 1) and Oil (quantity 3, price 4). Calculate the total value of the stock, in dollars, as quantity × price summed over the records.",
    value: 8 * 2 + 5 * 1 + 3 * 4, wrong: [16, 12], workedSolution: "8 × 2 = 16, 5 × 1 = 5 and 3 × 4 = 12; 16 + 5 + 12 = 33.", explanation: "The stock is worth 33 dollars." });
  b.short({ d: 2, skill: "RECALL", stem: "State the pseudocode keyword that ends the definition of a record type that begins with `TYPE`.", accepted: ["ENDTYPE", "endtype"], wrong: ["ENDRECORD"], explanation: "A type definition ends with ENDTYPE." });
  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each user-defined type to a suitable use.",
    pairs: [["Enumerated type", "The four compass directions"], ["Record", "A learner's name, form and fees paid"], ["Set", "The subjects a pupil has passed, with no duplicates"], ["Pointer", "The address of a large value in memory"]],
    explanation: "Choose the type that fits the data." });

  // ---- self-marked
  b.manualShort({ d: 4, skill: "CREATION", marks: 3, hints: ["Start with TYPE and name the fields with their types."],
    stem: "Write the pseudocode definition of a record type `TStock` with the fields `Item` (STRING), `Quantity` (INTEGER) and `Price` (REAL). [3]",
    points: ["TYPE TStock to begin and ENDTYPE to end the definition", "The fields declared with DECLARE and a colon", "Correct types for all three fields: STRING, INTEGER and REAL"],
    modelAnswer: codeBlock(`TYPE TStock
    DECLARE Item : STRING
    DECLARE Quantity : INTEGER
    DECLARE Price : REAL
ENDTYPE`), explanation: "A record type lists its fields between TYPE and ENDTYPE." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 3, hints: ["Compare the allowed values, the names and the checks."],
    stem: "Explain why a user-defined enumerated type is better than using the integers 1 to 7 to store days of the week. [3]",
    points: ["Only the listed values can be stored, so an impossible day such as 9 is not allowed", "The names (such as Wed) are meaningful, so the code is easier to read", "The values have a fixed order, so they can be compared or looped through"],
    modelAnswer: "Only the listed days can be stored, so an impossible value is not allowed. The names are meaningful, so the code is easier to read, and the fixed order allows comparisons and loops.", explanation: "Safety, readability and order." });
  b.manualShort({ d: 4, skill: "ANALYSIS", marks: 3, hints: ["What can a record hold that an array cannot?"],
    stem: "A programmer stores the names, forms and fees paid of 30 learners in three separate arrays. Explain why an array of records would be better. [3]",
    points: ["A record keeps the name, form and fees of one learner together as a single item", "The three arrays could get out of step (for example if one is sorted or changed and the others are not)", "An array of records can be passed to a procedure or sorted as one structure, and the field names make the code clearer"],
    modelAnswer: "A record keeps all of one learner's data together as one item. Three separate arrays could get out of step, for example if only one is sorted. An array of records can be processed as a single structure and the field names make the code clearer.", explanation: "Related data belongs in one structure." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 3, hints: ["Define the pointer, then say what happens when it is dereferenced."],
    stem: "Explain what is meant by a pointer and what is meant by dereferencing it. [3]",
    points: ["A pointer is a variable that holds the memory address of another value", "Dereferencing means following the pointer to the value stored at that address", "The value can then be read or changed through the pointer"],
    modelAnswer: "A pointer is a variable that holds the memory address of another value. Dereferencing follows the address to the value stored there, which can then be read or changed.", explanation: "Address, then value." });

  // ---- structured practice
  b.struct({ d: 4, skill: "ANALYSIS", examStyle: true, calculator: false, hints: ["Work out each product before adding.", "A field is reached with the record name, a full stop (or dot) and the field name."],
    explanation: "Reading a program that uses a list of records.",
    stem: `A tuck shop in Kadoma keeps its stock in an array of records. This Python program uses a dataclass as the record type.\n\n${codeBlock(stockCode, "python")}`,
    parts: [
      P.short({ label: "(a)", marks: 1, stem: "State the first line of output.", accepted: [stockOut[0]], normalise: ["trim", "collapse_whitespace"], explanation: "The quantity of Bread (4) is increased by 6, giving 10." }),
      P.num({ label: "(b)", marks: 1, stem: "State the value of `total` that is output.", value: 49, wrong: [55, 20], workedSolution: "The total is calculated before the quantity of bread changes: 25 + 6 + 18 = 49.", explanation: "The total is 49.0, because it was calculated before the change." }),
      pm("(c)", "Which expression gives the name of the second item in the list?", ["`shop[1].item`", "Index 1 is the second element, and .item is the field."], [["`shop.item[1]`", "The index belongs to the list, not to the field."], ["`shop[2].item`", "Index 2 is the third element."], ["`item.shop[1]`", "The list name comes first."]], "Use the list index, then the field name."),
      P.manual({ label: "(d)", marks: 3, stem: "Write the pseudocode record type `TStock` for this data, with the fields `Item`, `Qty` and `Price` of suitable types.", points: ["TYPE TStock ... ENDTYPE", "Item declared as STRING and Qty as INTEGER", "Price declared as REAL"], modelAnswer: codeBlock(`TYPE TStock
    DECLARE Item : STRING
    DECLARE Qty : INTEGER
    DECLARE Price : REAL
ENDTYPE`), explanation: "The types match the data." }),
      P.manual({ label: "(e)", marks: 2, stem: "Give two reasons why a list of records is better than three separate lists for the items, quantities and prices.", points: ["The details of one item stay together as one unit", "The lists cannot get out of step; one list of records is easier to pass to a routine and to sort"], modelAnswer: "The details of one item stay together, so the lists cannot get out of step, and one list of records is easier to pass to a routine or sort.", explanation: "Related data in one structure." }),
    ] });
  b.struct({ d: 4, skill: "APPLICATION", examStyle: true, calculator: false, hints: ["Find the values that are in both sets.", "A set holds each value once."],
    explanation: "Set operations on the subjects taken by two learners.",
    stem: "Two learners at a school in Bindura have the sets of subjects shown. Set A = {Maths, Physics, Chemistry} and Set B = {Maths, Computing, Physics}.",
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "State the number of different subjects in either set (the union).", value: 4, wrong: [6, 3], workedSolution: "Maths, Physics, Chemistry and Computing: 4.", explanation: "Four different subjects." }),
      P.short({ label: "(b)", marks: 2, stem: "State the subjects that are in both sets (the intersection).", accepted: ["Maths, Physics", "Physics, Maths", "Maths and Physics", "Physics and Maths"], wrong: ["Chemistry"], explanation: "Maths and Physics appear in both A and B." }),
      pm("(c)", "Which subject is in A but not in B?", ["Chemistry", "A minus B leaves Chemistry."], [["Maths", "Maths is in both sets."], ["Computing", "Computing is in B only."], ["Physics", "Physics is in both sets."]], "The difference A - B is {Chemistry}."),
      P.manual({ label: "(d)", marks: 2, stem: "Explain why a set is a better choice than an array for the subjects a learner takes.", points: ["A set cannot hold the same subject twice, so duplicates are avoided automatically", "Order does not matter, and set operations such as intersection and union are available"], modelAnswer: "A set cannot hold a subject twice, and the order does not matter. Operations such as union and intersection are available to compare learners.", explanation: "Sets fit unordered data without duplicates." }),
    ] });

  // ---- flashcards
  b.card("DEFINITION", "User-defined data type", "A type the programmer defines to represent the data of a problem more accurately than the built-in types.");
  b.card("DEFINITION", "Enumerated type", "A type whose values are a list of named constants, e.g. TYPE TDay = (Mon, Tue, Wed); the order allows comparison.");
  b.card("DEFINITION", "Pointer", "A type whose value is the memory address of another value; dereferencing follows the address to the value.");
  b.card("DEFINITION", "Record", "A composite type with fields of different types under one name: TYPE ... DECLARE field : type ... ENDTYPE.");
  b.card("DEFINITION", "Set", "A composite type: an unordered collection with no duplicates; operations are membership, union, intersection and difference.");
  b.card("FACT", "Non-composite and composite", "Non-composite: enumerated, pointer. Composite: record, set, class (object).");
  b.card("FACT", "Python equivalents", "Enum for enumerated types, dataclass or class for a record, set for a set.");
  b.card("CONCEPT", "Why use user-defined types", "Limit the allowed values, group related data, make code readable and safer.");
  b.card("CONCEPT", "Record or array", "An array holds items of one type; a record groups fields of different types; an array of records holds many items.");
});
