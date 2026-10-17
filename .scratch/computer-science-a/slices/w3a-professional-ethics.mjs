// Slice w3a: acs.ethics.professional-ethics (both boards; business ethics and unhu/ubuntu are ZIMSEC detail).
import { concept, P, ZIM } from "../lib.mjs";
import { mc, pm } from "../tables/w3a-q.mjs";

concept("acs.ethics.professional-ethics", { file: "ethics/professional-ethics", keyPrefix: "ethics.professional-ethics" }, (b) => {
  mc(b, 1, "RECALL", "What is a professional code of ethics?",
    ["A written set of standards of conduct that members of a profession agree to follow", "Correct."],
    [["A list of programs that members may use", "A code is about behaviour, not software."], ["A law passed by parliament that every computer user in the whole country must obey at all times", "A code is set by a professional body, not by parliament."], ["A programming language used by professionals", "A code of ethics is not a language."]],
    "A code of ethics sets standards of behaviour.");
  mc(b, 2, "UNDERSTANDING", "Which of these is a professional body for computing?",
    ["The British Computer Society (BCS)", "Correct."],
    [["A mobile network operator that sells airtime", "An operator is a business, not a professional body."], ["A school computer club", "A club is not a professional body."], ["A web browser", "A browser is software."]],
    "BCS, IEEE and the Computer Society of Zimbabwe are professional bodies.", { daily: true });
  mc(b, 2, "APPLICATION", "A programmer at a clinic reads the medical records of a neighbour out of curiosity. Which principle of a code of ethics has been broken?",
    ["Confidentiality", "Correct: private information must be used only for its purpose."],
    [["Competence", "The programmer's skill is not the issue."], ["Public interest in safety", "No safety risk is described."], ["Respect for copyright", "No work has been copied."]],
    "Reading records without a reason breaks confidentiality.", { daily: true });
  mc(b, 2, "APPLICATION", "A developer is asked to write software to control medical equipment, but has never worked on such systems. He accepts the job and says nothing about this. Which principle is most clearly broken?",
    ["Competence", "Correct: he should work only within the limits of his knowledge, or get help."],
    [["Confidentiality", "No private information is shared."], ["Respect for the law", "No law is mentioned."], ["Fairness in pricing", "Price is not mentioned."]],
    "Professionals should work within their competence and keep skills up to date.", { daily: true });
  mc(b, 3, "ANALYSIS", "A tester finds a fault that could give wrong doses on a hospital system. Her manager asks her to keep quiet until after the launch. According to a typical code of ethics, what should she do?",
    ["Put the safety of patients first and report the fault in writing, escalating it if it is ignored", "Correct."],
    [["Follow the manager because the company pays her", "The public interest comes before an employer's wishes."], ["Fix the fault secretly and tell nobody", "Honesty and openness require that the fault is reported."], ["Leave the company at once without telling anyone about the fault or the risk", "This leaves the patients at risk."]],
    "Public interest and honesty require her to report the fault.", { hints: ["Whose interest comes first in a code of ethics?"] });
  mc(b, 3, "UNDERSTANDING", "Which is an impact of unethical behaviour by a computing professional?",
    ["Users lose trust and the professional may be dismissed or removed from the professional body", "Correct."],
    [["The professional's computer runs faster", "Ethics has no effect on speed."], ["The law is rewritten to allow the behaviour", "Laws are not changed because of one act."], ["The company's software no longer needs testing because the professional is trusted", "Testing is still needed."]],
    "Unethical acts damage trust and can lead to discipline.", { hints: ["Who loses and what can happen to the person?"] });
  mc(b, 3, "ANALYSIS", "Which statement about law and ethics is correct?",
    ["Some actions are legal but unethical, so a professional cannot rely on the law alone", "Correct."],
    [["Anything that is legal is also ethical", "Legal acts can still be unethical."], ["Ethics only matters when a law is broken", "Ethics applies in all situations."], ["Laws and ethics are exactly the same thing with different names, so one is always enough", "They are related but different."]],
    "The law is a minimum standard.", { hints: ["Can you think of something legal that is still wrong?"] });
  mc(b, 3, "APPLICATION", "A company's advert says that its app \"never shares your data\", but the app sells data to advertisers. Which attribute of business ethics is broken?",
    ["Honesty", "Correct: the claim is untrue."],
    [["Firmness", "Firmness means keeping to principles under pressure."], ["Self-motivation", "Self-motivation is about working diligently without being forced."], ["Fairness in prices", "The scenario is about a false claim, not a price."]],
    "Telling untruths to customers breaks honesty.", { applies: ZIM, hints: ["Is the statement true?"] });
  mc(b, 4, "EVALUATION", "A manager offers an official money so that a contract is awarded to the company. A junior employee refuses to prepare the payment. Which business ethic does the employee show?",
    ["Firmness", "Correct: keeping to principles under pressure."],
    [["Self-motivation", "That means working well without being forced."], ["Fairness to competitors alone", "Fairness is part of it, but the key act is keeping to principle under pressure."], ["Obedience to the manager", "The employee refused the instruction."]],
    "Firmness is holding to principles when pressured.", { applies: ZIM, hints: ["What quality does it take to say no under pressure?"] });
  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "Joining a professional body shows a commitment to following its code of ethics.", answer: true, explanation: "True. Members agree to follow the code and may be disciplined if they break it." });
  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each principle of a code of ethics to the action that follows it.",
    pairs: [["Public interest", "Reporting a fault that could harm users"], ["Competence", "Asking for help with a task beyond your skills"], ["Confidentiality", "Keeping clients' records private"], ["Honesty", "Reporting test results accurately, including failures"], ["Respect for intellectual property", "Crediting the author of code that you reuse"]],
    explanation: "Each action is an example of the principle." });
  b.fib({ d: 2, skill: "UNDERSTANDING", stem: "Complete the sentences about ethics.", hints: ["Law is the minimum; ethics goes further."],
    template: "The study of what is right and wrong is called {{blank:a}}. A professional body publishes a {{blank:b}} of ethics that its members agree to follow. Acting within the limits of your knowledge is called {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["ethics"], choices: ["ethics", "encryption", "economics", "etiquette only"] },
      { id: "b", accepted: ["code"], choices: ["code", "price", "licence", "password"] },
      { id: "c", accepted: ["competence"], choices: ["competence", "secrecy", "firmness", "speed"] },
    ], explanation: "Ethics, code, competence." });
  b.short({ d: 2, skill: "RECALL", applies: ZIM, stem: "Name the African ethical principle, expressed in Shona as unhu, which judges a person's actions by their effect on the community.",
    accepted: ["ubuntu", "unhu", "unhu/ubuntu", "unhu ubuntu", "vumunhu"], normalise: ["trim", "lowercase", "collapse_whitespace"], wrong: ["firmness"], explanation: "Unhu/ubuntu." });
  b.manualShort({ d: 2, skill: "UNDERSTANDING", marks: 3, hints: ["Think about trust, impact and the law."],
    stem: "Explain why a computing professional needs to follow a code of ethics. [3]",
    points: ["People trust professionals with their data and systems, and a code shows they can be trusted", "Mistakes or misuse can harm many people, so standards of behaviour protect the public", "The law cannot cover every new situation, so a code guides professional judgement"],
    modelAnswer: "People trust professionals with their data and systems, and a code shows they can be trusted. Mistakes or misuse can harm many people, so standards protect the public, and the law cannot cover every new situation, so the code guides judgement.",
    explanation: "Trust, harm, gaps in the law." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4, hints: ["Name four principles from a code of ethics and what each asks."],
    stem: "Describe four points that are normally found in a professional code of ethics for computing. [4]",
    points: ["Put the public interest (safety and wellbeing) first", "Work only within your competence and keep skills up to date", "Keep confidential information private", "Be honest about what systems can do and respect the law and others' work"],
    modelAnswer: "Put the public interest first; work only within your competence and keep skills up to date; keep confidential information private; and be honest about what systems can do while respecting the law and other people's work.",
    explanation: "Any four points of a code." });
  b.manualShort({ d: 3, skill: "APPLICATION", marks: 4, hints: ["Decide ethical or unethical, give the principle and then the impact."],
    stem: "A systems administrator at a bank in Masvingo uses his access to look at the account of a famous person and tells his friends what he saw. State whether this is ethical, name the principle that is broken and describe the possible impact. [4]",
    points: ["It is unethical", "It breaks confidentiality (the account is private information used for no work reason)", "Impact on the customer: privacy lost, embarrassment or risk of fraud", "Impact on the administrator and bank: dismissal or legal action, and the bank loses the trust of customers"],
    modelAnswer: "It is unethical because it breaks confidentiality: the account is private and was looked at for no work reason. The customer loses privacy and may be embarrassed or at risk of fraud; the administrator may be dismissed or prosecuted and the bank loses its customers' trust.",
    explanation: "Judgement, principle, impact." });
  b.manualShort({ d: 4, skill: "ANALYSIS", marks: 4, applies: ZIM, hints: ["Link each attribute to a situation in business."],
    stem: "Explain two attributes of business ethics, with an example of each from an ICT business. [4]",
    points: ["Honesty: telling customers the truth about products and faults", "Example: a repair shop states the real cause of a fault and the real price", "Fairness (or firmness): treating all customers and suppliers justly (or keeping to principles under pressure)", "Example: charging every customer the same advertised price (or refusing to pay a bribe)"],
    modelAnswer: "Honesty is telling customers the truth about products and faults, for example a repair shop stating the real cause of a fault and the real price. Fairness is treating everyone justly, for example charging every customer the same advertised price.",
    explanation: "Two attributes with examples." });
  b.manualShort({ d: 4, skill: "EVALUATION", marks: 4, hints: ["Give two arguments for and against, then conclude."],
    stem: "A school plans to install cameras with face recognition on its gate to record who enters. Discuss the ethical issues. [4]",
    points: ["Benefit: it can improve safety by showing who enters the school", "Privacy concern: the faces of learners and visitors are personal data and may be collected without consent", "Risk: the data could be stolen or misused, or the system may misidentify people", "A balanced conclusion, for example use only with a clear policy, consent, limited retention and strong security"],
    modelAnswer: "The cameras can improve safety by showing who enters. However, faces are personal data collected possibly without consent, the data could be stolen or misused, and the system may misidentify people. The school should use it only with a clear policy, consent, limited retention and strong security.",
    explanation: "Benefits, risks and a conclusion." });
  b.struct({ d: 3, skill: "APPLICATION", examStyle: true, hints: ["Decide ethical or unethical, then name the principle."],
    explanation: "A is ethical, B is unethical (confidentiality) and C is unethical (honesty).",
    stem: "Three situations involve staff at a software company in Gweru. A: a programmer reuses a function from an open-source library, keeps the licence notice and credits the author. B: a support technician reads a customer's private files while fixing a fault, and mentions what he found to colleagues. C: a manager tells a customer that a program has been fully tested when it has not.",
    parts: [
      P.short({ label: "(a)", marks: 1, stem: "State whether A is ethical or unethical.", accepted: ["ethical"], normalise: ["trim", "lowercase"], wrong: ["unethical"], explanation: "It respects the licence and the author." }),
      pm("(b)", "Which principle does B break?", ["Confidentiality", "Correct."], [["Competence", "His skill is not the issue."], ["Respect for copyright", "No work was copied."], ["Public safety", "No safety risk is described."]], "Sharing what he saw in a customer's private files breaks confidentiality."),
      P.manual({ label: "(c)", marks: 2, stem: "Explain why C is unethical and describe one possible impact.", points: ["It is dishonest: the manager states something he knows is false about the testing", "Impact: the customer may rely on faulty software and suffer loss, and the company may lose its reputation or face legal action"], modelAnswer: "It is dishonest because the manager says the program was fully tested when it was not. The customer may rely on faulty software and suffer loss, and the company may lose its reputation.", explanation: "Honesty and impact." }),
    ] });
  b.struct({ d: 4, skill: "ANALYSIS", examStyle: true, hints: ["Use the four questions: who is affected, who is harmed, which principles, what alternatives."],
    explanation: "She should report the fault in writing, escalating if ignored, because public interest and honesty come first.",
    stem: "Chipo works for a company in Bulawayo that makes software for a bus company. She discovers that the booking program sometimes sells the same seat twice and, worse, sometimes shows passengers' identity numbers to other users. The manager wants to release the program on Monday to meet a contract deadline and tells her not to mention the fault.",
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "Identify two groups of people who could be affected by the fault.", points: ["Passengers, whose identity numbers may be seen by others", "The bus company (or the software company) which may lose money and reputation"], modelAnswer: "Passengers, whose identity numbers may be seen by others, and the bus company or software company, which may lose money and reputation.", explanation: "Passengers and companies." }),
      P.manual({ label: "(b)", marks: 2, stem: "State two principles of a code of ethics that apply to Chipo's situation.", points: ["Public interest or protecting the privacy and wellbeing of passengers", "Honesty (do not hide a known fault) or confidentiality of personal data"], modelAnswer: "Public interest, because passengers' identity numbers are at risk, and honesty, because the fault must not be hidden.", explanation: "Principles that apply." }),
      P.manual({ label: "(c)", marks: 4, stem: "Describe what Chipo should do and why.", points: ["Report the fault to the manager in writing and explain the risk to passengers", "If it is ignored, report it to a senior manager or the professional body rather than staying silent", "She should not hide the fault or quietly release the program, because that would be dishonest", "This puts the public interest first and gives the company the chance to fix the fault before release"], modelAnswer: "Chipo should report the fault in writing, explaining the risk to passengers. If it is ignored she should tell a senior manager or the professional body, because the public interest comes first and the company should get a chance to fix the fault before release.", explanation: "Report, escalate, public interest." }),
    ] });
  b.struct({ d: 3, skill: "UNDERSTANDING", examStyle: true, hints: ["One mark for the idea and one for linking it to ICT."],
    explanation: "Fairness, honesty and firmness each need an ICT example.",
    stem: "ZIMSEC lists fairness, firmness, honesty and self-motivation as attributes of business ethics. Tendai runs a small business in Mutare that sets up computer networks for local shops.",
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "Describe how Tendai shows honesty in his business.", points: ["He tells customers truthfully what each product or service can do and what it costs", "He admits faults or delays and does not charge for work that was not done"], modelAnswer: "He tells customers truthfully what each service can do and what it costs, and admits faults or delays instead of charging for work that was not done.", explanation: "Honesty with customers." }),
      P.manual({ label: "(b)", marks: 2, stem: "Describe how Tendai shows fairness in his business.", points: ["He treats all customers equally, for example by charging the same listed price for the same service", "He pays his workers and suppliers on time and fairly"], modelAnswer: "He charges every customer the same listed price for the same service and pays workers and suppliers fairly and on time.", explanation: "Fairness." }),
      P.manual({ label: "(c)", marks: 2, stem: "Explain how the idea of unhu/ubuntu could guide a decision to give a free training session to local learners.", points: ["Unhu stresses care for the community and sharing knowledge, so helping learners benefits others", "It builds respect and trust for Tendai's business in the community"], modelAnswer: "Unhu stresses care for the community and sharing knowledge, so training learners benefits others, and it builds respect and trust for his business.", explanation: "Community benefit." }),
    ] });
  b.card("DEFINITION", "Ethics", "The principles of right and wrong that guide behaviour; in computing they guide how technology and data are designed and used.");
  b.card("DEFINITION", "Professional code of ethics", "A written set of standards of conduct that members of a professional body agree to follow.");
  b.card("CONCEPT", "Points of a code", "Public interest, competence, confidentiality, honesty and integrity, respect for the law and for others' work.");
  b.card("FACT", "Professional bodies", "British Computer Society (BCS), Institute of Electrical and Electronics Engineers (IEEE) and, in Zimbabwe, the Computer Society of Zimbabwe.");
  b.card("CONCEPT", "Law and ethics", "Law is the minimum standard; some acts are legal but unethical.");
  b.card("CONCEPT", "Judging a situation", "Ask who is affected, who is harmed, which principles apply and what the alternatives are.");
  b.card("CONCEPT", "Business ethics", "Fairness, firmness, honesty and self-motivation.", undefined, { applies: ZIM });
  b.card("DEFINITION", "Unhu/ubuntu", "An African ethical principle that judges actions by their effect on the community: respect, honesty, responsibility and care for others.", undefined, { applies: ZIM });
});
