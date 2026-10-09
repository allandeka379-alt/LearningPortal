// W3a: recruitment and selection (Cambridge 0264 only).
import { concept, P, table } from "../lib.mjs";

concept("bus.people.recruitment-selection", { file: "people/recruitment-selection", keyPrefix: "people.recruitment-selection" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which document sets out the duties and responsibilities of a job?",
    options: [
      ["Job description", "Correct: it describes the job."],
      ["Person specification", "This describes the person needed, not the duties."],
      ["Curriculum vitae", "A CV is written by the applicant."],
      ["Reference", "A reference is a view from a previous employer."],
    ],
    answer: "A",
    explanation: "A **job description** gives the job title, duties, responsibilities and conditions.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is internal recruitment?",
    options: [
      ["Filling a vacancy with an existing employee", "Correct: the person already works for the business."],
      ["Advertising a vacancy in a national newspaper", "That is external recruitment."],
      ["Using an employment agency to find staff", "Agencies find people outside the business."],
      ["Training new staff when they join", "That is induction training."],
    ],
    answer: "A",
    explanation: "**Internal recruitment** fills a vacancy from within the business, often by promotion.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which item would appear on a person specification?",
    options: [
      ["At least two years' experience of driving heavy vehicles", "Correct: experience required of the person."],
      ["Deliver goods to customers throughout Masvingo province each week", "That is a duty: job description."],
      ["Report to the transport manager", "Reporting lines are in the job description."],
      ["Working hours from 07:00 to 16:00", "Hours are working conditions: job description."],
    ],
    answer: "A",
    explanation: "A **person specification** lists qualifications, experience, skills and personal qualities.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which is an advantage of external recruitment?",
    options: [
      ["It brings new ideas and skills into the business", "Correct: outsiders have different experience."],
      ["It is cheaper than recruiting internally", "External recruitment usually costs more."],
      ["The candidate already knows the business and its staff", "That is true of internal recruitment."],
      ["It needs no induction training", "New external staff need induction."],
    ],
    answer: "A",
    explanation: "External recruitment widens choice and brings fresh ideas, but costs more and takes longer.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "A bank wants to check how honest and reliable an applicant was in her previous job. Which selection method is most useful?",
    options: [
      ["A reference from her previous employer", "Correct: the employer can comment on honesty and reliability."],
      ["A typing test", "A test shows skill, not honesty."],
      ["Her curriculum vitae", "She writes the CV herself."],
      ["The advertisement she replied to for the job", "An advert attracts applicants; it is not a selection method."],
    ],
    answer: "A",
    explanation: "**References** give an independent view of an applicant's character and reliability.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why might a business use an employment agency rather than advertising a vacancy itself?",
    options: [
      ["The agency finds and shortlists suitable candidates, saving managers' time", "Correct: agencies do much of the recruitment work."],
      ["Agencies are always cheaper than advertising", "Agencies charge fees, which can be high."],
      ["Agencies guarantee that the new employee will stay in the job for many years", "No agency can guarantee that."],
      ["It allows the business to recruit internally", "Agencies find external candidates."],
    ],
    answer: "A",
    hints: ["What work does the agency do for the business?"],
    explanation: "Agencies save time and have lists of candidates, but charge a fee.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A furniture factory wants to know whether applicants can actually operate a wood-cutting machine. Which selection method is best?",
    options: [
      ["A practical skills test", "Correct: it shows actual ability on the machine."],
      ["An application form", "Forms show what applicants claim, not ability."],
      ["A personality questionnaire", "That shows personality, not machine skill."],
      ["A telephone interview", "Talking about the skill does not prove it."],
    ],
    answer: "A",
    hints: ["Which method shows what a person can do, not what they say?"],
    explanation: "A **skills test** shows real ability; interviews and forms only show claims.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Selection is the process of choosing the best applicant from those who have applied.",
    answer: true,
    explanation: "True. Recruitment attracts applicants; selection chooses between them.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Internal recruitment creates no further vacancy in the business.",
    answer: false,
    explanation: "False. The employee who is promoted leaves a job that must also be filled.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each selection method with what it shows best.",
    pairs: [
      ["Reference", "A previous employer's view of reliability"],
      ["Interview", "Communication skills and personality"],
      ["Skills test", "Actual ability to do a task"],
      ["Application form", "Standard information that is easy to compare"],
    ],
    explanation: "Each selection method gives different evidence, so businesses often use several.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Put the stages in order by completing the sentence.",
    template: "After writing the job description and person specification, the business {{blank:a}} the vacancy, {{blank:b}} the best applicants and then interviews them.",
    blanks: [
      { id: "a", accepted: ["advertises"], choices: ["advertises", "shortlists", "appoints"] },
      { id: "b", accepted: ["shortlists"], choices: ["shortlists", "advertises", "appoints"] },
    ],
    explanation: "Advertise → shortlist → interview and test → appoint.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the document written by a job applicant that summarises his or her education, experience and skills.",
    accepted: ["curriculum vitae", "cv", "a cv", "c.v.", "resume", "résumé"],
    wrong: ["application form"],
    explanation: "A **curriculum vitae (CV)** is the applicant's own summary.",
  });
  b.manualShort({
    d: 3, marks: 4, skill: "ANALYSIS",
    stem: "Explain **two** reasons why a business writes a person specification before advertising a job.",
    points: [
      "Shows the qualifications / skills / experience needed.",
      "So the advert attracts suitable applicants / unsuitable people do not apply.",
      "Provides criteria to compare applicants.",
      "So shortlisting is fair and quicker / best person selected.",
    ],
    hints: ["Think about the advert and the shortlist."],
    modelAnswer: "The person specification sets out the qualifications and experience needed, so the advert can state them and unsuitable people do not apply. It also gives managers a fair checklist for comparing applicants when shortlisting.",
    explanation: "It guides the advert and makes shortlisting fair.",
  });
  b.manualShort({
    d: 4, marks: 6, skill: "EVALUATION",
    stem: "A supermarket chain needs a new branch manager for its Kwekwe store. Discuss whether it should recruit internally or externally.",
    points: [
      "Internal: knows the chain's systems; cheaper and quicker.",
      "Internal: promotion motivates other staff; ability already known.",
      "Internal: creates another vacancy; no new ideas.",
      "External: new ideas and experience from other retailers; wider choice.",
      "External: costly, slower, needs induction; existing staff may be demotivated.",
      "Justified conclusion, e.g. internal if a capable deputy exists.",
    ],
    hints: ["Does the chain already have deputy managers who could be promoted?"],
    modelAnswer: "Internal recruitment would be cheaper and quicker, and a deputy from another branch already knows the chain's systems and has proved his or her ability; promotion also shows other staff they can progress. However, it leaves another vacancy and brings no new ideas. External recruitment gives a wider choice and new experience from other retailers, but is more expensive, slower and needs induction, and staff who hoped for promotion may be demotivated. If the chain has a capable deputy manager, it should recruit internally; if the Kwekwe store needs a turnaround, an experienced outsider may be better.",
    explanation: "Weigh cost, speed, motivation and knowledge against new ideas and choice.",
  });
  const rows = [
    ["Tendai", "Yes", "Yes", "Internal (deputy)", "6"],
    ["Rudo", "Yes", "Yes", "External", "9"],
    ["Sipho", "No", "Yes", "External", "8"],
  ];
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: 900,
    stem: `Mazowe Agro-Dealers sells seed, fertiliser and tools to farmers. It needs a branch manager for its new shop in Chinhoyi. The person specification says a diploma in agriculture is essential and experience of managing staff is essential. Three applicants were shortlisted.\n\n${table(["Applicant", "Diploma in agriculture", "Managed staff before", "Source", "Interview score (out of 10)"], rows, { align: ["l", "l", "l", "l", "r"] })}`,
    parts: [
      P.mcq({
        label: "(a)", marks: 1,
        stem: "Which applicant should be removed because he does not meet an essential criterion?",
        options: [["Sipho", "Correct: he has no diploma in agriculture."], ["Rudo", "She meets both essential criteria."], ["Tendai", "He meets both essential criteria."], ["No applicant", "One applicant lacks the essential diploma."]],
        answer: "A",
      }),
      P.manual({
        label: "(b)", marks: 3,
        stem: "Identify **three** methods Mazowe Agro-Dealers could use, other than an interview, to select the branch manager.",
        points: ["References.", "Tests (e.g. numeracy, stock-control skills).", "Application form / CV / assessment day."],
      }),
      P.manual({
        label: "(c)", marks: 6,
        stem: "Recommend whether Tendai or Rudo should be appointed. Justify your answer.",
        points: [
          "Tendai: internal, knows products, systems and farmers; cheaper and quicker.",
          "Tendai: promotion motivates staff; but lower interview score (6).",
          "Rudo: highest interview score (9); may bring new ideas.",
          "Rudo: external, needs induction; existing staff may feel overlooked.",
          "Both meet essential criteria, so other factors decide (e.g. references, tests).",
          "Justified recommendation.",
        ],
        modelAnswer: "Both Tendai and Rudo meet the essential criteria. Tendai is the deputy, so he knows the products, the stock system and many farmers; appointing him is quicker and cheaper and shows other staff that promotion is possible. However, his interview score was only 6. Rudo scored 9, suggesting stronger communication and ideas, but she would need induction and staff may feel overlooked. A new shop needs someone who can start immediately and knows the business, so I recommend Tendai, provided his references are good, with training in the areas where his interview was weak.",
      }),
    ],
    hints: ["(a) Check the essential criteria first.", "(c) Use every column of the table."],
    explanation: "Remove applicants who fail essential criteria, then weigh interview performance against internal knowledge.",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, secs: 900,
    stem: "Thandeka owns a growing travel agency in Harare and needs three booking clerks. In the past she advertised on a notice board outside the office and chose people she liked at a short chat. Two of her last four clerks left within three months, and one made costly booking errors.",
    parts: [
      P.manual({
        label: "(a)", marks: 2,
        stem: "State **two** contents of a job description for a booking clerk.",
        points: ["Job title / to whom the clerk reports.", "Duties (e.g. making bookings, issuing tickets) / hours and conditions."],
      }),
      P.manual({
        label: "(b)", marks: 4,
        stem: "Explain **two** weaknesses in Thandeka's present recruitment and selection methods.",
        points: [
          "Notice board reaches few people.",
          "So little choice of applicants / suitable people may not see it.",
          "Short chat with no tests or references.",
          "So she cannot judge skill / reliability, leading to errors and staff leaving.",
        ],
        modelAnswer: "A notice board outside the office reaches very few people, so she has little choice of applicants. Choosing people she likes after a short chat does not test booking skills or check references, which explains the costly errors and clerks who left quickly.",
      }),
      P.manual({
        label: "(c)", marks: 6,
        stem: "Recommend how Thandeka should recruit and select the three clerks. Justify your answer.",
        points: [
          "Write a job description and person specification first.",
          "Advertise online / social media / local newspaper to reach more applicants cheaply.",
          "Shortlist against the person specification.",
          "Use a test of booking / computer skills and check references.",
          "Structured interview with the same questions for all.",
          "Justified recommendation with cost / benefit weighed.",
        ],
        modelAnswer: "Thandeka should first write a job description and person specification, so she knows what skills she needs. She should advertise online and on social media, which is cheap and reaches many young people with computer skills. She should shortlist against the specification, then give a practical booking test and ask every candidate the same interview questions, and check references. This takes more time and some cost, but it is cheaper than the errors and replacements caused by her present methods.",
      }),
    ],
    hints: ["(b) Think about who sees the advert and how she chooses.", "(c) Cover documents, advertising and selection."],
    explanation: "A structured process (documents, wide advertising, tests and references) reduces costly mistakes and labour turnover.",
  });
  b.card("DEFINITION", "Recruitment or selection?", "Recruitment attracts applicants for a vacancy. Selection chooses the best applicant.");
  b.card("DEFINITION", "What is a **job description**?", "A document setting out the job title, duties, responsibilities and working conditions.");
  b.card("DEFINITION", "What is a **person specification**?", "A document setting out the qualifications, experience, skills and qualities the job holder needs.");
  b.card("CONCEPT", "Internal recruitment: two advantages?", "Cheaper and quicker; person already knows the business; ability known; promotion motivates.");
  b.card("CONCEPT", "External recruitment: two advantages?", "New ideas and skills; wider choice of applicants.");
  b.card("FACT", "Five selection methods?", "Application form, CV, references, interviews, tests (skills, aptitude, personality).");
  b.card("FACT", "Ways to advertise a vacancy externally?", "Newspapers, online job sites and social media, employment agencies, radio, recruitment fairs.");
  b.card("CONCEPT", "How to recommend a candidate from a table?", "Remove those who fail essential criteria, compare the rest on several factors, then justify a choice.");
});
