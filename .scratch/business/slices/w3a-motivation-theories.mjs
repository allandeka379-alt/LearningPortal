// W3a: why people work and motivation theories.
import { concept, P, BES } from "../lib.mjs";

concept("bus.people.motivation-theories", { file: "people/motivation-theories", keyPrefix: "people.motivation-theories" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which is the lowest level of Maslow's hierarchy of needs?",
    options: [
      ["Physiological needs", "Correct: food, water and shelter come first."],
      ["Safety needs", "Safety is the second level."],
      ["Social needs", "Social needs are the third level."],
      ["Esteem needs", "Esteem is the fourth level."],
    ],
    answer: "A",
    explanation: "From the bottom: physiological, safety, social, esteem, self-actualisation.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "According to Taylor, what mainly motivates workers?",
    options: [
      ["Money", "Correct: Taylor believed pay by results motivates."],
      ["Recognition", "Recognition is a Herzberg motivator."],
      ["Friendship at work", "Social needs are part of Maslow's theory."],
      ["Responsibility", "Responsibility is a Herzberg motivator."],
    ],
    answer: "A",
    explanation: "Taylor's **scientific management** assumed workers are motivated by money, so he recommended piece rate.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "In Herzberg's two-factor theory, which of these is a hygiene factor?",
    options: [
      ["Working conditions", "Correct: poor conditions cause dissatisfaction."],
      ["Recognition", "Recognition is a motivator."],
      ["Responsibility", "Responsibility is a motivator."],
      ["Achievement", "Achievement is a motivator."],
    ],
    answer: "A",
    explanation: "Hygiene factors include pay, conditions, rules, supervision and job security. They prevent dissatisfaction but do not motivate.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "A business gives its best salesperson the title \"Senior Sales Adviser\" and announces it at a staff meeting. Which level of Maslow's hierarchy does this meet?",
    options: [
      ["Esteem", "Correct: status and recognition meet esteem needs."],
      ["Safety", "Safety needs concern security and safe conditions."],
      ["Physiological", "Physiological needs are basic survival needs."],
      ["Social", "Social needs concern belonging to a group."],
    ],
    answer: "A",
    explanation: "A new title and public recognition give **status and respect**: esteem needs.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which is a likely result of a well-motivated workforce?",
    options: [
      ["Lower labour turnover", "Correct: motivated workers are less likely to leave."],
      ["Higher absenteeism", "Motivated workers are absent less often."],
      ["Lower productivity", "Motivated workers usually produce more."],
      ["More resistance to change", "Motivated workers accept change more readily."],
    ],
    answer: "A",
    explanation: "Motivation raises productivity and lowers absenteeism and labour turnover.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A factory gives all workers a pay rise, but productivity does not increase. Which theory best explains this?",
    options: [
      ["Herzberg's two-factor theory", "Correct: pay is a hygiene factor that does not motivate."],
      ["Taylor's scientific management", "Taylor would expect a pay rise to raise output only if linked to output."],
      ["Maslow's hierarchy, at self-actualisation", "Self-actualisation is not met by a general pay rise."],
      ["McGregor's Theory Y", "Theory Y is a manager's view of workers, not about pay."],
    ],
    answer: "A",
    hints: ["Which theory says pay prevents dissatisfaction but does not motivate?"],
    explanation: "Herzberg classed pay as a **hygiene factor**: it removes dissatisfaction but does not motivate workers to do more.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which job is least suited to Taylor's method of paying by output?",
    options: [
      ["A nurse in a hospital ward", "Correct: care cannot be counted as units of output."],
      ["A worker picking tea in the Eastern Highlands", "Kilograms picked are easily counted."],
      ["A machinist sewing school shirts", "Shirts sewn can be counted."],
      ["A worker packing bags of maize meal", "Bags packed can be counted."],
    ],
    answer: "A",
    hints: ["Can the output of the job be counted easily?"],
    explanation: "Taylor's approach needs measurable output; a nurse's work is about quality of care and cannot be measured in units.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Self-actualisation is the highest level of Maslow's hierarchy.",
    answer: true,
    explanation: "True. Self-actualisation, reaching one's full potential, is the top of the pyramid.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "According to Herzberg, good hygiene factors on their own will motivate workers to work harder.",
    answer: false,
    explanation: "False. Good hygiene factors only prevent dissatisfaction; motivators such as responsibility and recognition are needed to motivate.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each level of Maslow's hierarchy with a way a business could meet it.",
    pairs: [
      ["Physiological", "A wage high enough to buy food and pay rent"],
      ["Safety", "A permanent contract and protective clothing"],
      ["Social", "Working in a team with a shared break room"],
      ["Esteem", "An employee-of-the-month award"],
      ["Self-actualisation", "Challenging projects and paid study leave"],
    ],
    explanation: "Each level can be met by different actions of the business.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentence about Herzberg's theory.",
    template: "Pay and working conditions are {{blank:a}} factors, while recognition and responsibility are {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["hygiene"], choices: ["hygiene", "motivating"] },
      { id: "b", accepted: ["motivators"], choices: ["motivators", "hygiene factors"] },
    ],
    explanation: "Hygiene factors prevent dissatisfaction; motivators motivate.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the term for the rate at which employees leave a business and must be replaced.",
    accepted: ["labour turnover", "staff turnover", "employee turnover", "turnover of labour"],
    wrong: ["absenteeism"],
    explanation: "**Labour turnover** measures how quickly staff leave; motivated workforces have low turnover.",
  });
  b.mcq({
    d: 2, skill: "RECALL", applies: BES,
    stem: "According to McGregor, what does a Theory X manager believe about workers?",
    options: [
      ["They dislike work and must be closely supervised", "Correct: Theory X assumes workers avoid work."],
      ["They enjoy work and seek responsibility", "That is Theory Y."],
      ["They are motivated mainly by achievement", "That fits a Theory Y view."],
      ["They can direct themselves towards objectives", "That is Theory Y."],
    ],
    answer: "A",
    explanation: "A **Theory X** manager believes workers are lazy, avoid responsibility and need control; a **Theory Y** manager believes the opposite.",
  });
  b.manualShort({
    d: 3, marks: 4, skill: "UNDERSTANDING", applies: BES,
    stem: "Explain how a Theory Y manager is likely to treat employees, compared with a Theory X manager.",
    points: [
      "Theory Y: delegates / gives responsibility / consults (democratic style).",
      "Because workers are believed to enjoy work and seek responsibility.",
      "Theory X: close supervision / orders / threats (autocratic style).",
      "Because workers are believed to dislike work and avoid responsibility.",
    ],
    hints: ["Link each theory to a leadership style."],
    modelAnswer: "A Theory Y manager delegates tasks and consults employees, because she believes they enjoy work and will take responsibility. A Theory X manager supervises closely and gives orders, because he believes workers dislike work and must be controlled.",
    explanation: "Theory X fits autocratic leadership; Theory Y fits democratic leadership and delegation.",
  });
  b.manualShort({
    d: 3, marks: 4, skill: "ANALYSIS",
    stem: "Explain **two** benefits to a business of having a well-motivated workforce.",
    points: [
      "Higher productivity.",
      "Lower cost per unit / more output from the same staff.",
      "Lower labour turnover / absenteeism.",
      "Lower recruitment and training costs / fewer delays.",
    ],
    hints: ["Think about output and about staff leaving."],
    modelAnswer: "Motivated workers produce more in the same time, so the cost of each unit falls. They are also less likely to leave or be absent, so the business spends less on recruiting and training replacements.",
    explanation: "Benefits include productivity, lower absenteeism and turnover, better quality and acceptance of change.",
  });
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true, secs: 840,
    stem: "Tatenda manages a call centre in Harare that handles customer queries for a medical-aid society. Staff are paid a fair salary and work in a clean, air-conditioned office. However, they answer the same type of call all day, rarely receive any feedback and absenteeism is high. Tatenda believes that a further pay rise is the answer.",
    parts: [
      P.mcq({
        label: "(a)", marks: 1,
        stem: "According to Herzberg, which factor is missing at the call centre?",
        options: [["Recognition", "Correct: staff rarely receive feedback, a motivator."], ["Pay", "Pay is already fair."], ["Working conditions", "The office is clean and air-conditioned."], ["Company rules", "Rules are a hygiene factor and are not mentioned as a problem."]],
        answer: "A",
      }),
      P.manual({
        label: "(b)", marks: 3,
        stem: "Using Herzberg's theory, explain why a pay rise may not reduce absenteeism.",
        points: [
          "Pay is a hygiene factor.",
          "Pay is already fair, so dissatisfaction from pay is already removed.",
          "A further rise does not motivate; motivators (recognition, responsibility, interesting work) are missing.",
        ],
        modelAnswer: "Pay is a hygiene factor. Staff are already paid fairly, so pay is not causing dissatisfaction, and a further rise will not motivate them. Absenteeism comes from the lack of motivators: repetitive work and no recognition.",
      }),
      P.manual({
        label: "(c)", marks: 6,
        stem: "Recommend **two** non-pay changes Tatenda could make, and justify which is likely to be most effective.",
        points: [
          "Change 1, e.g. job rotation between types of call / job enrichment (handle complaints, train new staff).",
          "Explained with Herzberg (interesting work, responsibility).",
          "Change 2, e.g. regular feedback / praise / team-leader posts / employee of the month.",
          "Explained with Herzberg or Maslow (recognition / esteem).",
          "Comparison of the two, e.g. cost or speed of effect.",
          "Justified choice.",
        ],
        modelAnswer: "Tatenda could enrich the job by letting experienced staff handle complex complaints and coach new staff, which gives responsibility and more interesting work, both Herzberg motivators. He could also introduce weekly feedback and a monthly award for the best adviser, meeting esteem needs. Feedback is cheap and quick, but enrichment tackles the main cause, the dull, repetitive work. Job enrichment is likely to be most effective, supported by regular feedback.",
      }),
    ],
    hints: ["(a) Staff rarely get feedback.", "(c) Use Herzberg's motivators."],
    explanation: "Pay is a hygiene factor already met; motivators such as recognition and responsibility are needed.",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, secs: 960,
    stem: "Thandeka owns a garment factory in Bulawayo with 40 machinists. She pays a basic weekly wage. Output has fallen and labour turnover is high. Her supervisor suggests paying a piece rate for each garment sewn. Her son, who studied business, says the workers want to feel part of a team and to be recognised for good work.",
    parts: [
      P.manual({
        label: "(a)", marks: 2,
        stem: "Identify the theory behind the supervisor's suggestion and the theory behind the son's view.",
        points: ["Supervisor: Taylor (scientific management / money motivates).", "Son: Maslow (social and esteem needs) or Herzberg (recognition as a motivator)."],
      }),
      P.manual({
        label: "(b)", marks: 4,
        stem: "Explain **one** advantage and **one** disadvantage of the supervisor's suggestion for the factory.",
        points: [
          "Advantage: machinists earn more by sewing more, so output rises.",
          "Garments are easy to count, so piece rate is practical here.",
          "Disadvantage: workers rush, quality falls.",
          "So more garments rejected / need for quality checks / social needs still ignored.",
        ],
        modelAnswer: "Piece rate links pay to output, so machinists who sew more earn more, which should raise output, and garments are easy to count. However, machinists may rush and quality may fall, so Thandeka would need extra quality checks.",
      }),
      P.manual({
        label: "(c)", marks: 6,
        stem: "Evaluate which advice Thandeka should follow to increase output and reduce labour turnover.",
        points: [
          "Piece rate likely to raise output quickly (Taylor).",
          "But may not reduce turnover; ignores social and esteem needs; quality risk.",
          "Teamwork and recognition meet Maslow's social / esteem needs and Herzberg's motivators.",
          "Likely to reduce turnover, but slower effect on output.",
          "Combination possible, e.g. team bonus for output that meets quality standard plus recognition.",
          "Justified conclusion.",
        ],
        modelAnswer: "Piece rate would probably raise output quickly, as Taylor predicted, because garments are easy to count. However, it ignores the workers' social and esteem needs and may cause rushed, poor-quality work, so labour turnover may stay high. The son's ideas meet Maslow's social and esteem needs and Herzberg's motivators, which should make workers want to stay, but they may raise output more slowly. Thandeka should combine both: pay a team bonus for output that passes quality checks and recognise the best team each month. This raises output while meeting the needs that keep workers in the business.",
      }),
    ],
    hints: ["(a) Money or belonging and recognition?", "(c) Consider both of Thandeka's problems: output and turnover."],
    explanation: "Taylor's money-based approach and Maslow / Herzberg's needs-based approach can be combined.",
  });
  b.card("DEFINITION", "What is **motivation**?", "The reasons that make employees want to work well and achieve the business's objectives.");
  b.card("FACT", "Maslow's five levels, bottom to top?", "Physiological, safety, social, esteem, self-actualisation.");
  b.card("CONCEPT", "Taylor's view of motivation?", "Workers are motivated by money: find the most efficient method and pay by results (piece rate).");
  b.card("CONCEPT", "Herzberg's hygiene factors?", "Pay, working conditions, rules, supervision, job security, relationships: prevent dissatisfaction but do not motivate.");
  b.card("CONCEPT", "Herzberg's motivators?", "Achievement, recognition, responsibility, interesting work, promotion, personal growth.");
  b.card("CONCEPT", "Benefits of a well-motivated workforce?", "Higher productivity, lower absenteeism and labour turnover, better quality, acceptance of change.");
  b.card("CONCEPT", "McGregor's Theory X and Theory Y?", "X: workers dislike work and need control. Y: workers enjoy work and seek responsibility.", "ZIMSEC Business Enterprise and Skills.", { applies: BES });
  b.card("FACT", "Why do people work?", "Money, security, friendship (social), status and recognition (esteem), self-fulfilment.");
});
