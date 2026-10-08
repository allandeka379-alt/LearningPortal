// Slice EVO: conversations, telephone calls and interviews (appropriate responses + self-marked tasks).
import { concept } from "../lib.mjs";

concept("eng.oral.spoken-interaction", { file: "oral/spoken-interaction", keyPrefix: "oral.spoken-interaction" }, (b) => {
  b.mcq({
    d: 1, skill: "UNDERSTANDING",
    stem: "You need to borrow a ruler from your teacher. What is the **most appropriate** thing to say?",
    options: [
      ["Excuse me, sir. Could I borrow a ruler, please?", "Correct: polite, uses could and please, and suits a teacher."],
      ["Hey, give me a ruler quickly, I need it now.", "This is a rude command with no please."],
      ["I want a ruler. Where are your rulers kept?", "I want sounds demanding, and it does not actually ask politely."],
      ["Ruler! Pass one over here to me, will you?", "This is too abrupt and informal for a teacher."],
    ],
    answer: "A",
    explanation: "Polite requests use **could / would / may** with **please**, and a respectful address (*sir*, *madam*, *Mrs Moyo*).",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "A classmate invites you to her birthday lunch on Saturday, but you will be at a family wedding. What is the most appropriate reply?",
    options: [
      ["Thank you for inviting me. I'm afraid I'll be at a wedding, but have a lovely day!", "Correct: it thanks her, gives a reason and ends with a kind wish."],
      ["No. I've got better things to do on Saturday than come to your lunch, sorry.", "This is rude and hurtful."],
      ["Maybe. I'll think about it and perhaps I'll come along if I've got nothing on.", "This is vague; you already know you cannot go."],
      ["I can't. Weddings are more important than birthday lunches, you know that.", "It gives a reason but in a dismissive, unkind way."],
    ],
    answer: "A",
    explanation: "A polite refusal **thanks**, **gives a reason** and **ends with a kind wish**.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "You meet a friend whose grandfather died last week. What is the most appropriate thing to say?",
    options: [
      ["I'm so sorry about your grandfather. Let me know if I can help.", "Correct: a sincere condolence with an offer of support."],
      ["Congratulations on everything. I hope the weekend went well for you.", "Congratulations are for good news, not a death."],
      ["Never mind. Everybody dies sooner or later, so it's no big deal.", "This is insensitive and dismisses your friend's grief."],
      ["Did he leave you anything in the will? What happens to his farm?", "This is tactless and intrusive."],
    ],
    answer: "A",
    explanation: "Condolences: *I'm so sorry for your loss*, *I'm sorry to hear about…*, with an offer of help.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "You answer the telephone at your school's office. What is the most appropriate greeting?",
    options: [
      ["Good morning, Riverside Secondary School. How may I help you?", "Correct: it greets, names the organisation and offers help."],
      ["Yes? Who is this and what do you want from us this time?", "This is rude and unprofessional."],
      ["Hello. Hello? Is anyone there at all? I can't hear anything.", "This does not identify the school or offer help."],
      ["Hi there, it's me. What's up? Talk fast, I'm a bit busy.", "This is far too informal for an office telephone."],
    ],
    answer: "A",
    explanation: "Answering a work telephone: **greeting + name of the organisation (or your name) + offer of help**.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "On the telephone, the person the caller wants is in a meeting. What should you say?",
    options: [
      ["I'm afraid she's in a meeting. Can I take a message?", "Correct: it explains politely and offers to take a message."],
      ["She's busy. Phone another day, maybe tomorrow or Friday.", "This is abrupt and offers no help."],
      ["She doesn't want to talk to anyone today, so goodbye.", "This is rude and probably untrue."],
      ["How should I know where she is? I'm not her secretary.", "This is rude and unhelpful."],
    ],
    answer: "A",
    explanation: "*I'm afraid* softens bad news; offering to **take a message** is the polite, helpful response.",
  });
  b.mcq({
    d: 3, skill: "EVALUATION",
    stem: "At an interview for a prefect post, you are asked: *\"What is your greatest strength?\"* Which answer is the most effective?",
    options: [
      ["I'm reliable. For example, I've kept the class register for two years without missing a day.", "Correct: a direct answer, supported by an example, in formal register."],
      ["Er, I don't know really. Everything, I suppose? I'm good at lots of stuff, you know.", "Vague and informal; it gives the panel nothing to judge."],
      ["Strength? I'm the strongest boy in Form 3 and I can lift two bags of cement easily.", "This misunderstands the question; it is about personal qualities."],
      ["My mother says I'm the best child in our family, and my friends all agree with her.", "This is not a relevant, supported answer about suitability for the post."],
    ],
    answer: "A",
    hints: ["Interviewers want a direct answer, a reason and an example."],
    explanation: "Strong interview answers: **direct answer → reason → example**, in formal register.",
  });
  b.mcq({
    d: 3, skill: "EVALUATION",
    stem: "The radio you bought last week has stopped working. Which is the most effective way to begin your complaint in the shop?",
    options: [
      ["Good afternoon. I bought this radio here last week, and I'm afraid it has stopped working.", "Correct: polite, factual and clear about the problem."],
      ["You people sell rubbish! This radio is useless and I demand my money back right now!", "Angry insults make it less likely you will get help."],
      ["Hello. I just wanted to say that, well, I'm not sure, but there might be something odd.", "This is too vague: the problem is not stated."],
      ["I'm going to report this shop to the newspapers unless you give me two new radios.", "Threats and unreasonable demands are not an effective complaint."],
    ],
    answer: "A",
    hints: ["A good complaint is calm, factual and asks for a solution."],
    explanation: "Effective complaints are **calm**, give the **facts** (when bought, what is wrong) and ask for a **specific solution**.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "During a class discussion you disagree with a classmate. Which response is the most appropriate?",
    options: [
      ["I see your point, but I'm not sure I agree, because…", "Correct: it acknowledges the other view before disagreeing politely."],
      ["That's a stupid idea and you obviously know nothing.", "This attacks the person instead of the argument."],
      ["Stop talking. It's my turn now, so just listen to me.", "This interrupts rudely and ignores turn-taking."],
      ["Whatever. I don't care what you think about it at all.", "This is dismissive and ends the discussion."],
    ],
    answer: "A",
    hints: ["Polite disagreement first shows that you have listened."],
    explanation: "Disagree politely: *I see your point, but…*, *That's true to some extent; however…*, *I'm not sure I agree, because…*",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which request is the **most formal**?",
    options: [
      ["I wonder if you could tell me when the office opens.", "Correct: I wonder if you could is very indirect and formal."],
      ["Hey, any idea what time the office opens today?", "Hey and any idea are informal."],
      ["Can you tell me when the office opens?", "Can you is polite but less formal."],
      ["Tell me when the office opens.", "This is a command and can sound rude."],
    ],
    answer: "A",
    explanation: "The more indirect the request, the more formal: *Tell me* → *Can you…?* → *Could you…?* → *I wonder if you could…*",
  });
  b.fib({
    d: 2,
    stem: "Choose the most appropriate words to complete this telephone conversation.",
    template: "Caller: Hello, {{blank:a}} Tafadzwa Moyo. {{blank:b}} speak to Mr Ndlovu, please? Receptionist: One moment, I'll {{blank:c}} you through.",
    blanks: [
      { id: "a", accepted: ["this is"], choices: ["this is", "I am being", "here are", "you are"] },
      { id: "b", accepted: ["May I"], choices: ["May I", "Must I", "I want to", "Shall you"] },
      { id: "c", accepted: ["put"], choices: ["put", "take", "give", "send"] },
    ],
    explanation: "Telephone formulae: *Hello, **this is** [name]*; ***May I** speak to…?*; *I'll **put** you through* (connect you).",
  });
  b.fib({
    d: 3, examStyle: true,
    stem: "Choose the most appropriate expression for each situation.",
    template: "Offering to help an elderly woman with her bags: {{blank:a}} Congratulating a friend on passing her driving test: {{blank:b}} Interrupting a meeting to give a message: {{blank:c}} Asking a speaker to repeat something: {{blank:d}}",
    blanks: [
      { id: "a", accepted: ["Would you like me to carry those for you?"], choices: ["Would you like me to carry those for you?", "Give me those bags now.", "You can't carry those, can you?", "Why are you carrying so much?"] },
      { id: "b", accepted: ["Well done! You deserved it."], choices: ["Well done! You deserved it.", "I'm so sorry for your loss.", "About time too, wasn't it?", "Please accept my apologies."] },
      { id: "c", accepted: ["Sorry to interrupt, but there's an urgent call."], choices: ["Sorry to interrupt, but there's an urgent call.", "Everybody be quiet and listen to me.", "Stop the meeting, there's a call.", "Hey! Phone call! Who wants it?"] },
      { id: "d", accepted: ["Could you repeat that, please?"], choices: ["Could you repeat that, please?", "What? Say it again.", "You're not speaking clearly.", "Eh? I can't hear you."] },
    ],
    hints: ["Each situation has a polite formula: offer, congratulate, interrupt, ask for repetition."],
    explanation: "Offer: *Would you like me to…?* Congratulate: *Well done!* Interrupt: *Sorry to interrupt, but…* Ask for repetition: *Could you repeat that, please?*",
  });
  b.short({
    d: 2,
    stem: "Complete the polite refusal with **one word**.\n\n*\"I'm ___, but I can't come on Friday. Thank you for asking.\"*",
    accepted: ["afraid", "sorry"],
    wrong: ["happy", "glad"],
    explanation: "*I'm **afraid** …* and *I'm **sorry**, but …* soften a refusal or bad news.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "When you telephone someone, you should identify yourself near the beginning of the call.",
    answer: true,
    explanation: "True. The listener cannot see you: *Hello, this is Rumbi Chari from Form 4.*",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "In an interview, a one-word answer such as *Yes* is the best way to show confidence.",
    answer: false,
    explanation: "False. Give a direct answer, then a reason and an example. One-word answers give the panel nothing to judge.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each situation with the most suitable expression.",
    pairs: [["apologising", "I do apologise for the delay."], ["accepting an invitation", "Thank you, I'd be delighted to come."], ["making an offer", "Would you like me to help?"], ["expressing sympathy", "I'm so sorry to hear that."], ["introducing someone", "I'd like you to meet Mr Banda."]],
    explanation: "Each social situation has fixed polite formulae: learn them as units.",
  });
  b.manualShort({
    d: 3, skill: "CREATION", marks: 4,
    stem: "Write a short telephone conversation (6-8 lines) in which you call a clinic to change an appointment. The receptionist should answer, and you should identify yourself, give the reason, agree a new time and close politely.",
    points: [
      "The receptionist answers with a greeting and the name of the clinic (or her name) and offers help.",
      "The caller identifies themselves and states the purpose (changing the appointment) with a reason.",
      "A new day or time is agreed and checked (for example read back).",
      "Both speakers use polite formulae and close the call politely (thank you, goodbye).",
    ],
    modelAnswer: "Receptionist: Good morning, Kuwadzana Clinic. How can I help? Caller: Good morning. This is Nyasha Banda. I have an appointment on Tuesday at ten, but I have an exam that day. Could I change it, please? Receptionist: Certainly. Would Thursday at two suit you? Caller: Yes, thank you. Receptionist: So that's Thursday at two o'clock. Caller: That's right. Thank you very much. Goodbye. Receptionist: Goodbye.",
    hints: ["Use the telephone stages: answer, identify, purpose, details, check, close."],
    explanation: "A good telephone dialogue follows the stages and uses polite formulae throughout.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4, examStyle: true,
    stem: "Read the conversation.\n\n*Pupil (to the head teacher): Hey! I want to use the hall on Friday for our drama club. Give me the keys.*\n\nExplain **two** things that make the pupil's words inappropriate, and rewrite the request so that it is suitable.",
    points: [
      "Identifies the informal greeting (Hey!) as unsuitable for a head teacher.",
      "Identifies the demanding wording (I want / Give me, no please) as impolite.",
      "Rewrite uses a respectful greeting or address (Good morning, sir/madam).",
      "Rewrite uses a polite request form (Could/May/Would it be possible…, please) and gives the purpose.",
    ],
    modelAnswer: "'Hey!' is too informal for a head teacher, and 'I want… Give me the keys' is a demand with no please. Better: 'Good morning, sir. Would it be possible for the drama club to use the hall on Friday afternoon, please? We need to rehearse for the arts festival.'",
    hints: ["Think about register and the form of the request."],
    explanation: "Register must suit the listener: a respectful greeting and an indirect, polite request.",
  });

  b.card("DEFINITION", "Register", "How formal or informal language is; it must suit the listener, the setting and the purpose.", undefined);
  b.card("CONCEPT", "Softening requests", "Use could, would, may, I wonder if, would you mind, plus please and thank you.", "Tell me → Can you…? → Could you…? → I wonder if you could…");
  b.card("CONCEPT", "Polite refusal", "Thank the person, give a reason, end with a kind wish.", "Thank you for asking. I'm afraid I can't, but I hope it goes well.");
  b.card("CONCEPT", "Effective complaint", "Calm, factual (what, when) and asks for a specific solution.", undefined);
  b.card("VOCABULARY", "Condolences", "I'm so sorry for your loss. I'm sorry to hear about… Please accept my sympathy.", undefined);
  b.card("FACT", "Answering a work telephone", "Greeting + name of the organisation or yourself + offer of help: Good morning, Mutare Library. How can I help?", undefined);
  b.card("VOCABULARY", "Telephone phrases", "This is… / May I speak to…? / Hold on, please. / I'll put you through. / Can I take a message? / Let me read that back.", undefined);
  b.card("CONCEPT", "Interview answers", "Direct answer → reason → example, in formal register. Ask politely for repetition if needed.", undefined);
  b.card("VOCABULARY", "Disagreeing and interrupting politely", "I see your point, but… / I'm not sure I agree, because… / Sorry to interrupt, but…", undefined);
});
