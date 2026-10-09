// Slice EWR2: register, audience and purpose.
import { concept } from "../lib.mjs";

concept("eng.functional.register", { file: "functional/register", keyPrefix: "functional.register" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What does **register** mean in writing?",
    options: [
      ["The level of formality chosen to suit the situation", "Correct: register is how formal or informal the language is."],
      ["The list of pupils present in a class each day", "That is a class register, a different meaning of the word."],
      ["The number of paragraphs a letter must contain", "Register is about the choice of language, not length."],
      ["The address written at the top of a formal letter", "The address is part of layout, not register."],
    ],
    answer: "A",
    explanation: "**Register** is the level of formality (formal, semi-formal, informal) chosen to suit the audience, purpose and situation.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "Which sentence is the most suitable for a **formal letter to a District Schools Inspector**?",
    options: [
      ["I am writing to request permission to hold a science fair in May.", "Correct: full forms, precise verb (request) and a clear purpose."],
      ["I'm just dropping you a quick line about our school science fair in May.", "Contractions and the casual phrase dropping you a line are informal."],
      ["Guess what? We want to throw a big science fair in May!", "A chatty question, slang (throw) and an exclamation suit a friend, not an official."],
      ["Hey there, could we maybe do a science fair thing in May?", "Hey there and thing are far too casual for an official."],
    ],
    answer: "A",
    explanation: "Formal writing to an official uses full forms (*I am*), precise standard verbs (*request*) and states the purpose plainly.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "Which word is the formal equivalent of **put off** in *We had to put off the meeting*?",
    options: [
      ["postpone", "Correct: postpone means to move an event to a later time."],
      ["cancel", "Cancel means the event will not happen at all, which changes the meaning."],
      ["prolong", "Prolong means to make something last longer."],
      ["preserve", "Preserve means to keep something safe or unchanged."],
    ],
    answer: "A",
    explanation: "*Put off* (an event) = **postpone**. Formal writing often replaces phrasal verbs with single precise verbs: *find out → discover*, *ask for → request*.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which reader would expect an **informal** register?",
    options: [
      ["A cousin who has just moved to Gweru", "Correct: a relative of your own age is a friendly, familiar reader."],
      ["The editor of a national newspaper", "An editor is a public, unfamiliar reader: formal register."],
      ["The manager of a company you are applying to", "A job application is formal."],
      ["The headmaster of a neighbouring school", "A head you do not know personally expects a formal letter."],
    ],
    answer: "A",
    explanation: "The closer and more equal the relationship, the more informal the register. Officials, editors, employers and heads expect formal writing.",
  });
  b.mcq({
    d: 3, skill: "EVALUATION",
    stem: "A pupil is writing a **complaint** to a bus company. Which sentence has a tone that is **firm but polite**?",
    options: [
      ["I would appreciate an assurance that the advertised timetable will be kept.", "Correct: a clear demand expressed courteously."],
      ["Your drivers are hopeless and should all be dismissed at once.", "Insulting and exaggerated: rude rather than firm."],
      ["I am so sorry to trouble you, and please do ignore this letter if you are busy.", "Over-apologetic: it weakens the complaint so much that nothing will be done."],
      ["You people never care about passengers, so why should I bother?", "Rude and sarcastic, with no clear request."],
    ],
    answer: "A",
    hints: ["A good complaint asks for action.", "Avoid both insults and excessive apology."],
    explanation: "A firm, polite complaint states facts and requests action without insults (rude) or grovelling (weak).",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Read this opening of a letter to a newspaper editor.\n\n*\"Dear Editor, I'm writing coz the potholes on Samora Machel Avenue are a total nightmare.\"*\n\nWhat is the main problem with it?",
    options: [
      ["It mixes a formal greeting with informal, text-speak language.", "Correct: coz, I'm and total nightmare clash with the formal purpose."],
      ["It names a real street, which is not allowed in letters.", "Naming a real place is fine; it makes the complaint specific."],
      ["It should always start with Dear Sir or Madam, never Dear Editor.", "Dear Editor is an acceptable greeting for a letter to a newspaper."],
      ["It states its purpose too early in the opening sentence.", "Stating the purpose at once is good practice."],
    ],
    answer: "A",
    hints: ["Look at individual words in the sentence.", "Would an editor expect to see coz?"],
    explanation: "Keep one register throughout. *I am writing because the potholes on Samora Machel Avenue have become dangerous* keeps the formal tone the greeting sets up.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "True or false? In an informal letter to a friend, spelling and punctuation are not marked.",
    answer: false,
    explanation: "False. Informal means friendly, not careless. Accuracy of spelling, grammar and punctuation is marked in every writing task.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "True or false? Contractions such as *don't* and *I'm* are generally avoided in formal reports and letters.",
    answer: true,
    explanation: "True. Formal writing uses full forms (*do not*, *I am*). Contractions suit informal letters, emails and some lively articles.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each informal expression with its formal equivalent.",
    pairs: [["find out", "establish"], ["a lot of", "a great deal of"], ["kids", "learners"], ["tell", "inform"]],
    explanation: "Formal writing prefers single precise words to phrasal verbs and slang: *find out → establish/discover*, *a lot of → a great deal of*, *kids → learners/children*, *tell → inform*.",
  });
  b.fib({
    d: 2,
    stem: "Choose the word that best suits a formal report to the Head.",
    template: "The committee {{blank:a}} that the tuck-shop prices be displayed on a notice board.",
    blanks: [{ id: "a", accepted: ["recommends"], choices: ["recommends", "reckons", "kind of thinks", "wants it so"] }],
    explanation: "*Recommends* is the standard formal verb for advice in a report. *Reckons* and *kind of thinks* are informal; *wants it so* is not standard English.",
  });
  b.mcq({
    d: 3, skill: "EVALUATION",
    stem: "You are writing a speech for **Form 1 pupils** on their first day. Which sentence best suits this audience?",
    options: [
      ["Ask a prefect whenever you are lost; we were all new once.", "Correct: simple, friendly and reassuring for young listeners."],
      ["Institutional orientation necessitates proactive consultation of seniors.", "Abstract, difficult vocabulary would lose twelve-year-olds."],
      ["Yo, newbies, just chill and you'll figure stuff out eventually.", "Slang is unsuitable for a speech at a school event."],
      ["Pupils who fail to comply with regulations will face consequences.", "Cold and threatening: the wrong tone for a welcome."],
    ],
    answer: "A",
    hints: ["Think about the age of the listeners.", "What is the purpose of a welcome speech?"],
    explanation: "Match vocabulary to the audience's age and the purpose. A welcome speech should be clear, warm and encouraging, without slang.",
  });

  b.manualShort({
    d: 2, skill: "APPLICATION", marks: 3,
    stem: "Rewrite this sentence in a **formal** register for a letter to a company: *\"Hey, I wanna know if you've got any holiday jobs going.\"*",
    points: ["Removes the informal greeting and slang (hey, wanna)", "Uses full forms rather than contractions", "Uses a polite formal structure such as I would like to enquire whether…"],
    modelAnswer: "I would like to enquire whether your company has any vacancies for holiday work.",
    explanation: "Formal enquiries use full forms and polite structures: *I would like to enquire whether…*, *I am writing to ask if…*.",
  });

  b.ext({
    d: 3, skill: "CREATION", marks: 12, secs: 1300,
    stem: "Your school's water tank leaked during the weekend. Write **two short messages** about it (about 70 words each):\n\n1. A **formal** note to the Head, reporting what happened and requesting a repair.\n2. An **informal** message to a friend at another school, telling them about it.",
    wordLimit: { min: 120, max: 170 },
    points: [
      ["Formal note: correct formal greeting and closing, full forms and a clear request", 3],
      ["Formal note: facts in a logical order with a controlled, respectful tone", 2],
      ["Informal message: friendly greeting, conversational style and personal feelings", 3],
      ["The two messages contain the same core facts but sound clearly different", 2],
      ["Accurate spelling, grammar and punctuation in both", 2],
    ],
    hints: ["Use the GAP check for each message separately.", "Keep the facts the same; change only the language."],
    modelAnswer: "**1. Formal note**\n\nDear Sir\n\nI wish to report that the water tank behind the science block leaked over the weekend. On Monday morning the groundsman found the tank almost empty and the area around it waterlogged. The leak appears to come from the outlet pipe. I would be grateful if a plumber could inspect and repair it as soon as possible, as the laboratories depend on this supply.\n\nYours faithfully\nTafadzwa Ncube (Head Girl)\n\n**2. Informal message**\n\nHi Nyasha,\n\nYou should have seen our school on Monday! The big tank behind the labs leaked all weekend, so there was mud everywhere and no water for our chemistry practical. Our teacher had to cancel it, which nobody complained about, to be honest. The Head's getting a plumber in, apparently. How's your term going?\n\nTafi",
    explanation: "The facts stay the same; the register changes vocabulary (*I wish to report* versus *You should have seen*), sentence types, contractions and the amount of personal feeling.",
  });
  b.ext({
    d: 3, skill: "CREATION", marks: 10, secs: 1000,
    stem: "The following paragraph is from a **report to the School Development Committee**, but it is written in the wrong register. Rewrite it in a suitable formal, objective register (about 90 words).\n\n*\"OK so the tuck shop is a total mess. Kids push and shove like crazy at break and loads of them don't even get served before the bell. Honestly, someone's gonna get hurt. We reckon you should get a second window open and make the kids line up properly.\"*",
    wordLimit: { min: 70, max: 100 },
    points: [
      ["All slang, contractions and exaggeration removed", 3],
      ["Facts restated objectively (crowding at break; many pupils not served; safety risk)", 3],
      ["Recommendations expressed formally (it is recommended that…)", 2],
      ["Accurate, fluent formal English", 2],
    ],
    hints: ["Keep the facts but drop the emotion.", "Use the passive or the committee as subject for recommendations."],
    modelAnswer: "The tuck shop is poorly organised during the morning break. Learners crowd around the single serving window, and a considerable number are not served before the bell rings. The pushing that results presents a real risk of injury, particularly to younger learners. It is therefore recommended that a second serving window be opened at break time and that prefects supervise an orderly queue so that every learner can be served safely before the bell.",
    explanation: "Objective register states facts without exaggeration, avoids *I reckon* and slang, and phrases advice as formal recommendations.",
  });
  b.ext({
    d: 4, skill: "CREATION", marks: 16, secs: 1800,
    stem: "Your school is introducing a rule that phones must be handed in at the gate each morning. Write about the rule for **two different audiences** (about 110 words each):\n\n1. An **announcement for the school newsletter** read by parents (semi-formal).\n2. A **short speech to Form 1 and 2 pupils** at assembly (friendly but respectful).",
    wordLimit: { min: 180, max: 240 },
    points: [
      ["Newsletter: semi-formal, informative tone explaining the rule, the reasons and what parents should do", 4],
      ["Speech: direct address to young listeners, simple vocabulary and an encouraging tone", 4],
      ["Each text uses features of its genre (a heading for the newsletter; greeting and closing for the speech)", 3],
      ["Clear organisation and consistent register within each text", 2],
      ["Accurate spelling, grammar and punctuation", 3],
    ],
    levels: [
      [4, 13, 16, "Both texts are clearly adapted to their audiences; registers consistent; accurate and fluent."],
      [3, 9, 12, "Both texts mostly suit their audiences; occasional slips in register or accuracy."],
      [2, 5, 8, "Little difference between the two texts or frequent errors."],
      [1, 0, 4, "One text missing or the register is unsuitable throughout."],
    ],
    hints: ["Parents want reasons and practical arrangements.", "Young pupils need reassurance and simple, clear instructions."],
    modelAnswer: "**1. Newsletter announcement**\n\n**New arrangements for mobile phones**\n\nFrom the start of next term, all learners who bring a phone to school will hand it in at the gate each morning. Phones will be labelled, kept in a locked cabinet in the office and returned at 4 p.m. The School Development Committee introduced the rule after teachers reported that phones were distracting learners in lessons. Parents who need to contact their children urgently may call the school office, and messages will be passed on immediately. We thank parents for their support.\n\n**2. Speech to Forms 1 and 2**\n\nGood morning, everyone. I have one important change to tell you about. From next term, if you bring a phone, you will hand it in at the gate when you arrive. Don't worry: it will be locked away safely with your name on it, and you will collect it at four o'clock. Why are we doing this? Because lessons are better when nobody is checking messages under the desk. If your family needs you, they can phone the office. Thank you for listening, and thank you for helping to make this work.",
    explanation: "The newsletter explains the rule, reasons and arrangements in a semi-formal, informative voice; the speech speaks directly to young listeners with short sentences, a rhetorical question and reassurance.",
  });

  b.card("DEFINITION", "Register", "The level of formality of language (formal, semi-formal, informal), chosen to suit audience, purpose and situation.");
  b.card("DEFINITION", "Tone", "The attitude conveyed by the writer's words: polite, firm, warm, grateful, urgent, neutral.");
  b.card("CONCEPT", "The GAP check", "Before writing, identify the Genre (text type), the Audience (reader) and the Purpose (what the text must do).");
  b.card("CONCEPT", "Features of formal register", "Precise standard vocabulary, full forms (no contractions), complete sentences, controlled feeling, no slang.");
  b.card("CONCEPT", "Features of informal register", "Friendly greeting, contractions, questions and exclamations, personal feelings; still correct spelling and grammar.");
  b.card("VOCABULARY", "Formal equivalents: ask for, tell, find out, put off", "request, inform, establish (or discover), postpone.");
  b.card("CONCEPT", "Firm but polite", "State the facts, make a clear request and avoid both insults and excessive apology.");
  b.card("FACT", "Most common register error in exams", "Mixing registers: starting formally and slipping into slang or text speak.");
});
