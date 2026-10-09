// W2a: Voluntary community activities (her.rights.voluntary-activities).
import { concept, P, source, levels } from "../lib.mjs";

concept("her.rights.voluntary-activities", { file: "rights/voluntary-activities", keyPrefix: "rights.voluntary-activities" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is a **voluntary community activity**?",
    options: [
      ["Work done freely, without payment, to help the community", "Correct: volunteers give their time without wages."],
      ["Work done by council employees who are paid a monthly wage", "Paid work by employees is not voluntary."],
      ["Work that a court orders a person to do as a punishment", "Court-ordered work is not freely chosen."],
      ["Work done by a business to make a profit from customers", "Profit-making work is not voluntary community work."],
    ],
    answer: "A",
    explanation: "Voluntary activities are done freely, without payment, for the benefit of others.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which is an example of a voluntary community activity?",
    options: [
      ["Pupils planting trees at a clinic on a Saturday", "Correct: unpaid work for the community."],
      ["A builder paid to construct a new council office", "This is paid work."],
      ["A shopkeeper selling groceries to customers", "This is business, not volunteering."],
      ["A teacher marking scripts as part of her job", "This is part of her paid employment."],
    ],
    answer: "A",
    explanation: "Planting trees without pay for the community is a voluntary activity.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which traditional practice is an early form of communal voluntary work?",
    options: [
      ["nhimbe / ilima", "Correct: neighbours worked together on one family's fields or buildings."],
      ["roora / lobola", "This is bride wealth."],
      ["kurova guva / umbuyiso", "This is a ceremony after death."],
      ["kuperekwa / umthimba", "This is handing over a bride."],
    ],
    answer: "A",
    explanation: "The work party (nhimbe/ilima) brought neighbours together to work for one household, which would help others in turn.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which community need is **more typical of urban** areas than rural areas?",
    options: [
      ["blocked drains and illegal dumping of rubbish", "Correct: crowded urban areas often face these problems."],
      ["long walks to a distant borehole", "This is more typical of rural areas."],
      ["gullies cutting across farmland and grazing land", "Soil erosion of farmland is mainly rural."],
      ["footbridges washed away over rivers", "This is more typical of rural areas."],
    ],
    answer: "A",
    hints: ["Where do many people and much waste come together?"],
    explanation: "Crowded towns produce much waste; blocked drains and dumping are common urban needs.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Nyasha volunteers at a home-based care group, collecting medicine for sick neighbours. Which benefit to **Nyasha herself** is most likely?",
    options: [
      ["She gains experience and skills that may help her find work", "Correct: volunteering builds skills and experience."],
      ["She receives a monthly salary from the clinic for every delivery she makes", "Volunteers are not paid a salary."],
      ["She no longer has to attend school", "Volunteering does not replace school."],
      ["She becomes exempt from paying any taxes", "Volunteering does not exempt anyone from tax."],
    ],
    answer: "A",
    hints: ["The question asks about the volunteer, not the neighbours."],
    explanation: "Volunteers gain skills, experience, confidence and networks, which can help them find work later.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A village's only borehole has been broken for months, and women walk 5 km for water. Which voluntary activity would **best** meet this need?",
    options: [
      ["Raising funds and labour to repair the borehole", "Correct: it addresses the real need directly."],
      ["Holding a football tournament on the school field to raise the village's spirits", "This does not solve the water problem."],
      ["Painting the walls of the village head's homestead", "This does not address water."],
      ["Planting flowers along the road to the business centre", "This does not address water."],
    ],
    answer: "A",
    hints: ["Start with the need."],
    explanation: "Good projects begin with the real need: here, safe water close to home.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Why do voluntary activities strengthen **unity** in a community?",
    options: [
      ["People of different backgrounds work side by side for a shared goal", "Correct: shared work builds trust and oneness."],
      ["They make every person in the community earn the same income", "Volunteering does not equalise incomes."],
      ["They allow only one group to make decisions for the others", "This would divide, not unite."],
      ["They replace the need for any village heads, councillors or other local leaders", "Leaders still play a role in organising projects."],
    ],
    answer: "A",
    hints: ["Think of oneness, an attribute of Unhu."],
    explanation: "Working together towards a shared goal builds trust and a sense of oneness across differences.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "A youth clean-up club stops meeting after three months. Which reason is **most likely** and best supported by experience?",
    options: [
      ["Members lost interest: there was no plan, recognition or support", "Correct: poor planning and lack of recognition often end projects."],
      ["Clean-ups are illegal in Zimbabwean towns", "They are not illegal; councils often support them."],
      ["Rubbish never returns to the streets once it has been collected the first time", "Rubbish does return, which is why regular clean-ups are needed."],
      ["Young people are never able to volunteer", "Many young people volunteer successfully."],
    ],
    answer: "A",
    hints: ["Think about the challenges volunteers face."],
    explanation: "Voluntary projects often fail without clear planning, local leadership and recognition, which keep volunteers motivated.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Volunteers do not receive a wage for their work.",
    answer: true,
    explanation: "True. They may receive food or transport, but not a wage.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Voluntary activities benefit only the community and never the volunteer.",
    answer: false,
    explanation: "False. Volunteers gain skills, experience, satisfaction, friendships and respect.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each community need with a suitable voluntary activity.",
    pairs: [
      ["litter at the bus terminus", "a clean-up campaign"],
      ["bare, eroded land near a school", "tree planting and grass cover"],
      ["an elderly woman living alone", "home visits to fetch water and medicine"],
      ["a shortage of desks at a school", "a project to repair and build desks"],
    ],
    explanation: "Each activity is matched to the need it meets.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentence.",
    template: "The chief's field, whose harvest fed orphans, widows and the needy, is called {{blank:a}}; the work party is called nhimbe in Shona and {{blank:b}} in Ndebele.",
    blanks: [
      { id: "a", accepted: ["zunde ramambo"], choices: ["zunde ramambo", "tseu", "dare", "danga"] },
      { id: "b", accepted: ["ilima"], choices: ["ilima", "umthimba", "inkundla", "lobola"] },
    ],
    explanation: "Zunde ramambo is the chief's field; ilima is the Ndebele work party. Inkundla is the court; umthimba is handing over a bride.",
  });
  b.fib({
    d: 3, skill: "APPLICATION",
    stem: "Read the scenario and complete the sentence.",
    template: "After floods in a low-lying suburb, volunteers collect blankets and food for affected families. This activity is called {{blank:a}}, and it meets a need that is common in {{blank:b}} settlements.",
    blanks: [
      { id: "a", accepted: ["disaster relief"], choices: ["disaster relief", "tree planting", "tutoring", "a clean-up"] },
      { id: "b", accepted: ["low-lying"], choices: ["low-lying", "hilltop", "mining", "farming"] },
    ],
    hints: ["What happened to the families?"],
    explanation: "Collecting food and blankets after floods is disaster relief; low-lying settlements are most at risk of flooding.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 4,
    stem: "State **four** examples of voluntary community activities.",
    points: [
      "Any one of: clean-ups, helping the elderly/sick, home-based care, tree planting, community gardens, school building/repair projects, disaster relief, repairing roads or boreholes, tutoring/mentoring, blood donation",
      "A second example",
      "A third example",
      "A fourth example",
    ],
    modelAnswer: "Clean-up campaigns, tree planting, helping the elderly, and moulding bricks for a school.",
    explanation: "One mark per correct example.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** ways in which voluntary activities benefit a community.",
    points: [
      "Identifies meeting needs / saving money",
      "Explains that free labour solves problems quickly when councils lack funds",
      "Identifies unity / support for vulnerable people / environmental protection",
      "Explains the effect, e.g. people working together build trust; the elderly and sick are not neglected",
    ],
    modelAnswer: "Volunteers meet needs quickly and save money, because their free labour can repair a borehole or clear drains when the council lacks funds. Voluntary work also builds unity, since people of different backgrounds work together and come to trust each other.",
    hints: ["Each benefit needs an effect."],
    explanation: "One mark for each benefit and one for its explanation.",
  });
  b.manualShort({
    d: 4, skill: "APPLICATION", marks: 6,
    stem: "Your school wants to start a voluntary project in its community. Suggest a suitable project, and explain how you would identify the need, organise volunteers and keep the project going.",
    points: [
      ["Suggests a suitable project linked to a real need, e.g. a community garden for vulnerable households", 1],
      ["Identifying the need: consulting the village head/councillor, residents or clinic; observing problems", 2],
      ["Organising: a committee, a plan, tasks and a timetable; getting materials or donations; involving local leaders", 2],
      ["Keeping it going: recognising volunteers, reporting results, regular meetings, records", 1],
    ],
    modelAnswer: "We would start a community garden to grow vegetables for elderly people and orphans. To identify the need, we would consult the village head, the clinic and residents to find out which households lack food. We would form a committee, make a plan with tasks and a timetable, and ask local businesses to donate seed and tools. To keep it going, we would hold regular meetings, keep simple records and thank volunteers publicly at assemblies.",
    hints: ["Plan in three stages: find the need, organise, sustain."],
    explanation: "Credit a sensible, needs-based plan with all three stages explained.",
  });
  b.struct({
    d: 3, skill: "APPLICATION",
    stem: source("Source A", "a notice on a fictional community board in Gweru, 2026",
      "VOLUNTEERS WANTED! Join the Ward 9 Clean Streets Team every second Saturday, 8 a.m. to 11 a.m. We clear drains, collect litter and plant trees along the main road. Gloves and bags provided by the council. Lunch provided by local churches. Certificates for regular volunteers. Everyone welcome, young and old!") +
      "\n\nRead Source A and answer the questions.",
    parts: [
      P.mcq({
        label: "(a)",
        stem: "Which community need does the team **mainly** address?",
        options: [
          ["litter and blocked drains", "Correct: they clear drains and collect litter."],
          ["a broken borehole", "The notice does not mention boreholes."],
          ["a shortage of school desks", "The notice does not mention schools."],
          ["the care of orphans", "The notice does not mention orphans."],
        ],
        answer: "A",
      }),
      P.manual({
        label: "(b)", marks: 2,
        stem: "Identify **two** ways in which the organisers encourage people to volunteer.",
        points: ["Providing gloves, bags and lunch (support from council and churches)", "Certificates for regular volunteers (recognition) / welcoming everyone"],
        modelAnswer: "They provide gloves, bags and lunch, and they give certificates to regular volunteers.",
      }),
      P.manual({
        label: "(c)", marks: 3,
        stem: "Explain how the team could benefit both the community and the volunteers.",
        points: [
          "Community: clean drains and streets reduce flooding and disease",
          "Community: trees improve the environment / people working together build unity",
          "Volunteers: certificates and experience help in finding work / satisfaction and friendships",
        ],
        modelAnswer: "Clearing drains and litter reduces flooding and diseases such as cholera, and planting trees improves the environment. Working together builds unity among residents. Volunteers gain certificates and experience that can help them find work, as well as friendships and satisfaction.",
      }),
    ],
    hints: ["In (c), give at least one benefit to each."],
    explanation: "A source-based practice item on an urban voluntary activity.",
  });
  b.struct({
    d: 5, skill: "EVALUATION",
    stem: "This question is about voluntary activities.",
    parts: [
      P.manual({
        label: "(a)", marks: 4,
        stem: "Describe **two** challenges faced by volunteers.",
        points: [
          ["Lack of time because they must earn a living / attend school", 2],
          ["Lack of materials, tools and transport / loss of interest / poor planning", 2],
        ],
        modelAnswer: "Many people have little time to volunteer because they must earn a living or attend school. Projects also need materials, tools and transport, which cost money, and volunteers may lose interest if a project is poorly planned.",
      }),
      P.manual({
        label: "(b)", marks: 8, type: "EXTENDED_RESPONSE",
        stem: "\"Communities should not have to rely on volunteers; the government should provide all services.\" How far do you agree?",
        points: [
          ["For: services such as water, roads and health are government responsibilities funded by taxes; relying on volunteers may excuse poor service", 2],
          ["For: volunteers may lack skills, and poor communities cannot afford materials", 2],
          ["Against: resources are limited; volunteers meet needs quickly, build unity and Unhu, and continue the tradition of nhimbe/ilima; volunteers also gain", 2],
          ["Supported judgement, e.g. government and volunteers complement each other", 2],
        ],
        levels: levels(8),
        modelAnswer: "There is some truth in the statement. Water, roads, health care and refuse collection are services that government and councils are expected to provide from taxes and rates. If communities always fill the gaps, authorities may not be held to account, and poor communities may lack the money and skills to do the work well.\n\nHowever, government resources are limited, and waiting for them can mean children walk past a dangerous gully for years. Volunteers meet needs quickly and cheaply, strengthen unity and Unhu, and continue the tradition of nhimbe/ilima and zunde ramambo. Volunteering also benefits the volunteers through skills and experience.\n\nI disagree with the statement. Government should provide core services, but voluntary activity is still valuable: the two should work together, as when a council supplies a truck and residents do the clean-up.",
      }),
    ],
    hints: ["In (b), consider both the duty of government and the value of volunteering."],
    explanation: "A practice evaluative item on the role of volunteers and government.",
  });

  b.card("DEFINITION", "Volunteer", "A person who freely offers time, skills or labour for others without expecting payment.");
  b.card("DEFINITION", "Voluntary community activity", "Work done freely and without payment to meet a community need or help people in need.");
  b.card("FACT", "Name five voluntary community activities.", "Clean-ups, helping the elderly and sick, tree planting, community gardens, school projects (also disaster relief, borehole repair, tutoring).");
  b.card("FACT", "Name two traditional forms of communal voluntary work.", "The work party (nhimbe/ilima) and the chief's field (zunde ramambo).");
  b.card("CONCEPT", "Give two rural and two urban community needs.", "Rural: broken boreholes, soil erosion. Urban: blocked drains and litter, youth unemployment and crime.");
  b.card("CONCEPT", "How does volunteering benefit the volunteer?", "Skills and experience, satisfaction and confidence, friendships and networks, respect and references.");
  b.card("CONCEPT", "How does volunteering benefit the community?", "Meets needs quickly, saves money, builds unity, supports the vulnerable, protects the environment, encourages self-reliance.");
  b.card("CONCEPT", "Name three challenges volunteers face.", "Lack of time, lack of materials and transport, loss of interest, poor planning.");
});
