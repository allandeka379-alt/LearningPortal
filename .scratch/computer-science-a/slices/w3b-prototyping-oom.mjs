// Slice w3b: Prototyping and object-oriented methodology (acs.sdlc.prototyping-oom, ZIMSEC only).
import { concept, P, chk, same, py, codeBlock, mdTable } from "../lib.mjs";
import { mc, pm } from "../tables/w3b-q.mjs";

const prog = `class Vehicle:
    def __init__(self, registration, seats):
        self.registration = registration
        self.seats = seats

    def summary(self):
        return self.registration + " seats " + str(self.seats)

class Bus(Vehicle):
    def __init__(self, registration, seats, route):
        super().__init__(registration, seats)
        self.route = route

    def summary(self):
        return Vehicle.summary(self) + " on " + self.route

class Taxi(Vehicle):
    pass

fleet = [Bus("AEF 1234", 60, "Harare-Mutare"), Taxi("ABC 5678", 4), Bus("AGH 9012", 48, "Bulawayo-Gweru")]
total = 0
for v in fleet:
    print(v.summary())
    total = total + v.seats
print("Total seats:", total)`;
const out = py(prog);
same(out, "AEF 1234 seats 60 on Harare-Mutare\nABC 5678 seats 4\nAGH 9012 seats 48 on Bulawayo-Gweru\nTotal seats: 112");
chk(60 + 4 + 48, 112);
const classTbl = mdTable(["Class", "Attributes", "Methods", "Parent"], [
  ["Vehicle", "registration, seats", "summary", "none"],
  ["Bus", "route", "summary (overrides)", "Vehicle"],
  ["Taxi", "none of its own", "none of its own", "Vehicle"],
]);
// attribute counts: Vehicle 2 + Bus 1 + Taxi 0 = 3 defined; without inheritance 2+3+2 = 7
const withInh = 2 + 1 + 0;
const withoutInh = 2 + (2 + 1) + 2;
chk(withInh, 3);
chk(withoutInh, 7);
chk(withoutInh - withInh, 4);
const protoWeeks = 5 * 3;
chk(protoWeeks, 15);

concept("acs.sdlc.prototyping-oom", { file: "sdlc/prototyping-oom", keyPrefix: "sdlc.prototyping-oom" }, (b) => {
  mc(b, 1, "RECALL", "What is a prototype?",
    ["An early working model that users can try", "Correct."],
    [["The final system after it has been fully tested", "A prototype is an early model."], ["A document listing the user requirements", "That is a requirements specification."], ["A back-up copy of the system", "A prototype is not a backup."]],
    "A prototype is an early model used to find out what the users need.");
  mc(b, 2, "RECALL", "What happens to a prototype in throwaway prototyping?",
    ["It is thrown away after use", "Correct."],
    [["It is developed into the final system", "That describes evolutionary prototyping."], ["It is sold to the users as the final system", "A throwaway prototype is not delivered."], ["It is used as the user guide", "A prototype is not documentation."]],
    "Throwaway prototypes are built to learn the requirements and then discarded.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "Which is a benefit of prototyping?",
    ["Users see a working version early, so problems show up early", "Correct."],
    [["The users do not need to be involved", "Prototyping needs the users throughout."], ["The project always finishes sooner than a waterfall project", "Prototyping can continue for too long."], ["No documentation is needed", "Documentation is still required."]],
    "Early feedback is the main benefit of prototyping.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "In object-oriented methodology, what is a class?",
    ["A template for the attributes and methods of objects", "Correct."],
    [["One particular object, such as the learner Tendai Moyo", "That is an instance (object) of a class."], ["A group of users who test the system", "That is not an OOM term."], ["The language used to write the system", "A class is not a language."]],
    "A class is the template; an object is one instance of it.");
  mc(b, 3, "APPLICATION", "In a hospital system the classes Doctor and Nurse both have the attributes name and staff number. How can the duplication be removed?",
    ["Make a Staff class that Doctor and Nurse inherit from", "Correct: this is inheritance."],
    [["Delete the shared attributes from both of the classes", "The classes need the data."], ["Make Doctor and Nurse objects of each other's classes", "Classes are not objects of each other."], ["Store the shared attributes in a data flow diagram", "A diagram does not hold data."]],
    "A parent class holds the shared attributes and the subclasses inherit them.", { hints: ["Where can shared attributes be defined once?"] });
  mc(b, 3, "APPLICATION", "A company wants a new payroll system. The requirements are fixed by law and will not change. Which process model is the most suitable?",
    ["Waterfall", "Correct: stable requirements suit a sequence of stages."],
    [["Throwaway prototyping, because the users are unsure", "The requirements are fixed, so there is little to discover."], ["Evolutionary prototyping, because the rules change daily", "The rules do not change."], ["No model, because payroll is simple", "A model is still needed."]],
    "Stable, well-understood requirements suit the waterfall model.", { hints: ["Are the requirements clear?"] });
  mc(b, 3, "ANALYSIS", "A student reads \"The clinic keeps a record of each patient and each appointment\" and decides that `Patient` and `Appointment` are classes. Which technique did the student use?",
    ["Picking out the nouns in the description", "Correct: nouns suggest classes."],
    [["Picking out the verbs, which suggest classes", "Verbs suggest methods."], ["Drawing a flowchart", "No flowchart is involved."], ["Running a prototype", "Nothing was run."]],
    "Nouns suggest classes and verbs suggest methods.", { hints: ["Which kind of word is Patient?"] });
  mc(b, 4, "ANALYSIS", "Which of these is a drawback of evolutionary prototyping?",
    ["The system may be untidy and hard to maintain", "Correct."],
    [["The users never see the system until the very end", "Users see prototypes early."], ["The prototype is always thrown away", "That describes throwaway prototyping."], ["It cannot be used with changing requirements", "It is designed for changing requirements."]],
    "Many quick changes can lead to a messy design.", { hints: ["What happens to a design that is changed many times?"] });
  b.tf({ d: 1, skill: "RECALL", stem: "An object is one instance of a class.", answer: true, explanation: "True. The class is the template and the object is a particular example." });
  b.tf({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "In inheritance, a subclass can use the attributes and methods of its parent class.", answer: true, explanation: "True. This avoids writing the same attributes and methods again." });
  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each object-oriented term to its meaning.",
    pairs: [["Class", "A template for a kind of object"], ["Object", "One instance of a class"], ["Attribute", "A piece of data held by an object"], ["Method", "An action that an object can carry out"], ["Inheritance", "A class takes over the attributes and methods of a parent class"]],
    explanation: "These are the basic terms of object-oriented methodology." });
  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each type of prototyping to its description.",
    pairs: [["Throwaway", "Built to learn the requirements and then discarded"], ["Evolutionary", "Refined after each review until it becomes the final system"]],
    extraRight: ["Built after the final system as a back-up"],
    explanation: "Throwaway is discarded; evolutionary becomes the system." });
  b.fib({ d: 2, skill: "UNDERSTANDING", stem: "Complete the sentences.",
    template: "In OOM the nouns in the description suggest {{blank:a}} and the verbs suggest {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["classes"], choices: ["classes", "methods", "attributes", "actors"] },
      { id: "b", accepted: ["methods"], choices: ["classes", "methods", "attributes", "actors"] },
    ], explanation: "Nouns suggest classes; verbs suggest methods." });
  b.short({ d: 2, skill: "RECALL", stem: "Name the object-oriented feature that allows a class to take over the attributes and methods of another class.",
    accepted: ["inheritance", "inherit"], explanation: "Inheritance." });
  b.num({ d: 3, skill: "ANALYSIS", hints: ["Add the seats of the three vehicles."],
    stem: `Here is a Python program.\n\n${codeBlock(prog, "python")}\n\nState the number that is printed after \`Total seats:\`.`,
    value: 112, wrong: [64, 60], workedSolution: "60 + 4 + 48 = 112.", explanation: "The seats of the two buses and the taxi add up to 112." });
  b.num({ d: 3, skill: "APPLICATION", hints: ["Count how many attributes are defined in each class."],
    stem: `A class \`Vehicle\` defines 2 attributes (\`registration\` and \`seats\`). Its subclass \`Bus\` adds 1 attribute (\`route\`) and its subclass \`Taxi\` adds none, because they inherit the attributes of \`Vehicle\`. Without inheritance each class would define all of its own attributes, so \`Bus\` would define 3 and \`Taxi\` 2. How many fewer attribute definitions are needed with inheritance than without it?`,
    value: withoutInh - withInh, wrong: [3, 7], workedSolution: `1. Without inheritance: 2 + 3 + 2 = ${withoutInh}.\n2. With inheritance: 2 + 1 + 0 = ${withInh}.\n3. Difference = ${withoutInh - withInh}.`, explanation: `${withoutInh} − ${withInh} = ${withoutInh - withInh}.` });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4, hints: ["Two benefits and two drawbacks."],
    stem: "Discuss the benefits and drawbacks of prototyping. [4]",
    points: ["Benefit: the users see a working version early, so misunderstandings are found early", "Benefit: the users take part, so they are more likely to accept the final system", "Drawback: the users may think the prototype is nearly the whole system (or a rushed prototype has a poor design)", "Drawback: the project may continue too long because users keep asking for changes"],
    modelAnswer: "Users see a working version early so misunderstandings are found early, and they take part, so they are more likely to accept the final system. However users may think the prototype is nearly finished, and the project can continue for too long as they ask for more changes.",
    explanation: "Two benefits with reasons and two drawbacks." });
  b.manualShort({ d: 3, skill: "APPLICATION", marks: 4, hints: ["Look for the nouns."],
    stem: "A school library records books, members and loans. Identify three classes, and give one attribute and one method for each. [4]",
    points: ["Book class with an attribute such as title", "Member class with an attribute such as name", "Loan class with an attribute such as date due", "A suitable method for each class, for example borrow, return or calculateFine"],
    modelAnswer: "Book (title; method: markAsBorrowed), Member (name; method: borrowBook) and Loan (date due; method: calculateFine).",
    explanation: "Classes come from nouns; methods from verbs." });
  b.manualShort({ d: 4, skill: "EVALUATION", marks: 4, hints: ["Name the model, link it to the scenario and give a reason."],
    stem: "A cooperative in Mutare wants a mobile app for its farmers. The farmers have never used such an app and cannot say exactly what they want. Recommend a process model and justify your choice. [4]",
    points: ["Recommends prototyping", "The requirements are unclear, so the farmers need to see something working to say what they want", "Each prototype gives feedback that is used to improve the next one", "The waterfall model would deliver a system that may not meet their needs, found out only at the end"],
    modelAnswer: "Prototyping is suitable. The farmers cannot say what they want until they see something working, and each prototype gives feedback that improves the next one. With the waterfall model the mismatch would only be found at the end.",
    explanation: "Recommendation with reasons from the scenario." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 3, hints: ["Think about reuse."],
    stem: "Explain how object-oriented methodology allows software to be reused. [3]",
    points: ["Each class is a self-contained template with its own data and methods", "A class written for one project can be used again in another project", "Subclasses can inherit and extend a tested class instead of writing everything again"],
    modelAnswer: "Each class is self-contained, so a class from one project can be used again in another, and a subclass can inherit and extend a tested class instead of writing everything again.",
    explanation: "Self-contained classes and inheritance." });
  b.struct({ d: 3, skill: "APPLICATION", examStyle: true, hints: ["Read the class table."],
    explanation: "Taxi inherits everything from Vehicle; Bus adds a route and overrides summary.",
    stem: `A transport company uses these classes.\n\n${classTbl}`,
    parts: [
      P.short({ label: "(a)", marks: 1, stem: "Name the parent class of `Bus`.", accepted: ["Vehicle"], explanation: "Bus inherits from Vehicle." }),
      P.short({ label: "(b)", marks: 1, stem: "Name the attribute that is defined in `Bus` but not in `Vehicle`.", accepted: ["route"], explanation: "route is added by Bus." }),
      P.mcq({ label: "(c)", marks: 1, stem: "How many attributes does a `Taxi` object have?", options: [["2", "Correct: registration and seats are inherited from Vehicle."], ["0", "Inherited attributes are still attributes of the object."], ["1", "Taxi has no route attribute."], ["3", "Taxi does not have the route attribute."]], answer: "A", explanation: "A Taxi object has the 2 inherited attributes." }),
      P.manual({ label: "(d)", marks: 3, stem: "Explain how inheritance helps the developer in this design.", points: ["The attributes registration and seats are written once, in Vehicle", "Bus and Taxi use them without repeating the definitions", "A change to a shared attribute is made in one place"], modelAnswer: "The shared attributes are written once, in Vehicle. Bus and Taxi use them without repeating the definitions, and a change is made in one place.", explanation: "Less duplication; easier maintenance." }),
    ] });
  b.struct({ d: 4, skill: "ANALYSIS", examStyle: true, hints: ["Match the project to the characteristics of each model."],
    explanation: "Prototyping suits unclear requirements; OOM suits a system that will be extended; waterfall suits fixed requirements.",
    stem: `A college in Chinhoyi will develop an online enrolment system. The registrar is not sure what screens are needed. The college expects to add fee payment and accommodation later, and wants to reuse parts of the system. Prototyping would take ${protoWeeks} weeks in 5 prototypes of 3 weeks each.`,
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "How many weeks would prototyping take?", value: protoWeeks, wrong: [8, 5], explanation: "5 × 3 = 15 weeks.", workedSolution: "1. " + ("5 × 3 = 15 weeks.") }),
      P.manual({ label: "(b)", marks: 3, stem: "Explain why prototyping is suitable for this project.", points: ["The registrar is unsure what screens are needed", "She can try each prototype and say what to change", "The final system is therefore closer to what is needed"], modelAnswer: "The registrar is unsure what screens are needed, so she can try each prototype and say what to change, and the final system is closer to what is needed.", explanation: "Prototyping suits unclear requirements." }),
      P.manual({ label: "(c)", marks: 3, stem: "Explain why an object-oriented approach is suitable for this project.", points: ["Fee payment and accommodation can be added later as new classes", "Classes such as Student can be reused by the new parts", "A change is limited to one class"], modelAnswer: "New parts such as fee payment and accommodation can be added later as new classes, classes such as Student can be reused, and a change is limited to one class.", explanation: "OOM supports extension and reuse." }),
      P.manual({ label: "(d)", marks: 1, stem: "State one reason why the waterfall model would be less suitable.", points: ["The requirements are unclear and would not be known at the start"], modelAnswer: "The requirements are unclear and would not be known at the start.", explanation: "Waterfall needs clear requirements." }),
    ] });
  b.card("DEFINITION", "Prototype", "An early working model of a system that users try to find out what they need.");
  b.card("CONCEPT", "Throwaway and evolutionary prototyping", "Throwaway: discarded after the requirements are known. Evolutionary: refined until it becomes the final system.");
  b.card("CONCEPT", "Prototyping benefits and drawbacks", "Benefits: early feedback, user involvement. Drawbacks: users think it is nearly finished, untidy design, never-ending changes.");
  b.card("DEFINITION", "Object-oriented methodology", "Developing a system as a set of interacting objects, instances of classes.");
  b.card("DEFINITION", "Class and object", "Class: a template of attributes and methods. Object: one instance of a class.");
  b.card("CONCEPT", "Finding classes", "Nouns in the description suggest classes; verbs suggest methods; facts about nouns suggest attributes.");
  b.card("CONCEPT", "Inheritance", "A subclass takes over the attributes and methods of its parent class, so shared data is defined once.");
  b.card("CONCEPT", "Use case diagram", "Shows actors (users) and the use cases (things they do with the system).");
  b.card("CONCEPT", "Choosing a process model", "Fixed requirements: waterfall. Unclear requirements: prototyping. Reuse and extension: object-oriented.");
});
