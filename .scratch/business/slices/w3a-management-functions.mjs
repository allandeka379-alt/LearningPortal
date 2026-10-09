// W3a: the functions of management and delegation.
import { concept, P } from "../lib.mjs";

concept("bus.people.management-functions", { file: "people/management-functions", keyPrefix: "people.management-functions" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which of these is a function of management?",
    options: [
      ["Coordinating", "Correct: making departments work together is one of the five functions."],
      ["Manufacturing", "Manufacturing is a production activity, not a management function."],
      ["Retailing", "Retailing is a branch of trade, not a function of management."],
      ["Advertising", "Advertising is a marketing activity, not one of the management functions."],
    ],
    answer: "A",
    explanation: "The functions of management are **planning, organising, commanding (directing), coordinating and controlling**.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which function of management involves setting objectives and deciding how to achieve them?",
    options: [
      ["Planning", "Correct: planning sets objectives and the way to reach them."],
      ["Controlling", "Controlling checks results against the plan after the event."],
      ["Commanding", "Commanding gives instructions to carry out the plan."],
      ["Coordinating", "Coordinating makes departments work together."],
    ],
    answer: "A",
    explanation: "**Planning** comes first: objectives are set and the actions needed to reach them are decided in advance.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "The manager of a clothing factory in Kwekwe compares the number of shirts made each week with the weekly target. Which function is she carrying out?",
    options: [
      ["Controlling", "Correct: comparing actual results with targets is controlling."],
      ["Organising", "Organising arranges staff and materials before the work."],
      ["Planning", "The target was set by planning; checking it is a different function."],
      ["Commanding", "Commanding means instructing and motivating staff."],
    ],
    answer: "A",
    explanation: "**Controlling** measures actual performance against the plan and takes corrective action if needed.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "A supermarket manager makes sure the buying department orders enough stock for a price promotion the marketing department is planning. Which function is this?",
    options: [
      ["Coordinating", "Correct: two departments are being made to work together."],
      ["Controlling", "Nothing is being measured against a target here."],
      ["Commanding", "The focus is on linking departments, not giving orders to one worker."],
      ["Delegating", "No authority is being passed to a subordinate."],
    ],
    answer: "A",
    explanation: "**Coordinating** makes sure departments work towards the same objective, so the promotion does not fail through lack of stock.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "When a manager delegates a task, what does she pass to the subordinate?",
    options: [
      ["Authority to carry out the task", "Correct: authority can be delegated."],
      ["Final responsibility for the result", "Responsibility stays with the manager."],
      ["Ownership of the business", "Delegation does not change who owns the business."],
      ["The right to set the business objectives", "Setting main objectives is normally kept by senior managers."],
    ],
    answer: "A",
    explanation: "Delegation passes **authority**; the manager remains **responsible** for the outcome.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which is the most likely disadvantage of delegation for a small business?",
    options: [
      ["Tasks may be done badly if the subordinate lacks skill", "Correct: poor results are a real risk if training is lacking."],
      ["The manager has more tasks to do personally", "Delegation reduces the manager's workload."],
      ["Employees feel less trusted by the owner", "Delegation usually makes employees feel more trusted."],
      ["Decisions take longer because staff must wait", "Delegation usually speeds up decisions."],
    ],
    answer: "A",
    hints: ["Think about what can go wrong when someone else does the job."],
    explanation: "A subordinate without the right skills or experience may make mistakes, and the manager is still responsible for them.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A transport company bought new buses but has no drivers trained to use them. Which management function was carried out poorly?",
    options: [
      ["Organising", "Correct: resources (vehicles and trained staff) were not arranged together."],
      ["Controlling", "Controlling would reveal the problem but did not cause it."],
      ["Commanding", "Instructions cannot help when there are no trained drivers."],
      ["Planning", "A plan to buy buses existed; it was the arranging of staff that failed."],
    ],
    answer: "A",
    hints: ["Which function arranges people and equipment so the plan can work?"],
    explanation: "**Organising** means having the right people, equipment and materials in place. Buses without trained drivers show poor organisation.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Commanding is sometimes called directing or leading.",
    answer: true,
    explanation: "True. Commanding means instructing, guiding and motivating employees; textbooks also call it directing or leading.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A manager who delegates a task is no longer responsible if the task goes wrong.",
    answer: false,
    explanation: "False. Authority is passed to the subordinate, but the manager remains responsible for the result.",
  });
  b.match({
    d: 2, skill: "APPLICATION",
    stem: "Match each action by the owner of a furniture workshop in Masvingo with the function of management it shows.",
    pairs: [
      ["Decides to make 50 school desks for a contract by the end of the term", "Planning"],
      ["Buys timber and allocates two carpenters to the desk order", "Organising"],
      ["Explains to the carpenters how each desk must be assembled", "Commanding"],
      ["Makes sure the finishing team is ready when the carpenters complete the frames", "Coordinating"],
      ["Counts finished desks each Friday and compares them with the schedule", "Controlling"],
    ],
    explanation: "Each step of the order uses a different function: plan, organise, command, coordinate, control.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentences.",
    template: "When a manager gives a subordinate the {{blank:a}} to carry out a task, this is called {{blank:b}}. The manager still keeps the {{blank:c}} for the result.",
    blanks: [
      { id: "a", accepted: ["authority"], choices: ["authority", "responsibility", "ownership"] },
      { id: "b", accepted: ["delegation"], choices: ["delegation", "coordination", "motivation"] },
      { id: "c", accepted: ["responsibility"], choices: ["responsibility", "authority", "ownership"] },
    ],
    explanation: "Authority is delegated; responsibility stays with the manager.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the function of management that measures actual performance against the plan.",
    accepted: ["controlling", "control"],
    wrong: ["coordinating", "planning"],
    explanation: "**Controlling** compares results with targets and corrects problems.",
  });
  b.manualShort({
    d: 3, marks: 4, skill: "UNDERSTANDING",
    stem: "Explain why **planning** and **controlling** are both important to a business.",
    points: [
      "Planning sets objectives / gives direction.",
      "So workers know what to aim for and resources are not wasted / helps obtain finance.",
      "Controlling compares actual results with the plan.",
      "So problems are found early and corrective action can be taken.",
    ],
    hints: ["One function comes before the work, the other after it."],
    modelAnswer: "Planning sets objectives and decides how to reach them, so everyone knows what the business is aiming for and money is not wasted. Controlling compares actual results with the plan, so problems such as falling sales or rising costs are spotted early and can be corrected.",
    explanation: "Planning gives direction; controlling checks that the direction is being followed.",
  });
  b.manualShort({
    d: 3, marks: 4, skill: "ANALYSIS",
    stem: "Explain **two** advantages to an employee of being given delegated tasks.",
    points: [
      "Work becomes more interesting / varied / challenging.",
      "So the employee is more motivated / satisfied.",
      "Develops new skills / experience.",
      "Which improves chances of promotion / feels trusted and valued.",
    ],
    hints: ["Think about job satisfaction and career development."],
    modelAnswer: "Delegated tasks make the job more interesting and challenging, so the employee is more motivated. The employee also learns new skills, which prepares him or her for promotion to a more senior post.",
    explanation: "Delegation acts as job enrichment for the subordinate.",
  });
  b.manualShort({
    d: 4, marks: 6, skill: "EVALUATION",
    stem: "Rudo owns a pharmacy in Masvingo and works twelve hours a day. Her assistant, Tatenda, is a newly qualified pharmacist. Discuss whether Rudo should delegate the ordering of medicines to Tatenda.",
    points: [
      "For: Rudo gains time for planning / serving customers / less stress.",
      "For: Tatenda is qualified and would be motivated / develops skills.",
      "Against: Tatenda is newly qualified / lacks experience of suppliers and stock levels.",
      "Against: errors in ordering medicines are costly or dangerous and Rudo stays responsible.",
      "Control measure, e.g. spending limit / approved supplier list / check orders at first.",
      "Justified conclusion.",
    ],
    hints: ["Consider both Tatenda's qualification and his lack of experience.", "Suggest a way to reduce the risk."],
    modelAnswer: "Delegating ordering would give Rudo time to plan and rest, and Tatenda is qualified, so he would find the task motivating and gain experience. However, he is newly qualified and may not know suppliers or the right stock levels, and mistakes with medicines are serious; Rudo remains responsible. Rudo should delegate gradually: let Tatenda prepare orders within a spending limit from approved suppliers, and check them for the first few months.",
    explanation: "A good answer weighs benefits against risks in this case and recommends a controlled form of delegation.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, secs: 780,
    stem: "Sipho manages Kudzai Bakery in Bulawayo, which supplies bread to tuck shops. Last month the sales team won orders from ten new tuck shops, but the bakery did not bake enough bread, so many orders were late. Sipho also found that flour was being wasted, but he only noticed this when the monthly accounts were prepared. Sipho does all the ordering and staff scheduling himself.",
    parts: [
      P.mcq({
        label: "(a)", marks: 1,
        stem: "Which management function failed when the sales team won orders that production could not meet?",
        options: [["Coordinating", "Correct: sales and production were not working together."], ["Commanding", "Instructions to one worker were not the problem."], ["Planning", "Orders were planned; the departments were not linked."], ["Delegating", "Delegation is not a function of management."]],
        answer: "A",
      }),
      P.short({
        label: "(b)", marks: 1,
        stem: "Name the management function that should have found the flour waste earlier.",
        accepted: ["controlling", "control"],
        wrong: ["planning"],
      }),
      P.manual({
        label: "(c)", marks: 4,
        stem: "Explain **two** ways Sipho could improve coordination and control at the bakery.",
        points: [
          "Regular meetings between sales and production / sales passes orders to production in advance.",
          "So enough bread is baked for new orders.",
          "Daily or weekly checks of flour used against output / stock records.",
          "So waste is spotted and corrected quickly instead of a month later.",
        ],
        modelAnswer: "Sipho could hold a short daily meeting where the sales team gives production the next day's orders, so enough bread is baked. He could also record the flour used each day against loaves baked, so waste is noticed within days and corrected.",
      }),
      P.manual({
        label: "(d)", marks: 6,
        stem: "Evaluate whether Sipho should delegate staff scheduling to a production supervisor.",
        points: [
          "For: Sipho has more time for coordination and control (the problems in the case).",
          "For: supervisor is closer to production / knows staff, so faster, better rosters.",
          "For: motivates the supervisor / develops skills.",
          "Against: supervisor may lack skill; training and checking take time.",
          "Against: Sipho remains responsible for late orders if the roster is poor.",
          "Justified recommendation linked to the case.",
        ],
        modelAnswer: "Delegating staff scheduling would free Sipho's time to coordinate sales with production and to control flour use, which are the bakery's real problems. A production supervisor knows the workers and the daily output, so rosters may be better and faster. The supervisor may also feel trusted and motivated. However, the supervisor may lack experience of planning shifts, and Sipho would still be responsible if bread is late. On balance Sipho should delegate scheduling, after a short period of training and with weekly checks, because his own time is needed to fix the coordination and control failures.",
      }),
    ],
    hints: ["(a) Two departments were not linked.", "(d) Link delegation to the problems in the case."],
    explanation: "(a) Coordination failed. (b) Controlling should have found the waste. (c) Link sales and production; check flour use regularly. (d) Delegation frees Sipho for coordination and control but needs a capable, trained supervisor.",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, secs: 900,
    stem: "Thandeka has started a small events-hire business in Victoria Falls, renting tents, chairs and tables for weddings. She has four employees. She has no written objectives and decides each job on the day. Equipment is often missing or damaged after events, and customers have complained that tents arrive late.",
    parts: [
      P.manual({
        label: "(a)", marks: 2,
        stem: "Define **planning** and **organising**.",
        points: ["Planning: setting objectives and deciding how to achieve them.", "Organising: arranging staff, equipment, materials and money to carry out the plan."],
      }),
      P.manual({
        label: "(b)", marks: 4,
        stem: "Explain how better planning and organising could solve **two** of the problems in the case.",
        points: [
          "Planning: written objectives / schedule of events in advance.",
          "So staff and vehicles are booked in time and tents arrive on time.",
          "Organising: allocate each employee responsibility for loading / checking equipment.",
          "So equipment is counted out and back, reducing loss and damage.",
        ],
        modelAnswer: "A weekly plan of bookings would let Thandeka schedule staff and transport in advance, so tents arrive on time. Organising the team so that one employee checks out and checks in all equipment for each event would show at once what is missing or damaged.",
      }),
      P.manual({
        label: "(c)", marks: 6,
        stem: "Thandeka believes that controlling is the most important function of management for her business. Do you agree? Justify your answer.",
        points: [
          "Controlling would identify missing / damaged equipment and late deliveries.",
          "Allows corrective action, e.g. charging customers for damage / changing routes.",
          "But controlling needs a plan to compare against: without objectives there is nothing to measure.",
          "Organising and commanding put the plan into action; all functions depend on each other.",
          "In this case planning is the weakest point (no written objectives).",
          "Justified judgement.",
        ],
        modelAnswer: "Controlling is important for Thandeka because checking equipment after every event would show losses and damage, and comparing delivery times with bookings would show where lateness occurs, so she could correct it. However, control only works if there is a plan to measure against, and Thandeka has no written objectives and decides each job on the day. Organising is also weak, as nobody is responsible for the equipment. I partly disagree: controlling matters, but in her business planning is the most urgent function, because without a plan neither organising nor controlling can work properly.",
      }),
    ],
    hints: ["(b) Match one function to each problem.", "(c) Can you control without a plan?"],
    explanation: "The functions depend on each other; controlling needs a plan to measure against.",
  });
  b.card("DEFINITION", "What is **management**?", "Getting things done through other people by planning, organising, commanding, coordinating and controlling resources.");
  b.card("FACT", "The five functions of management (POCCC)?", "Planning, organising, commanding (directing / leading), coordinating, controlling.");
  b.card("DEFINITION", "What is **coordinating**?", "Making sure the different people and departments work together towards the same objectives.");
  b.card("DEFINITION", "What is **controlling**?", "Measuring actual performance, comparing it with the plan and correcting problems.");
  b.card("DEFINITION", "What is **delegation**?", "Giving a subordinate the authority to carry out a task; the manager keeps responsibility.");
  b.card("CONCEPT", "Authority or responsibility: which can be delegated?", "Authority can be delegated. Responsibility for the result stays with the manager.");
  b.card("CONCEPT", "Advantages of delegation?", "Frees the manager's time, faster decisions, motivates and develops subordinates, uses specialists' skills.");
  b.card("CONCEPT", "Disadvantages of delegation?", "Task may be done badly, manager still responsible, time to train and check, manager may feel a loss of control.");
});
