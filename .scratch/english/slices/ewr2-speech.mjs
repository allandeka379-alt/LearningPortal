// Slice EWR2: speeches.
import { concept } from "../lib.mjs";

concept("eng.functional.speech", { file: "functional/speech", keyPrefix: "functional.speech" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "How should a speech at a school prize-giving **begin**?",
    options: [
      ["By greeting the audience, starting with the guest of honour", "Correct: a speech opens with a salutation to the audience in order of rank."],
      ["With the speaker's address and the date at the top right", "Addresses and dates belong to letters, not speeches."],
      ["With a headline in capital letters to attract readers", "A headline belongs to an article."],
      ["With To, From and Date lines, as in a memo", "These lines are used in memos and reports."],
    ],
    answer: "A",
    explanation: "Speeches open with a salutation in order of importance: *The Guest of Honour, the Head, members of staff, parents, fellow learners…*",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which sentence is a **rhetorical question**?",
    options: [
      ["How many more learners must be hurt before we act?", "Correct: it is asked for effect, to make the audience think, not to get an answer."],
      ["What time does the assembly finish on Fridays?", "This is a genuine question seeking information."],
      ["Did you bring the visitors' book to the hall?", "This is a real question expecting a yes or no answer."],
      ["Where is the nearest clinic to the school?", "This asks for factual information."],
    ],
    answer: "A",
    explanation: "A **rhetorical question** is asked for effect. It involves listeners and makes them reflect on the speaker's point.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which example uses the **rule of three**?",
    options: [
      ["Our school must be clean, safe and welcoming.", "Correct: three parallel adjectives create rhythm and are easy to remember."],
      ["Our school must be clean before the visitors arrive.", "Only one quality is named."],
      ["Our school, which is old, must be cleaned.", "A relative clause, not a list of three."],
      ["Our school must be cleaner than it was last year.", "A comparison, not a group of three."],
    ],
    answer: "A",
    explanation: "The **rule of three** (a triad) groups three words or phrases: *clean, safe and welcoming*. It gives rhythm and emphasis.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "Which sentence best **signposts** the second point in a speech?",
    options: [
      ["This brings me to my second concern: the state of our toilets.", "Correct: it tells listeners clearly that a new point is starting."],
      ["The toilets are also in a very bad state at the moment.", "The point is made, but listeners are not told it is a new section."],
      ["Toilets, toilets everywhere, and not one of them clean.", "This is a striking line, but it does not signpost a point."],
      ["Many people say many things about the school toilets.", "Vague and does not mark the structure."],
    ],
    answer: "A",
    explanation: "Listeners cannot see paragraphs, so speakers use **signposts**: *First…*, *This brings me to…*, *My final point is…*.",
  });
  b.mcq({
    d: 3, skill: "EVALUATION",
    stem: "Which is the **best ending** for a speech urging Form 1 pupils to stop bullying?",
    options: [
      ["Let us make this a school where every learner feels safe. Thank you.", "Correct: an inclusive appeal, a clear message and a courteous close."],
      ["That is all I have to say about bullying, so I will stop now.", "A flat, abrupt ending with no appeal."],
      ["In conclusion, bullying is bad and other things are also bad.", "Vague and weak; it adds nothing memorable."],
      ["Any bullies will be expelled immediately, and that is final.", "A threat rather than an inspiring appeal; also not the speaker's decision."],
    ],
    answer: "A",
    hints: ["What do you want listeners to do after the speech?", "Look for inclusive language."],
    explanation: "A strong speech ending summarises or appeals (*Let us…*), leaves a memorable message and thanks the audience.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "*\"We can plant trees. We can save water. We can change our community.\"*\n\nWhat is the main effect of the **repetition** of *We can*?",
    options: [
      ["It builds confidence and unity, making the message memorable.", "Correct: repeated inclusive phrases create rhythm and a sense of shared power."],
      ["It shows that the speaker has run out of ideas to say.", "The repetition is deliberate and effective, not a sign of weakness."],
      ["It gives the audience detailed instructions for each task.", "No details are given; the effect is emotional, not instructional."],
      ["It makes the speech more formal and impersonal in tone.", "We and the rhythm make it personal and stirring, not impersonal."],
    ],
    answer: "A",
    hints: ["Who does we include?", "How does repetition sound when spoken aloud?"],
    explanation: "Repetition of an inclusive phrase (anaphora) builds rhythm, emphasis and a sense of unity between speaker and audience.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "True or false? A speech should end by thanking the audience.",
    answer: true,
    explanation: "True. *Thank you for listening* or *Thank you for your attention* is the courteous close of a speech.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "True or false? Once you have greeted the audience, a speech should be written exactly like an essay, without addressing listeners again.",
    answer: false,
    explanation: "False. A speech keeps involving the audience with *you*, *we*, questions and references to the occasion throughout.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each type of speech with its main focus.",
    pairs: [
      ["Farewell speech", "recalling memories and wishing the person well"],
      ["Campaign speech", "stating policies and appealing for votes"],
      ["Vote of thanks", "briefly naming people and what they contributed"],
      ["Awareness speech", "informing listeners about a danger and urging action"],
    ],
    explanation: "Each occasion shapes the content and tone: farewell (gratitude, memories), campaign (policies, persuasion), vote of thanks (brief thanks), awareness (facts and a call to action).",
  });
  b.fib({
    d: 2,
    stem: "Choose the best words for the opening of a speech.",
    template: "The Guest of Honour, our Head, members of staff and {{blank:a}} learners: good morning. It is an {{blank:b}} to speak to you today.",
    blanks: [
      { id: "a", accepted: ["fellow"], choices: ["fellow", "dear sir", "beloved readers", "faithful"] },
      { id: "b", accepted: ["honour"], choices: ["honour", "honoured", "honest", "owner"] },
    ],
    explanation: "Speakers address peers as *fellow learners*. *It is an honour* needs the noun *honour* (British spelling), not the adjective *honoured* or *honest*.",
  });

  b.ext({
    d: 3, skill: "CREATION", marks: 16, secs: 1900,
    stem: "You are the Head Boy or Head Girl. Write the **speech** (about 240 words) you will give at a farewell function for Mrs Gumbo, a Mathematics teacher retiring after 30 years at your school in Kadoma. Use these notes:\n\n- taught generations, including some current parents\n- started the Maths Olympiad club; school won provincial title twice\n- known for patience and her saying \"mistakes are lessons\"\n- gift from learners: a framed photograph and a hamper\n- wishes for her retirement",
    wordLimit: { min: 220, max: 260 },
    points: [
      ["Salutation in order of rank and a speech-like opening", 2],
      ["All five notes used and developed with specific detail", 5],
      ["Rhetorical devices and direct address used purposefully", 3],
      ["Warm, grateful tone suited to a farewell; a memorable ending with thanks", 3],
      ["Accurate spelling, grammar and punctuation", 3],
    ],
    levels: [
      [4, 13, 16, "Every note developed; warm, speech-like and memorable; accurate."],
      [3, 9, 12, "Most notes used; speech features present; generally accurate."],
      [2, 5, 8, "Notes missing or reads like an essay; frequent errors."],
      [1, 0, 4, "Little sense of a speech."],
    ],
    hints: ["Begin with the guests in order of rank.", "Use her saying as a thread through the speech."],
    modelAnswer: "**Model answer:**\n\nThe Head, Mr Dube; members of staff; parents and guardians; fellow learners; and, above all, our guest of honour today, Mrs Gumbo: good afternoon.\n\nThirty years. Think about that for a moment. When Mrs Gumbo first walked into Room 4, some of the parents sitting here today were Form 1 pupils struggling with fractions. Today their children are struggling with algebra in the same room, and Mrs Gumbo is still patiently explaining it.\n\nWhat makes a great teacher? For many of us, the answer is sitting in front of us. Mrs Gumbo started the Maths Olympiad club with six members and a borrowed blackboard. Under her guidance, our school has twice been crowned provincial champions, and the trophies in the Head's office carry her fingerprints as much as ours.\n\nBut it is not only the trophies we will remember. It is her patience. Every one of us has handed in a page full of red crosses, and every one of us has heard her say, \"Mistakes are lessons.\" Mrs Gumbo, you taught us that getting something wrong is the first step to getting it right.\n\nAs a small sign of our gratitude, the learners have prepared a framed photograph of this year's Olympiad club and a hamper. We hope the photograph reminds you of us, and that the hamper reminds you to rest!\n\nWe wish you a long, healthy and peaceful retirement, with time for your garden, your grandchildren and, perhaps, the occasional sum.\n\nThank you, Mrs Gumbo. Thank you all for listening.",
    explanation: "The model greets in order of rank, opens with a striking number, uses a rhetorical question, weaves in every note and her saying, and ends warmly with good wishes and thanks.",
  });
  b.ext({
    d: 3, skill: "CREATION", marks: 12, secs: 1400,
    stem: "Write a **campaign speech** (about 170 words) to your classmates explaining why they should elect you as class monitor. Give two promises and explain how you would keep them.",
    wordLimit: { min: 150, max: 180 },
    points: [
      ["Speech features: greeting, direct address and a closing appeal with thanks", 3],
      ["Two clear promises, each with a realistic way of keeping it", 4],
      ["Persuasive devices (rhetorical question, rule of three, inclusive we)", 2],
      ["Accurate language in a confident, friendly register", 3],
    ],
    hints: ["Make the promises realistic for a class monitor.", "End with a direct appeal for votes."],
    modelAnswer: "**Plan:** greeting (Fellow members of 3 Blue); hook: a rhetorical question about the noisy classroom; promise 1: a fair rota for sweeping, posted on the wall and checked each Friday; promise 2: a suggestion box and weekly reports to the class teacher; personal qualities (reliable, fair, approachable); appeal: vote for me on Friday; thanks.\n\n**Opening:** Fellow members of 3 Blue, good morning. How many times this term have we arrived to find the classroom unswept and the board still full of yesterday's notes? I am standing for class monitor because I believe that, together, we can make 3 Blue the tidiest, fairest and most organised class in the school.",
    explanation: "A campaign speech is persuasive: it speaks directly to voters, makes realistic promises with methods, and ends with a clear appeal.",
  });
  b.ext({
    d: 4, skill: "CREATION", marks: 16, secs: 1900,
    stem: "Your village has had several cases of cholera after people drew water from an unprotected well. As a member of the Junior Health Club, write a **speech** (about 240 words) to be delivered at a community meeting at the local business centre, explaining the dangers and urging people to take three precautions.",
    wordLimit: { min: 220, max: 260 },
    points: [
      ["Appropriate salutation for a community audience (village head, councillor, elders, residents)", 2],
      ["The danger explained simply and accurately, without invented statistics", 3],
      ["Three precautions, each explained clearly", 4],
      ["Respectful, urgent tone with persuasive devices and a call to action", 4],
      ["Accurate language", 3],
    ],
    levels: [
      [4, 13, 16, "Clear, respectful and urgent; three well-explained precautions; accurate."],
      [3, 9, 12, "Mostly clear and appropriate; precautions present but less developed."],
      [2, 5, 8, "Tone or content weak; precautions unclear; frequent errors."],
      [1, 0, 4, "Little relevant content."],
    ],
    hints: ["Elders are in the audience: be respectful.", "Precautions could include boiling or treating water, handwashing and using the protected borehole."],
    modelAnswer: "**Plan:**\n- Salutation: Sabhuku Mhike, Councillor Ndlovu, our elders, mothers and fathers, fellow young people.\n- Opening: the sadness of recent cases; nobody wants another family to suffer.\n- The danger: cholera spreads through water and food contaminated by germs from human waste; it causes severe diarrhoea and can kill quickly, especially children and the elderly.\n- Precaution 1: draw drinking water from the protected borehole, not the old well.\n- Precaution 2: boil or treat water with the tablets supplied by the clinic.\n- Precaution 3: wash hands with soap after using the toilet and before preparing food.\n- Appeal: rule of three (protect our children, our elders, our village); seek help at the clinic at the first signs; thanks.\n\n**Opening:** Sabhuku Mhike, Councillor Ndlovu, our respected elders, mothers and fathers, and fellow young people: good afternoon. In the past month, cholera has visited our village. We have sat at bedsides and some of us have attended funerals. Today, on behalf of the Junior Health Club, I want to speak about how we can make sure it never visits us again.",
    explanation: "A community awareness speech balances respect for elders with urgency: accurate, simple explanation, three clear precautions and a strong call to action.",
  });

  b.card("DEFINITION", "Speech", "A text written to be spoken to an audience on an occasion, using direct address and features that help listeners follow it.");
  b.card("CONCEPT", "Speech structure", "Salutation in order of rank → attention-grabbing opening → purpose → signposted points → conclusion/appeal → Thank you for listening.");
  b.card("DEFINITION", "Rhetorical question", "A question asked for effect, not for an answer, to make listeners think.");
  b.card("DEFINITION", "Rule of three", "Grouping three words or phrases for rhythm and emphasis: clean, safe and welcoming.");
  b.card("DEFINITION", "Signposting", "Words that guide listeners through a speech: First…, This brings me to…, Finally…");
  b.card("CONCEPT", "Why use inclusive pronouns (we, us, our)?", "They unite the speaker and audience and make an appeal feel shared.");
  b.card("CONCEPT", "Common speech error", "Writing an essay with a greeting on top: the audience is never addressed again.");
  b.card("VOCABULARY", "Speech closing phrases", "Let us all…; I urge each one of you to…; Thank you for listening.");
});
