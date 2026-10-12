// Slice w3a: acs.security.threats-vulnerabilities (both boards). Free-preview lesson.
import { concept, P, chk, same } from "../lib.mjs";
import { mc, pm } from "../tables/w3a-q.mjs";

const combos5 = 16 ** 4;
chk(combos5, 65536);
const pinSecs = 10 ** 6 / 25;
chk(pinSecs, 40000);
const combos7 = 26 ** 3;
chk(combos7, 17576);
// Denial of service numbers (not those of the lesson)
const capacity = 600;
const genuine = 300;
const bots = 120;
const perBot = 25;
const flood = bots * perBot;
chk(flood, 3000);
const total = flood + genuine;
chk(total, 3300);
const pctServed = Math.round((capacity / total) * 100);
chk(pctServed, 18);

concept("acs.security.threats-vulnerabilities", { file: "security/threats-vulnerabilities", keyPrefix: "security.threats-vulnerabilities" }, (b) => {
  mc(b, 1, "RECALL", "What is malware?",
    ["Software that is designed to damage a system, steal data or give an attacker control", "Correct."],
    [["Any software that has been written by a student or a teacher at the school as a project", "Malware is defined by its harmful purpose, not by who wrote it."], ["A hardware fault in a computer", "A hardware fault is not software."], ["A program that has not been updated", "Out-of-date software is a vulnerability, not malware."]],
    "Malware is malicious software.");
  mc(b, 2, "UNDERSTANDING", "Which type of malware encrypts a user's files and demands payment for the key?",
    ["Ransomware", "Correct."],
    [["Spyware", "Spyware secretly records what the user does."], ["A worm", "A worm copies itself across a network."], ["Pharming attack", "Pharming redirects a user to a fake web site and is not malware that encrypts files."]],
    "Ransomware locks the victim's files until a payment is made.", { daily: true });
  mc(b, 2, "APPLICATION", "Farai types the correct address of his bank into the browser but is taken to a fake page that asks for his password. What is this attack called?",
    ["Pharming attack", "Correct: he was redirected although he typed the right address."],
    [["Phishing", "Phishing uses a fake message to lure the user, not a redirect of a correctly typed address."], ["A denial of service", "A denial of service floods a server with requests."], ["A brute-force attack", "A brute-force attack tries many passwords."]],
    "Pharming redirects users to a fake web site.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "Which malware spreads across a network by copying itself without needing a host file or a user to run it?",
    ["A worm", "Correct."],
    [["A virus", "A virus attaches to a host file and needs the file to be run."], ["A trojan", "A trojan pretends to be useful software and does not copy itself."], ["A keylogger", "A keylogger records keystrokes; it is not defined by self-copying."]],
    "A worm is self-copying and spreads on its own.");
  mc(b, 3, "ANALYSIS", "Which of the following is a vulnerability rather than a threat?",
    ["An operating system that has not been updated for two years", "Correct: it is a weakness that attackers can exploit."],
    [["A hacker who tries to guess passwords", "This is a threat: a person who could cause harm."], ["A worm that is spreading from computer to computer on the network", "This is a threat."], ["A phishing email sent to staff", "This is a threat."]],
    "A vulnerability is a weakness; a threat is something that could exploit it.", { hints: ["Is it a weakness in the system or something that attacks it?"] });
  mc(b, 3, "APPLICATION", "A caller says he is from the IT department and asks a bank clerk to read out her password to fix a fault. What is this?",
    ["Social engineering", "Correct: the caller is manipulating a person."],
    [["Pharming attack", "Pharming redirects web traffic."], ["A buffer overflow attack", "A buffer overflow is a programming flaw in memory handling."], ["Interception", "Nothing is being read in transit."]],
    "Social engineering attacks people, not machines.", { hints: ["Who is being tricked: the computer or the person?"] });
  mc(b, 3, "UNDERSTANDING", "What is the main effect of a distributed denial of service attack on a school's web server?",
    ["Genuine users cannot reach the service because the server is overwhelmed", "Correct."],
    [["All the stored files are encrypted", "That describes ransomware."], ["The passwords of all users are copied", "A denial of service does not need to copy data."], ["The web site address changes to a fake address that looks like the real one", "That describes pharming."]],
    "The service is unavailable to genuine users.", { hints: ["What does the flood of requests use up?"] });
  mc(b, 4, "EVALUATION", "A program builds the query `SELECT * FROM learners WHERE id = ` followed directly by the text a user types. Which change best removes the SQL injection risk?",
    ["Pass the typed text to the database as a parameter, so that it is treated only as data", "Correct."],
    [["Make the user type a longer password", "The risk is in the query, not the length of the password."], ["Hide the web page from search engines", "Attackers do not need a search engine to find a form."], ["Install a larger hard disk and more memory on the server that hosts the school database", "Storage capacity has no effect on injection."]],
    "Parameterised queries stop typed text from being run as SQL.", { hints: ["How can the database be told that the input is a value and not a command?"] });
  b.tf({ d: 2, skill: "RECALL", stem: "A trojan copies itself to other computers on the network without the user doing anything.", answer: false, explanation: "False. A trojan pretends to be useful and relies on the user running it; self-copying across a network is what a worm does." });
  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each threat to its description.",
    pairs: [["Spyware", "Secretly records what the user does and sends it to an attacker"], ["Phishing", "A fake message that tricks the user into giving away private details"], ["Insider threat", "A member of staff who misuses their legitimate access"], ["Interception", "Reading data as it travels over an unprotected network"], ["Ransomware", "Locks files until a payment is made"]],
    explanation: "Each threat has a distinct method." });
  b.fib({ d: 3, skill: "UNDERSTANDING", stem: "Complete the sentences about vulnerabilities.", hints: ["A weakness is a vulnerability; the program or person that uses it is a threat."],
    template: "A weakness that a threat can exploit is called a {{blank:a}}. Software makers release {{blank:b}} to fix such weaknesses. Trying every possible password in turn is called a {{blank:c}} attack.",
    blanks: [
      { id: "a", accepted: ["vulnerability"], choices: ["vulnerability", "threat", "firewall", "protocol"] },
      { id: "b", accepted: ["updates"], choices: ["updates", "viruses", "passwords", "cookies"] },
      { id: "c", accepted: ["brute-force"], choices: ["brute-force", "phishing", "pharming", "buffer"] },
    ], explanation: "Vulnerability, updates (patches), brute force." });
  b.num({ d: 2, skill: "APPLICATION", daily: true, calculator: false, hints: ["Combinations = characters^length."],
    stem: "A password of 3 characters uses only the 10 digits 0 to 9. How many different passwords are possible?",
    value: 10 ** 3, wrong: [30, 100], workedSolution: "1. Each of the 3 places can be any of 10 digits.\n2. 10 × 10 × 10 = 1000.", explanation: "10^3 = 1000 combinations." });
  b.num({ d: 3, skill: "APPLICATION", calculator: false, hints: ["A hexadecimal digit has 16 possible values.", "Raise 16 to the power of the length."],
    stem: "A device code has 4 characters, each a hexadecimal digit (0 to 9 or A to F). Calculate the number of different codes that are possible.",
    value: combos5, wrong: [16 * 4, 4 ** 16], workedSolution: `1. Characters to choose from = 16.\n2. Combinations = 16^4 = 16 × 16 × 16 × 16 = ${combos5}.`, explanation: `16^4 = ${combos5}.` });
  b.num({ d: 3, skill: "APPLICATION", calculator: false, unit: "s", hints: ["Divide the number of combinations by the guesses per second."],
    stem: "A phone app locks a 6-digit PIN so that only 25 guesses per second are possible. Calculate the number of seconds needed to try every possible PIN (000000 to 999999).",
    value: pinSecs, wrong: [10 ** 6, 25 * 10 ** 6], workedSolution: `1. Combinations = 10^6 = 1,000,000.\n2. Time = 1,000,000 ÷ 25 = ${pinSecs} seconds.`, explanation: `1,000,000 ÷ 25 = ${pinSecs} seconds, about 11 hours.` });
  b.manualShort({ d: 2, skill: "UNDERSTANDING", marks: 3, hints: ["What happens to the files, and what does the criminal want?"],
    stem: "Describe how ransomware affects a user. [3]",
    points: ["It enters the computer, for example as an email attachment or a download that the user opens", "It encrypts the user's files so that they cannot be opened", "It demands payment for the key, and the user may lose the data if there is no backup"],
    modelAnswer: "Ransomware enters a computer, for example through an email attachment, and encrypts the user's files so they cannot be opened. It then demands payment for the key, and the user can lose the data if there is no backup.",
    explanation: "Entry, encryption, demand." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4, hints: ["Compare the way each spreads and what each needs."],
    stem: "Explain the difference between a virus and a worm. [4]",
    points: ["A virus attaches itself to a host file or program", "A virus spreads only when a user runs the infected file", "A worm is a stand-alone program that copies itself", "A worm spreads across a network by itself, using up bandwidth, without any user action"],
    modelAnswer: "A virus attaches itself to a host file and spreads only when a user runs the infected file. A worm is a stand-alone program that copies itself across a network on its own, using up bandwidth, without any user action.",
    explanation: "Host and user action against stand-alone and automatic." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4, hints: ["Say what the message looks like, what it asks and two signs of a fake."],
    stem: "Explain how phishing works and state two signs that an email is a phishing attempt. [4]",
    points: ["The attacker sends an email that looks as if it comes from a genuine organisation such as a bank", "It asks the user to click a link or give details such as a password, which are then stolen", "Sign: the sender's address or the web address does not match the real organisation", "Sign: it creates urgency, has spelling mistakes or asks for a password or PIN"],
    modelAnswer: "The attacker sends an email that looks as if it comes from a genuine organisation and asks the user to click a link or give a password, which is then stolen. Signs include a sender or web address that does not match the real organisation, and urgent demands or spelling mistakes.",
    explanation: "Method, request and two signs." });
  b.manualShort({ d: 4, skill: "ANALYSIS", marks: 4, hints: ["Think about software, passwords, configuration and staff."],
    stem: "A rural clinic has five computers on one network. Describe two vulnerabilities that attackers could exploit and a risk each creates. [4]",
    points: ["Vulnerability: software that is not updated, or passwords that are default or weak, or file shares open to everyone", "Risk: malware or a hacker can use the known weakness to gain access or infect the computers", "A second, different vulnerability, such as staff opening attachments or an open wireless network", "Risk: patient data may be stolen, changed or lost, or all five computers may be affected through the network"],
    modelAnswer: "The computers are not updated, so malware can exploit a known weakness and infect all five machines through the network. The wireless network has no protection, so a stranger can connect or intercept the patient data.",
    explanation: "Two different vulnerabilities each linked to a risk." });
  b.manualShort({ d: 4, skill: "UNDERSTANDING", marks: 3, hints: ["Describe what the user types and what the program does with it."],
    stem: "Describe, without writing code, how SQL injection works. [3]",
    points: ["A program builds a database command by joining text typed by the user into the command", "The user types SQL, such as a condition that is always true, instead of normal data", "The database runs the typed text as part of the command, so the attacker can read or change data they should not reach"],
    modelAnswer: "The program joins text typed by the user into a database command. The attacker types SQL, such as a condition that is always true, and the database runs it as part of the command, giving access to data they should not reach.",
    explanation: "Joined text is run as a command." });
  b.struct({ d: 3, skill: "APPLICATION", examStyle: true, hints: ["Match the description to the name of the threat."],
    explanation: "Incident 1 is a worm, 2 is spyware or a keylogger and 3 is social engineering.",
    stem: "Three incidents are reported in a school computer laboratory in Masvingo. Incident 1: a program copies itself from computer to computer across the laboratory network and slows every machine. Incident 2: a hidden program records every key a teacher types, including passwords. Incident 3: a visitor says he is a technician and asks a learner for the administrator password.",
    parts: [
      pm("(a)", "Which threat is described in incident 1?", ["A worm", "Correct."], [["A trojan", "A trojan does not copy itself."], ["Pharming attack", "Pharming redirects users to a fake site."], ["Ransomware", "Nothing is encrypted."]], "Self-copying across a network is a worm."),
      P.short({ label: "(b)", marks: 1, stem: "Name the type of program in incident 2.", accepted: ["keylogger", "spyware", "key logger"], normalise: ["trim", "lowercase", "collapse_whitespace"], wrong: ["firewall"], explanation: "A keylogger is a type of spyware." }),
      P.manual({ label: "(c)", marks: 2, stem: "Name the threat in incident 3 and explain why it can succeed even when the computers are fully updated.", points: ["Social engineering", "It attacks the person, not the software, so updates do not stop a person being tricked into giving away the password"], modelAnswer: "Social engineering. It tricks the person, not the software, so updates do not stop a learner giving away a password.", explanation: "People are a vulnerability." }),
    ] });
  b.struct({ d: 4, skill: "ANALYSIS", examStyle: true, hints: ["Total requests = bots × requests per bot + genuine requests.", "Fraction answered = capacity ÷ total requests."],
    explanation: `The bots send ${flood} requests per second; the total is ${total}; the server answers about ${pctServed}% of the requests.`,
    stem: `A web server for a college in Bulawayo can answer ${capacity} requests every second. Genuine students send ${genuine} requests per second. During a distributed denial of service attack, ${bots} infected computers each send ${perBot} requests per second to the server.`,
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the number of requests per second sent by the infected computers.", value: flood, wrong: [bots + perBot, flood + genuine], workedSolution: `1. ${bots} × ${perBot} = ${flood} requests per second.`, explanation: `${bots} × ${perBot} = ${flood}.` }),
      P.num({ label: "(b)", marks: 2, stem: "Calculate the total number of requests per second that arrive at the server.", value: total, wrong: [flood, capacity], workedSolution: `1. ${flood} + ${genuine} = ${total} requests per second.`, explanation: `${flood} + ${genuine} = ${total}.` }),
      P.num({ label: "(c)", marks: 2, stem: "Calculate the percentage of the requests that the server can answer. Give your answer to the nearest whole number.", value: pctServed, unit: "%", wrong: [100, 20], workedSolution: `1. ${capacity} ÷ ${total} = 0.18.\n2. As a percentage this is ${pctServed}%.`, explanation: `${capacity} ÷ ${total} × 100 = ${pctServed}% to the nearest whole number.` }),
      P.manual({ label: "(d)", marks: 2, stem: "Explain why this attack is a problem for the college even though no data is stolen.", points: ["The server is too busy to answer, so students cannot reach the service", "The college loses the use of the service, for example to submit work or see notices, and its reputation may suffer"], modelAnswer: "The server is too busy to answer genuine requests, so students cannot use the service. The college loses the use of the service and its reputation may suffer.", explanation: "Availability." }),
    ] });
  b.struct({ d: 3, skill: "APPLICATION", examStyle: true, hints: ["Combinations = characters^length."],
    explanation: `A 3-letter lower-case password has only ${combos7} combinations.`,
    stem: "A school lets learners choose a short password made of any 3 lower-case letters. A teacher says that a longer password is safer.",
    parts: [
      P.num({ label: "(a)", marks: 2, type: "CALCULATION", stem: "Calculate the number of different passwords possible with 3 lower-case letters.", value: combos7, wrong: [26 * 3, 3 ** 26], workedSolution: `1. 26 letters in each of 3 places.\n2. 26^3 = 26 × 26 × 26 = ${combos7}.`, explanation: `26^3 = ${combos7}.` }),
      P.manual({ label: "(b)", marks: 2, stem: "Explain two reasons why a longer password, using capital letters and digits as well, is safer.", points: ["Each extra character multiplies the number of combinations, so a brute-force attack takes much longer", "Using more types of character increases the number of characters to choose from, which also increases the combinations"], modelAnswer: "Each extra character multiplies the number of combinations, so brute force takes much longer, and adding capitals and digits increases the number of characters to choose from.", explanation: "Length and character set." }),
    ] });
  b.card("DEFINITION", "Threat and vulnerability", "A threat can cause harm to a system or its data; a vulnerability is the weakness that a threat can exploit.");
  b.card("CONCEPT", "Virus, worm and trojan", "Virus: attaches to a host file and needs it run. Worm: copies itself across a network on its own. Trojan: looks useful but hides harmful code; does not copy itself.");
  b.card("CONCEPT", "Phishing and pharming", "Phishing: a fake message tricks the user into giving details. Pharming: the user is redirected to a fake web site even when the correct address is typed.");
  b.card("CONCEPT", "Ransomware and spyware", "Ransomware encrypts files and demands payment. Spyware secretly records what the user does; a keylogger records keystrokes.");
  b.card("CONCEPT", "Denial of service", "A flood of requests makes a server unavailable to genuine users; DDoS uses many infected computers. No data need be stolen.");
  b.card("CONCEPT", "Sources of vulnerability", "Unpatched software, weak or default passwords, poor configuration, programming flaws (buffer overflow, SQL injection), people and unprotected networks.");
  b.card("FORMULA", "Password combinations", "Combinations = (number of characters to choose from) ^ (length). Brute-force time = combinations ÷ guesses per second.");
  b.card("CONCEPT", "SQL injection", "User text is joined into a database command, so typed SQL is run; prevented by parameterised queries and input checks.");
  b.card("CONCEPT", "Social engineering", "Tricking people instead of machines into giving away access or information, for example a caller who pretends to be IT support.");
});
