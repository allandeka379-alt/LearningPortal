// W2b: communication in business: importance and methods.
import { concept, P, money, BES, COM } from "../lib.mjs";

const smsCost = 0.03, staff = 64;
const smsTotal = Math.round(smsCost * staff * 100) / 100; // 1.92
const letterCost = 2.4, customers = 180, emailCost = 0;
const postTotal = letterCost * customers; // 432

concept("bus.communication.methods", { file: "communication/methods", keyPrefix: "communication.methods" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is feedback in communication?",
    options: [
      ["The receiver's response to the message", "Correct: it shows whether the message was understood."],
      ["The channel used to send the message", "That is the medium."],
      ["The person who starts the message", "That is the sender."],
      ["Noise that interrupts the message", "That is a barrier."],
    ],
    answer: "A",
    explanation: "**Feedback** is the receiver's response, which makes communication two-way.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which is an example of external communication?",
    options: [
      ["A letter from a business to a supplier", "Correct: the supplier is outside the business."],
      ["A memo from a manager to staff", "Memos are internal."],
      ["A notice on the staff noticeboard", "Notices to staff are internal."],
      ["A meeting of the sales department", "Department meetings are internal."],
    ],
    answer: "A",
    explanation: "**External** communication is with people outside the business: customers, suppliers, banks, government.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "A machine has broken down and the factory manager must contact the repair company immediately. Which method is most suitable?",
    options: [
      ["Telephone call", "Correct: fast and two-way for an urgent problem."],
      ["Letter by post", "Post is far too slow for an emergency."],
      ["Notice on the factory board", "A notice is internal and does not reach the repairer."],
      ["Written report", "A report takes time to prepare."],
    ],
    answer: "A",
    explanation: "When a message is **urgent**, a fast two-way method such as a **phone call** is best.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "A business must confirm the terms of a contract with a customer. Which method is most suitable?",
    options: [
      ["A letter or email", "Correct: it gives a permanent written record."],
      ["A telephone call only", "A call leaves no written record."],
      ["A face-to-face chat only", "A chat leaves no evidence of the terms."],
      ["A notice in the shop window", "A notice is public and not personal."],
    ],
    answer: "A",
    explanation: "When a **record** is needed, use written communication such as a letter or email.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which is a disadvantage of email?",
    options: [
      ["It may be ignored or lost among many other messages", "Correct: busy receivers may not read it."],
      ["It is always slower than sending a letter", "Email is usually much faster than post."],
      ["It cannot carry attached documents", "Email can carry attachments."],
      ["It leaves no record of the message", "Emails can be stored as records."],
    ],
    answer: "A",
    explanation: "Email is fast, cheap and leaves a record, but it needs internet access and may be **ignored or missed**.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which is the main advantage of a meeting over a notice?",
    options: [
      ["Questions can be asked and answered immediately", "Correct: meetings allow two-way communication."],
      ["It leaves a permanent written record automatically", "A notice is written; a meeting needs minutes for a record."],
      ["It costs nothing in staff time", "Meetings use a lot of staff time."],
      ["It reaches people who are absent", "Absent people miss meetings."],
    ],
    answer: "A",
    explanation: "Meetings give **immediate feedback**; notices are one-way.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A manager wants to show staff how sales changed over twelve months. Which method makes the pattern easiest to understand quickly?",
    options: [
      ["A line graph", "Correct: visual communication shows trends at a glance."],
      ["A long written report with no charts", "Text makes trends harder to see."],
      ["A telephone call to each employee", "Figures are hard to follow by phone."],
      ["A text message listing all the figures", "A list of numbers is hard to read on a phone."],
    ],
    answer: "A",
    hints: ["Which method is visual?"],
    explanation: "**Visual** methods such as graphs and charts make numerical patterns easy to understand.",
  });
  b.mcq({
    d: 3, skill: "EVALUATION",
    stem: "A manager must tell an employee privately that he is receiving a formal warning. Which is the best approach?",
    options: [
      ["A private meeting followed by a letter", "Correct: confidential, two-way and recorded."],
      ["A notice on the staff noticeboard", "This breaks confidentiality."],
      ["A message in the staff group chat", "Everyone in the group would see it."],
      ["Announcing it at a staff meeting", "This would embarrass the employee publicly."],
    ],
    answer: "A",
    hints: ["The message is confidential and must be recorded."],
    explanation: "**Confidential** matters need a private method; a letter provides the **record**.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "A notice on a staff noticeboard is an example of one-way communication.",
    answer: true,
    explanation: "True. No immediate feedback is expected.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Email can only be used for internal communication.",
    answer: false,
    explanation: "False. Email is used both within a business and with customers, suppliers and others outside it.",
  });
  b.match({
    d: 2, skill: "APPLICATION",
    stem: "Match each situation with the most suitable method of communication.",
    pairs: [
      ["Telling all 200 workers about a public holiday", "Notice or group message"],
      ["Discussing a new product idea with five managers", "Meeting"],
      ["Sending a detailed price list to a customer in Zambia", "Email"],
      ["Asking a nearby supplier whether stock is available today", "Telephone call"],
    ],
    explanation: "The best method depends on the number of receivers, the need for discussion, distance and urgency.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentences.",
    template: "Communication between people in the same business is {{blank:a}} communication. A short written message sent within a business is a {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["internal"], choices: ["internal", "external"] },
      { id: "b", accepted: ["memo"], choices: ["memo", "invoice", "receipt", "quotation"] },
    ],
    explanation: "**Internal** communication; a **memo** (memorandum).",
  });
  b.calc({
    d: 2, skill: "APPLICATION", calculator: true,
    stem: `A shop wants to tell ${customers} regular customers about a sale. Sending a letter costs ${money(letterCost)} each, including printing and postage. Calculate the total cost of sending letters.`,
    kind: "money", value: postTotal, wrong: [customers + letterCost],
    explanation: `${customers} × ${money(letterCost)} = ${money(postTotal)}. Email or a messaging app would cost almost nothing, which is why cost is a key factor in choosing a method.`,
  });
  b.manualShort({
    d: 3, marks: 4, skill: "UNDERSTANDING",
    stem: "Explain **two** reasons why effective communication is important to a business.",
    points: [
      "Instructions understood / work coordinated.",
      "Fewer mistakes and less waste.",
      "Motivation / customer relationships / decision-making / records.",
      "Explains the second reason.",
    ],
    hints: ["Think about employees and customers."],
    modelAnswer: "Clear communication means employees understand their instructions, so work is coordinated and fewer mistakes are made. Good communication with customers, such as answering enquiries quickly, builds relationships and keeps them buying.",
    explanation: "Importance: instructions, decisions, motivation, relationships, promotion, records, trade.",
  });
  b.manualShort({
    d: 3, marks: 4, skill: "UNDERSTANDING",
    stem: "Explain **two** ways information and communication technology has changed communication in small enterprises.",
    points: [
      "Faster and cheaper communication (messaging apps, email).",
      "Enterprises reach suppliers and customers instantly at low cost.",
      "Social media marketing / mobile money / online orders / computer records.",
      "Explains the effect, e.g. wider market reached cheaply.",
    ],
    hints: ["Think about phones and the internet."],
    modelAnswer: "Mobile phones and messaging apps let small enterprises contact suppliers and customers instantly and cheaply, instead of travelling. Social media allows a small business to advertise to many potential customers at almost no cost, widening its market.",
    explanation: "ICT impact: speed, low cost, wider markets, electronic payments, records; problems include cost of data, power cuts and cyber-crime.",
    applies: BES,
  });
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, calculator: true, secs: 900,
    stem: `Gweru Furnishers (a fictional business) has ${staff} employees working in three shops. The owner wants to tell all staff that the shops will open on Sundays from next month, and that Sunday work will be paid at a higher rate. A text message costs about ${money(smsCost)} per person to send.`,
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "Calculate the cost of sending one text message to every employee.", kind: "money", value: smsTotal, wrong: [smsCost], explanation: `${staff} × ${money(smsCost)} = ${money(smsTotal)}.` }),
      P.mcq({
        label: "(b)", stem: "Is this message internal or external communication, and why?",
        options: [["Internal, because it is sent to the business's own staff", "Correct: staff are inside the business."], ["External, because staff work in three different shops", "All three shops belong to the same business."], ["External, because a mobile phone network is used", "The channel does not decide whether it is internal."], ["Internal, because it is sent by text message", "The method does not decide; the receivers do."]],
        answer: "A",
      }),
      P.manual({
        label: "(c)", marks: 4,
        stem: "Explain **one** advantage and **one** disadvantage of using text messages for this announcement.",
        points: [
          "Advantage: fast / cheap / reaches all three shops at once.",
          "Explains with the case (e.g. under US\\$2 for all staff).",
          "Disadvantage: no chance to ask questions / may be missed / too short to explain pay rates.",
          "Explains why this matters for a change to working days.",
        ],
        modelAnswer: `Text messages reach all ${staff} staff in three shops at once for about ${money(smsTotal)}, so it is very fast and cheap. However, a short text cannot explain the new pay rate fully or allow staff to ask questions, and some staff may be unhappy about working on Sundays.`,
      }),
      P.manual({
        label: "(d)", marks: 4,
        stem: "Recommend the best way for the owner to communicate this change. Justify your answer.",
        points: [
          "Recommends a method or combination (e.g. meeting in each shop + written notice/letter).",
          "Justifies: change affects working conditions; staff need to ask questions (feedback).",
          "Justifies: written record of new pay rate and days.",
          "Explains why an alternative alone is less suitable.",
        ],
        modelAnswer: "The owner should hold a short meeting in each shop to explain the Sunday opening and the higher pay, so staff can ask questions and raise concerns, followed by a written notice or letter setting out the new days and pay rate. Because the change affects working conditions, staff need both the chance to discuss it and a written record. A text message alone is too short and gives no chance for discussion.",
      }),
    ],
    hints: ["(a) Cost per person × number of employees.", "(d) Does the message need feedback, a record, or both?"],
    explanation: `(a) ${staff} × ${money(smsCost)} = ${money(smsTotal)}. (b) Internal. (c) Fast and cheap, but no feedback. (d) Meeting plus written confirmation.`,
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, secs: 900,
    stem: "Chipo runs a small catering business in Harare that prepares food for weddings and company events. She receives enquiries by phone, email and through her social media page, and she sends quotations to customers. Last month two customers complained that they had agreed a different price by phone from the one on their invoice.",
    parts: [
      P.manual({
        label: "(a)", marks: 4,
        stem: "Explain **two** advantages to Chipo of using social media to communicate with customers.",
        points: [
          "Reaches many potential customers cheaply.",
          "Can show photographs of her food (visual), attracting bookings.",
          "Two-way: customers can ask questions and leave reviews.",
          "Good reviews build trust with new customers.",
        ],
        modelAnswer: "Social media lets Chipo reach many potential customers at little cost and show photographs of her food, which attracts bookings. It is two-way, so customers can ask questions and leave good reviews that build trust with new customers.",
      }),
      P.manual({
        label: "(b)", marks: 6,
        stem: "Recommend how Chipo should communicate prices to customers to avoid further complaints. Justify your answer.",
        points: [
          "Problem: phone agreements leave no record.",
          "Recommends written quotations (email / letter / message) for every price.",
          "Customer confirms in writing before the event.",
          "Phone still useful for quick discussion, followed by written confirmation.",
          "Considers cost/time of extra paperwork vs benefit.",
          "Justified recommendation.",
        ],
        modelAnswer: "The complaints happened because prices agreed by phone left no record. Chipo should keep using the phone for quick discussions, but always follow up with a written quotation by email or message showing the menu, number of guests and price, and ask the customer to confirm in writing. This takes a little more time, but both sides then have the same record, so invoices will match what was agreed and disputes can be settled quickly. Written confirmation is the most important change, because it removes the cause of the complaints.",
      }),
    ],
    hints: ["(b) Why did the complaints happen?"],
    explanation: "Social media is cheap and visual; prices need written communication to provide a record.",
  });
  b.card("DEFINITION", "What is **communication**?", "The transfer of information from a sender to a receiver, who understands it and may give feedback.");
  b.card("CONCEPT", "Internal vs external communication?", "Internal: within the business (managers, staff). External: with outsiders (customers, suppliers, banks, government).");
  b.card("FACT", "Four groups of communication methods?", "Oral, written, visual, electronic.");
  b.card("CONCEPT", "Why is communication important?", "Instructions, decisions, motivation, customer and supplier relationships, promotion, records, linking buyers and sellers.");
  b.card("FACT", "Factors in choosing a method?", "Speed, cost, need for a record, feedback, number of receivers, distance, confidentiality, complexity.");
  b.card("CONCEPT", "Advantages and disadvantages of email?", "Fast, cheap, record, attachments, many receivers / needs internet, may be ignored, security risks.");
  b.card("CONCEPT", "Advantages and disadvantages of meetings?", "Two-way, discussion, decisions / time-consuming, costly, no record without minutes.");
  b.card("CONCEPT", "Impact of ICT on business communication?", "Faster, cheaper, wider reach, electronic payments, online marketing / costs, power cuts, cyber-crime, training.", undefined, { applies: BES });
  b.card("CONCEPT", "Communication as an aid to trade?", "It links buyers and sellers who are far apart: enquiries, orders, quotations and payments.", undefined, { applies: COM });
});
