// W3a: communication.channels-barriers
import { concept, P } from "../lib.mjs";
import { mc, pmc } from "../tables/w3a-lib.mjs";

concept("abus.communication.channels-barriers", { file: "communication/channels-barriers", keyPrefix: "communication.channels-barriers" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Which type of communication flows **between departments at the same level** of a business?",
    ok: ["Horizontal communication between peers", "Correct: it passes between people or departments of equal rank."],
    bad: [["Downward vertical communication from managers", "This passes from managers to subordinates."], ["Upward vertical communication from workers", "This passes from workers to managers."], ["One-way communication to customers", "This describes a message to outsiders with no reply."]],
    explanation: "Horizontal (lateral) communication links people at the same level, such as the production and sales managers.",
  });
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Which of the following is an example of **informal** communication?",
    ok: ["Colleagues discussing a rumour at lunch", "Correct: it passes outside the official channels."],
    bad: [["A written warning to an employee about lateness", "A written warning follows official procedure."], ["The minutes of the annual board meeting", "Minutes are a formal record."], ["A memo from the manager to all the staff", "A memo is an official written message."]],
    explanation: "Informal communication (the grapevine) passes through personal contact, not the official lines of authority.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What is the main feature of **two-way** communication?",
    ok: ["The receiver sends feedback back to the original sender", "Correct: feedback is what makes it two-way."],
    bad: [["The message goes to exactly two receivers only", "The number of receivers does not matter."], ["It is always written and always formal in style", "It can be spoken and informal."], ["It is sent by two different managers in turn", "The number of senders is not the test."]],
    explanation: "Two-way communication includes a reply, so the sender can check understanding.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING",
    stem: "A fictional factory in Gweru has seven levels of management. Which problem is MOST likely to result from the long chain of command?",
    ok: ["Messages are slow and may be changed on the way", "Correct: each level can filter or distort the message."],
    bad: [["Messages travel faster than in a flat structure", "Each extra level adds delay."], ["Every worker speaks directly to the owner", "A long chain separates workers from the owner."], ["Feedback is always instant and complete", "Feedback travels back through every level."]],
    explanation: "A long chain adds delay, filtering and distortion.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A manager sends a ten-page technical report to shop assistants. Which barrier to communication is MOST likely?",
    ok: ["Jargon and information overload", "Correct: the language and the volume are unsuited to the receivers."],
    bad: [["Excellent feedback from the staff", "Feedback is not a barrier."], ["Perfect timing and a short message", "The report is long and technical."], ["A very short chain of command", "The chain is not the issue here."]],
    explanation: "Technical language and a large amount of information make the message hard to understand.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "Workers at a fictional quarry in Masvingo hear a rumour that wages will be cut, although management has said nothing. Which action BEST reduces the damage of the rumour?",
    ok: ["Hold a meeting to give the facts and take questions", "Correct: accurate, two-way information replaces the rumour."],
    bad: [["Punish the workers who repeated the rumour in public", "This increases mistrust and does not supply the facts."], ["Ignore it, because the grapevine cannot matter at all", "Ignoring it lets the rumour spread."], ["Send a one-line text and refuse to take any questions", "One-way communication leaves doubts unanswered."]],
    hints: ["Which action supplies facts and allows feedback?"],
    explanation: "The grapevine is best met with timely, accurate, two-way communication.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "A fictional bus company in Mutare sends route changes by a notice on the head-office board. Drivers work in depots 150 km away. Which change would BEST improve communication?",
    ok: ["Message the group, then confirm by phone", "Correct: it reaches distant depots and checks understanding."],
    bad: [["Add more notices to the board at the head office", "Distant drivers still cannot see them."], ["Wait for the drivers to ask about route changes", "This is slow and leaves errors."], ["Use longer and more technical wording in each notice", "This makes understanding harder."]],
    hints: ["Think of distance and of feedback."],
    explanation: "A message the drivers can receive, with a check on understanding, deals with distance and the lack of feedback.",
  });
  mc(b, {
    d: 4, skill: "EVALUATION",
    stem: "A manager of a fictional 12-person tuck shop wants to spend two hours a week on staff meetings to improve communication. Which statement is the BEST evaluation?",
    ok: ["The gain may be small in so small a team, so the cost needs weighing", "Correct: in a small firm informal talk may be enough."],
    bad: [["Meetings are always worth their cost in every business", "The value depends on the size and the problem."], ["Meetings cannot improve communication in any firm", "They give two-way contact and can help."], ["Cost is irrelevant when communication is involved", "Time and cost matter to every decision."]],
    hints: ["Look for the answer that links the benefit to the size of the firm."],
    explanation: "A judgement should weigh the benefit against the cost for this business.",
  });

  b.tf({
    d: 2, skill: "RECALL", daily: true,
    stem: "Downward communication passes from managers to subordinates.",
    answer: true,
    explanation: "True. Instructions, targets and policies flow down the hierarchy.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A manager can remove the grapevine completely by banning informal conversation.",
    answer: false,
    explanation: "False. Informal communication arises from human contact and cannot be banned; managers reduce rumour by giving accurate, timely information.",
  });

  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each barrier to the example.",
    pairs: [["Language barrier", "Staff who speak Shona receive instructions only in technical English"], ["Information overload", "A supervisor receives 60 emails a day and misses the safety notice"], ["Technology failure", "The mobile network is down, so branches cannot be reached"], ["Mistrust", "Workers doubt every announcement because of earlier broken promises"]],
    explanation: "Each barrier prevents the message being sent, received or believed.",
  });

  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Choose the correct word for each gap.",
    template: "Communication between a manager and a worker is {{blank:a}} communication, while communication between two department heads is {{blank:b}} communication.",
    blanks: [
      { id: "a", accepted: ["vertical"], choices: ["vertical", "horizontal", "informal"] },
      { id: "b", accepted: ["horizontal"], choices: ["vertical", "horizontal", "external"] },
    ],
    explanation: "Vertical communication runs up and down the hierarchy; horizontal communication runs between people at the same level.",
  });

  b.short({
    d: 1, skill: "RECALL",
    stem: "State the term for informal communication passing between employees outside the official channels.",
    accepted: ["the grapevine", "grapevine", "informal communication", "the rumour mill"],
    explanation: "The grapevine is the informal network by which news and rumour pass.",
  });
  b.short({
    d: 2, skill: "UNDERSTANDING",
    stem: "State **one** barrier to communication that is caused by a worker's fear of speaking to a senior manager.",
    accepted: ["status", "fear of status", "status barrier", "culture", "attitudes", "fear", "mistrust", "hierarchy"],
    keywords: { any: ["status", "fear", "culture", "hierarch", "attitude", "intimidat"], minAny: 1 },
    explanation: "Differences in status or culture, and the attitudes that follow from them, stop workers passing on information or problems.",
  });

  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain **one** disadvantage of a long chain of command for communication in a business.",
    points: ["Messages pass through many people", "Each person may filter or change the message, so it is distorted", "Decisions are slow and managers at the top may lack accurate information"],
    modelAnswer: "In a long chain of command a message passes through many people. Each may leave out or change some detail, so the message is distorted, and decisions are slow because information takes a long time to travel.",
    hints: ["Think of each level in the hierarchy."],
    explanation: "A disadvantage developed to a consequence.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 4,
    stem: "A fictional clothing factory in Bulawayo has staff who speak different home languages, and the supervisor gives instructions only in English. Explain **two** ways in which this barrier could harm the business.",
    points: ["Some workers may not understand the instruction", "Application: they could sew a garment wrongly, wasting cloth", "Staff may feel excluded and less motivated", "Application: morale falls, causing lower output or higher labour turnover"],
    modelAnswer: "Some workers may not understand an instruction given only in English, so they might sew a garment wrongly and waste cloth. Staff may also feel excluded, which lowers morale and could reduce output or raise labour turnover.",
    hints: ["Link the barrier to waste and to motivation."],
    explanation: "Two effects, each applied to the factory.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Analyse how two-way communication could improve the efficiency of a fictional bakery in Harare when it introduces a new oven.",
    points: ["Workers can ask questions about the new oven", "Mistakes in using it are reduced", "Staff can pass on problems or ideas to managers", "So less wasted bread, less downtime and faster output"],
    modelAnswer: "With two-way communication bakers can ask questions about the new oven, so fewer mistakes are made in using it. They can also report problems and suggest improvements to management. This reduces wasted bread and downtime and speeds up output, improving efficiency.",
    hints: ["Link feedback to mistakes and then to output."],
    explanation: "A chain from feedback to efficiency.",
  });
  b.manualShort({
    d: 5, skill: "EVALUATION", marks: 6,
    stem: "A fictional chain of six hardware shops in Zimbabwe plans to spend US\\$20,000 on a new communications system and weekly briefings. Evaluate whether this is a good decision.",
    points: ["Benefit: fewer errors and clearer instructions across the six shops", "Benefit: faster decisions and better coordination of stock and prices", "Benefit: staff feel informed and more motivated", "Cost: US\\$20,000 and management time each week", "Cost may not be recovered if the problems are small or lie elsewhere", "Judgement with a reason or condition, e.g. worthwhile if mistakes are currently frequent and costly"],
    modelAnswer: "A new system and weekly briefings should reduce errors and give clearer instructions across the six shops, speed up decisions and keep staff better informed and motivated. However, US\\$20,000 and weekly management time are significant, and the benefit is small if the existing problems are minor or lie elsewhere. The decision is worthwhile if errors are frequent and costly; otherwise a cheaper step, such as regular phone briefings, may be enough.",
    hints: ["Weigh the benefits against the cost, then give a judgement with a condition."],
    explanation: "A balanced judgement in context.",
  });

  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true,
    stem: "Read the extract. Tatenda Textiles is a fictional clothing firm in Gweru. The owner sends all instructions by a written notice on the factory wall. Workers have no way to reply. Last month a notice changed the length of a school uniform, but a third of the workers did not see it, and 400 uniforms had to be re-cut.",
    parts: [
      P.short({ label: "(a)", marks: 1, stem: "State the type of communication used by the owner (one-way or two-way).", accepted: ["one-way", "one way", "one-way communication"], explanation: "The notice gives no planned feedback, so it is one-way." }),
      P.manual({ label: "(b)", marks: 2, stem: "Identify **two** barriers to communication shown in the extract.", points: ["The method reaches only those who see the notice (poor medium)", "No feedback, so misunderstanding was not found"], modelAnswer: "A notice reaches only those who see it, and workers have no way to reply, so misunderstanding is not found.", explanation: "Poor choice of medium and no feedback." }),
      P.manual({ label: "(c)", marks: 3, stem: "Explain **one** way in which the owner could improve communication.", points: ["Hold a short daily team briefing or use group messages", "Workers can ask questions and confirm understanding", "So fewer mistakes and less re-cutting of cloth"], modelAnswer: "The owner could hold a short team briefing each morning. Workers could ask questions and confirm what they have heard, so fewer uniforms would have to be re-cut.", explanation: "A suitable two-way improvement developed to a result." }),
    ],
    hints: ["Think about feedback and about who saw the notice."],
    explanation: "One-way; poor medium and no feedback; a briefing gives two-way contact.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: "Read the extract. A fictional courier company, Zambezi Express, has a head office in Harare and depots in Mutare, Bulawayo and Victoria Falls. Decisions are made by head office and passed through depot managers and supervisors to drivers. Drivers say they hear about route changes late, and depot managers say head office ignores their suggestions. A rumour that the Victoria Falls depot will close has spread among staff.",
    parts: [
      P.manual({ label: "(a)", marks: 3, stem: "Explain **one** problem caused by the long route that messages take from head office to drivers.", points: ["Messages pass through several people", "Each may delay or change the message", "Drivers receive route changes late or in the wrong form"], modelAnswer: "Messages pass through depot managers and supervisors before reaching drivers. Each may delay or change the message, so drivers hear of route changes late or in a different form.", explanation: "Delay and distortion on a long chain." }),
      P.manual({ label: "(b)", marks: 3, stem: "Analyse **one** way in which the rumour about Victoria Falls could affect the company.", points: ["Staff at Victoria Falls fear job loss", "They may work less hard or leave", "Service to customers falls or recruitment costs rise"], modelAnswer: "Staff at Victoria Falls fear losing their jobs, so they may work less hard or look for other jobs. Service to customers would fall and the company would face the cost of recruiting and training replacements.", explanation: "A chain from rumour to cost." }),
      P.manual({ label: "(c)", marks: 3, stem: "Recommend **one** change to improve upward communication and justify it.", points: ["A recommendation, such as regular depot visits or a suggestion system", "Managers' ideas reach head office directly", "Justification: decisions are better and managers feel valued"], modelAnswer: "Head office should hold a monthly video meeting with depot managers. Their ideas would reach head office directly, so decisions would be better informed and managers would feel valued and less likely to leave.", explanation: "An upward channel with a reason." }),
    ],
    hints: ["Look at the direction of each problem: down, up and informal."],
    explanation: "Delays on a long chain; the effect of rumour; an upward channel improves decisions.",
  });

  b.card("DEFINITION", "Communication channel", "The route along which a message passes between sender and receiver.");
  b.card("CONCEPT", "Vertical and horizontal communication", "Vertical flows up and down the hierarchy; horizontal flows between people or departments at the same level.");
  b.card("CONCEPT", "One-way and two-way", "One-way has no planned feedback; two-way includes a reply so understanding can be checked.");
  b.card("DEFINITION", "The grapevine", "Informal communication between people outside the official channels: fast, but it can carry rumour.");
  b.card("FACT", "Barriers to communication", "Language and jargon, noise, distance, overload, technology failure, attitudes and mistrust, culture and status, poor timing.");
  b.card("CONCEPT", "Problems of a long chain", "Messages are slow and may be filtered or distorted at each level.");
  b.card("FACT", "How management can improve communication", "Choose a suitable method, use plain language, seek feedback, shorten the chain, train staff and build trust.");
  b.card("CONCEPT", "Managing the grapevine", "It cannot be banned; give accurate, timely information so that rumours have less room.");
  b.card("CONCEPT", "Evaluating better communication", "Higher efficiency and morale against cost and management time; judge for the size and problem of the business.");
});
