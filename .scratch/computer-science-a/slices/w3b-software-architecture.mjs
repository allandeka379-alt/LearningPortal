// Slice w3b: Software architecture design (acs.sdlc.software-architecture, ZIMSEC only).
import { concept, P, chk, same, py, codeBlock, mdTable } from "../lib.mjs";
import { mc, pm } from "../tables/w3b-q.mjs";

// capacity: bank app
const peak = 135;
const secsPer = 0.04;
const perServer = 1 / secsPer;
chk(perServer, 25);
const serversNeeded = Math.ceil(peak / perServer);
chk(serversNeeded, 6);
const spareCap = serversNeeded * perServer - peak;
chk(spareCap, 15);
// response time across tiers (ms)
const times = { browserToApp: 40, appProcessing: 30, appToDb: 10, dbQuery: 25, dbToApp: 10, appToBrowser: 40 };
const totalMs = Object.values(times).reduce((a, b) => a + b, 0);
chk(totalMs, 155);

// layered program with real output
const code = `STOCK = {"A1": 40, "A2": 15, "A3": 0}

def get_stock(code):
    return STOCK.get(code)

def availability(code):
    quantity = get_stock(code)
    if quantity is None:
        return "unknown item"
    if quantity == 0:
        return "out of stock"
    return "in stock"

def show(code):
    print(code + ": " + availability(code))

for c in ["A1", "A3", "A9"]:
    show(c)`;
const out = py(code);
same(out, "A1: in stock\nA3: out of stock\nA9: unknown item");

const comps = mdTable(["Component", "Tier", "Responsibility"], [
  ["Mobile app screen", "Presentation", "Shows balances and accepts transfers"],
  ["Transfer service", "Application", "Checks the balance and applies the transfer rules"],
  ["Customer database", "Data", "Stores accounts and transactions"],
]);

concept("acs.sdlc.software-architecture", { file: "sdlc/software-architecture", keyPrefix: "sdlc.software-architecture" }, (b) => {
  mc(b, 1, "RECALL", "In a three-tier architecture, which tier stores the data?",
    ["The data tier", "Correct."],
    [["The presentation tier", "That shows information to the user."], ["The application tier", "That applies the rules of the system."], ["The client tier only", "The client does not store the shared data."]],
    "The data tier holds the database.");
  mc(b, 2, "RECALL", "What does the client do in a client-server system?",
    ["Asks the server for a service", "Correct."],
    [["Stores all of the shared data", "That is the server's job."], ["Provides the service to other computers", "That is the server's job."], ["Replaces the database", "A client is not a database."]],
    "The client requests; the server provides.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "Which tier of a three-tier system applies the rules of the system, such as checking a balance before a transfer?",
    ["The application tier", "Correct."],
    [["The presentation tier", "That displays information and collects input."], ["The data tier", "That stores and retrieves the data."], ["The network tier", "There is no such tier in the three-tier model."]],
    "The application tier contains the business rules.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "What is an interface of a component?",
    ["The operations it offers to others", "Correct."],
    [["The colour scheme of its screens and menus", "That is a presentation matter."], ["The programmer who wrote the component", "An interface is not a person."], ["The hardware that the component runs on", "An interface describes operations, not hardware."]],
    "Other components use the interface and need not know how it works inside.");
  mc(b, 3, "APPLICATION", "Why is the database not reachable from the users' devices in a three-tier design?",
    ["Only the application server can reach it, which is more secure", "Correct."],
    [["The database cannot be reached by any computer on the network", "The application server can reach it."], ["Clients are not allowed to use passwords on the system", "Clients can use passwords."], ["The database is much smaller than the clients are", "Size has nothing to do with it."]],
    "The application tier controls access to the data.", { hints: ["Who talks to the database?"] });
  mc(b, 3, "APPLICATION", "A small clinic has three computers in one building and 4 staff. Which architecture is the most suitable?",
    ["Two-tier, with the database on a small server", "Correct: it meets the need at a low cost."],
    [["Three-tier with a cluster of application servers", "Too complex and costly for four users."], ["No architecture is needed for a small clinic", "Every system has an architecture."], ["A separate tier for each of the four users", "This makes no sense."]],
    "Choose the simplest architecture that meets the requirements.", { hints: ["How many users and how complex are the needs?"] });
  mc(b, 3, "ANALYSIS", "A bank wants to change the rule for transfer limits. In a three-tier system, where is the change made?",
    ["In the application tier only", "Correct: the logic is in one place."],
    [["On every customer's phone", "That is the drawback of putting logic in the client."], ["In the database tables only", "The rules are not stored in the data tier."], ["In the presentation tier on each screen separately", "The presentation tier does not contain the rules."]],
    "Keeping the logic in one tier means a change is made in one place.", { hints: ["Which tier contains the rules?"] });
  mc(b, 4, "ANALYSIS", "Which statement about a layered architecture is correct?",
    ["Presentation calls logic, and logic calls data", "Correct."],
    [["The presentation layer reads the database directly for speed", "That breaks the layering."], ["The data layer calls the presentation layer", "Calls go downwards, not upwards."], ["All the layers must be on one computer", "Layers can be on separate computers as tiers."]],
    "Each layer uses only the layer beneath it.", { hints: ["In which direction do the calls go?"] });
  b.tf({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "In a three-tier system the presentation tier normally communicates directly with the data tier.", answer: false, explanation: "False. It communicates with the application tier, which communicates with the data tier." });
  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each tier to its responsibility.",
    pairs: [["Presentation tier", "Displays information and collects the user's input"], ["Application tier", "Applies the rules of the system"], ["Data tier", "Stores and retrieves the data"]],
    explanation: "Each tier has a single responsibility." });
  b.match({ d: 3, skill: "APPLICATION", hints: ["Which component faces the user?"],
    stem: "Match each component of a mobile banking system to its tier.",
    pairs: [["The screen that shows the balance", "Presentation tier"], ["The service that checks a transfer against the limit", "Application tier"], ["The tables of accounts and transactions", "Data tier"]],
    explanation: "Screens are presentation, rules are application, storage is data." });
  b.fib({ d: 3, skill: "APPLICATION", hints: ["Follow the request from the user to the data and back."],
    stem: "Put the stages of a request in a three-tier system in order.",
    template: "Step 1: the user's device sends a request to the {{blank:a}} server.\n\nStep 2: the {{blank:a2}} server sends a query to the {{blank:b}} server.\n\nStep 3: the {{blank:b2}} server returns the data to the application server.\n\nStep 4: the application server sends the page to the user's {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["application"], choices: ["application", "database", "client"] },
      { id: "a2", accepted: ["application"], choices: ["application", "database", "client"] },
      { id: "b", accepted: ["database"], choices: ["application", "database", "client"] },
      { id: "b2", accepted: ["database"], choices: ["application", "database", "client"] },
      { id: "c", accepted: ["device"], choices: ["device", "database", "application server"] },
    ], explanation: "Device, application server, database server, application server, device." });
  b.short({ d: 2, skill: "RECALL", stem: "Name the architecture in which the presentation, application logic and data are on three separate tiers.",
    accepted: ["three-tier", "three tier", "3-tier", "3 tier", "three-tier architecture", "three tier architecture"], explanation: "The three-tier architecture." });
  b.num({ d: 3, skill: "APPLICATION", unit: undefined, hints: ["One server handles 1 ÷ 0.04 requests per second."],
    stem: `A bank's application server takes ${secsPer} seconds to process one request. How many requests per second can one server process?`,
    value: perServer, wrong: [4, 250], workedSolution: `1 ÷ ${secsPer} = ${perServer}.`, explanation: `1 ÷ ${secsPer} = ${perServer} requests per second.` });
  b.num({ d: 4, skill: "ANALYSIS", hints: ["Divide the peak load by the capacity of one server and round up."],
    stem: `The bank expects ${peak} requests per second at its busiest time. One application server can process ${perServer} requests per second. What is the smallest number of application servers needed?`,
    value: serversNeeded, wrong: [5, 135], workedSolution: `1. ${peak} ÷ ${perServer} = ${peak / perServer}.\n2. Round up to ${serversNeeded}.`, explanation: `${peak} ÷ ${perServer} = 5.4, so ${serversNeeded} servers are needed.` });
  b.num({ d: 3, skill: "APPLICATION", unit: "ms", hints: ["Add the times of all the stages."],
    stem: `A request takes these times in milliseconds: browser to application server ${times.browserToApp}, processing ${times.appProcessing}, application server to database ${times.appToDb}, database query ${times.dbQuery}, database to application server ${times.dbToApp}, and application server to browser ${times.appToBrowser}. Calculate the total response time.`,
    value: totalMs, wrong: [115, 145], workedSolution: `${Object.values(times).join(" + ")} = ${totalMs}.`, explanation: `The stages add up to ${totalMs} ms.` });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4, hints: ["Two benefits and two drawbacks."],
    stem: "Discuss the benefits and drawbacks of a three-tier architecture compared with a two-tier architecture. [4]",
    points: ["Benefit: the logic is in one place, so a change is made once and not on every client", "Benefit: the database is not exposed to the clients, which is more secure (or each tier can be scaled separately)", "Drawback: more computers to buy and manage", "Drawback: requests pass between tiers, which adds delay and complexity"],
    modelAnswer: "The logic is in one place so a change is made once, and the database is not exposed to the clients, so it is more secure. However more computers must be bought and managed, and requests pass between tiers, which adds delay and complexity.",
    explanation: "Two benefits and two drawbacks." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 3, hints: ["Think about what each layer knows."],
    stem: "Explain what is meant by separation of concerns in a layered architecture and why it is useful. [3]",
    points: ["Each layer has one responsibility (presentation, logic or data)", "A layer uses only the layer beneath it, so it does not need to know how that layer works inside", "One layer can be changed (for example the database) without changing the others"],
    modelAnswer: "Each layer has one responsibility and uses only the layer beneath it without knowing how it works inside. This lets one layer, such as the database, be changed without changing the others.",
    explanation: "One responsibility each, hidden detail, easier change." });
  b.manualShort({ d: 4, skill: "CREATION", marks: 4, hints: ["Name each component, its tier and its responsibility."],
    stem: "A school wants an online system for parents to pay fees by mobile money. Describe three components of the system, state the tier of each and its responsibility. [4]",
    points: ["A web page or app screen in the presentation tier that collects the payment details and shows the result", "A payment service in the application tier that checks the amount, contacts the mobile money service and records the result", "A fees database in the data tier that stores learners' accounts and payments", "The components are linked through interfaces: the page calls the service, which is the only component that reads or writes the database"],
    modelAnswer: "A web page (presentation tier) collects the payment details and shows the result. A payment service (application tier) checks the amount, contacts the mobile money service and records the result. A fees database (data tier) stores the accounts and payments. The page calls the service, and only the service reads or writes the database.",
    explanation: "Components, tiers and interfaces." });
  b.manualShort({ d: 3, skill: "EVALUATION", marks: 3, hints: ["Link the number of users to the architecture."],
    stem: "A national examinations website expects 50 000 users on results day but very few on other days. Explain why a three-tier architecture is suitable. [3]",
    points: ["The application tier can use many servers to cope with the peak load", "Only the tier that is busy needs more computers (tiers can be scaled separately)", "The database is protected because users never connect to it directly"],
    modelAnswer: "More application servers can be used to cope with the peak load, only the busy tier needs extra computers, and the database is protected because users never connect to it directly.",
    explanation: "Scalability and security." });
  b.struct({ d: 3, skill: "APPLICATION", examStyle: true, hints: ["Round the number of servers up."],
    explanation: `${peak} ÷ ${perServer} = 5.4, so 6 servers; the spare capacity is ${spareCap} requests per second.`,
    stem: `A mobile money system uses a three-tier architecture. At the busiest time it receives ${peak} requests per second. Each request takes ${secsPer} seconds of an application server's time.`,
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "Calculate the number of requests that one application server can process per second.", value: perServer, wrong: [4, 250], explanation: "1 ÷ 0.04 = 25.", workedSolution: "1. " + ("1 ÷ 0.04 = 25.") }),
      P.num({ label: "(b)", marks: 2, type: "CALCULATION", stem: "Calculate the number of application servers needed for the busiest time.", value: serversNeeded, wrong: [5, 135], workedSolution: `135 ÷ 25 = 5.4, rounded up to ${serversNeeded}.`, explanation: "5.4 servers rounds up to 6." }),
      P.num({ label: "(c)", marks: 1, stem: "How many more requests per second could the servers in part (b) process at the busiest time?", value: spareCap, wrong: [10, 25], explanation: `6 × 25 = 150 requests per second; 150 − 135 = ${spareCap}.`, workedSolution: "1. " + (`6 × 25 = 150 requests per second; 150 − 135 = ${spareCap}.`) }),
      P.manual({ label: "(d)", marks: 2, stem: "Explain why only the application tier needs more computers when the number of users grows.", points: ["The application tier does the processing of the requests", "The presentation tier runs on the users' own devices and the database load is much smaller, so they do not need to be changed"], modelAnswer: "The application tier does the processing of the requests. The presentation tier runs on the users' own devices, so those tiers do not need to be changed.", explanation: "Tiers scale separately." }),
    ] });
  b.struct({ d: 4, skill: "CREATION", examStyle: true, hints: ["Match each component to a tier.", "A table is a good way to document the components."],
    explanation: "Presentation tier: the app screen; application tier: the transfer service; data tier: the customer database.",
    stem: `A bank is designing a mobile app for customers. The components are described by this table.\n\n${comps}\n\nCustomers must be able to see balances and transfer money. Personal data must be protected.`,
    parts: [
      P.short({ label: "(a)", marks: 1, stem: "Name the tier in which the Transfer service runs.", accepted: ["application", "application tier", "the application tier", "logic", "logic tier"], explanation: "The application tier." }),
      P.manual({ label: "(b)", marks: 3, stem: "Describe, step by step, what happens from the moment a customer presses 'Transfer' until the balance is updated.", points: ["The app (presentation tier) sends the transfer request to the Transfer service", "The Transfer service checks the balance and the rules, then updates the records in the Customer database", "The database confirms, and the service tells the app, which displays the new balance"], modelAnswer: "The app sends the transfer request to the Transfer service. The service checks the balance and the rules and then updates the records in the Customer database. The database confirms, the service tells the app and the app displays the new balance.", explanation: "Follow the request through the tiers." }),
      P.manual({ label: "(c)", marks: 2, stem: "Explain how the architecture helps to protect the customers' personal data.", points: ["The customer database is reachable only from the Transfer service in the application tier, not from the phones", "Access checks are made in one place (the application tier)"], modelAnswer: "The Customer database can be reached only through the Transfer service, not from the phones, and access checks are made in one place, the application tier.", explanation: "Database hidden behind the application tier." }),
      P.manual({ label: "(d)", marks: 2, stem: "State what is meant by the interface of the Transfer service and give an example of one operation in it.", points: ["The interface is the set of operations that the service offers to other components", "For example Transfer(fromAccount, toAccount, amount) which returns success or failure"], modelAnswer: "The interface is the set of operations the service offers to other components, for example Transfer(fromAccount, toAccount, amount), which returns success or failure.", explanation: "Interface and an example operation." }),
    ] });
  b.card("DEFINITION", "Software architecture", "The overall structure of a system: components, layers or tiers, their responsibilities and how they communicate.");
  b.card("FACT", "Three layers", "Presentation (shows and collects), logic (applies the rules), data (stores and retrieves).");
  b.card("DEFINITION", "Client-server", "A client requests a service from a server that provides it (for example a browser and a web server).");
  b.card("CONCEPT", "Three-tier benefits and drawbacks", "Benefits: logic in one place, database hidden, tiers scale separately. Drawbacks: more computers, delay, complexity.");
  b.card("DEFINITION", "Interface of a component", "The operations a component offers to others; they need not know how it works inside.");
  b.card("CONCEPT", "Separation of concerns", "Each layer has one responsibility and uses only the layer below, so one layer can change without the others.");
  b.card("CONCEPT", "Layer and tier", "A layer is a logical division of the design; a tier is a layer deployed on its own computer.");
  b.card("CONCEPT", "Choosing an architecture", "Choose the simplest design that meets the requirements: users, security, location, how often the logic changes.");
  b.card("FORMULA", "Servers needed", "Servers = peak requests per second ÷ requests one server can process per second, rounded up.");
});
