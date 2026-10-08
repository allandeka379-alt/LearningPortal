// Slice EVO: talks, speeches and debates.
import { concept } from "../lib.mjs";

concept("eng.oral.speeches-debates", { file: "oral/speeches-debates", keyPrefix: "oral.speeches-debates" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "In a formal debate, what does the **proposition** do?",
    options: [
      ["argues for the motion", "Correct: the proposition (proposers) support the motion."],
      ["argues against the motion", "That is the opposition."],
      ["keeps time and introduces speakers", "That is the chairperson."],
      ["decides which side has won", "That is the judges or the audience vote."],
    ],
    answer: "A",
    explanation: "**Proposition** = for the motion; **opposition** = against; the **chairperson** runs the debate.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is a **rebuttal** in a debate?",
    options: [
      ["answering and challenging the other side's points", "Correct: rebuttal responds to the opponents' arguments."],
      ["the formal greeting given to the audience at the start", "That is the salutation."],
      ["a vote taken at the end of the debate", "Voting is not rebuttal."],
      ["the statement that is being debated", "That is the motion."],
    ],
    answer: "A",
    explanation: "**Rebuttal** = responding to and challenging the arguments of the other side.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which is the best order for the parts of a speech?",
    options: [
      ["salutation, opening, body, conclusion", "Correct: greet, grab attention and state purpose, develop points, then sum up."],
      ["opening, body, salutation, conclusion", "The salutation comes first, before anything else."],
      ["body, salutation, conclusion, opening", "This would confuse the audience."],
      ["salutation, conclusion, opening, body", "The conclusion comes at the end."],
    ],
    answer: "A",
    explanation: "A speech: **salutation → opening (hook + purpose) → body (supported points) → conclusion (summary + memorable ending)**.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "Which salutation is correct for a speech at prize-giving where the Guest of Honour is present?",
    options: [
      ["The Guest of Honour, the Head, members of staff, parents and fellow pupils", "Correct: the most senior guest first, then in order of importance."],
      ["Fellow pupils, parents, members of staff, the Head and the Guest of Honour", "This reverses the order of importance."],
      ["Hi everyone, and especially our guest today, how is everybody doing", "This is too informal for prize-giving."],
      ["Members of staff, the Guest of Honour, fellow pupils, parents, the Head", "The order is muddled; start with the most senior person."],
    ],
    answer: "A",
    explanation: "Greet the audience **in order of importance**, beginning with the most senior person present.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "*\"We need clean water, safe roads and good schools.\"* Which device does the speaker use?",
    options: [
      ["the rule of three", "Correct: three items in a list make the point memorable."],
      ["a rhetorical question", "There is no question."],
      ["onomatopoeia", "No word imitates a sound."],
      ["a euphemism", "Nothing unpleasant is being softened."],
    ],
    answer: "A",
    explanation: "The **rule of three** groups ideas in threes for rhythm and impact.",
  });
  b.mcq({
    d: 3, skill: "EVALUATION",
    stem: "Your opponent says: *\"School uniforms are too expensive for many families.\"* Which rebuttal is the **most effective**?",
    options: [
      ["Uniforms can be bought second-hand, and they cost less than buying fashionable clothes.", "Correct: it answers the actual point with reasons."],
      ["My opponent obviously comes from a family that cannot manage its money very well.", "This attacks the person, not the argument."],
      ["I don't care about that. Uniforms look smart, and that's all there is to it, really.", "It ignores the opponent's point and gives no reason."],
      ["That is completely wrong and everyone in this hall knows it, so I won't answer it.", "It gives no evidence or reason at all."],
    ],
    answer: "A",
    hints: ["A good rebuttal answers the opponent's actual point with a reason."],
    explanation: "Effective rebuttal **responds to the point made**, gives reasons or evidence, and attacks the argument, never the person.",
  });
  b.mcq({
    d: 3, skill: "EVALUATION",
    stem: "Which opening sentence would best grab the attention of Form 1 pupils in a talk about the school library?",
    options: [
      ["Did you know that our library has over two hundred adventure stories waiting for you?", "Correct: a question with direct address and an appealing detail suits young listeners."],
      ["The purpose of this address is to outline the regulations governing the library.", "Accurate but dull and too formal for new Form 1s."],
      ["I am going to talk about the library now, so please listen to what I say about it.", "It states the topic but does nothing to interest the audience."],
      ["Libraries were first built thousands of years ago in many different parts of the world.", "Not relevant to what the pupils need to know about their library."],
    ],
    answer: "A",
    hints: ["Think about the audience: young, new pupils."],
    explanation: "A good opening **hooks** the audience (question, surprising fact, story) and suits their age and interests.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "You are asked to speak for one minute, with no preparation, on *\"Should pupils use phones at school?\"* Which plan is most useful?",
    options: [
      ["Point, reason, example, point again", "Correct: a simple frame that gives a clear, supported answer."],
      ["Salutation, ten facts, a long story, thank-you", "Too much to deliver in one minute and not focused."],
      ["Speak until you think of something to say", "Without a frame you are likely to ramble."],
      ["Read out a written essay on the topic", "There is no preparation time, and reading aloud is not speaking."],
    ],
    answer: "A",
    hints: ["Impromptu speeches need a short, simple structure."],
    explanation: "For **impromptu** speaking: state your **point**, give a **reason**, add an **example**, and restate the **point**.",
  });
  b.fib({
    d: 2,
    stem: "Choose the discourse marker that fits each gap in this speech.",
    template: "{{blank:a}}, recycling reduces litter. {{blank:b}}, it can raise money for the school. {{blank:c}}, let us all start recycling today.",
    blanks: [
      { id: "a", accepted: ["Firstly"], choices: ["Firstly", "In conclusion", "However"] },
      { id: "b", accepted: ["Moreover"], choices: ["Moreover", "Firstly", "However"] },
      { id: "c", accepted: ["In conclusion"], choices: ["In conclusion", "Moreover", "For example"] },
    ],
    explanation: "*Firstly* introduces the first point, *Moreover* adds a point, *In conclusion* signals the ending.",
  });
  b.fib({
    d: 3, examStyle: true,
    stem: "Choose the best words to complete this opening of a debate speech.",
    template: "Madam {{blank:a}}, honourable judges, worthy {{blank:b}} and fellow pupils, I stand before you to {{blank:c}} the motion that *This house believes that every school should grow its own food*. My first point is {{blank:d}}.",
    blanks: [
      { id: "a", accepted: ["Chairperson"], choices: ["Chairperson", "Friend", "Opponent", "Teacher"] },
      { id: "b", accepted: ["opponents"], choices: ["opponents", "enemies", "losers", "strangers"] },
      { id: "c", accepted: ["support"], choices: ["support", "rebut", "chair", "judge"] },
      { id: "d", accepted: ["that gardens teach practical skills"], choices: ["that gardens teach practical skills", "that my opponents are lazy", "that I like vegetables", "nothing much really"] },
    ],
    hints: ["Who runs the debate?", "A proposer supports the motion; a point must be an argument, not an insult."],
    explanation: "Debate formula: *Madam **Chairperson**, honourable judges, worthy **opponents**…* The proposer **supports** the motion and gives a reasoned point.",
  });
  b.short({
    d: 2,
    stem: "In a debate, what is the statement being argued about called? Answer in **one word**.",
    accepted: ["motion", "the motion"],
    wrong: ["topic", "rebuttal"],
    explanation: "The **motion**, e.g. *This house believes that school uniforms should be abolished.*",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "In a speech, it is better to read every word from a full script than to use short cue cards.",
    answer: false,
    explanation: "False. Use short cue cards with key words so you can keep eye contact with the audience.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "In a debate, a good speaker criticises the opponents' arguments but not the opponents themselves.",
    answer: true,
    explanation: "True. Attack the **argument**, never the person.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each part of a debate with its description.",
    pairs: [["chairperson", "introduces the motion and keeps time"], ["opposition", "argues against the motion"], ["floor speakers", "members of the audience who add points"], ["summer-up", "answers the other side and summarises the case"], ["motion", "the statement being debated"]],
    explanation: "A formal debate: the chairperson runs it, main speakers argue, floor speakers contribute, summers-up conclude, then a vote.",
  });
  b.manualShort({
    d: 3, skill: "CREATION", marks: 4,
    stem: "Write the **opening** (4-6 sentences) of a speech to your school assembly encouraging pupils to keep the school grounds clean.",
    points: [
      "Begins with a suitable salutation in order of importance.",
      "Grabs attention (for example a question, a surprising observation or a short story).",
      "States the topic and purpose clearly.",
      "Uses direct address (you, we, all of us) in a register suitable for an assembly.",
    ],
    modelAnswer: "The Headmaster, members of staff and fellow pupils, good morning. How many of you stepped over a sweet wrapper on your way to assembly today? Our grounds were once the pride of the district, but litter is spoiling them. This morning I want to ask each of us to take one simple step to change that.",
    hints: ["Salutation, hook, purpose."],
    explanation: "A strong opening: a respectful **salutation**, a **hook**, and a clear **purpose**, addressed directly to the listeners.",
  });
  b.ext({
    d: 4, skill: "CREATION", marks: 10, examStyle: true, secs: 1200,
    stem: "You are the main speaker for the **opposition** in a debate on the motion: *This house believes that mobile phones should be banned in secondary schools.* Write your speech (200-250 words).",
    wordLimit: { min: 200, max: 250 },
    points: [
      ["Uses a correct debate salutation (chairperson, judges, opponents, audience).", 1],
      ["States clearly that the speaker opposes the motion.", 1],
      ["Gives at least two relevant arguments against a ban.", 2],
      ["Supports each argument with an explanation or example.", 2],
      ["Includes at least one rebuttal of a likely proposition point.", 1],
      ["Uses discourse markers and at least one persuasive device (rhetorical question, rule of three, direct address).", 1],
      ["Ends with a conclusion that urges the audience to vote against the motion and thanks them.", 1],
      ["Formal, accurate English suitable for a debate.", 1],
    ],
    modelAnswer: "Madam Chairperson, honourable judges, worthy opponents and fellow pupils, I stand before you to oppose the motion that mobile phones should be banned in secondary schools.\n\nFirstly, phones are powerful learning tools. With a phone, a pupil in a school with few textbooks can look up a definition, check a map or watch a short science demonstration. Why should we throw away a free library in our pockets?\n\nSecondly, phones keep us safe. Many of us travel long distances to school by kombi every day, and parents need to know that we have arrived or that we will be late.\n\nMy opponents will tell you that phones distract pupils in class. I agree that misuse is a problem. However, the answer is clear rules, not a ban: phones switched off in lessons, used only with a teacher's permission and confiscated if the rules are broken. We do not ban pens because some pupils write on desks.\n\nFinally, we are preparing for a world of work in which technology is everywhere. Schools should teach us to use phones responsibly, not pretend they do not exist.\n\nFor learning, for safety and for our future, I urge you to vote against this motion. I thank you.",
    hints: ["Plan: salutation, stance, two or three arguments with support, rebuttal, conclusion."],
    explanation: "A debate speech needs the debate salutation, a clear stance, supported arguments, rebuttal, persuasive devices and a closing appeal to vote.",
  });

  b.card("DEFINITION", "Motion", "The statement debated, e.g. This house believes that homework should be abolished.", undefined);
  b.card("DEFINITION", "Proposition vs opposition", "Proposition argue for the motion; opposition argue against it.", undefined);
  b.card("DEFINITION", "Rebuttal", "Answering and challenging the other side's points: attack the argument, not the person.", undefined);
  b.card("CONCEPT", "Structure of a speech", "Salutation → opening (hook + purpose) → body (2-4 supported points) → conclusion (summary + call to action / thanks).", undefined);
  b.card("FACT", "Salutation order", "Most senior first: Guest of Honour, Head, staff, parents, fellow pupils.", undefined);
  b.card("CONCEPT", "Persuasive devices in speeches", "Direct address, rhetorical questions, rule of three, repetition, discourse markers, relevant examples.", undefined);
  b.card("CONCEPT", "Impromptu speaking frame", "Point, reason, example, point again.", undefined);
  b.card("VOCABULARY", "Debate formulae", "Madam Chairperson, honourable judges, worthy opponents… / I stand before you to support (oppose) the motion… / I urge you to vote… I thank you.", undefined);
  b.card("CONCEPT", "Delivery", "Eye contact, clear pace and volume, pauses after key points, cue cards not a script, keep to time.", undefined);
});
