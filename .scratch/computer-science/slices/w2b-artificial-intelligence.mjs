// Slice w2b: artificial intelligence and expert systems (comp.emerging.artificial-intelligence).
import { concept, P, ZIM } from "../lib.mjs";

const PARTS = ["Knowledge base", "Rule base", "Inference engine", "Interface"];

concept("comp.emerging.artificial-intelligence", { file: "emerging/artificial-intelligence", keyPrefix: "emerging.artificial-intelligence" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is **artificial intelligence**?",
    options: [
      ["The simulation of intelligent behaviour by computers", "Correct: this is the examinable meaning."],
      ["The design and construction of robots", "That is robotics."],
      ["Any program that stores a large amount of data", "Storing data alone is not intelligent behaviour."],
      ["A computer that has feelings like a human being", "AI simulates behaviour; it does not have feelings."],
    ],
    answer: "A",
    explanation: "AI is the branch of computer science dealing with the simulation of intelligent behaviour by computers.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which part of an expert system stores the facts collected from human experts?",
    options: [
      ["The knowledge base", "Correct: it is a database of facts about the field."],
      ["The inference engine", "This applies the rules; it does not store the facts."],
      ["The interface", "This handles questions and answers with the user."],
      ["The explanation screen", "This shows the reasoning; it is part of the interface."],
    ],
    answer: "A",
    explanation: "The knowledge base holds the facts; the rule base holds IF … THEN rules.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What does the **inference engine** of an expert system do?",
    options: [
      ["Applies the rules to the facts and answers to reach a conclusion", "Correct: it does the reasoning."],
      ["Displays the questions and conclusions on the screen", "That is the interface."],
      ["Stores the IF … THEN rules written by the experts", "The rules are stored in the rule base."],
      ["Collects new facts from human experts while the system is in use", "Knowledge engineers do this when the system is built."],
    ],
    answer: "A",
    explanation: "The inference engine reasons: it matches answers against the rules and facts and chooses the next question.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which statement describes **machine learning**?",
    options: [
      ["A program automatically adapts its own processes or data from experience", "Correct: it improves without being reprogrammed."],
      ["A programmer rewrites the code each time the program makes an error", "That is manual reprogramming, not learning."],
      ["A robot is taught by a person moving its arm", "That is a way of programming a robot."],
      ["A user learns to use a program by reading its manual", "Machine learning concerns the program, not the user."],
    ],
    answer: "A",
    explanation: "Machine learning: the program adapts its own processes and/or data automatically.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which is one of the three main characteristics of AI described by Cambridge?",
    options: [
      ["The ability to reason", "Correct: alongside data and rules, and learning and adapting."],
      ["The ability to move around a room", "Movement is a feature of robots."],
      ["The ability to print reports quickly", "Printing is not an AI characteristic."],
      ["The ability to store files permanently", "Storage alone is not intelligence."],
    ],
    answer: "A",
    explanation: "Data and rules for using it; reasoning; learning and adapting.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    hints: ["Does the system change itself from feedback, or follow fixed rules?"],
    stem: "A video app recommends new videos based on what Tatenda has watched, and its suggestions improve the more he uses it. What kind of AI is this?",
    options: [
      ["Machine learning", "Correct: it adapts its data from his viewing history."],
      ["An expert system", "Expert systems reason with fixed rules from experts."],
      ["Robotics", "No robot is involved."],
      ["An automated system", "Automated control systems use sensors and actuators."],
    ],
    answer: "A",
    explanation: "Recommendations that improve with use show learning and adapting.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    hints: ["Which statement is a drawback?"],
    stem: "Which is a **disadvantage** of an expert system for medical diagnosis in a rural clinic?",
    options: [
      ["It may give a wrong answer if its knowledge base is incomplete", "Correct: it is only as good as its knowledge and rules."],
      ["It gives the same answer to the same symptoms every time", "Consistency is an advantage."],
      ["It can be used in places where no doctor is available", "This is an advantage."],
      ["It can explain to the nurse how it reached its conclusion", "This is an advantage."],
    ],
    answer: "A",
    explanation: "Expert systems cannot handle cases outside their rules and depend on the quality of their knowledge base.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    hints: ["Which part is responsible for choosing what to ask next?"],
    stem: "After each answer, an expert system asks a different next question. Which component makes this choice?",
    options: [
      ["The inference engine", "Correct: it uses the rules and previous answers to choose."],
      ["The knowledge base", "It only stores the facts."],
      ["The interface", "It displays the question chosen by the inference engine."],
      ["The rule base", "It stores the rules that the inference engine applies."],
    ],
    answer: "A",
    explanation: "The interface displays questions, but the inference engine decides which question narrows down the possibilities.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "An expert system can explain the reasoning behind its conclusion.",
    answer: true,
    explanation: "True. The interface can show which rules and answers led to the conclusion.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Every AI system can learn and adapt by itself.",
    answer: false,
    explanation: "False. Learning and adapting is a characteristic of some AI systems, such as machine learning. A basic expert system uses fixed rules.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each component of an expert system to its role.",
    pairs: [
      [PARTS[0], "Stores the facts about the field"],
      [PARTS[1], "Holds the IF … THEN rules"],
      [PARTS[2], "Applies the rules to reach a conclusion"],
      [PARTS[3], "Asks questions and displays the conclusion and explanation"],
    ],
    explanation: "Facts, rules, reasoning, communication with the user.",
  });
  b.match({
    d: 3, skill: "APPLICATION",
    hints: ["Fixed expert rules or learning from data?"],
    stem: "Classify each system as an expert system or machine learning.",
    pairs: [
      "A program asks a mechanic yes/no questions to diagnose an engine fault using rules from experts",
      "A bank's system spots unusual card payments and improves as more fraud is confirmed",
      "A phone keyboard predicts the next word better the more the user types",
      "A geology program suggests where to drill for chrome using rules from geologists",
    ],
    right: ["Expert system", "Machine learning"],
    rightIndex: [0, 1, 1, 0],
    explanation: "Expert rules that are fixed → expert system; improves from data → machine learning.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentence about the characteristics of AI.",
    template: "AI systems have a collection of {{blank:a}} and the rules for using it, the ability to {{blank:b}}, and some can learn and {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["data"], choices: ["data", "robots", "sensors", "printers"] },
      { id: "b", accepted: ["reason"], choices: ["reason", "move", "print", "compile"] },
      { id: "c", accepted: ["adapt"], choices: ["adapt", "delete", "assemble", "repeat"] },
    ],
    explanation: "Data and rules; reason; learn and adapt.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the type of AI system that uses a knowledge base, a rule base and an inference engine.",
    accepted: ["expert system", "an expert system", "expert systems"],
    wrong: ["machine learning"],
    explanation: "An expert system.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    hints: ["Training data, feedback, adapting."],
    stem: "Explain how a spam filter uses machine learning to improve. [3]",
    points: [
      "It is trained on many example emails labelled spam / not spam and finds patterns",
      "It uses the patterns to decide whether new emails are spam",
      "When users mark emails as spam or not spam (feedback), it adapts its own data / processes so future decisions are more accurate",
    ],
    modelAnswer: "The filter is trained on many labelled emails and finds patterns such as words and senders. It uses them to classify new emails. When users correct it, it adapts its own data, so it becomes more accurate without being reprogrammed.",
    explanation: "Training, prediction, feedback, adapting.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4, applies: ZIM,
    hints: ["Two benefits and two drawbacks, linked to mining."],
    stem: "A mining company in Zvishavane uses an intelligent system to predict where mineral deposits are likely to be found. Discuss the benefits and drawbacks. [4]",
    points: [
      "Benefit: analyses large amounts of survey data quickly / finds patterns people might miss",
      "Benefit: fewer wasted test drillings, saving money and time / expert knowledge available on site",
      "Drawback: expensive to develop and keep up to date",
      "Drawback: predictions may be wrong if the data or rules are incomplete / staff may trust it too much",
    ],
    modelAnswer: "The system can analyse huge amounts of survey data quickly and spot patterns, reducing wasted drilling and cost. However, it is expensive to build and update, and its predictions can be wrong if its data or rules are incomplete, so geologists must still check them.",
    explanation: "Two benefits and two drawbacks, applied to prospecting.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    hints: ["Name each component and say what it does.", "Explain why the system is useful where there is no vet."],
    stem: "A livestock expert system helps farmers in rural Matabeleland identify cattle diseases.",
    parts: [
      P.manual({ label: "(a)", marks: 4, stem: "Describe how the expert system reaches a diagnosis. Refer to its components.", points: ["Interface asks the farmer questions about the symptoms", "Inference engine applies the rule base to the answers / chooses the next question", "Knowledge base supplies the facts about diseases", "Conclusion (with probability) and explanation shown through the interface"], modelAnswer: "The interface asks the farmer about the symptoms. The inference engine applies the IF … THEN rules in the rule base to the answers, using the facts in the knowledge base, and chooses each next question. It then displays the most likely disease, with its probability and an explanation, through the interface." }),
      P.mcq({ label: "(b)", stem: "Which part holds rules such as IF fever AND swollen lymph nodes THEN suspect a tick-borne disease?", options: [["Rule base", "Correct."], ["Knowledge base", "This holds facts."], ["Interface", "This handles input and output."], ["Inference engine", "This applies the rules."]], answer: "A", explanation: "Rule base." }),
      P.manual({ label: "(c)", marks: 1, stem: "Give **one** advantage of the expert system for the farmers.", points: ["Expert advice available where / when no vet is present / quick, consistent diagnosis"], modelAnswer: "Farmers get expert advice even where there is no vet nearby." }),
    ],
    explanation: "Interface → inference engine with rule base and knowledge base → conclusion and explanation.",
  });
  b.struct({
    d: 5, skill: "ANALYSIS", examStyle: true,
    hints: ["Contrast fixed rules with learning from data.", "Characteristics: data and rules, reasoning, learning."],
    stem: "A bank in Harare uses AI to detect fraudulent card payments.",
    parts: [
      P.manual({ label: "(a)", marks: 3, stem: "Describe the **three** main characteristics of AI.", points: ["A collection of data and the rules for using that data", "The ability to reason (apply rules to reach conclusions)", "The ability to learn and adapt (in some systems)"], modelAnswer: "AI has a collection of data and rules for using it, the ability to reason with them, and (in some systems) the ability to learn and adapt." }),
      P.manual({ label: "(b)", marks: 2, stem: "Explain why machine learning is more suitable than an expert system for detecting fraud.", points: ["Fraud patterns change constantly / new types of fraud appear", "Machine learning adapts its own processes / data from new confirmed cases, whereas fixed expert rules would need to be rewritten"], modelAnswer: "Fraudsters keep changing their methods. Machine learning adapts from newly confirmed fraud cases, while an expert system's fixed rules would have to be rewritten by experts." }),
      P.tf({ label: "(c)", stem: "True or false: the AI system simulates intelligent behaviour.", answer: true, explanation: "True: that is what AI means." }),
    ],
    explanation: "Data and rules, reasoning, learning; machine learning suits changing fraud patterns.",
  });

  b.card("DEFINITION", "Artificial intelligence", "The branch of computer science dealing with the simulation of intelligent behaviour by computers.");
  b.card("CONCEPT", "Characteristics of AI (Cambridge)", "A collection of data and rules for using it; the ability to reason; (in some systems) the ability to learn and adapt.");
  b.card("DEFINITION", "Expert system", "AI system using expert knowledge (knowledge base + rule base) and an inference engine to give advice in a narrow field, with an explanation.");
  b.card("CONCEPT", "Components of an expert system", "Knowledge base (facts), rule base (IF … THEN rules), inference engine (applies rules), interface (questions in, conclusion and explanation out).");
  b.card("DEFINITION", "Inference engine", "The part of an expert system that applies the rules to the facts and the user's answers to reach a conclusion and choose the next question.");
  b.card("DEFINITION", "Machine learning", "AI in which a program automatically adapts its own processes and/or data from experience, without being reprogrammed.");
  b.card("FACT", "Uses of expert systems", "Medical diagnosis, plant and animal disease identification, mineral prospecting, car fault diagnosis, financial advice, chess.");
  b.card("FACT", "Uses of machine learning", "Spam filters, recommendations, face and speech recognition, predictive text, fraud detection.");
  b.card("CONCEPT", "Advantages and disadvantages of expert systems", "+ expertise anywhere, consistent, explains reasoning. − costly to build, only as good as its knowledge, no common sense, needs updating.");
});
