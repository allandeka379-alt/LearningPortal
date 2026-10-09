// W3b: formal and informal communication; trends in business communication (COM, BES).
import { concept, P, COM, BES, money, r2 } from "../lib.mjs";

// Video call vs travel saving.
const staff = 4, fareEach = 22, allowance = 15, dataCost = 6;
const travelCost = staff * (fareEach + allowance); // 148
const callSaving = travelCost - dataCost; // 142

concept("bus.communication.formal-informal-trends", { file: "communication/formal-informal-trends", keyPrefix: "communication.formal-informal-trends" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which is an example of formal communication?",
    options: [
      ["A memo from the manager to all supervisors", "Correct: it follows official channels."],
      ["A rumour passed among workers at lunch", "That is the grapevine (informal)."],
      ["A chat between two friends in the corridor", "That is informal."],
      ["A joke shared in a staff messaging group", "That is informal."],
    ],
    answer: "A",
    explanation: "Formal communication follows official channels: letters, memos, reports, notices, minutes.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is the grapevine?",
    options: [
      ["The unofficial network through which rumours spread among staff", "Correct."],
      ["The official chain of command through which managers pass instructions", "That is the formal route."],
      ["A written report to the board of directors", "That is formal communication."],
      ["A register of letters received by a business", "That is a record of correspondence."],
    ],
    answer: "A",
    explanation: "The **grapevine** is informal communication: fast, but often inaccurate.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which document is used to communicate within a business rather than with outsiders?",
    options: [
      ["A memorandum", "Correct: memos are internal."],
      ["A letter of enquiry to a supplier", "Letters are mainly for outsiders."],
      ["An invoice to a customer", "An invoice goes to a customer."],
      ["A quotation to a buyer", "A quotation goes to a buyer."],
    ],
    answer: "A",
    explanation: "A **memo** is a short internal written message.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true, applies: COM,
    stem: "A business letter begins \"Dear Sir or Madam\". Which complimentary close is correct?",
    options: [
      ["Yours faithfully", "Correct: used when the receiver is not named."],
      ["Yours sincerely", "Used after a named salutation such as \"Dear Mrs Dube\"."],
      ["Best wishes", "Too informal for a business letter."],
      ["See you soon", "Too informal for a business letter."],
    ],
    answer: "A",
    explanation: "\"Dear Sir or Madam\" → \"Yours faithfully\"; \"Dear Mr Ncube\" → \"Yours sincerely\".",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which is a disadvantage of informal communication?",
    options: [
      ["Information may become inaccurate as rumours spread", "Correct."],
      ["It is always slower than formal communication", "Informal communication is usually fast."],
      ["It leaves a written record that must be filed", "It usually leaves no record."],
      ["It must follow the chain of command", "That describes formal communication."],
    ],
    answer: "A",
    explanation: "The grapevine is fast but spreads rumours and inaccurate information.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Rumours that a factory will close have spread among workers. What is the best way for the manager to respond?",
    options: [
      ["Give staff accurate information quickly through formal channels", "Correct: facts replace rumours."],
      ["Ban all conversations between workers during working hours", "Impossible to enforce and harms morale."],
      ["Ignore the rumours until they stop", "Rumours may grow and harm morale."],
      ["Punish the workers who started the rumour as a warning", "This does not give staff the facts."],
    ],
    answer: "A",
    hints: ["What do workers need to stop believing the rumour?"],
    explanation: "Managers cannot stop the grapevine, but quick, clear and honest formal communication reduces harmful rumours.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which is a problem for businesses caused by the growth of social media?",
    options: [
      ["Complaints and rumours about a business can spread very quickly", "Correct: bad news travels fast online."],
      ["It is impossible to contact customers online", "Social media makes contact easier."],
      ["Advertising on social media has become more expensive than on television", "Social media advertising is often cheaper."],
      ["Customers can no longer give feedback", "Social media increases feedback."],
    ],
    answer: "A",
    hints: ["Think about what happens to a bad review."],
    explanation: "Social media gives two-way contact and cheap promotion, but negative comments and rumours spread fast.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", applies: COM,
    stem: "Why does a business letter include \"Our ref\" and \"Your ref\"?",
    options: [
      ["So that letters can be filed and matched to earlier letters", "Correct."],
      ["To show the price of the goods being ordered", "Prices appear in the body or in documents."],
      ["To give the receiver's telephone number and email address", "That is in the address details."],
      ["To show the writer's position and department in the business", "That appears under the signature."],
    ],
    answer: "A",
    explanation: "References help both businesses file and find related correspondence.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "A report usually contains findings and recommendations.",
    answer: true,
    explanation: "True. Reports set out facts and findings and recommend action.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "All emails are informal communication.",
    answer: false,
    explanation: "False. An email confirming an order or giving official instructions is formal; it depends on the channel and purpose, not the medium.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each document with its purpose.",
    pairs: [
      ["Business letter", "Communicating with customers, suppliers and other outsiders"],
      ["Memorandum", "Short written message inside the business"],
      ["Report", "Presenting findings and recommendations for a decision"],
      ["Minutes", "Recording decisions made at a meeting"],
      ["Notice", "Informing many staff at once on a board"],
    ],
    explanation: "Each formal document has its own purpose.",
  });
  b.fib({
    d: 2, skill: "RECALL", applies: COM,
    stem: "Complete the parts of a business letter.",
    template: "After the date comes the {{blank:a}} address of the receiver, then the {{blank:b}}, such as \"Dear Sir or Madam\".",
    blanks: [
      { id: "a", accepted: ["inside"], wrong: "return" },
      { id: "b", accepted: ["salutation", "greeting"], wrong: "signature" },
    ],
    explanation: "Letterhead, references, date, inside address, salutation, subject, body, close, signature.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the type of communication that follows the official channels and rules of an organisation.",
    accepted: ["formal communication", "formal"],
    wrong: ["informal"],
    explanation: "**Formal** communication follows official channels.",
  });
  b.calc({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `A company in Mutare used to send ${staff} managers to Harare for a monthly meeting. Each manager's bus fare is ${money(fareEach)} and each receives a meal allowance of ${money(allowance)}. The meeting is now held by video call, using ${money(dataCost)} of data. Calculate the saving per meeting.`,
    kind: "money", value: callSaving, wrong: [travelCost, staff * fareEach - dataCost],
    hints: ["Add fare and allowance for each manager, multiply by the number of managers, then subtract the data cost."],
    explanation: `Travel cost = ${staff} × (${money(fareEach)} + ${money(allowance)}) = ${money(travelCost)}. Saving = ${money(travelCost)} − ${money(dataCost)} = ${money(callSaving)}.`,
    workedSolution: `1. Cost per manager = ${fareEach} + ${allowance} = ${fareEach + allowance}.\n2. Travel cost = ${staff} × ${fareEach + allowance} = ${travelCost}.\n3. Saving = ${travelCost} − ${dataCost} = ${money(callSaving)}.`,
  });
  b.manualShort({
    d: 3, marks: 4, skill: "APPLICATION", applies: COM,
    stem: "Write the opening and closing of a business letter from Farai Moyo, Sales Manager of a paint company, to Mrs R. Dube, a hardware shop owner, about a new price list. Include the salutation, subject heading, complimentary close and signature block.",
    points: [
      "Salutation with name: \"Dear Mrs Dube\".",
      "Suitable subject heading, e.g. \"New price list for paints\".",
      "Matching complimentary close: \"Yours sincerely\".",
      "Signature block: name and position (Farai Moyo, Sales Manager).",
    ],
    hints: ["The receiver is named, so which close matches?"],
    modelAnswer: "Dear Mrs Dube / New price list for paints / … / Yours sincerely / (signature) Farai Moyo, Sales Manager.",
    explanation: "A named salutation is followed by \"Yours sincerely\"; the subject heading states the topic.",
  });
  b.manualShort({
    d: 3, marks: 4, skill: "ANALYSIS", applies: BES,
    stem: "Explain **two** ways in which an enterprise can use ICT to improve communication with its customers.",
    points: [
      "Way 1, e.g. social media page / messaging group.",
      "Explained: share new products and offers instantly; customers give feedback.",
      "Way 2, e.g. email / website / online chat.",
      "Explained: send quotations and receipts with a record / customers find information at any time.",
    ],
    hints: ["Think about reaching customers and hearing from them."],
    modelAnswer: "An enterprise can use a social media page to post new products and offers that customers see instantly and can comment on. It can also email quotations and receipts, giving both sides a written record.",
    explanation: "ICT gives fast, cheap, two-way communication with a record.",
  });
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: 840,
    stem: "Tatenda manages a cotton-ginning company in Kadoma with 150 workers. Instructions pass from the directors through four levels of management. Workers often hear about decisions first through the grapevine, and last month a rumour that wages would be cut caused a two-hour work stoppage. In fact, wages were not being cut.",
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "Distinguish between formal and informal communication.", points: ["Formal: follows official channels / chain of command (memos, notices, letters).", "Informal: outside official channels (grapevine, conversations)."] }),
      P.manual({
        label: "(b)", marks: 4, stem: "Explain **two** reasons why the grapevine spread faster than formal communication at the company.",
        points: ["Long chain of command (four levels) slows formal messages.", "Messages wait at each level / may be distorted.", "Workers talk constantly / use phones and messaging groups.", "So rumours reach everyone before the official message."],
      }),
      P.manual({
        label: "(c)", marks: 6, stem: "Evaluate **two** ways Tatenda could reduce the problems caused by the grapevine.",
        points: ["Way 1, e.g. faster formal communication: notices / meetings with all workers / official messaging group.", "Evaluated: quick and accurate, but needs managers' time / some workers lack phones.", "Way 2, e.g. regular briefings by supervisors / worker representatives / honest early announcements.", "Evaluated: builds trust and gives facts, but takes time; depends on supervisors.", "Recognises the grapevine cannot be stopped; managers can listen to it.", "Justified conclusion on the better way."],
        modelAnswer: "Tatenda could hold short meetings with all workers when important decisions are made, so everyone hears the facts at once from management; this is quick and accurate, though it stops work briefly. He could also set up an official staff messaging group and notice board for announcements, which reaches workers faster than four levels of managers, but some workers may not have smartphones. The grapevine cannot be stopped, so the aim is to give facts before rumours grow. Short all-staff meetings for important news, backed by notices, would work best because everyone hears the same message and can ask questions.",
      }),
    ],
    hints: ["(b) Count the levels a formal message passes through.", "(c) Give facts quickly and to everyone."],
    explanation: "Long chains slow formal communication; faster, direct formal channels reduce the harm of rumours.",
  });
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: 780,
    stem: "Chipo runs a travel agency in Victoria Falls. She used to communicate with tour operators by letter and fax and with customers by telephone. She now uses email, a social media page, instant messaging and video calls.",
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "State **two** recent trends in business communication shown in the case.", points: ["One trend, e.g. email / social media.", "Another trend, e.g. instant messaging / video calls."] }),
      P.manual({
        label: "(b)", marks: 4, stem: "Explain **two** benefits of these trends for Chipo's agency.",
        points: ["Speed: bookings confirmed instantly with operators and customers.", "Applied: customers in other countries / time zones served quickly.", "Lower cost: no fax or long-distance calls; social media cheap promotion.", "Applied: photos of tours shared; reviews attract tourists."],
      }),
      P.manual({
        label: "(c)", marks: 6, stem: "Discuss whether the new methods of communication have more benefits than problems for Chipo.",
        points: ["Benefits (speed, cost, reach, record) applied.", "Problem: dependence on power and internet.", "Problem: security / scams / fake bookings.", "Problem: negative reviews spread fast / messages too informal / overload.", "Ways to reduce problems, e.g. back-up power, secure payment, prompt replies.", "Justified conclusion."],
        modelAnswer: "The new methods let Chipo confirm bookings in minutes with operators and with tourists anywhere in the world, cheaply, and her social media photographs attract new customers. Emails give records of bookings. However, she depends on power and internet, faces online scams, and an unhappy customer's post can spread quickly. With back-up power, secure payment methods and quick, polite responses to complaints, these problems can be managed. For a business serving international tourists, the benefits clearly outweigh the problems.",
      }),
    ],
    hints: ["(b) Link each benefit to tourists or tour operators.", "(c) Consider how each problem could be reduced."],
    explanation: "ICT trends speed up and widen communication but bring dependence, security and reputation risks.",
  });
  b.card("DEFINITION", "Formal communication?", "Communication through official channels and rules: letters, memos, reports, notices, minutes.");
  b.card("DEFINITION", "Informal communication (grapevine)?", "Unofficial communication among staff: conversations, rumours, casual messages.");
  b.card("CONCEPT", "Formal communication: one advantage, one disadvantage?", "Advantage: accurate and recorded. Disadvantage: can be slow through long chains of command.");
  b.card("CONCEPT", "Grapevine: one advantage, one disadvantage?", "Advantage: fast, builds relationships. Disadvantage: spreads rumours and inaccurate information.");
  b.card("FACT", "Parts of a business letter?", "Letterhead, references, date, inside address, salutation, subject heading, body, complimentary close, signature and position.", "ZIMSEC Commerce.", { applies: COM });
  b.card("FACT", "Matching salutation and close?", "\"Dear Sir or Madam\" → \"Yours faithfully\"; \"Dear Mrs Dube\" → \"Yours sincerely\".", undefined, { applies: COM });
  b.card("DEFINITION", "Memorandum (memo)?", "A short written message inside an organisation, headed To, From, Date, Subject.");
  b.card("FACT", "Trends in business communication?", "Email, instant messaging, video calls, social media, smartphones, cloud documents, websites and online chat.");
  b.card("CONCEPT", "Impact of ICT on communication?", "Faster, cheaper, wider, easier records; but costs, dependence on power and networks, security risks and overload.");
});
