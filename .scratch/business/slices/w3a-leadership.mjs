// W3a: leadership.
import { concept, P } from "../lib.mjs";

concept("bus.people.leadership", { file: "people/leadership", keyPrefix: "people.leadership" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "In which leadership style does the leader make all decisions alone and give orders?",
    options: [
      ["Autocratic", "Correct: the autocratic leader decides alone."],
      ["Democratic", "A democratic leader involves employees."],
      ["Laissez-faire", "A laissez-faire leader leaves decisions to employees."],
      ["Delegated", "This is not one of the three leadership styles."],
    ],
    answer: "A",
    explanation: "An **autocratic** leader decides alone and communicates mainly one-way, from the top down.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which is a feature of democratic leadership?",
    options: [
      ["Employees are consulted before decisions are made", "Correct: involvement in decisions is the key feature."],
      ["The leader gives orders without explanation", "That is autocratic leadership."],
      ["Employees decide everything with no objectives set", "Even laissez-faire leaders set objectives."],
      ["Decisions are made quickly by one person", "Democratic decisions take longer."],
    ],
    answer: "A",
    explanation: "A **democratic** leader shares information and takes employees' views into account.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "A mine manager must evacuate workers immediately after a gas leak. Which leadership style is most suitable?",
    options: [
      ["Autocratic", "Correct: in an emergency clear orders are needed at once."],
      ["Democratic", "There is no time to consult."],
      ["Laissez-faire", "Leaving workers to decide would be dangerous."],
      ["A mix of democratic and laissez-faire", "Both involve delay or lack of direction."],
    ],
    answer: "A",
    explanation: "In an emergency there is no time for discussion; safety depends on clear, immediate orders.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "A software business employs five highly skilled programmers who enjoy solving problems in their own way. Which leadership style is most suitable?",
    options: [
      ["Laissez-faire", "Correct: skilled, self-motivated staff work well with freedom."],
      ["Autocratic", "Strict orders would frustrate creative experts."],
      ["Democratic, with a vote on every task", "Voting on every task wastes the experts' time."],
      ["Close supervision by a team leader", "Close supervision suits unskilled staff, not experts."],
    ],
    answer: "A",
    explanation: "**Laissez-faire** suits skilled, creative and self-motivated employees.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which is a disadvantage of democratic leadership?",
    options: [
      ["Decisions can take a long time", "Correct: consulting employees is slow."],
      ["Employees feel their ideas are ignored", "That is a problem of autocratic leadership."],
      ["Workers lack any objectives", "Democratic leaders do set objectives."],
      ["Communication is only one-way", "Democratic communication is two-way."],
    ],
    answer: "A",
    explanation: "Consultation improves motivation but slows decision-making.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why might a democratic style help a business introduce a major change, such as new machinery?",
    options: [
      ["Employees who are consulted are more likely to accept the change", "Correct: involvement reduces resistance."],
      ["The change can be introduced without any discussion or consultation", "Discussion is the basis of democratic leadership."],
      ["Employees will not need any training", "Training is still needed for new machinery."],
      ["Decisions will be made faster than by one person", "Democratic decisions are usually slower."],
    ],
    answer: "A",
    hints: ["How do people react to a change they helped to plan?"],
    explanation: "Employees who help shape a change understand it and are less likely to resist it.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A newly opened factory employs mostly young workers on their first jobs. Which risk is greatest if the manager uses laissez-faire leadership?",
    options: [
      ["Workers lack direction and make costly mistakes", "Correct: inexperienced staff need guidance."],
      ["Workers become too dependent on the manager", "Laissez-faire gives workers independence."],
      ["Decisions are made too quickly", "Speed is not the main risk here."],
      ["Workers have too little freedom", "Laissez-faire gives a great deal of freedom."],
    ],
    hints: ["Do new workers know how to organise their own work?"],
    answer: "A",
    explanation: "Inexperienced workers need guidance; leaving them to decide risks poor quality and waste.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "A good leader needs to be able to communicate clearly.",
    answer: true,
    explanation: "True. Clear communication means objectives and instructions are understood.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Democratic leadership is the best style in every situation.",
    answer: false,
    explanation: "False. In emergencies or with untrained staff autocratic leadership may be better; with experts, laissez-faire may suit.",
  });
  b.match({
    d: 2, skill: "APPLICATION",
    stem: "Match each situation with the most suitable leadership style.",
    right: ["Autocratic", "Democratic", "Laissez-faire"],
    pairs: [
      "A security company training new guards in strict procedures",
      "A school deciding how to share new laboratory equipment among experienced teachers",
      "An architect's office with experienced, creative designers",
      "A factory where a machine has caught fire",
    ],
    rightIndex: [0, 1, 2, 0],
    explanation: "Strict procedures and emergencies need autocratic leadership; experienced staff deciding together suits democratic; creative experts suit laissez-faire.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentence.",
    template: "A leader who sets broad objectives and leaves employees to decide how to achieve them uses a {{blank:a}} style.",
    blanks: [{ id: "a", accepted: ["laissez-faire"], choices: ["laissez-faire", "autocratic", "democratic"] }],
    explanation: "Laissez-faire means \"let them do\".",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the leadership style in which communication is mainly one-way, from the leader to employees.",
    accepted: ["autocratic", "autocratic leadership", "autocratic style", "authoritarian"],
    wrong: ["democratic"],
    explanation: "**Autocratic** leaders give orders downwards with little feedback.",
  });
  b.manualShort({
    d: 2, marks: 2, skill: "RECALL",
    stem: "State **two** qualities of a good leader.",
    points: [
      "Any one quality, e.g. good communicator / decisive / honest / confident.",
      "A second quality, e.g. knowledgeable / able to motivate / fair / willing to take risks.",
    ],
    modelAnswer: "A good leader communicates clearly and is honest.",
    explanation: "Qualities include vision, decisiveness, communication, confidence, honesty, knowledge, motivation and fairness.",
  });
  b.manualShort({
    d: 3, marks: 4, skill: "ANALYSIS",
    stem: "Explain **one** advantage and **one** disadvantage of autocratic leadership for a business.",
    points: [
      "Advantage: quick decisions / clear instructions.",
      "Explained: useful in emergencies or with unskilled staff, so fewer mistakes.",
      "Disadvantage: employees not consulted / feel undervalued.",
      "Explained: motivation falls / labour turnover rises / ideas lost.",
    ],
    hints: ["Think about speed and about how workers feel."],
    modelAnswer: "Autocratic leadership gives quick decisions and clear instructions, which is useful in an emergency or with unskilled workers. However, employees are not consulted, so they may feel undervalued, become less motivated and leave.",
    explanation: "Speed and clarity versus motivation.",
  });
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: 840,
    stem: "Farai owns a hotel in Victoria Falls with 35 employees. He makes every decision himself, from menus to room prices, and rarely talks to staff except to give orders. Staff turnover is high, and several employees say they have ideas to attract more tourists but nobody asks them.",
    parts: [
      P.short({
        label: "(a)", marks: 1,
        stem: "Name Farai's leadership style.",
        accepted: ["autocratic", "autocratic leadership", "autocratic style", "authoritarian"],
        wrong: ["democratic"],
      }),
      P.mcq({
        label: "(b)", marks: 1,
        stem: "Which evidence in the case suggests his style is demotivating staff?",
        options: [["High staff turnover", "Correct: people leave when they feel undervalued."], ["He sets menus", "Setting menus is part of running a hotel."], ["The hotel has 35 employees", "Size says nothing about motivation."], ["Tourists visit the hotel", "Customers are not evidence of staff motivation."]],
        answer: "A",
      }),
      P.manual({
        label: "(c)", marks: 4,
        stem: "Explain **two** benefits Farai could gain from a democratic style.",
        points: [
          "Staff ideas used, e.g. ways to attract tourists.",
          "Better decisions / more customers / higher revenue.",
          "Staff feel valued / motivated.",
          "Lower staff turnover / lower recruitment and training costs / better service.",
        ],
        modelAnswer: "By consulting staff Farai could use their ideas for attracting tourists, leading to better decisions and more bookings. Staff would feel valued, so they would be more motivated and less likely to leave, cutting recruitment and training costs.",
      }),
      P.manual({
        label: "(d)", marks: 6,
        stem: "Recommend whether Farai should change to a democratic style. Justify your answer.",
        points: [
          "For: high turnover suggests demotivation; consultation may reduce it.",
          "For: staff have ideas for marketing; hotel staff meet tourists daily.",
          "Against: decisions slower; some decisions (e.g. safety, prices) may need Farai alone.",
          "Against: Farai may find it hard to change; staff need information to contribute.",
          "Possible mix: democratic for service ideas, autocratic for safety / urgent decisions.",
          "Justified recommendation.",
        ],
        modelAnswer: "High staff turnover and unused ideas suggest Farai's autocratic style is hurting the hotel. Staff meet tourists every day, so their ideas could raise bookings, and consulting them would make them feel valued and stay longer. Democratic decisions are slower, and some matters, such as safety rules or an urgent problem, still need Farai to decide quickly. He should adopt a mainly democratic style, with regular staff meetings on service and marketing, while keeping control of urgent and safety decisions.",
      }),
    ],
    hints: ["(b) Which fact shows staff are unhappy?", "(d) A leader can use different styles for different decisions."],
    explanation: "Farai is autocratic. A mainly democratic style would use staff ideas and cut turnover, with autocratic decisions kept for emergencies.",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, secs: 900,
    stem: "Nyasha has been promoted to manage the assembly section of a solar-panel factory in Harare. The section has 12 experienced workers who have met their targets for two years, and 6 trainees who started last month. The factory must soon change to a new panel design.",
    parts: [
      P.manual({
        label: "(a)", marks: 2,
        stem: "Define **laissez-faire leadership**.",
        points: ["Leader sets broad objectives / gives little direction.", "Employees make most decisions about how to work."],
      }),
      P.manual({
        label: "(b)", marks: 4,
        stem: "Explain **two** qualities Nyasha needs as a new leader.",
        points: [
          "Quality 1, e.g. good communication.",
          "Explained in context, e.g. so trainees and experienced staff understand the new design.",
          "Quality 2, e.g. knowledge of the work / fairness / ability to motivate.",
          "Explained in context, e.g. earns respect of experienced workers.",
        ],
        modelAnswer: "Nyasha needs good communication so that both the trainees and the experienced workers understand the new panel design and their targets. She also needs knowledge of the assembly work, so the experienced workers respect her and she can solve problems.",
      }),
      P.manual({
        label: "(c)", marks: 6,
        stem: "Evaluate which leadership style Nyasha should use with her section.",
        points: [
          "Experienced workers: democratic or laissez-faire suits; they meet targets.",
          "Democratic helps the experienced workers accept the new design.",
          "Trainees: need more direction; autocratic or close guidance.",
          "Laissez-faire for everyone risks trainee mistakes.",
          "Mixed approach: different styles for different groups / situations.",
          "Justified conclusion.",
        ],
        modelAnswer: "The 12 experienced workers have met targets for two years, so a democratic style suits them: consulting them about the new design will use their knowledge and help them accept the change. Laissez-faire might work for them too, but not during a major change. The 6 trainees are new and need clear instructions, so a more autocratic approach with close guidance suits them until they are skilled. Nyasha should therefore use a mainly democratic style, asking experienced workers to help plan the change and perhaps to mentor the trainees, while giving the trainees firm direction.",
      }),
    ],
    hints: ["(c) Consider the two groups of workers separately.", "(c) What does the design change require?"],
    explanation: "The best style depends on the employees and the situation; a mixed approach can be justified.",
  });
  b.card("DEFINITION", "What is **leadership**?", "Influencing, guiding and inspiring others to work willingly towards the business's objectives.");
  b.card("DEFINITION", "What is **autocratic leadership**?", "The leader makes decisions alone and gives orders; communication is one-way.");
  b.card("DEFINITION", "What is **democratic leadership**?", "The leader involves employees in decisions; communication is two-way.");
  b.card("DEFINITION", "What is **laissez-faire leadership**?", "The leader sets broad objectives and leaves employees to make most decisions.");
  b.card("CONCEPT", "When is autocratic leadership suitable?", "Emergencies, unskilled or new staff, safety-critical tasks, when quick decisions are needed.");
  b.card("CONCEPT", "When is laissez-faire leadership suitable?", "Highly skilled, creative, self-motivated employees (e.g. designers, researchers).");
  b.card("FACT", "Five qualities of a good leader?", "Vision and decisiveness, communication, confidence, honesty, knowledge, ability to motivate, fairness.");
  b.card("CONCEPT", "How to choose a leadership style?", "Consider the employees' skill and motivation, the task, the time available and the situation (crisis or change).");
});
