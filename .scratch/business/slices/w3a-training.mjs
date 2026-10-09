// W3a: training (Cambridge 0264 only).
import { concept, P } from "../lib.mjs";

concept("bus.people.training", { file: "people/training", keyPrefix: "people.training" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is induction training?",
    options: [
      ["An introduction to the business for new employees", "Correct: it helps new staff settle in."],
      ["A college course leading to a qualification", "That is off-the-job training."],
      ["Learning a new machine from a colleague", "That is on-the-job training."],
      ["Training managers to lead teams", "That is management training, not induction."],
    ],
    answer: "A",
    explanation: "**Induction** introduces new employees to the business, its people, rules and safety procedures.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Where does off-the-job training take place?",
    options: [
      ["Away from the employee's normal work", "Correct: at a college, centre or separate room."],
      ["At the employee's own workstation", "That is on-the-job training."],
      ["Only in another country", "It can be held locally."],
      ["Only on the first day of work", "That describes induction."],
    ],
    answer: "A",
    explanation: "**Off-the-job** training happens away from the normal job, for example at a college or training centre.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which is an advantage of on-the-job training?",
    options: [
      ["It is cheap and specific to the business's methods", "Correct: no fees and it uses the actual equipment."],
      ["It always leads to a recognised qualification", "Qualifications usually need off-the-job courses."],
      ["The trainer's output is not affected", "The trainer's output falls while teaching."],
      ["Bad habits cannot be passed on", "Bad habits can be passed on."],
    ],
    answer: "A",
    explanation: "On-the-job training is cheap and tailored to the business, but may pass on bad habits.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which is a disadvantage of off-the-job training?",
    options: [
      ["It is expensive and no output is produced during the course", "Correct: fees plus lost output."],
      ["Trainees are taught only by unqualified and inexperienced colleagues", "Off-the-job courses usually use experts."],
      ["Trainees practise on real customers", "Off-the-job training avoids that risk."],
      ["It is only for new employees", "Induction is the training for new employees."],
    ],
    answer: "A",
    explanation: "Off-the-job training costs fees, travel and wages while employees are away and produce nothing.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "A shop assistant learns to use the till by working beside an experienced cashier. What type of training is this?",
    options: [
      ["On-the-job training", "Correct: learning while doing the job."],
      ["Off-the-job training", "She is at her normal workplace."],
      ["Induction training", "Induction covers rules and layout, not job skills in depth."],
      ["Management training", "Using a till is not a management skill."],
    ],
    answer: "A",
    explanation: "Watching and working with an experienced colleague at the workplace is **on-the-job** training.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A hospital is introducing complex new scanning equipment. Why is off-the-job training from the equipment supplier most suitable?",
    options: [
      ["Expert trainers teach without risk to real patients", "Correct: mistakes on patients would be dangerous."],
      ["It is the cheapest form of training", "Off-the-job training is usually the most expensive."],
      ["Nobody else in the hospital can do any work during training", "Other staff keep working."],
      ["It counts as induction for the staff", "The staff are existing employees."],
    ],
    answer: "A",
    hints: ["What happens if staff make mistakes while learning on real patients?"],
    explanation: "Complex, high-risk skills are best learned from experts away from real work.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why might a business worry about paying for employees to gain qualifications off the job?",
    options: [
      ["Qualified staff may leave for better-paid jobs elsewhere", "Correct: rivals may recruit them."],
      ["Qualified staff always become less productive in their jobs", "Training usually raises productivity."],
      ["Qualifications reduce staff motivation", "Gaining qualifications usually motivates."],
      ["It increases the risk of accidents", "Training reduces accidents."],
    ],
    answer: "A",
    hints: ["Who else might want a newly qualified employee?"],
    explanation: "The business may lose its investment if trained staff leave; some businesses ask staff to stay for a period after a course.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Induction training is given to new employees.",
    answer: true,
    explanation: "True. Induction introduces new staff to the business.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Off-the-job training must always take place outside the business's premises.",
    answer: false,
    explanation: "False. It can be in the business's own training centre, as long as it is away from the normal job.",
  });
  b.match({
    d: 2, skill: "APPLICATION",
    stem: "Match each situation with the type of training.",
    pairs: [
      ["A new security guard is shown the fire exits and alarm codes on his first day", "Induction"],
      ["A trainee chef learns to make sauces by working beside the head chef", "On-the-job"],
      ["An accounts clerk attends a three-week accounting course at a polytechnic", "Off-the-job"],
    ],
    explanation: "Induction for newcomers; on-the-job while working; off-the-job away from the job.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentence.",
    template: "Training that teaches new employees about health and safety rules, the layout of the workplace and their colleagues is called {{blank:a}} training.",
    blanks: [{ id: "a", accepted: ["induction"], choices: ["induction", "on-the-job", "off-the-job"] }],
    explanation: "Induction covers rules, safety, layout and people.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the type of training in which an employee learns by watching and working with an experienced colleague at the workplace.",
    accepted: ["on-the-job", "on the job", "on-the-job training", "on the job training"],
    wrong: ["off-the-job"],
    explanation: "**On-the-job training** happens while the employee does the job.",
  });
  b.manualShort({
    d: 3, marks: 4, skill: "ANALYSIS",
    stem: "Explain **two** benefits to a business of giving induction training to new employees.",
    points: [
      "New employees learn safety rules.",
      "So fewer accidents / legal problems.",
      "New employees settle in and know procedures quickly.",
      "So they become productive sooner / are less likely to leave early.",
    ],
    hints: ["Think about safety and how quickly a new worker becomes useful."],
    modelAnswer: "Induction teaches new employees the safety rules at once, reducing accidents. It also helps them settle in and learn procedures quickly, so they become productive sooner and are less likely to leave in their first weeks.",
    explanation: "Induction reduces accidents and early labour turnover and speeds up productivity.",
  });
  b.manualShort({
    d: 3, marks: 4, skill: "UNDERSTANDING",
    stem: "Explain **two** ways an employee benefits from training.",
    points: [
      "Gains new skills / the job becomes easier.",
      "More confident / higher job satisfaction / personal growth.",
      "Better chance of promotion.",
      "Higher pay / status.",
    ],
    hints: ["Think about the employee's present job and future career."],
    modelAnswer: "Training gives employees new skills, so they can do their jobs more easily and feel more confident. It also improves their chances of promotion, which can bring higher pay and status.",
    explanation: "Training brings skills, confidence and career progress.",
  });
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: 840,
    stem: "Tendai owns a small printing business in Gweru with eight employees. He has bought a new digital printing press. Only Tendai has used one before. The supplier offers a five-day course in Johannesburg for two employees, with fees, travel and accommodation to pay. Tendai's profits are low this year.",
    parts: [
      P.mcq({
        label: "(a)", marks: 1,
        stem: "What type of training is the supplier's course?",
        options: [["Off-the-job", "Correct: it is away from the workplace."], ["On-the-job", "The trainees would not be at their workplace."], ["Induction", "The employees are not new."], ["Job rotation", "Job rotation is a motivation method."]],
        answer: "A",
      }),
      P.manual({
        label: "(b)", marks: 3,
        stem: "Explain **one** advantage of training the employees on the job instead.",
        points: [
          "Cheaper: no fees, travel or accommodation.",
          "Tendai already knows the press, so he can train them.",
          "Matters because profits are low this year / training on the actual press.",
        ],
        modelAnswer: "On-the-job training would avoid fees, travel and accommodation costs, which matters because profits are low. Tendai has used this type of press, so he can train staff on the actual machine.",
      }),
      P.manual({
        label: "(c)", marks: 6,
        stem: "Recommend which type of training Tendai should use. Justify your answer.",
        points: [
          "Off-the-job: expert trainers, full use of the press's features, less risk of costly mistakes.",
          "Off-the-job: costly, staff away for five days, low profits.",
          "On-the-job: cheap, specific to the press.",
          "On-the-job: Tendai's own time and output lost; he may not know all features; mistakes waste paper and ink.",
          "Possible compromise: send one employee, who then trains others on the job.",
          "Justified recommendation.",
        ],
        modelAnswer: "The supplier's course would give expert training on all the press's features, reducing wasted materials, but fees, travel and five days away are expensive while profits are low. On-the-job training by Tendai is cheaper and uses the actual press, but takes his time away from running the business and he may not know every feature. I recommend sending one employee on the course, who can then train the others on the job with Tendai's help. This halves the cost while bringing expert knowledge into the business.",
      }),
    ],
    hints: ["(a) Where does the course take place?", "(c) Consider low profits and the need to use the press well."],
    explanation: "Expert off-the-job training is costly; a combination may give expertise at lower cost.",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, secs: 900,
    stem: "A fictional hotel group is opening a new hotel in Victoria Falls and will recruit 60 staff, most with no hotel experience. The manager plans to give them a short tour on the first day and then let them learn from the few experienced staff transferred from the group's Harare hotel. Customer reviews are very important to the hotel's success.",
    parts: [
      P.manual({
        label: "(a)", marks: 2,
        stem: "State **two** things that should be covered in the new staff's induction training.",
        points: ["Health and safety / fire procedures.", "Rules, hours and pay / introductions to colleagues and supervisors / layout / the hotel's standards of service."],
      }),
      P.manual({
        label: "(b)", marks: 4,
        stem: "Explain **two** problems with the manager's plan to rely on on-the-job training.",
        points: [
          "Few experienced staff for 60 trainees.",
          "Experienced staff's own work suffers / trainees get little attention.",
          "Trainees learn on real guests.",
          "Mistakes lead to poor reviews / bad habits passed on.",
        ],
        modelAnswer: "There are only a few experienced staff to train 60 people, so trainees will get little attention and the experienced staff's own work will suffer. Trainees will also learn while serving real guests, so their mistakes may lead to poor reviews, which matter greatly to the hotel.",
      }),
      P.manual({
        label: "(c)", marks: 6,
        stem: "Evaluate how the hotel should train its new staff before and after opening.",
        points: [
          "Full induction (not just a tour): safety, standards, rules.",
          "Off-the-job training before opening (training room / college / trainers) on service skills.",
          "Cost of training before any revenue is earned.",
          "Benefit: good service from day one protects reviews and future bookings.",
          "On-the-job coaching after opening by experienced staff for business-specific routines.",
          "Justified conclusion.",
        ],
        modelAnswer: "The hotel should give a proper induction covering safety, rules and service standards, not just a tour. Because most staff have no experience and reviews matter, it should run off-the-job training before opening, using trainers or a hospitality college, so staff practise service skills without real guests. This costs money before any revenue is earned, but poor reviews in the first months could damage bookings for years. After opening, experienced staff can coach new staff on the job in the hotel's own routines. This combination costs more at first but protects the hotel's reputation.",
      }),
    ],
    hints: ["(b) How many trainers are there for 60 people?", "(c) Why do reviews matter here?"],
    explanation: "Inexperienced staff in a reputation-sensitive business need induction and off-the-job training before facing customers.",
  });
  b.card("DEFINITION", "What is **training**?", "Improving employees' knowledge and skills so that they can do their jobs well.");
  b.card("DEFINITION", "What is **induction training**?", "An introduction for new employees to the business, its people, rules, layout and safety procedures.");
  b.card("DEFINITION", "What is **on-the-job training**?", "Training at the workplace while doing the job, usually guided by an experienced employee.");
  b.card("DEFINITION", "What is **off-the-job training**?", "Training away from the normal job, e.g. at a college or training centre.");
  b.card("CONCEPT", "On-the-job: advantages and disadvantages?", "Cheap, specific, some output; but trainer's output falls, bad habits, costly mistakes.");
  b.card("CONCEPT", "Off-the-job: advantages and disadvantages?", "Experts, qualifications, no risk to real work; but expensive, no output, trained staff may leave.");
  b.card("CONCEPT", "Why is training important to a business?", "Higher productivity and quality, better service, fewer accidents, lower labour turnover, future managers.");
  b.card("CONCEPT", "How to choose a type of training?", "Who (new or existing staff), what skill, cost, risk of mistakes, risk of trained staff leaving.");
});
