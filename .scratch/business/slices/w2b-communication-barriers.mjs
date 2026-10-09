// W2b: effective communication and communication barriers.
import { concept, P, money } from "../lib.mjs";

const wrongOrders = 26, costEach = 35;
const errorCost = wrongOrders * costEach; // 910

concept("bus.communication.barriers", { file: "communication/barriers", keyPrefix: "communication.barriers" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is a communication barrier?",
    options: [
      ["Anything that stops a message being received or understood correctly", "Correct: barriers distort or block messages."],
      ["The person who receives a message", "That is the receiver."],
      ["The reply that a receiver gives after reading or hearing a message", "That is feedback."],
      ["A written record of a meeting", "Those are minutes."],
    ],
    answer: "A",
    explanation: "A **barrier** prevents a message from being received or understood as intended.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "An engineer tells shop assistants to check the \"voltage regulation tolerance\" of every product. The assistants do not understand. What is the barrier?",
    options: [
      ["Jargon", "Correct: technical words the receivers do not know."],
      ["Noise", "Nothing suggests the message could not be heard."],
      ["A long chain of command", "The message went directly to the assistants."],
      ["Faulty equipment", "No equipment failed."],
    ],
    answer: "A",
    explanation: "**Jargon** is specialist language that receivers outside the specialism do not understand.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "Instructions given to workers in a busy sawmill are often not heard properly. What is the most suitable solution?",
    options: [
      ["Give instructions in writing or in a quiet room before work", "Correct: this removes the noise barrier."],
      ["Shout the instructions more loudly across the factory floor", "Shouting is still affected by machine noise."],
      ["Add more managers to pass on the message", "A longer chain adds another barrier."],
      ["Send the instructions by post", "Post is slow and unsuitable for daily instructions."],
    ],
    answer: "A",
    explanation: "Overcome **noise** by communicating where it is quiet or by using written and visual messages.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why does a long chain of command act as a barrier to communication?",
    options: [
      ["The message may be delayed or changed at each level", "Correct: each extra person can distort or hold it up."],
      ["Managers at the top cannot send messages", "They can, but messages take long to reach workers."],
      ["Workers are not allowed to receive instructions", "Workers do receive instructions."],
      ["It reduces the number of people who receive the message", "The problem is delay and distortion, not the number of receivers."],
    ],
    answer: "A",
    explanation: "Each level the message passes through adds **delay** and a chance of **distortion**.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which is an enhancer of effective communication?",
    options: [
      ["Asking the receiver to confirm the message", "Correct: feedback checks understanding."],
      ["Using as many technical terms as possible", "Jargon is a barrier."],
      ["Sending every message to every employee", "This causes information overload."],
      ["Passing messages through many levels of management", "Long chains are a barrier."],
    ],
    answer: "A",
    explanation: "**Feedback** shows whether the message was understood, so mistakes can be corrected.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Staff at a head office receive more than eighty emails a day and miss an important safety notice. What is the main barrier?",
    options: [
      ["Information overload", "Correct: too many messages mean important ones are missed."],
      ["Language differences", "Nothing suggests a language problem."],
      ["Faulty equipment", "The emails were delivered."],
      ["Noise", "Noise refers to sound interference."],
    ],
    answer: "A",
    hints: ["The message arrived but was not noticed."],
    explanation: "**Information overload**: when receivers get too many messages, important ones are missed. Mark urgent messages and send only what is relevant.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Employees ignore a manager's instructions because they believe he never listens to them. What type of barrier is this?",
    options: [
      ["Attitudes and lack of trust", "Correct: emotions and relationships block the message."],
      ["Jargon", "The words are not the problem."],
      ["A poor choice of channel", "The channel is not mentioned as a problem."],
      ["Physical noise", "Nothing suggests noise."],
    ],
    answer: "A",
    hints: ["Is the problem the words, the channel or the relationship?"],
    explanation: "Poor **attitudes and lack of trust** make receivers ignore or reject messages. Building trust and involving staff helps.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "A business in Victoria Falls loses orders because its internet connection fails during power cuts. Which solution best removes this barrier?",
    options: [
      ["Install back-up power such as solar panels or a generator", "Correct: it keeps equipment working."],
      ["Train staff to avoid technical language in emails to customers", "Jargon is not the problem."],
      ["Add another level of management", "This creates a longer chain of command."],
      ["Send fewer emails to customers", "The problem is equipment failure, not overload."],
    ],
    answer: "A",
    explanation: "**Faulty equipment and networks** are solved with maintenance, back-up power and alternative channels.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Feedback helps to make communication effective.",
    answer: true,
    explanation: "True. It shows the sender whether the message was understood.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Using more levels of management always improves communication.",
    answer: false,
    explanation: "False. More levels lengthen the chain of command, delaying and distorting messages.",
  });
  b.match({
    d: 3, skill: "APPLICATION",
    stem: "Match each barrier with the most suitable solution.",
    pairs: [
      ["Jargon", "Use plain language suited to the receiver"],
      ["Language differences", "Use an interpreter or pictures"],
      ["Long chain of command", "Communicate directly with those affected"],
      ["No feedback", "Ask receivers to confirm key points"],
    ],
    hints: ["Each solution should remove the cause of the barrier."],
    explanation: "Each barrier has a matching solution.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentences.",
    template: "Technical words understood only by specialists are called {{blank:a}}. The line through which instructions pass from top managers to workers is the chain of {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["jargon"], choices: ["jargon", "feedback", "noise", "memos"] },
      { id: "b", accepted: ["command"], choices: ["command", "production", "distribution", "supply"] },
    ],
    explanation: "**Jargon**; chain of **command**.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the communication barrier caused by sounds such as machinery that stop a message being heard.",
    accepted: ["noise", "physical noise", "noise barrier"],
    wrong: ["jargon"],
    explanation: "**Noise**.",
  });
  b.num({
    d: 2, skill: "APPLICATION", daily: true, calculator: true,
    stem: `A wholesaler found that ${wrongOrders} orders last month were delivered wrongly because telephone orders were misheard. Correcting each wrong order cost ${money(costEach)} in extra transport and staff time. Calculate the total cost of the errors.`,
    kind: "money", value: errorCost, wrong: [wrongOrders + costEach],
    explanation: `${wrongOrders} × ${money(costEach)} = ${money(errorCost)}. Asking customers to confirm orders in writing would remove much of this cost.`,
  });
  b.manualShort({
    d: 3, marks: 4, skill: "ANALYSIS",
    stem: "Explain **two** problems a business may face if communication is poor.",
    points: [
      "Mistakes in orders / production.",
      "Wasted materials and time; higher costs.",
      "Unhappy customers / low motivation / poor decisions / damaged reputation.",
      "Explains the second problem.",
    ],
    hints: ["Think about costs, customers and employees."],
    modelAnswer: "Poor communication leads to mistakes, such as the wrong goods being produced or delivered, which wastes materials and costs money to correct. Employees who are not kept informed may feel ignored, so their motivation falls and they work less well.",
    explanation: "Problems: mistakes, higher costs, lost sales, poor decisions, low motivation, damaged reputation.",
  });
  b.manualShort({
    d: 3, marks: 4, skill: "UNDERSTANDING",
    stem: "Describe **four** features of effective communication.",
    points: [
      "Clear, simple message.",
      "Appropriate medium / channel.",
      "Reaches the right person at the right time.",
      "Feedback / trust / short chain of command / reliable equipment.",
    ],
    hints: ["Think about the message, the channel, the receiver and the response."],
    modelAnswer: "Effective communication has a clear, simple message, is sent through a suitable medium, reaches the right person at the right time, and includes feedback so the sender knows it has been understood.",
    explanation: "Enhancers: clarity, right medium, right receiver and time, feedback, trust, short chains, reliable equipment.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, secs: 900,
    stem: "Tatenda Transport (a fictional business) has its head office in Harare and depots in Bulawayo and Mutare. Instructions from the operations director pass to the depot managers, then to supervisors, then to drivers. Last month a change to delivery times reached some drivers two days late, and one supervisor told drivers the wrong day. Drivers also complain that head office emails use terms such as \"load factor optimisation\" that they do not understand.",
    parts: [
      P.manual({
        label: "(a)", marks: 2,
        stem: "Identify **two** communication barriers at Tatenda Transport.",
        points: ["Long chain of command.", "Jargon / technical language."],
        modelAnswer: "A long chain of command, and jargon in head office emails.",
      }),
      P.manual({
        label: "(b)", marks: 4,
        stem: "Explain the problems these barriers cause for the business.",
        points: [
          "Messages delayed (two days late).",
          "Late or missed deliveries, unhappy customers.",
          "Messages distorted (wrong day) / misunderstood (jargon).",
          "Mistakes cost money / drivers frustrated and less motivated.",
        ],
        modelAnswer: "The long chain meant the change reached some drivers two days late and one supervisor passed on the wrong day, so deliveries were made at the wrong times and customers were let down. Jargon means drivers do not understand instructions, causing mistakes and frustration.",
      }),
      P.manual({
        label: "(c)", marks: 6,
        stem: "Recommend how Tatenda Transport should improve its communication with drivers. Justify your answer.",
        points: [
          "Send important changes directly to all drivers (group message / SMS) as well as through managers.",
          "Justifies: removes delay and distortion of the chain.",
          "Use plain language; explain technical terms.",
          "Justifies: drivers understand and act correctly.",
          "Ask drivers to confirm receipt (feedback).",
          "Justified overall recommendation, considering cost/practicality.",
        ],
        modelAnswer: "Head office should send important changes directly to every driver by group message, at the same time as informing managers, so the message arrives at once and cannot be changed along the way. Messages should be written in plain language, with any technical terms explained, because drivers must understand them to act correctly. Drivers should be asked to reply to confirm they have received the message, so missing or misunderstood instructions are spotted early. These steps cost very little, because drivers already have mobile phones, and they deal directly with the causes of last month's problems.",
      }),
    ],
    hints: ["(a) Look at how instructions travel and at the words used.", "(c) Match each solution to a barrier."],
    explanation: "Long chain of command and jargon caused delay, distortion and misunderstanding. Direct, plain messages with feedback remove them.",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, secs: 900,
    stem: "Bright Crafts (a fictional business) in Victoria Falls sells carvings to tourists and exports them to buyers in Europe and Asia. Some buyers do not speak English well, and there have been mistakes in sizes and quantities ordered. The owner is considering two options: employing a part-time interpreter, or using order forms with photographs, sizes and quantities for every product.",
    parts: [
      P.manual({
        label: "(a)", marks: 3,
        stem: "Explain how language differences cause problems for Bright Crafts.",
        points: ["Buyers misunderstand or are misunderstood.", "Wrong sizes or quantities sent.", "Costs of returns / lost customers / damaged reputation."],
        modelAnswer: "Because some buyers do not speak English well, orders are misunderstood, so the wrong sizes and quantities are sent. Bright Crafts must pay to correct the errors, and unhappy buyers may stop ordering.",
      }),
      P.manual({
        label: "(b)", marks: 8,
        stem: "Which option should Bright Crafts choose? Justify your answer.",
        points: [
          "Interpreter: clear two-way communication; can handle negotiations and complaints.",
          "Interpreter: ongoing wage cost; may not cover every language; not always available.",
          "Order forms with photos: visual, works across languages; cheap once made.",
          "Order forms: written record of exactly what was ordered.",
          "Order forms: cannot handle questions or negotiation; buyers must still fill them in correctly.",
          "Compares cost and effectiveness for the type of problem (sizes and quantities).",
          "Could combine both (forms for routine orders, interpreter for large deals).",
          "Justified recommendation.",
        ],
        levels: [
          [3, 6, 8, "Both options analysed with use of the case and a justified recommendation."],
          [2, 3, 5, "Some analysis of one or both options; weak judgement."],
          [1, 1, 2, "Points identified with little explanation."],
        ],
        modelAnswer: "An interpreter would allow clear two-way communication, useful for negotiating prices and handling complaints, but it is an ongoing wage cost and one interpreter cannot cover every buyer's language. Order forms with photographs, sizes and quantities are visual, so they work across languages, cost little once designed, and give both sides a written record of exactly what was ordered. Their weakness is that they cannot answer questions. Because the mistakes are about sizes and quantities, the order forms tackle the actual problem more cheaply. Bright Crafts should introduce the forms for all orders and pay for an interpreter only for occasional large negotiations.",
      }),
    ],
    hints: ["(b) What exactly is going wrong in the orders?"],
    explanation: "Language barriers cause wrong orders; visual, written order forms tackle the problem cheaply, with an interpreter for complex negotiations.",
  });
  b.card("DEFINITION", "What is a **communication barrier**?", "Anything that stops a message being received or understood as the sender intended.");
  b.card("DEFINITION", "What is **jargon**?", "Technical or specialist words understood by a particular group but not by others.");
  b.card("FACT", "Main communication barriers?", "Jargon, language, noise, poor channel, faulty equipment, attitudes, long chain of command, information overload, no feedback.");
  b.card("CONCEPT", "Enhancers of effective communication?", "Clear message, right medium, right receiver and time, feedback, trust, short chains of command, reliable equipment.");
  b.card("CONCEPT", "Problems caused by poor communication?", "Mistakes, higher costs, lost sales, poor decisions, low motivation, damaged reputation.");
  b.card("CONCEPT", "How to overcome a long chain of command?", "Communicate directly with those affected; reduce levels (delayering); group messages or meetings.");
  b.card("CONCEPT", "How to overcome language barriers?", "Interpreters, translations, pictures and diagrams, training.");
  b.card("DEFINITION", "**Information overload**?", "Receiving so many messages that important ones are missed.");
});
