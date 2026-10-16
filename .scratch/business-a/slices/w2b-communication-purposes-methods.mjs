// W2b: communication.purposes-methods
import { concept, P, chk, ZIM } from "../lib.mjs";
import { mc, pmc } from "../tables/w2b-lib.mjs";

concept("abus.communication.purposes-methods", { file: "communication/purposes-methods", keyPrefix: "communication.purposes-methods" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Which of the following is the **receiver's response** in the communication process?",
    ok: ["Feedback", "Correct: it shows whether the message was understood."],
    bad: [["Message", "The message is what the sender wants to pass on."], ["Medium", "The medium carries the message."], ["Encoding", "Encoding is how the sender puts the message into words or symbols."]],
    explanation: "Feedback is the receiver's response to the message.",
  });
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Which of these is an example of **written** communication?",
    ok: ["A memo to all staff", "Correct: a memo is a written internal message."],
    bad: [["A telephone call", "A call is spoken communication."], ["A staff meeting", "A meeting is spoken communication."], ["A poster showing a chart", "A poster with a chart is visual communication."]],
    explanation: "Memos, letters, reports and notices are written methods.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A key advantage of **spoken** communication is that it",
    ok: ["Gives immediate two-way feedback", "Correct: the receiver can respond or ask questions straight away."],
    bad: [["Always creates a permanent record", "Spoken messages leave no record unless written down."], ["Reaches many people at no cost", "Reaching many people by speech is difficult and costly in time."], ["Is always more precise than writing", "Writing is usually more precise."]],
    explanation: "Spoken communication allows immediate feedback but leaves no record unless notes are taken.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which method is **most suitable** for giving an employee a formal warning that must be recorded?",
    ok: ["A meeting followed by a written letter", "Correct: the meeting allows a response and the letter provides a record."],
    bad: [["A group text message", "A group message is public and impersonal."], ["A note on the notice board", "A public notice breaches confidentiality."], ["A passing remark in the corridor", "A passing remark is informal and unrecorded."]],
    explanation: "Sensitive messages need privacy, feedback and a record.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "A fictional wholesaler in Mutare must tell 200 retailers about a price change today. Which method is most suitable?",
    ok: ["A group text message or a group email", "Correct: it is fast, cheap and reaches many people at once."],
    bad: [["Visiting each retailer personally", "A personal visit would take too long for 200 retailers."], ["Posting a letter to each retailer", "The post is slow, so the message would not arrive today."], ["Telling the nearest retailer to pass on the message", "Passing it on may distort the message or miss retailers."]],
    explanation: "Electronic communication is fast and cheap for large audiences.",
    hints: ["Think about speed and the number of receivers."],
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "A fictional rural clinic supplier in Masvingo wants to advertise a vacancy to people in villages with poor internet access. Which medium is most suitable?",
    ok: ["Local radio broadcast", "Correct: radio reaches people without internet access."],
    bad: [["A website advertisement", "People without the internet cannot see it."], ["An email to the head office", "Email would not reach the villagers."], ["An online video", "People without internet cannot watch it."]],
    explanation: "Radio reaches rural audiences without internet access.",
    hints: ["Who needs to receive the message, and what can they access?"],
    applies: ZIM,
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "Why is **feedback** important in the communication process?",
    ok: ["It shows whether the message was understood", "Correct: the sender can then correct any misunderstanding."],
    bad: [["It makes the message longer", "Length is not the aim of feedback."], ["It replaces the need for a message", "Feedback responds to a message; it does not replace it."], ["It removes all barriers to communication", "Barriers can still arise."]],
    explanation: "Without feedback the sender cannot tell whether the message has been understood.",
    hints: ["What does the sender need to know?"],
  });
  mc(b, {
    d: 4, skill: "ANALYSIS",
    stem: "A fictional factory manager emails a long technical safety procedure to workers who mostly use cell phones with small screens and have limited English. What is the most likely problem?",
    ok: ["The message may not be read or understood", "Correct: the medium and language do not suit the receivers."],
    bad: [["Workers will understand better because email is formal", "Formality does not help if the receivers cannot read it easily."], ["Feedback will be quicker than a meeting", "The email provides no immediate feedback."], ["The message will automatically be translated", "There is no reason to assume translation."]],
    explanation: "A method must suit the receiver's equipment and language, otherwise the message is lost.",
    hints: ["Think about the receivers, not the sender."],
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Communication is effective only if the receiver understands the message as the sender intended.",
    answer: true,
    explanation: "True. Sending a message is not enough; it must be understood, and feedback shows whether it has been.",
  });
  b.tf({
    d: 3, skill: "UNDERSTANDING",
    stem: "A memo is normally used for messages sent from a business to its customers.",
    answer: false,
    explanation: "False. A memo is an internal message between people in the same business. A business letter is used for external messages.",
    hints: ["Is a memo internal or external?"],
    applies: ZIM,
  });

  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each stage of the communication process to its description.",
    pairs: [["Sender", "The person who wants to pass on the message"], ["Message", "The information or instruction to be passed on"], ["Medium", "The means by which the message is carried"], ["Receiver", "The person for whom the message is intended"], ["Feedback", "The response which shows the message was understood"]],
    explanation: "Each stage matches one description.",
  });

  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct word for each gap.",
    template: "Charts, diagrams and posters are examples of {{blank:a}} communication, whereas email is {{blank:b}} communication.",
    blanks: [
      { id: "a", accepted: ["visual"], choices: ["visual", "spoken", "electronic"] },
      { id: "b", accepted: ["electronic"], choices: ["visual", "spoken", "electronic"] },
    ],
    explanation: "Charts and posters are visual; email is electronic.",
  });

  b.short({
    d: 1, skill: "RECALL",
    stem: "Name the written internal message between people in the same business, headed To, From, Date and Subject.",
    accepted: ["memo", "memorandum", "a memo", "a memorandum"],
    explanation: "A memorandum (memo) is an internal written message.",
    applies: ZIM,
  });

  const retailers = 120;
  const letter = 0.8;
  const text = 0.02;
  const saving = retailers * (letter - text);
  chk(saving, 93.6);
  b.num({
    d: 2, skill: "APPLICATION", kind: "money", value: saving, calculator: true, daily: true, wrong: [retailers * letter, retailers * text],
    stem: "A fictional wholesaler in Harare must inform 120 retailers of a change in delivery days. Posting a letter costs US\\$0.80 per retailer (printing and postage); a group text message costs US\\$0.02 per retailer. How much does the wholesaler save by sending text messages instead of letters?",
    hints: ["Find the total cost of each method, then subtract."],
    explanation: "Letters: 120 x US\\$0.80 = US\\$96.00. Texts: 120 x US\\$0.02 = US\\$2.40. Saving = US\\$96.00 - US\\$2.40 = US\\$93.60. Giving US\\$96.00 is the cost of the letters only.",
  });
  const staffCount = 45;
  const meetingHours = 0.5;
  const hourly = 4;
  const meetingCost = staffCount * meetingHours * hourly;
  chk(meetingCost, 90);
  b.calc({
    d: 3, skill: "ANALYSIS", kind: "money", value: meetingCost, calculator: true, wrong: [staffCount * hourly, meetingHours * hourly],
    stem: "A fictional factory holds a half-hour briefing for all 45 workers. Each worker is paid US\\$4 an hour. What is the cost of the workers' time for this briefing?",
    hints: ["Workers x hours x pay per hour."],
    explanation: "45 x 0.5 hours x US\\$4 = US\\$90. A spoken briefing has a hidden cost in lost production time, even though no equipment is used. Giving US\\$180 uses a full hour.",
    workedSolution: "1. Total hours = 45 x 0.5 = 22.5 hours.\n2. Cost = 22.5 x US\\$4 = US\\$90.",
  });

  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why feedback is an important part of the communication process.",
    points: ["Feedback is the receiver's response to the message", "It shows the sender whether the message has been understood", "The sender can then correct misunderstandings before mistakes are made"],
    modelAnswer: "Feedback is the receiver's response to the message. It shows the sender whether the message has been understood, so the sender can correct misunderstandings before mistakes are made.",
    hints: ["What does the sender learn from the response?"],
    explanation: "One point per mark.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 4,
    stem: "A fictional hardware shop in Gweru wants to tell staff about a change in the safety rules. Explain **two** reasons why a written notice together with a short staff meeting is better than a notice alone.",
    points: ["The notice provides a permanent record of the rules", "Application: staff can check what the rule says later", "The meeting gives immediate feedback", "Application: staff can ask questions about using the new equipment"],
    modelAnswer: "The notice provides a permanent record, so staff can check later what the rule says. The meeting gives immediate feedback, so staff can ask questions about using the new equipment and the manager can see that they understand.",
    hints: ["Compare the strengths of written and spoken methods."],
    explanation: "Two reasons, each applied to the shop.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Analyse how poor communication within a business may harm its performance.",
    points: ["Instructions may be misunderstood, causing mistakes", "Mistakes cause waste and delays", "Staff who are not informed feel undervalued, so morale and motivation fall", "Customers may be lost if orders are late or wrong"],
    modelAnswer: "Instructions may be misunderstood, causing mistakes, waste and delays. Staff who are not informed feel undervalued, so morale and motivation fall. Customers may be lost if orders are late or wrong.",
    hints: ["Trace the effect from the message to the customer."],
    explanation: "Mistakes, delay, morale and customers.",
  });
  b.manualShort({
    d: 5, skill: "EVALUATION", marks: 6,
    stem: "Assess whether email is the most suitable method for a fictional manager in Harare to announce a restructuring that may lead to job losses.",
    points: ["Email is fast and reaches all staff at once", "It provides a written record of the announcement", "Application: staff in branch offices receive the news at the same time", "It is impersonal and gives no immediate feedback for a sensitive message", "Staff may hear rumours or feel disrespected if told by email", "Judgement with a reason: use face-to-face briefings followed by written confirmation"],
    modelAnswer: "Email is fast and reaches all staff at once, including those in branch offices, and provides a written record. But it is impersonal and gives no immediate feedback for a sensitive message, and staff may feel disrespected if told by email. A face-to-face briefing followed by written confirmation is more suitable.",
    hints: ["Give a benefit, a limitation and a judgement."],
    explanation: "One point per mark; the judgement needs a reason.",
  });

  b.struct({
    d: 3, skill: "APPLICATION",
    stem: "A fictional business: Rudo's Bakery in Mutare employs 20 people. The manager wants to tell all staff that the bakery will close on Monday for repairs. She sends a text message to the staff group at 6 pm on Sunday. On Monday three staff arrive at work because they did not see the message, and one baker had a question about being paid for the day.",
    parts: [
      pmc(P, { label: "(a)", marks: 1, stem: "The text message is an example of which method of communication?", ok: ["Electronic", "Correct: it is sent by phone."], bad: [["Visual", "A visual method uses charts or diagrams."], ["Spoken", "A text message is not spoken."], ["Formal letter", "A text message is not a letter."]], explanation: "Text messages are electronic communication." }),
      P.manual({ label: "(b)", marks: 4, stem: "Explain **two** reasons why the communication was not fully effective.", points: ["There was no feedback", "Application: the manager did not know whether the staff had read the message", "The message was sent at short notice outside working hours", "Application: the question on pay was left unanswered, which caused confusion"], modelAnswer: "There was no feedback: the manager did not know whether staff had read the message. It was also sent at short notice outside working hours, and the question on pay was left unanswered, which caused confusion.", hints: ["Think about the process model."], explanation: "No feedback and incomplete message." }),
      P.manual({ label: "(c)", marks: 4, stem: "Suggest **two** ways in which the manager could improve how she communicates a closure in future.", points: ["Give more notice, for example on Friday", "Application: staff would have time to arrange their week", "Ask staff to confirm that they have read the message", "Application: the manager could telephone those who do not reply"], modelAnswer: "The manager could give more notice, for example on Friday, so staff have time to arrange their week. She could ask staff to confirm that they have read the message and telephone those who do not reply.", hints: ["Think about timing and feedback."], explanation: "Timing and feedback." }),
    ],
    hints: ["Use the five stages of the process model."],
    explanation: "Electronic method; no feedback; more notice and confirmation needed.",
  });

  b.struct({
    d: 5, skill: "EVALUATION",
    stem: "A fictional business: Sipho's Mining Supplies in Bulawayo has 80 employees at its head office and in a depot 300 km away. The managing director wants to tell all staff about a new safety procedure that includes diagrams. Past notices on the board were often ignored, and an accident last month happened because a worker did not know the new rule. The depot has poor internet access but staff all have cell phones.",
    parts: [
      P.manual({ label: "(a)", marks: 6, stem: "Analyse the factors the managing director should consider in choosing the method of communication.", points: [["Purpose: a safety rule that must be understood and followed", 1], ["Audience: staff in two places, some without good internet access", 2], ["Need for diagrams, so a visual element is required", 1], ["Need for a record that staff have received and understood it", 1], ["Past notices have been ignored, so feedback is needed", 1]], modelAnswer: "The purpose is a safety rule that must be understood and followed. The audience is staff in two places, and the depot has poor internet access. The procedure includes diagrams, so a visual element is required. The managing director needs a record that staff have received it and, because notices have been ignored, feedback to show that they have understood.", hints: ["Use purpose, audience, record and feedback."], explanation: "Purpose, audience, visual need, record and feedback." }),
      P.manual({ label: "(b)", marks: 9, stem: "Evaluate whether the managing director should use printed notices, a group message or face-to-face briefings.", points: [["Printed notices: permanent, can include diagrams; often ignored; no feedback", 2], ["Group message: fast, cheap and reaches the depot by cell phone; diagrams may be difficult to read; no feedback unless replies are required", 2], ["Face-to-face briefings: immediate feedback, can demonstrate the procedure; takes time, and the depot is 300 km away so travel or a separate briefing is needed", 2], ["A combination is likely to be best: briefings, then printed diagrams and a message to confirm", 1], ["Cost and time of production lost during briefings", 1], ["Judgement with a reason", 1]], levels: [[3, 7, 9, "Weighs the three methods with application to the two sites; justified recommendation with a limitation"], [2, 4, 6, "Explains methods with some application; judgement weak"], [1, 1, 3, "Lists methods with little application"]], modelAnswer: "Printed notices are permanent and can include diagrams, but they have often been ignored and give no feedback. A group message is fast and cheap and reaches the depot by cell phone, but diagrams may be hard to read on small screens and it gives no feedback unless replies are required. Face-to-face briefings allow immediate feedback and a demonstration, but they take time and the depot is 300 km away. A combination is likely to be best: briefings at each site led by a supervisor, followed by printed diagrams and a group message asking staff to confirm they have understood. Given the recent accident, the extra cost of lost working time is justified.", hints: ["Weigh the strengths and weaknesses of each method against safety and distance."], explanation: "Compare methods, then recommend a combination." }),
    ],
    hints: ["Think about feedback, diagrams and the distance between sites."],
    explanation: "A combination of briefings, printed diagrams and a confirming message.",
  });

  b.card("DEFINITION", "Communication", "The exchange of information, ideas or instructions between a sender and a receiver so that the message is understood.");
  b.card("FACT", "Communication process", "Sender, message, medium, receiver, feedback; effective only if the receiver understands.");
  b.card("DEFINITION", "Feedback", "The receiver's response, showing whether the message has been understood.");
  b.card("FACT", "Spoken communication", "Fast, personal, immediate feedback; but no record unless noted and hard to reach many people.");
  b.card("FACT", "Written communication", "Permanent record and precise; but slower and no immediate feedback.");
  b.card("FACT", "Electronic communication", "Fast, cheap to many, records kept; but needs equipment and network, overload and security risks.");
  b.card("FACT", "Visual communication", "Quick to understand and good for numbers and instructions; limited detail and may be misread.");
  b.card("CONCEPT", "Choosing a method", "Consider purpose, audience, urgency, need for a record, complexity, cost and confidentiality.");
  b.card("FACT", "Business documents", "Memo (internal), letter (external), email, statement (account summary) and invoice (bill with goods, prices, total and terms).", undefined, { applies: ZIM });
});
