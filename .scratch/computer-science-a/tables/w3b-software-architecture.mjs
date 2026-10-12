import { mdTable, pyBlock, same, chk } from "../lib.mjs";

const code = `MARKS = {"L101": [64, 72, 58], "L102": [81, 77, 90]}

def get_marks(learner_id):
    return MARKS.get(learner_id)

def average_mark(learner_id):
    marks = get_marks(learner_id)
    if marks is None:
        return None
    return sum(marks) / len(marks)

def show_result(learner_id):
    avg = average_mark(learner_id)
    if avg is None:
        print("Learner not found")
    else:
        print("Learner", learner_id, "average", round(avg, 1))

show_result("L101")
show_result("L102")
show_result("L999")`;
const r = pyBlock(code);
same(r.text, "Learner L101 average 64.7\nLearner L102 average 82.7\nLearner L999 not found".replace("Learner L999 not found", "Learner not found"));
chk((64 + 72 + 58) / 3, 64.666666666666667, 1e-9);
chk((81 + 77 + 90) / 3, 82.66666666666667, 1e-9);

const layers = mdTable(["Layer (tier)", "Responsibility", "Runs on", "Example in the results portal"], [
  ["Presentation", "Shows information and collects input", "The user's device", "The web page where a parent types the learner number"],
  ["Application (logic)", "Applies the rules of the system", "The application server", "Checks the parent is allowed to see the marks, calculates the average"],
  ["Data", "Stores and retrieves the data", "The database server", "The tables of marks and learners"],
]);

const steps = mdTable(["Step", "From", "To", "What happens"], [
  ["1", "Parent's browser", "Application server", "Request: marks of learner L101"],
  ["2", "Application server", "Database server", "Query: get the marks of L101"],
  ["3", "Database server", "Application server", "Result: 64, 72, 58"],
  ["4", "Application server", "Parent's browser", "Page showing the average, 64.7"],
]);

// capacity example
const peakRequests = 90; // per second at the busiest time
const perServer = 1 / 0.05; // each request takes 0.05 s of processing
chk(perServer, 20);
const servers = Math.ceil(peakRequests / perServer);
chk(servers, 5);
const spare = servers * perServer - peakRequests;
chk(spare, 10);

const comps = mdTable(["Component", "Tier", "Responsibility", "Interface it offers"], [
  ["Web page", "Presentation", "Display results and accept the learner number", "Calls GetResults(learnerId)"],
  ["Results service", "Application", "Check access rights and calculate averages", "GetResults(learnerId) returns marks and average"],
  ["Access control", "Application", "Decide who may see which learner", "IsAllowed(user, learnerId) returns true or false"],
  ["Marks database", "Data", "Store marks and learners", "SQL queries from the Results service only"],
]);

export const snips = {
  code: r.code, out: r.output, layers, steps, comps,
  peak: String(peakRequests), perServer: String(perServer), servers: String(servers), spare: String(spare),
};
if (process.argv[1].endsWith("w3b-software-architecture.mjs")) console.log(snips);
