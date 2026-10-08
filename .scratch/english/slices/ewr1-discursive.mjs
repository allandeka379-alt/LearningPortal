// Slice EWR1: discursive writing.
import { concept } from "../lib.mjs";

concept("eng.composition.discursive", { file: "composition/discursive", keyPrefix: "composition.discursive" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is the main aim of a **discursive** composition?",
    options: [
      ["To explore several sides of an issue before reaching a judgement", "Correct: discursive writing weighs different viewpoints fairly."],
      ["To persuade the reader to accept one view and reject all others", "That is argumentative writing."],
      ["To tell an exciting story with a clear plot and a climax", "That is narrative writing."],
      ["To describe a place vividly using details from the five senses", "That is descriptive writing."],
    ],
    answer: "A",
    explanation: "A **discursive** composition discusses an issue from more than one side, in a balanced way, and ends with a reasoned conclusion.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which sentence uses **impersonal** language suitable for the body of a discursive composition?",
    options: [
      ["It is often argued that city life offers better job opportunities.", "Correct: the view is presented without the writer's I."],
      ["I think that city life is definitely much better for everyone.", "This states the writer's opinion with I and sounds one-sided."],
      ["You would be crazy to choose a village over a modern city.", "This is informal, rude and one-sided."],
      ["City life is the best and nobody can ever argue against it.", "This is an absolute claim that leaves no room for discussion."],
    ],
    answer: "A",
    explanation: "Phrases such as *It is often argued that…*, *Supporters claim…* and *Critics point out…* present views objectively. Save your own *I* for the conclusion.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "Which connective best **turns from one side to the other** in a discussion?",
    options: [
      ["On the other hand", "Correct: it signals a move to the opposing viewpoint."],
      ["Furthermore", "This adds another point on the same side."],
      ["For example", "This introduces an illustration, not a contrasting view."],
      ["As a result", "This shows a consequence, not a change of side."],
    ],
    answer: "A",
    explanation: "Contrast connectives (*On the other hand*, *However*, *Conversely*, *Critics point out that…*) signal the turn to the other side.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "True or false? The conclusion of a discursive composition is a good place to introduce a completely new argument.",
    answer: false,
    feedbackFalse: "Right: the conclusion weighs the arguments already presented; new arguments belong in the body.",
    explanation: "A **reasoned conclusion** grows out of the discussion. Bringing in a new point at the end leaves it undeveloped and unbalanced.",
  });
  b.mcq({
    d: 3, skill: "EVALUATION",
    stem: "Which is the **best conclusion** for *\"Discuss the advantages and disadvantages of boarding schools.\"*?",
    options: [
      ["On balance, boarding suits independent learners well, provided schools keep families closely involved.", "Correct: it weighs both sides and gives a qualified, reasoned judgement."],
      ["In conclusion, boarding schools have advantages and disadvantages, as this essay has shown.", "This only repeats the title and gives no judgement."],
      ["Boarding schools also have very good sports facilities and large dining halls.", "This introduces new points instead of concluding."],
      ["Anyone who sends a child to boarding school simply does not love them enough.", "This is extreme and unfair, the opposite of a balanced conclusion."],
    ],
    answer: "A",
    hints: ["A conclusion should give a judgement.", "Which judgement shows that both sides were weighed?"],
    explanation: "A strong discursive conclusion gives a **reasoned, often qualified** view (*provided that…*), showing that the writer has weighed both sides.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A learner's plan for *\"Is tourism good for Zimbabwe? Discuss.\"* has four paragraphs on the benefits of tourism and one sentence on its problems. What is the **main weakness**?",
    options: [
      ["It lacks balance, so it is really an argument.", "Correct: a discussion must develop both sides fairly."],
      ["It has too few paragraphs for an exam essay.", "Five sections can be enough; the problem is the balance."],
      ["It should not mention benefits at all.", "Benefits are one of the sides that must be discussed."],
      ["It ought to be written as a story instead.", "The title asks for a discussion, not a narrative."],
    ],
    answer: "A",
    hints: ["Count the developed points on each side."],
    explanation: "A token sentence for one side turns a discussion into a disguised argument. Plan at least two developed points on **each** side.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A composition discusses cost (both sides), then health (both sides), then culture (both sides). Which structure is this?",
    options: [
      ["Point-by-point", "Correct: each aspect is examined from both sides before moving on."],
      ["Block", "In a block structure all the points for one side come together, then all the points against."],
      ["Chronological", "The order is by aspect of the issue, not by time."],
      ["Zoom", "Zoom is a structure for description."],
    ],
    answer: "A",
    hints: ["Does each paragraph cover one side or one aspect?"],
    explanation: "**Block**: all *for*, then all *against*. **Point-by-point**: one aspect at a time, both sides in each. Point-by-point keeps the comparison sharp.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each phrase to its purpose in a discussion.",
    pairs: [
      ["Supporters of the plan claim that…", "introducing a view"],
      ["Conversely,", "turning to the other side"],
      ["Admittedly,", "conceding a point"],
      ["Weighing these arguments,", "concluding"],
    ],
    explanation: "Discursive writing uses signposts so the reader always knows which side and which stage of the discussion they are in.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which pair of points gives the **best balance** for *\"Should traditional ceremonies be preserved in modern Zimbabwe?\"*?",
    options: [
      ["For: they pass on identity and values. Against: some may clash with rights and cost families a lot.", "Correct: two serious, developed points, one on each side."],
      ["For: they are good for people. Against: some people do not really like them at all.", "Both points are vague and undeveloped."],
      ["For: they keep identity alive. Against: they keep identity alive for older people only.", "The second point barely differs from the first; there is no real opposing view."],
      ["For: they are colourful and loud. Against: they usually happen at the weekends.", "Neither point engages with whether ceremonies should be preserved."],
    ],
    answer: "A",
    hints: ["Look for two points that are specific, serious and genuinely opposed."],
    explanation: "Balanced discussion needs **specific, serious points on both sides**. Cultural identity versus concerns about rights and cost gives a genuine debate to weigh.",
  });
  b.ext({
    d: 2, skill: "CREATION", marks: 10, secs: 900,
    stem: "Write a balanced **introduction** (60-90 words) for *\"Should school holidays be shorter? Discuss.\"* Explain the issue and signal that there are two sides, without giving your own verdict.",
    wordLimit: { min: 60, max: 90 },
    points: [
      ["Introduces the issue and why it matters", 3],
      ["Signals that there are views on both sides", 3],
      ["Does not give a verdict", 2],
      ["Formal, impersonal tone; accurate language", 2],
    ],
    modelAnswer: "Every December, families across Zimbabwe welcome their children home for several weeks of rest, chores and visits to relatives. Recently, however, some educators have suggested that holidays should be shortened so that learners can cover more of the syllabus. The proposal has divided opinion. Supporters see more time for learning; opponents fear tired learners and lost family time. Both views raise important questions about how young people learn best.",
    explanation: "The model sets the scene, explains the proposal, shows both sides in one balanced sentence and leaves the verdict for the conclusion.",
  });
  b.ext({
    d: 3, skill: "CREATION", marks: 12, secs: 1200,
    stem: "Write **two balanced body paragraphs** (one for, one against, 140-180 words in total) for *\"Living in a city is better than living in a rural area. Discuss.\"*",
    wordLimit: { min: 140, max: 180 },
    points: [
      ["A developed point in favour of city life with an example", 3],
      ["A developed point in favour of rural life (or against city life) with an example", 3],
      ["The two paragraphs are of similar weight", 2],
      ["Impersonal language and a clear contrast connective between them", 2],
      ["Accurate language", 2],
    ],
    hints: ["Choose one strong idea for each side, e.g. services versus cost of living.", "Use a connective to turn between them."],
    modelAnswer: "Supporters of city life point first to access to services. In a city such as Bulawayo, hospitals, colleges and banks are close at hand, and a young person looking for work can visit many employers in a single day. A family with a sick child can reach a specialist within an hour rather than travelling for most of a day. Cities also offer a wider choice of schools and entertainment.\n\nOn the other hand, rural life offers advantages that are easy to overlook. Families who grow their own maize and vegetables spend far less on food, and housing costs are much lower than in town. Many people also value the close community of a village, where neighbours share work during the planting season and children grow up surrounded by relatives who know them well. The air is cleaner, and the pace of life is calmer.",
    explanation: "Each paragraph has a point, explanation and example of similar length, and *On the other hand* turns clearly between the two sides.",
  });
  b.essay({
    d: 4, skill: "CREATION", marks: 25, secs: 2700,
    stem: "Write a discursive composition (300-350 words): **\"Social media does young people more harm than good.\" Discuss.**",
    wordLimit: { min: 300, max: 350 },
    points: [
      ["An introduction that presents the issue without a verdict", 3],
      ["At least two developed points on the harmful side", 5],
      ["At least two developed points on the helpful side", 5],
      ["Clear structure and contrast connectives; impersonal tone in the body", 3],
      ["A reasoned conclusion that weighs both sides", 3],
      ["Accurate, varied language", 6],
    ],
    hints: ["Draw two columns: harm and good.", "Your conclusion can set conditions: when is it harmful, and when helpful?"],
    modelAnswer: "**Plan (block):** (1) Introduction: most young people now spend hours a day on social media; adults worry, young people defend it. (2) Harm: lost sleep and study time; comparison with others' 'perfect' lives harms self-esteem. (3) Harm: cyberbullying and the spread of false information. (4) Good: staying connected with family members who work far away; finding support groups. (5) Good: learning and opportunity, from tutorial videos to selling crafts online. (6) Conclusion: on balance the harm comes mainly from unlimited, unguided use; with time limits and teaching about safety, the benefits outweigh the dangers.\n\n**Opening paragraph:** On a kombi from Chitungwiza to town, almost every young passenger is looking down at a screen. Social media has become as ordinary a part of growing up as school uniform. To many parents and teachers, this is alarming; to many young people, it is simply how they learn, talk and relax. Whether it does more harm than good is a question worth examining from both sides.",
    explanation: "A good answer develops both harm and benefit and reaches a qualified judgement, here that the harm depends on how social media is used.",
  });

  b.card("DEFINITION", "Discursive writing", "Writing that explores an issue from several sides in a balanced way before reaching a reasoned judgement.");
  b.card("DEFINITION", "Balance", "Each side gets developed points and examples, not just a token sentence.");
  b.card("CONCEPT", "Block structure", "Introduction; all points for; all points against; conclusion.");
  b.card("CONCEPT", "Point-by-point structure", "Introduction; aspect 1 (both sides); aspect 2 (both sides); aspect 3; conclusion.");
  b.card("VOCABULARY", "Impersonal phrases for views", "It is often argued that…; Supporters claim…; Critics point out that…; Many people feel…");
  b.card("VOCABULARY", "Concluding phrases", "On balance…; Weighing these arguments…; In the final analysis…");
  b.card("CONCEPT", "Reasoned conclusion", "Weighs both sides already discussed and gives a judgement, often qualified (provided that…); no new arguments.");
  b.card("CONCEPT", "Discursive title clues", "Discuss; consider both sides; advantages and disadvantages; a blessing or a curse?");
  b.card("CONCEPT", "Planning a discussion", "Two columns, For and Against, with at least two developed points in each.");
});
