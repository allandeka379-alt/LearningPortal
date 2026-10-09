// W2a: role of the enterpriser and drivers towards enterprising (BES only).
import { concept, P } from "../lib.mjs";

concept("bus.enterprise.role-drivers", { file: "enterprise/role-drivers", keyPrefix: "enterprise.role-drivers" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which role of an enterpriser comes **first**?",
    options: [
      ["Scanning the environment", "Correct: opportunities are found by studying the environment."],
      ["Managing the business", "Management happens after the business is set up."],
      ["Setting up the business", "Setting up follows identifying and resourcing an idea."],
      ["Allocating resources", "Resources are allocated after they are mobilised."],
    ],
    answer: "A",
    explanation: "Order: scanning the environment, identifying opportunities, mobilising resources, allocating resources, setting up, managing.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What does **mobilising resources** mean?",
    options: [
      ["Gathering the capital, labour and materials needed", "Correct: bringing together what the business needs."],
      ["Moving the business to new premises in another town", "That is relocation."],
      ["Selling off the business's equipment", "That is disposing of assets."],
      ["Advertising the business on the radio", "That is promotion."],
    ],
    answer: "A",
    explanation: "Mobilising resources means gathering capital, premises, equipment, labour, materials and information.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Many young people start businesses because they cannot find formal jobs. Which driver towards enterprising is this?",
    options: [
      ["Demographic and economic changes", "Correct: unemployment pushes people into self-employment."],
      ["Self-actualisation", "Self-actualisation is the wish to fulfil one's potential."],
      ["Community enterprising heroes", "Role models inspire, they do not cause unemployment."],
      ["Government policies", "The stem describes the job market, not a policy."],
    ],
    answer: "A",
    explanation: "Economic changes such as unemployment and a young, growing population push people towards enterprise.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "A successful local businesswoman mentors young people in her township, and several start their own businesses. Which driver is this?",
    options: [
      ["Community enterprising heroes (role models)", "Correct: local role models inspire others."],
      ["Government policies such as youth loans", "No government action is described."],
      ["Demographic change", "No change in population is described."],
      ["Self-actualisation", "The driver here comes from another person's example."],
    ],
    answer: "A",
    explanation: "Community enterprising heroes show others that enterprise is possible and may mentor them.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which is an example of **allocating resources**?",
    options: [
      ["Deciding how much of the budget to spend on stock", "Correct: dividing limited resources between uses."],
      ["Borrowing money from a savings club", "That is mobilising resources."],
      ["Noticing that a suburb has no pharmacy", "That is identifying an opportunity."],
      ["Reading about new technology in newspapers", "That is scanning the environment."],
    ],
    answer: "A",
    explanation: "Allocation means deciding how limited resources are used: money between stock and equipment, workers between tasks.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "The government reserves some contracts for youth-owned businesses and offers them low-interest loans. Which driver towards enterprising is this?",
    options: [
      ["Government policies", "Correct: policy measures make starting a business easier."],
      ["Self-actualisation", "This is an inner personal driver."],
      ["Community enterprising heroes", "These are local role models."],
      ["Changes in tastes and fashion", "This is a source of opportunity, not the policy described."],
    ],
    answer: "A",
    explanation: "Government policies such as loans, contracts, training and simpler registration drive people towards enterprise.",
    hints: ["Who is acting in the stem?"],
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Rudo leaves a well-paid job to start a fashion label because she wants to use her talent and achieve her dream. Which driver is strongest?",
    options: [
      ["Self-actualisation", "Correct: an inner desire to fulfil her potential."],
      ["Unemployment", "She had a well-paid job."],
      ["Government policies", "No policy is mentioned."],
      ["Population growth", "No population change is mentioned."],
    ],
    answer: "A",
    explanation: "Self-actualisation is the desire to reach one's full potential and achieve personal goals.",
    hints: ["She did not need a job. Why did she start?"],
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Setting up the business comes before identifying a business opportunity.",
    answer: false,
    explanation: "False. The enterpriser must first identify an opportunity and mobilise resources before setting up.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Managing the business includes keeping records and controlling cash.",
    answer: true,
    explanation: "True. Management involves planning, organising, leading, co-ordinating and controlling, including records and cash.",
  });
  b.match({
    d: 2, skill: "APPLICATION",
    stem: "Match each action with the role of the enterpriser it shows.",
    pairs: [
      ["Talks to customers about what they cannot buy locally", "Scanning the environment"],
      ["Raises a loan and hires two skilled workers", "Mobilising resources"],
      ["Registers the business and obtains a licence", "Setting up the business"],
      ["Compares weekly sales with targets and adjusts prices", "Managing the business"],
    ],
    explanation: "Each action belongs to one stage of the enterpriser's role.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each situation with the driver towards enterprising.",
    pairs: [
      ["A youth loan scheme is launched", "Government policies"],
      ["Towns grow quickly as people move from rural areas", "Demographic and economic changes"],
      ["A man wants to prove he can build his own company", "Self-actualisation"],
      ["A famous local farmer inspires young people", "Community enterprising heroes"],
    ],
    explanation: "The four drivers named in the syllabus.",
  });
  b.fib({
    d: 2,
    stem: "Complete the order of the enterpriser's roles.",
    template: "Scanning the environment → identifying {{blank:a}} → mobilising resources → {{blank:b}} resources → setting up → managing the business.",
    blanks: [
      { id: "a", accepted: ["opportunities", "business opportunities", "an opportunity"] },
      { id: "b", accepted: ["allocating"], choices: ["allocating", "selling", "insuring", "advertising"] },
    ],
    wrong: [["customers", "selling"]],
    explanation: "The sequence moves from idea to running business.",
  });
  b.short({
    d: 2,
    stem: "Give the term for the desire to reach one's full potential, which drives some people to start enterprises.",
    accepted: ["self-actualisation", "self actualisation", "self-actualization", "self actualization"],
    wrong: ["self-employment", "motivation"],
    explanation: "**Self-actualisation** is the inner drive to achieve personal goals and use one's talents.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** roles of an enterpriser.",
    points: [
      "Role 1 identified, e.g. identifying business opportunities (1)",
      "Explained, e.g. finds a need customers will pay for, so the business has demand (1)",
      "Role 2 identified, e.g. mobilising / allocating resources / managing (1)",
      "Explained, e.g. gathers capital and workers so production can start / avoids waste (1)",
    ],
    modelAnswer: "The enterpriser identifies business opportunities by finding needs that customers will pay for, which gives the business a market. The enterpriser also mobilises resources, gathering the capital, equipment and workers the business needs to start producing.",
    explanation: "State each role and explain what it achieves.",
    hints: ["Choose two roles in the sequence and explain each."],
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain how **demographic changes** can drive people towards enterprising.",
    points: [
      "Population growth increases demand for goods and services (1)",
      "Creates opportunities, e.g. food, transport, housing (1)",
      "Young population / urbanisation with few formal jobs (1)",
      "Pushes people into self-employment (1)",
    ],
    modelAnswer: "A growing population increases demand for food, transport and housing, which creates opportunities for new businesses. Because many young people move to towns where formal jobs are scarce, they are pushed into starting their own enterprises.",
    explanation: "Show both the pull (new demand) and the push (lack of jobs).",
    hints: ["Think about demand and about jobs."],
  });
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: 840,
    stem: "After being retrenched from a clothing factory in Bulawayo, Thandeka noticed that school uniform shops often ran out of stock in January. She borrowed from her savings club, bought two sewing machines, hired a former colleague and rented a room at a home-industry site. She now sells to three uniform shops and checks her orders and cash every week.",
    parts: [
      P.mcq({
        label: "(a)", marks: 1,
        stem: "Noticing that shops ran out of uniforms in January is an example of:",
        options: [["Identifying a business opportunity", "Correct: an unmet demand."], ["Allocating resources", "No resources are being divided."], ["Managing the business", "The business has not started yet."], ["Setting up the business", "This comes later."]],
        answer: "A",
      }),
      P.manual({
        label: "(b)", marks: 3,
        stem: "Identify **three** resources Thandeka mobilised.",
        points: ["Finance from her savings club (1)", "Sewing machines (equipment) (1)", "A skilled worker / premises at a home-industry site (1)"],
      }),
      P.manual({
        label: "(c)", marks: 4,
        stem: "Explain **two** drivers that led Thandeka towards enterprising.",
        points: ["Driver 1: economic change, being retrenched (1)", "Developed: loss of income pushed her into self-employment (1)", "Driver 2: e.g. self-actualisation / support from community savings club / workspace (government policy) (1)", "Developed: using her sewing skills / access to finance and premises made starting possible (1)"],
      }),
      P.manual({
        label: "(d)", marks: 6, type: "EXTENDED_RESPONSE",
        stem: "Evaluate how well Thandeka has carried out the role of an enterpriser.",
        points: [
          "Scanned and identified a real opportunity (unmet January demand) (1)",
          "Mobilised suitable resources at low cost (1)",
          "Manages by checking orders and cash weekly (1)",
          "Weakness: depends on three customers / seasonal demand (1)",
          "Suggestion, e.g. find more customers / products for other months (1)",
          "Justified conclusion (1)",
        ],
        modelAnswer: "Thandeka found a real opportunity, mobilised what she needed at low cost and manages carefully by checking orders and cash weekly. Her weakness is reliance on three shops and on January demand, so sales may collapse for the rest of the year. Overall she has performed the role well, but she should find more customers and products such as sports kits for other months.",
      }),
    ],
    explanation: "Thandeka scanned, identified, mobilised, set up and manages; she was pushed by retrenchment and helped by her savings club.",
    hints: ["Follow the roles in order.", "Which drivers push and which pull?"],
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, secs: 900,
    stem: "A rural district has high youth unemployment. A new tarred road has just reached the district centre, a well-known local businessman runs a large farm and shop there, and the government has opened a youth loan office in the centre.",
    parts: [
      P.manual({
        label: "(a)", marks: 4,
        stem: "Identify **four** drivers towards enterprising present in the district, using evidence from the case.",
        points: ["Economic change: youth unemployment (1)", "Economic/infrastructure change: the new road opens markets (1)", "Community enterprising hero: the local businessman (1)", "Government policy: the youth loan office (1)"],
      }),
      P.manual({
        label: "(b)", marks: 4,
        stem: "Explain how the new road could create enterprise opportunities.",
        points: ["Easier transport of produce to town markets (1)", "Opportunity for transport businesses (1)", "Travellers create demand for food, fuel, lodging (1)", "Lower cost of bringing in supplies (1)"],
      }),
      P.manual({
        label: "(c)", marks: 6, type: "EXTENDED_RESPONSE",
        stem: "Evaluate which driver is likely to have the greatest effect on enterprise in the district.",
        points: [
          "Unemployment pushes many youths into business, but often tiny, similar ones (1)",
          "Loans give finance, the main barrier for start-ups (1)",
          "Role model provides mentoring, contacts and confidence (1)",
          "Road creates new demand and markets (1)",
          "Recognises drivers work together (1)",
          "Justified judgement of the greatest effect (1)",
        ],
        modelAnswer: "Unemployment will push many young people into business, but without finance and markets they will set up small, similar stalls. The youth loans remove the biggest barrier, lack of capital, and the road gives them access to customers in town and passing travellers. The local businessman can mentor them and may buy from them. The loan office is likely to have the greatest effect, because finance turns the push of unemployment into real businesses, especially now that the road provides a market.",
      }),
    ],
    explanation: "Drivers: unemployment (economic change), the road (economic change/infrastructure), a role model and government loans. They reinforce each other.",
    hints: ["Find one driver in each sentence of the case.", "Which barrier to starting a business is most serious?"],
  });
  b.card("FACT", "Roles of an enterpriser (in order)", "Scan the environment, identify opportunities, mobilise resources, allocate resources, set up, manage.");
  b.card("DEFINITION", "Environmental scanning", "Studying customers, competitors, the economy, policy, technology and society to find opportunities and threats.");
  b.card("DEFINITION", "Mobilising resources", "Gathering the capital, premises, equipment, labour, materials and information a business needs.");
  b.card("DEFINITION", "Allocating resources", "Deciding how limited resources are divided between uses to avoid waste.");
  b.card("FACT", "Drivers towards enterprising", "Government policies, demographic and economic changes, self-actualisation, community enterprising heroes.");
  b.card("DEFINITION", "Self-actualisation", "The desire to reach one's full potential and achieve personal goals.");
  b.card("CONCEPT", "Push and pull drivers", "Push: lack of jobs, retrenchment. Pull: opportunities, support, role models, personal ambition.");
  b.card("CONCEPT", "Role versus quality", "A role is a task (mobilising resources); a quality is a personal characteristic (determination).");
});
