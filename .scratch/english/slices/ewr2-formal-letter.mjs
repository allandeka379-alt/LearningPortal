// Slice EWR2: formal letters.
import { concept } from "../lib.mjs";

const br = (...l) => l.join("\\\n");

concept("eng.functional.formal-letter", { file: "functional/formal-letter", keyPrefix: "functional.formal-letter" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "A formal letter begins **Dear Sir/Madam**. Which complimentary close is correct?",
    options: [
      ["Yours faithfully", "Correct: when the reader's name is not used, close with Yours faithfully."],
      ["Yours sincerely", "Yours sincerely is used when the letter begins with the reader's name (Dear Mr Moyo)."],
      ["Your loving friend", "This is an informal close for a friend."],
      ["Best wishes always", "This is an informal close."],
    ],
    answer: "A",
    explanation: "*Dear Sir/Madam* (name unknown) → **Yours faithfully**. *Dear Mrs Dube* (name known) → **Yours sincerely**.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "In the layout taught for formal letters, where does **your own address** go?",
    options: [
      ["At the top right, with the date underneath", "Correct: your address at the top right, followed by the date."],
      ["At the bottom left, under your signature", "Only your signature and full name go at the end."],
      ["In the middle, just above the subject line", "The salutation, not your address, comes before the subject line."],
      ["At the top left, above the recipient's title", "The recipient's title and address go on the left, below your address."],
    ],
    answer: "A",
    explanation: "Layout: your address and date (top right) → recipient's title and address (left) → salutation → subject line → body → close → signature and full name.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "Which is the **best subject line** for a letter asking a hardware shop to sponsor paint for a classroom mural?",
    options: [
      ["RE: REQUEST FOR PAINT FOR A CLASSROOM MURAL", "Correct: it states both the purpose (request) and the topic precisely."],
      ["RE: A VERY IMPORTANT LETTER FROM OUR SCHOOL", "It tells the reader nothing about the content."],
      ["RE: HELLO FROM THE ART CLUB AT OUR SCHOOL", "A greeting is not a subject; it is too vague and too informal."],
      ["RE: PLEASE READ THIS LETTER BEFORE OTHERS", "This is a plea, not a description of the subject."],
    ],
    answer: "A",
    explanation: "A subject line should let the reader know the purpose and topic at a glance: *RE: Request for paint for a classroom mural*.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "Which is the most suitable **first sentence** for a letter applying for a holiday job at a supermarket?",
    options: [
      ["I wish to apply for the post of shelf packer advertised in The Chronicle.", "Correct: it states the purpose and where the post was advertised."],
      ["I hope this letter finds you well and that business is going nicely.", "A rambling greeting delays the purpose; formal letters state it at once."],
      ["My name is Farai and I am sixteen years old and I like shopping.", "The name goes at the end; the age and interests are not the purpose."],
      ["I really, really need a job these holidays, so please help me out.", "Pleading and informal; it does not identify the post."],
    ],
    answer: "A",
    explanation: "Open with your purpose: *I wish to apply for…*, *I am writing to complain about…*, *I would like to enquire about…*.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "In a letter of **complaint**, what should the **final paragraph** normally contain?",
    options: [
      ["The specific action you want the reader to take", "Correct: a complaint should end by asking for something to be done."],
      ["A detailed description of when the problem began", "Details belong in the middle paragraphs."],
      ["An apology for taking up so much of the reader's time", "Unnecessary apology weakens a complaint."],
      ["A warning that you will tell everyone how bad they are", "Threats are rude and unlikely to get results."],
    ],
    answer: "A",
    explanation: "Structure: purpose → details (what, when, where) → effects → **requested action** (*I would be grateful if…*) → courteous closing line.",
  });
  b.mcq({
    d: 3, skill: "EVALUATION",
    stem: "Which sentence best suits a **letter to the editor** about litter at a bus terminus?",
    options: [
      ["I wish to draw your readers' attention to the litter piling up at the rank.", "Correct: formal, addresses the newspaper's readers and states the issue."],
      ["I'm sick and tired of the disgusting rubbish all over the rank, honestly.", "Contractions and emotional slang suit a chat, not a published letter."],
      ["Dear friends, let us talk about something that is bothering me a lot.", "Dear friends is the wrong salutation, and the purpose is vague."],
      ["The rubbish is everywhere and nobody does anything about anything ever.", "Exaggerated and vague, with no clear focus."],
    ],
    answer: "A",
    hints: ["Who reads a letter to the editor?", "Choose formal register and a clear purpose."],
    explanation: "A letter to the editor is written for the newspaper's readers: open with a formal statement of the issue (*I wish to draw your readers' attention to…*).",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A letter begins *Dear Mrs Chiweshe* and ends *Yours faithfully, Ruvarashe Banda*. What is wrong?",
    options: [
      ["The close should be Yours sincerely because the reader is named.", "Correct: a named salutation takes Yours sincerely."],
      ["The salutation should be Dear Madam Chiweshe in formal letters.", "Dear Madam Chiweshe is not standard; Dear Mrs Chiweshe is correct."],
      ["The writer's name must not appear at the end of a formal letter.", "The writer's full name is written below the signature."],
      ["Formal letters must never address the reader by surname.", "Using a title and surname is correct when the name is known."],
    ],
    answer: "A",
    hints: ["Look at whether the reader's name is known.", "Recall the faithfully/sincerely rule."],
    explanation: "Named reader → **Yours sincerely**; unnamed reader (Sir/Madam) → **Yours faithfully**.",
  });
  b.tf({
    d: 2, skill: "RECALL",
    stem: "True or false? In a formal letter, *Yours faithfully* is written with a capital letter only on *Yours*.",
    answer: true,
    explanation: "True: *Yours faithfully*, *Yours sincerely*. Only the first word is capitalised, and the close is followed by the signature.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "True or false? You should write your name above your address at the top of a formal letter.",
    answer: false,
    explanation: "False. Your name goes at the end, under your signature. Only the address and date go at the top.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each type of formal letter with a suitable opening.",
    pairs: [
      ["Application", "I wish to apply for the post of library assistant."],
      ["Complaint", "I am writing to express my dissatisfaction with your service."],
      ["Enquiry", "I would like to know whether your college offers evening courses."],
      ["Request", "I am writing to ask for permission to use the school hall."],
    ],
    explanation: "Each type has a typical opening that states its purpose at once: apply, complain, enquire, request.",
  });
  b.fib({
    d: 2,
    stem: "Choose the correct words to complete the closing of a formal request.",
    template: "I would be {{blank:a}} if you could reply by 30 June. I look forward to {{blank:b}} from you.",
    blanks: [
      { id: "a", accepted: ["grateful"], choices: ["grateful", "greatful", "thankful to", "glad of"] },
      { id: "b", accepted: ["hearing"], choices: ["hearing", "hear", "be hearing", "heard"] },
    ],
    explanation: "*I would be grateful if…* (note the spelling *grateful*). *I look forward to* is followed by the **-ing** form: *hearing*.",
  });

  b.ext({
    d: 3, skill: "CREATION", marks: 16, secs: 1900,
    stem: "The tap at the community borehole near your school has been broken for three weeks. Write a **formal letter** to the Ward Councillor, Mr B. Sithole, P.O. Box 41, Zvishavane, complaining about the problem and requesting a repair. Use these notes:\n\n- broken since 5 May; handle snapped\n- learners and families walk 3 km to the river\n- girls late for lessons; risk of waterborne disease\n- committee willing to contribute labour\n\nWrite about 230 words.",
    wordLimit: { min: 200, max: 250 },
    points: [
      ["Correct layout: addresses, date, salutation (Dear Mr Sithole), subject line, Yours sincerely, signature and name", 4],
      ["All four notes used and developed in logical paragraphs", 4],
      ["A clear, polite request for specific action", 2],
      ["Formal, firm and courteous tone throughout", 2],
      ["Accurate spelling, grammar and punctuation", 4],
    ],
    levels: [
      [4, 13, 16, "Correct layout, every note developed, firm polite tone, accurate."],
      [3, 9, 12, "Layout mostly correct; most notes used; generally accurate."],
      [2, 5, 8, "Layout errors, notes missing or unclear tone; frequent errors."],
      [1, 0, 4, "Little sense of a formal letter; few notes used."],
    ],
    hints: ["Named reader: which close?", "One paragraph for the facts, one for the effects, one for the request."],
    modelAnswer: `**Model answer:**\n\n${br("Mazvihwa Secondary School", "P. Bag 302", "Zvishavane", "27 May 2026")}\n\n${br("Mr B. Sithole", "Ward Councillor", "P.O. Box 41", "Zvishavane")}\n\nDear Mr Sithole\n\n**RE: BROKEN BOREHOLE TAP NEAR MAZVIHWA SECONDARY SCHOOL**\n\nI am writing on behalf of learners and families who use the borehole beside our school to request your urgent help with its repair.\n\nThe handle of the pump snapped on 5 May, and in the three weeks since then no water has been drawn. As a result, learners and their families now walk about three kilometres to the river and back to collect water before school.\n\nThis has serious effects. Many girls, who usually fetch water in the mornings, now arrive late for lessons and miss important work. In addition, the river water is not safe to drink without boiling, and parents fear an outbreak of diarrhoea or other waterborne diseases as the dry season continues.\n\nThe borehole committee has met and is willing to provide labour, such as digging and carrying materials, if the council can supply a new handle and a mechanic. I would be grateful if you could arrange for the repair as soon as possible and inform the committee of a likely date.\n\nThank you for your attention to this urgent matter. I look forward to hearing from you.\n\nYours sincerely\n\n*R. Banda*\n\nRuvarashe Banda (Head Girl)`,
    explanation: "The model has full layout, a named salutation with *Yours sincerely*, a subject line, one paragraph per stage (facts, effects, offer and request) and a firm, courteous tone.",
  });
  b.ext({
    d: 3, skill: "CREATION", marks: 12, secs: 1400,
    stem: "Write a **letter of application** (about 180 words) to the Manager, Kariba Lakeside Lodge, P.O. Box 90, Kariba, for a holiday post as a **trainee receptionist** advertised on the lodge's notice board. Mention your education, a relevant skill or experience, two personal qualities and when you are available.",
    wordLimit: { min: 150, max: 200 },
    points: [
      ["Correct formal layout including subject line and matching close", 3],
      ["Opening states the post applied for and where it was advertised", 2],
      ["Education, a relevant skill or experience, and two qualities each supported with a brief example", 3],
      ["Availability and a polite closing request for an interview", 2],
      ["Formal register and accurate language", 2],
    ],
    hints: ["Unknown name: Dear Sir/Madam and Yours faithfully.", "Show, briefly, why each quality is true."],
    modelAnswer: `**Plan and opening:**\n\n- Layout: your address and date; The Manager, Kariba Lakeside Lodge, P.O. Box 90, Kariba; Dear Sir/Madam; **RE: APPLICATION FOR THE POST OF TRAINEE RECEPTIONIST**.\n- Paragraph 2: Form 4 learner at Nyamhunga Secondary; strong in English and Commerce.\n- Paragraph 3: experience serving customers at my aunt's grocery shop; handling cash and phone calls.\n- Paragraph 4: qualities: punctual (perfect attendance this year), polite and patient with visitors (school open-day guide).\n- Paragraph 5: available from 2 December to 10 January; available for interview at any time.\n- Yours faithfully, signature, full name.\n\n**Opening paragraph:** I wish to apply for the post of trainee receptionist advertised on the notice board at your lodge entrance. I am a Form 4 learner at Nyamhunga Secondary School and I am keen to gain experience in the hospitality industry, which I hope to study after my O-Levels.`,
    explanation: "An application states the post at once, then gives evidence for each claim (education, experience, qualities) and ends with availability and a request for an interview.",
  });
  b.ext({
    d: 4, skill: "CREATION", marks: 16, secs: 1900,
    stem: "Write a **letter to the editor** of a local newspaper (about 240 words) about the dangerous speed of kombis passing your school gate on a busy road in Masvingo. Describe the problem, give two examples of near-accidents, and propose two solutions.",
    wordLimit: { min: 220, max: 260 },
    points: [
      ["Correct layout for a letter to the editor (Dear Editor or Dear Sir/Madam; Yours faithfully; name and town)", 3],
      ["The problem clearly described with two specific examples", 4],
      ["Two practical, developed solutions", 4],
      ["Formal register appropriate for newspaper readers; firm, constructive tone", 2],
      ["Accurate spelling, grammar and punctuation", 3],
    ],
    levels: [
      [4, 13, 16, "Layout correct; vivid but controlled examples; well-developed solutions; accurate."],
      [3, 9, 12, "Mostly correct; examples and solutions present but less developed."],
      [2, 5, 8, "Layout or tone problems; thin examples or solutions; frequent errors."],
      [1, 0, 4, "Little sense of a letter to the editor."],
    ],
    hints: ["Write for all the newspaper's readers, not just the editor.", "Solutions could involve road humps, a crossing or police checks."],
    modelAnswer: "**Plan:**\n- Dear Editor; subject line **RE: SPEEDING KOMBIS OUTSIDE MUCHEKE HIGH SCHOOL**.\n- Paragraph 1: draw readers' attention to the danger at the school gate on the main road.\n- Paragraph 2: example 1: a Form 1 pupil pulled back by a vendor as a kombi overtook on the bend; example 2: a kombi mounting the pavement to avoid a stationary bus at dismissal time.\n- Paragraph 3: solution 1: road humps and a painted crossing with signs; solution 2: a traffic officer or trained scholar patrol at 7 a.m. and 4 p.m.\n- Paragraph 4: appeal to drivers, operators and the council; Yours faithfully; name and suburb.\n\n**Opening paragraph:** I wish to draw your readers' attention to the danger faced every day by learners crossing the road outside Mucheke High School. Kombis travelling between the city centre and the high-density suburbs regularly pass the gate at high speed, overtaking on the bend just as hundreds of pupils are arriving or leaving.",
    explanation: "A letter to the editor addresses the public: it states the issue, proves it with specific examples and proposes realistic solutions in a firm, constructive tone.",
  });

  b.card("CONCEPT", "Formal letter layout (order)", "Your address and date (top right) → recipient's title and address (left) → salutation → subject line → body → close → signature and full name.");
  b.card("FACT", "Dear Sir/Madam closes with…", "Yours faithfully.");
  b.card("FACT", "Dear Mr Moyo closes with…", "Yours sincerely.");
  b.card("DEFINITION", "Subject line", "A short, specific heading after the salutation (often starting RE:) that states the purpose and topic.");
  b.card("CONCEPT", "Paragraph plan for a complaint", "Purpose → facts (what, when, where) → effects → requested action → courteous closing sentence.");
  b.card("VOCABULARY", "Formal requesting phrases", "I would be grateful if you could…; I would appreciate it if…; I look forward to hearing from you.");
  b.card("CONCEPT", "Opening of an application", "State the post and where it was advertised: I wish to apply for the post of … advertised in …");
  b.card("FACT", "Where does your name go in a formal letter?", "At the end, under your signature; never above your address.");
});
