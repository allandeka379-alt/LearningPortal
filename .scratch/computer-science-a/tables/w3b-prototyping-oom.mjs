import { mdTable, pyBlock, same, chk } from "../lib.mjs";

// class hierarchy for a school system
const code = `class Person:
    def __init__(self, name, person_id):
        self.name = name
        self.person_id = person_id

    def describe(self):
        return self.name + " (" + self.person_id + ")"

class Learner(Person):
    def __init__(self, name, person_id, form):
        super().__init__(name, person_id)
        self.form = form

    def describe(self):
        return Person.describe(self) + ", form " + self.form

class Teacher(Person):
    def __init__(self, name, person_id, subject):
        super().__init__(name, person_id)
        self.subject = subject

people = [Learner("Tendai Moyo", "L101", "5A"),
          Teacher("Mrs Sibanda", "T07", "Physics")]
for p in people:
    print(p.describe())`;
const run = pyBlock(code);
same(run.text, "Tendai Moyo (L101), form 5A\nMrs Sibanda (T07)");

// attribute counts with and without inheritance
const classes = { Person: ["name", "person_id"], Learner: ["form"], Teacher: ["subject"], Clerk: ["office"] };
const withInherit = Object.values(classes).reduce((s, a) => s + a.length, 0);
const subs = ["Learner", "Teacher", "Clerk"];
const without = subs.reduce((s, c) => s + classes[c].length + classes.Person.length, 0);
chk(withInherit, 5);
chk(without, 9);
chk(without - withInherit, 4);

const classTable = mdTable(["Class", "Attributes (data)", "Methods (actions)", "Inherits from"], [
  ["Person", "name, person_id", "describe", "none"],
  ["Learner", "form", "describe (overrides)", "Person"],
  ["Teacher", "subject", "none of its own", "Person"],
  ["Clerk", "office", "none of its own", "Person"],
]);
const useCases = mdTable(["Actor", "Use case (what the actor does with the system)"], [
  ["Bursar", "Record a payment"],
  ["Bursar", "Print a fee statement"],
  ["Teacher", "Enter a mark"],
  ["Learner", "View own marks"],
]);
const nActors = new Set(["Bursar", "Teacher", "Learner"]).size;
chk(nActors, 3);
// prototyping schedule
const protos = 4;
const weeksEach = 2;
chk(protos * weeksEach, 8);
const protoTable = mdTable(["Prototype", "Weeks", "What the users see", "Outcome"], [
  ["1", "1-2", "Screens with no real data", "Users ask for a search box"],
  ["2", "3-4", "Search and data entry", "Users ask for fewer clicks"],
  ["3", "5-6", "Reports added", "Layout of the report changed"],
  ["4", "7-8", "All functions", "Accepted as the final system"],
]);
export const snips = {
  code: run.code, out: run.output, classTable, useCases,
  withInherit: String(withInherit), without: String(without), saved: String(without - withInherit),
  protoTable, totalWeeks: String(protos * weeksEach), nProtos: String(protos),
};
if (process.argv[1].endsWith("w3b-prototyping-oom.mjs")) console.log(snips);
