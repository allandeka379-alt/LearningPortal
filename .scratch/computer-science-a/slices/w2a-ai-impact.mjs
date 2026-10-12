// Slice w2a: AI applications and social impact (acs.ethics.ai-impact, Cambridge AS).
import { concept, P, chk, same, CAM, mdTable, round } from "../lib.mjs";
import { mc } from "../tables/w2a-q.mjs";

concept("acs.ethics.ai-impact", { file: "ethics/ai-impact", keyPrefix: "ethics.ai-impact", applies: CAM }, (b) => {
  // hypothetical test of a crop-disease app (invented classroom figures)
  const train = { maize: 4200, sorghum: 800 };
  const test = { maize: { n: 150, ok: 135 }, sorghum: { n: 50, ok: 30 } };
  const totalTrain = train.maize + train.sorghum;
  const shareSorghum = round((100 * train.sorghum) / totalTrain, 0);
  const accMaize = (100 * test.maize.ok) / test.maize.n, accSorghum = (100 * test.sorghum.ok) / test.sorghum.n;
  const overall = (100 * (test.maize.ok + test.sorghum.ok)) / (test.maize.n + test.sorghum.n);
  chk(shareSorghum, 16); chk(accMaize, 90); chk(accSorghum, 60); chk(overall, 82.5); chk(accMaize - accSorghum, 30);
  const tbl = mdTable(["Crop", "Training photographs", "Test photographs", "Correct", "Accuracy"], [["Maize", train.maize, test.maize.n, test.maize.ok, `${accMaize}%`], ["Sorghum", train.sorghum, test.sorghum.n, test.sorghum.ok, `${accSorghum}%`]]);
  // other: clinic chatbot
  chk(round((100 * 45) / 60, 0), 75);

  // ---- multiple choice
  mc(b, 1, "RECALL", "Which of these is an application of artificial intelligence?",
    ["A phone app that identifies a plant disease from a photograph", "Correct: image recognition is an AI application."],
    [["A word processor that counts the words in a document for the writer", "Counting words follows a fixed rule and needs no learning."], ["A calculator that adds two numbers entered by the user", "Arithmetic is not an AI application."], ["A printer that prints one page after another from a queue", "Printing is not AI."]],
    "AI tasks include recognising images and speech, translating and recommending.");
  mc(b, 2, "UNDERSTANDING", "What is the most common cause of bias in an AI system?",
    ["Training data that does not represent every group of users", "Correct."],
    [["The computer that runs the system is too old to be fair", "The age of the computer does not cause unfairness."], ["The program is written in a language that few people know", "The programming language is not the cause."], ["The people who use the system type too slowly on the keys of the computer", "User speed is not a cause."]],
    "The system learns the patterns in its data, including gaps in the data.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "A bank replaces some of its counter staff with a chatbot. Which statement describes an effect on employment?",
    ["Some jobs may be lost while others are created", "Correct: the effect is mixed."],
    [["No jobs at the bank are affected in any way at all", "Some tasks have changed."], ["Every job in the bank is lost once the chatbot starts", "Not every job can be done by a chatbot."], ["Only the customers' jobs change, and the staff are unaffected", "The staff's work is affected."]],
    "Automation changes tasks: it removes some jobs and creates others.", { daily: true });
  mc(b, 3, "UNDERSTANDING", "Why should the accuracy of an AI system be measured separately for different groups of users, as well as overall?",
    ["An overall figure can hide poor results for a smaller group of users", "Correct."],
    [["Separate figures are always higher than the overall figure is", "They can be lower or higher than the overall figure."], ["The law requires that a single figure is never published", "No such rule is stated."], ["A single overall figure is impossible to calculate in any practical way", "It can be calculated easily."]],
    "A high overall figure can come from a large, well-served group.", { hints: ["What happens to a small group's results when they are averaged with a large group's?"] });
  mc(b, 3, "ANALYSIS", "A voice-controlled app needs recordings of the user's voice. Which concern does this mainly raise?",
    ["The privacy of the user's personal data", "Correct: recordings are personal data and must be protected."],
    [["The speed at which the processor runs its programs", "That is a performance matter."], ["The size of the keyboard that the user is given", "A keyboard may not be used."], ["The colour that is chosen for the screen display", "That has no link with personal data."]],
    "Recordings of a person's voice can identify them and show what they said.", { hints: ["What kind of information is a recording of someone's voice?"] });
  mc(b, 3, "UNDERSTANDING", "Which statement describes an environmental impact of AI?",
    ["Training large systems uses much electricity, but AI may also reduce waste", "Correct: both effects are possible."],
    [["AI has no environmental impact at all because it is only software", "Computers use energy."], ["AI always reduces the energy used by every industry that adopts it", "That ignores its own energy use."], ["Only farmers are affected by the energy that AI systems use", "Anyone who uses the electricity supply is affected."]],
    "Give both the energy cost and the possible benefits.", { hints: ["Is the impact only harmful or only helpful?"] });
  mc(b, 3, "EVALUATION", "A clinic uses AI to suggest a diagnosis from a scan. Who should make the final decision about treatment?",
    ["A qualified health worker who is responsible for the patient", "Correct: a person must stay accountable, especially where safety is involved."],
    [["The AI system alone, without any person at all checking its result", "A system cannot be held accountable."], ["The software company, without ever seeing the patient", "The patient's own clinician is best placed to decide."], ["Whoever pays for the scan to be carried out at the clinic", "Payment does not decide medical judgements."]],
    "AI can support a decision but a person remains responsible.", { hints: ["Who can be held accountable?"] });
  mc(b, 2, "UNDERSTANDING", "Which is a benefit of machine translation for African languages?",
    ["More people can read information in the language they use daily", "Correct."],
    [["Every translation that is produced is guaranteed to be perfect in meaning", "Accuracy is lower for languages with little data."], ["Human translators are never needed again for any task", "People are still needed to check."], ["Languages no longer need to be taught in any school", "Teaching remains needed."]],
    "Access improves, but quality depends on the data available.");

  // ---- true / false, matching, fill in the blank
  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "An AI system is accurate for all groups of people if it is accurate overall.", answer: false,
    explanation: "False. A good overall figure can hide poor results for a smaller group." });
  b.tf({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "Because an AI system makes the decision, the people who built and use it are not responsible for the results.", answer: false,
    explanation: "False. People who design, train and use the system remain responsible." });
  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each application of AI to an example.",
    pairs: [["Speech recognition", "Typing a message by speaking to a phone"], ["Image recognition in agriculture", "Spotting a crop disease from a photograph"], ["Recommendation", "Suggesting a video based on what a user watched before"], ["Chatbot", "Answering a customer's question in a chat window"], ["Robotics", "A machine that moves parts on a production line"]],
    explanation: "Each is a common AI application." });
  b.fib({ d: 3, skill: "UNDERSTANDING", hints: ["Think about why the data matters."],
    stem: "Complete the sentences about bias.",
    template: "AI bias is often caused by training {{blank:a}} that does not {{blank:b}} all groups. It can be reduced by collecting more {{blank:c}} data.",
    blanks: [
      { id: "a", accepted: ["data"], choices: ["data", "keyboards", "screens", "licences"] },
      { id: "b", accepted: ["represent"], choices: ["represent", "delete", "encrypt", "compress"] },
      { id: "c", accepted: ["representative"], choices: ["representative", "encrypted", "compressed", "random"] },
    ], explanation: "Unrepresentative data causes bias; more representative data helps." });

  // ---- numerical
  b.num({ d: 3, skill: "APPLICATION", calculator: false, hints: ["Accuracy = correct ÷ tested × 100."],
    stem: "A chatbot at a clinic is tested on 60 questions from patients who speak one language and answers 45 correctly. What is its accuracy for that group?",
    value: 75, unit: "%", wrong: [45, 60], workedSolution: "45 ÷ 60 = 0.75, which is 75%.", explanation: "75%." });
  b.num({ d: 3, skill: "APPLICATION", calculator: false, hints: ["Subtract the two accuracies."],
    stem: "In the same test, the app is 90% accurate on maize and 60% accurate on sorghum. What is the difference in accuracy, in percentage points?",
    value: 30, wrong: [150, 90], workedSolution: "Accuracy for maize = 135 ÷ 150 = 90%; for sorghum 30 ÷ 50 = 60%. The difference is 90 − 60 = 30 percentage points.", explanation: "30 percentage points." });
  b.short({ d: 2, skill: "RECALL", stem: "What word describes systematic unfairness in the results of an AI system, often caused by its training data?", accepted: ["bias", "biased", "bias in the data"], wrong: ["virus", "latency"], explanation: "Bias." });

  // ---- self-marked
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4, hints: ["Give the benefit and the concern in two different applications."],
    stem: "Describe two applications of AI, with one benefit or concern for each. [4]",
    points: ["A named application, for example image recognition for crop disease or speech recognition", "A benefit or concern linked to it (early warning for farmers; wrong identification; privacy of recordings)", "A second, different application, for example a chatbot or machine translation", "A benefit or concern linked to it (24-hour service; wrong answers; less accurate for languages with little data)"],
    modelAnswer: "Image recognition can identify a crop disease from a photograph, giving a farmer early warning, though a wrong identification could lead to the wrong treatment. A chatbot answers customers' questions at any time of day, but it may give wrong answers or fail to understand the customer.",
    explanation: "Two applications, each with a linked benefit or concern." });
  b.manualShort({ d: 4, skill: "ANALYSIS", marks: 4, hints: ["Explain the cause, the effect and what could be done."],
    stem: "Explain how bias can arise in an AI system and how it can be reduced. [4]",
    points: ["The training data does not represent all the groups of people or cases", "The system learns the patterns of the well-represented groups", "It therefore makes more errors for the groups that are under-represented", "It can be reduced by collecting more representative data and testing each group separately"],
    modelAnswer: "If the training data does not represent all groups, the system learns the patterns of the well-represented groups and makes more errors for the under-represented ones. This can be reduced by collecting more representative data and testing each group separately.",
    explanation: "Cause, effect, remedy." });
  b.manualShort({ d: 4, skill: "EVALUATION", marks: 6, hints: ["Two benefits, two concerns and a conclusion."],
    stem: "A hospital in Mutare is considering using AI to help read X-ray images. Discuss whether it should do so. [6]",
    points: ["A benefit: faster checking of images / helps when specialists are few", "A second benefit: can point out areas a doctor might miss", "A concern: errors could harm patients / may be less accurate for some patients", "A second concern: patients' images are personal data that must be protected", "A safeguard: a qualified person makes the final decision / test on local patients", "A reasoned conclusion that follows from the points"],
    modelAnswer: "Using AI could speed up checking and help where specialists are few, and it can highlight areas that a doctor might miss. However, errors could harm patients, the system may be less accurate for patients unlike those in its training data, and the images are personal data that must be protected. The hospital should use it as support, with a qualified person making every final decision and the system tested on local patients.",
    explanation: "Balanced points and a conclusion." });
  b.manualShort({ d: 4, skill: "EVALUATION", marks: 3, hints: ["Mention both energy use and a benefit."],
    stem: "Discuss the effect of AI on the environment. [3]",
    points: ["Training and running large AI systems uses a lot of electricity and produces heat that needs cooling", "Equipment becomes e-waste / the energy may come from fossil fuels", "AI can help the environment, for example by finding crop disease early or reducing waste in supply and power use"],
    modelAnswer: "Training and running large AI systems uses a lot of electricity and needs cooling, and the equipment eventually becomes e-waste. AI can also help the environment, for example by detecting crop disease early or reducing waste.",
    explanation: "Costs and benefits." });

  // ---- structured practice
  b.struct({ d: 4, skill: "ANALYSIS", examStyle: true, hints: ["Accuracy = correct ÷ tested × 100.", "Compare the training share with the accuracy."],
    explanation: "Overall accuracy hides poor accuracy on the smaller crop.",
    stem: "A crop-disease app was trained on 5000 photographs and tested as shown:\n\n" + tbl,
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "Calculate the accuracy of the app for sorghum, as a percentage.", value: accSorghum, wrong: [30, 16], type: "CALCULATION", workedSolution: "30 ÷ 50 × 100 = 60%.", explanation: "60%." }),
      P.num({ label: "(b)", marks: 1, stem: "Calculate the percentage of the training photographs that show sorghum.", value: shareSorghum, wrong: [8, 20], type: "CALCULATION", workedSolution: "800 ÷ 5000 × 100 = 16%.", explanation: "16%." }),
      P.manual({ label: "(c)", marks: 2, stem: "Use your answers to suggest why the app is less accurate for sorghum.", points: ["Only 16% of the training photographs were sorghum, so there were few examples to learn from", "The app learned maize patterns much better than sorghum patterns"], modelAnswer: "Only 16% of the training photographs showed sorghum, so the app had few examples to learn from and learned maize better.", explanation: "Under-represented in the training data." }),
      P.manual({ label: "(d)", marks: 2, stem: "State two actions that the developers could take to improve the app for sorghum farmers.", points: ["Collect more photographs of sorghum for training", "Test the app on each crop separately / ask sorghum farmers to check the results"], modelAnswer: "Collect more photographs of sorghum for training, and test the app on each crop separately.", explanation: "More representative data and separate tests." }),
      P.manual({ label: "(e)", marks: 2, stem: "Explain why the overall accuracy of 82.5% could mislead a sorghum farmer.", points: ["The overall figure is dominated by the maize results (150 of 200 photographs)", "The farmer would expect better results than the 60% accuracy that applies to sorghum"], modelAnswer: "The overall figure is dominated by the maize photographs, so a sorghum farmer would expect better results than the 60% that applies to sorghum.", explanation: "An average hides the difference." }),
    ] });
  b.struct({ d: 3, skill: "EVALUATION", examStyle: true, hints: ["Give a benefit and a concern for each part."],
    explanation: "A short discussion of a chatbot for a bank.",
    stem: "A bank in Harare introduces a chatbot to answer customers' questions about their accounts.",
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "Give two benefits of the chatbot to the bank or its customers.", points: ["It is available at any time of day", "It can answer many customers at once / reduces waiting and cost"], modelAnswer: "It is available at any time of day and it can answer many customers at the same time.", explanation: "Availability and capacity." }),
      P.manual({ label: "(b)", marks: 2, stem: "Give two concerns about the chatbot.", points: ["It may give a wrong answer or not understand the question", "Customers' account details are personal data that must be kept secure / some staff may lose their jobs"], modelAnswer: "It may give a wrong answer or fail to understand the customer, and customers' account details are personal data that must be kept secure.", explanation: "Accuracy and privacy (or jobs)." }),
      P.manual({ label: "(c)", marks: 2, stem: "Suggest one way in which the bank could reduce the risk of the chatbot causing harm.", points: ["Let the customer reach a member of staff when the chatbot cannot help", "Test the chatbot with customers who speak different languages / protect the data"], modelAnswer: "Let customers reach a member of staff when the chatbot cannot help, and test it with customers who speak different languages.", explanation: "A human back-up and wide testing." }),
    ] });

  // ---- flashcards
  b.card("DEFINITION", "Artificial intelligence", "Computer systems that carry out tasks which normally need human intelligence, such as recognising speech and images or translating.");
  b.card("FACT", "Applications of AI", "Speech recognition, image recognition (agriculture, medicine), recommendation, robotics, translation, chatbots.");
  b.card("DEFINITION", "Bias in AI", "Systematic unfairness in results, often caused by training data that does not represent everyone.");
  b.card("CONCEPT", "Overall accuracy can mislead", "A high average can hide poor accuracy for a small group; test each group separately.");
  b.card("CONCEPT", "Effect of AI on jobs", "Some jobs are lost, some change and some are created; skills and training matter.");
  b.card("CONCEPT", "Privacy and AI", "Many AI systems use personal data; it must be collected with permission, kept secure and used for the stated purpose.");
  b.card("CONCEPT", "Environment and AI", "Training large models uses a lot of energy and creates e-waste, but AI can help to reduce waste and detect problems early.");
  b.card("FACT", "A balanced discussion", "Give benefits and concerns, say who is affected, and reach a conclusion that follows from the points; a person stays responsible.");
});
