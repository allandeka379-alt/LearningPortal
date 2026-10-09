// W1a: stages and sectors of production (COM, BES, CAM).
import { concept, P, COM, CAM } from "../lib.mjs";

concept("bus.production.sectors", { file: "production/sectors", keyPrefix: "production.sectors" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "In which sector of production is a gold mine?",
    options: [
      ["Primary", "Correct: mining extracts natural resources from the earth."],
      ["Secondary", "The secondary sector processes or manufactures; a refinery would be secondary."],
      ["Tertiary", "The tertiary sector provides services."],
      ["Public", "Public describes ownership by the state, not a sector of production."],
    ],
    answer: "A",
    explanation: "Extractive industries such as mining, farming, fishing and forestry are in the primary sector.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "A company building a new road between Harare and Chitungwiza is in which sector?",
    options: [
      ["Secondary", "Correct: construction makes physical structures, so it is secondary."],
      ["Primary", "Primary production extracts raw materials; road building uses them."],
      ["Tertiary", "Although it serves a customer, construction produces a physical product."],
      ["Commercial", "Commercial services are trade and aids to trade, part of the tertiary sector."],
    ],
    answer: "A",
    explanation: "The secondary sector covers manufacturing and construction.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which business is in the **tertiary** sector?",
    options: [
      ["An insurance company in Bulawayo", "Correct: insurance is a service."],
      ["A cement factory in Gweru", "Manufacturing cement is secondary."],
      ["A sugar-cane estate in the Lowveld", "Growing sugar cane is primary."],
      ["A sawmill in Mutare", "Turning logs into planks is secondary processing."],
    ],
    answer: "A",
    explanation: "Tertiary businesses provide services: trade, transport, banking, insurance, communication, education, health and so on.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", applies: COM,
    stem: "In Commerce, which of these is a **direct service**?",
    options: [
      ["A nurse at a clinic", "Correct: nursing is a personal service provided directly to people."],
      ["A road haulage company", "Transport is an aid to trade: a commercial service."],
      ["A commercial bank", "Banking is an aid to trade: a commercial service."],
      ["A wholesaler", "Wholesaling is part of trade: a commercial service."],
    ],
    answer: "A",
    explanation: "Direct services are given personally to people (teachers, nurses, police, hairdressers). Commercial services (trade and the aids to trade) help goods reach consumers.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What does the **chain of production** show?",
    options: [
      ["The stages from raw material to final consumer", "Correct: each link is a stage of production in one of the sectors."],
      ["The managers of a business from top to bottom", "That is an organisation chart, not a chain of production."],
      ["The shops owned by one retailer in many towns", "That describes a chain store, a type of retailer."],
      ["The order in which documents are sent in trade", "That is the sequence of trade documents."],
    ],
    answer: "A",
    explanation: "The chain of production follows a product through the primary, secondary and tertiary stages until it reaches the consumer.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A drought cuts the cotton harvest. Which is the most likely **direct** effect on the secondary sector?",
    options: [
      ["Ginneries and textile mills have less raw cotton to process", "Correct: the secondary sector depends on primary output as its raw material."],
      ["Commercial banks receive fewer deposits from tourists", "Tourists are not linked directly to the cotton harvest."],
      ["Clothing retailers pay lower rent for their shops", "Rents are not directly affected by the harvest; retailers are tertiary anyway."],
      ["Farmers buy more fertiliser for their cotton crop", "Farmers are primary, and a poor harvest does not raise fertiliser demand."],
    ],
    answer: "A",
    explanation: "This shows interdependence: a fall in primary output reduces the raw materials available to manufacturers, who may cut output and jobs.",
    hints: ["The secondary sector processes raw materials.", "Where does a textile mill get its cotton?"],
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING", applies: CAM,
    stem: "As a country's economy develops, which change in employment is most likely?",
    options: [
      ["A smaller share of workers in the primary sector", "Correct: farming becomes mechanised and people move to factories and services."],
      ["A larger share of workers in the primary sector", "This is the opposite of the usual trend as incomes rise."],
      ["No change in the share of any sector", "Development normally changes the structure of employment."],
      ["The tertiary sector disappears as factories grow", "The tertiary sector usually grows as incomes rise."],
    ],
    answer: "A",
    explanation: "With development, mechanisation reduces farm jobs, industry grows and later services grow most as people spend higher incomes on services.",
    hints: ["Think about what happens to farming when machines replace workers."],
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Construction belongs to the tertiary sector because builders provide a service to their customers.",
    answer: false,
    explanation: "False. Construction produces physical structures (buildings, roads, dams), so it is part of the secondary sector.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A state-owned railway company is in both the public sector and the tertiary sector.",
    answer: true,
    explanation: "True. Ownership (public/private) and type of activity (primary/secondary/tertiary) are different classifications. The railway is owned by the state and provides transport, a service.",
  });
  b.match({
    d: 2, skill: "APPLICATION",
    stem: "Match each business with its sector of production.",
    pairs: [["A fishing co-operative on Lake Kariba", "Primary"], ["A furniture factory in Bulawayo", "Secondary"], ["A bus company running routes to Masvingo", "Tertiary"]],
    explanation: "Fishing extracts a natural resource (primary); making furniture is manufacturing (secondary); passenger transport is a service (tertiary).",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING", applies: COM,
    stem: "Match each hindrance to trade with the aid to trade that removes it.",
    pairs: [["Producer and consumer live far apart", "Transport"], ["Goods are made before they are needed", "Warehousing"], ["Goods may be lost or damaged", "Insurance"], ["Consumers do not know the product exists", "Advertising"]],
    explanation: "Transport bridges distance, warehousing bridges time, insurance covers risk and advertising provides information.",
  });
  b.fib({
    d: 2,
    stem: "Complete the chain of production for maize meal.",
    template: "A farmer grows maize ({{blank:a}} sector). A milling company turns it into maize meal ({{blank:b}} sector). A supermarket sells the maize meal ({{blank:c}} sector).",
    blanks: [
      { id: "a", accepted: ["primary"], choices: ["primary", "secondary", "tertiary"] },
      { id: "b", accepted: ["secondary"], choices: ["primary", "secondary", "tertiary"] },
      { id: "c", accepted: ["tertiary"], choices: ["primary", "secondary", "tertiary"] },
    ],
    wrong: [["primary", "tertiary", "tertiary"]],
    explanation: "Growing is primary, milling is secondary (processing) and retailing is tertiary.",
  });
  b.short({
    d: 2,
    stem: "Give the term for the way in which the primary, secondary and tertiary sectors rely on each other.",
    accepted: ["interdependence", "interdependence of the sectors", "interdependent", "mutual dependence"],
    wrong: ["specialisation", "integration"],
    explanation: "**Interdependence**: each sector supplies inputs or services to the others and buys from them.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Using examples, explain how the **secondary** sector depends on the primary and tertiary sectors.",
    points: [
      "It needs raw materials from the primary sector (1)",
      "Relevant example, e.g. a canning factory needs fruit from farmers (1)",
      "It needs services from the tertiary sector (1)",
      "Relevant example, e.g. transport to deliver goods / banks for loans / insurance for the factory (1)",
    ],
    modelAnswer: "A clothing factory cannot work without cotton grown by farmers in the primary sector. It also needs the tertiary sector: transport to bring in the cloth and deliver finished clothes, a bank to handle payments and loans, and insurance against fire.",
    explanation: "Two links (primary and tertiary), each with an example, earn the four marks.",
    hints: ["Where do factories get raw materials?", "Which services does a factory buy?"],
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4, applies: CAM,
    stem: "Explain **two** reasons why the tertiary sector usually grows in importance as a country develops.",
    points: [
      "Reason 1 identified, e.g. rising incomes (1)",
      "Developed: people spend more of their extra income on services such as tourism, banking and health (1)",
      "Reason 2 identified, e.g. mechanisation / technology / cheaper imported manufactures (1)",
      "Developed: fewer workers needed in farming and factories, so they move into service jobs (1)",
    ],
    modelAnswer: "First, as incomes rise people already have the goods they need and spend more on services such as restaurants, holidays, insurance and health care, so service businesses grow. Second, machines and new technology replace workers in farming and manufacturing, and some manufactured goods are imported more cheaply, so workers move into service jobs.",
    explanation: "Each reason needs to be stated and then explained (why it leads to more tertiary activity).",
    hints: ["What do people buy when their incomes rise?", "What happens to farm and factory jobs when machines are used?"],
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, secs: 720,
    stem: "Tatenda's family owns a timber plantation in the Eastern Highlands. They are thinking of opening a small furniture workshop in Mutare that would use their own timber, and of selling the furniture through a shop in the town.",
    parts: [
      P.mcq({
        label: "(a)", marks: 1,
        stem: "In which sector is the timber plantation?",
        options: [["Primary", "Correct: forestry extracts a natural resource."], ["Secondary", "Making furniture would be secondary."], ["Tertiary", "Selling through a shop would be tertiary."], ["Public", "Public refers to state ownership, not the activity."]],
        answer: "A",
      }),
      P.fib({
        label: "(b)", marks: 2,
        stem: "Classify the planned activities.",
        template: "The furniture workshop: {{blank:a}} sector. The furniture shop: {{blank:b}} sector.",
        blanks: [
          { id: "a", accepted: ["secondary"], choices: ["primary", "secondary", "tertiary"] },
          { id: "b", accepted: ["tertiary"], choices: ["primary", "secondary", "tertiary"] },
        ],
      }),
      P.manual({
        label: "(c)", marks: 3,
        stem: "Identify **three** tertiary services the family would need to run the workshop and shop.",
        points: ["Transport (e.g. moving timber and furniture) (1)", "Banking / finance (1)", "Insurance / advertising / communication (any third service) (1)"],
      }),
      P.manual({
        label: "(d)", marks: 6, type: "EXTENDED_RESPONSE",
        stem: "Discuss whether the family should expand into the secondary and tertiary sectors rather than only selling timber. Give a justified conclusion.",
        points: [
          "Advantage: they add value to their own timber, so selling price and profit per tree rise (1)",
          "Advantage: secure supply of raw material at low cost (1)",
          "Disadvantage: needs new skills, machinery and capital / more risk (1)",
          "Disadvantage: competition from established furniture makers / need to find customers (1)",
          "Clear conclusion (1)",
          "Conclusion justified with reference to the case (1)",
        ],
        modelAnswer: "By making furniture, the family would add value to timber they already own, so they would earn far more per tree than by selling logs, and their workshop would never run short of wood. Owning a shop lets them keep the retailer's profit. However, they would need carpentry skills, machines and money for a building, and they would compete with established furniture makers in Mutare. If the workshop fails, they could lose the money invested. They should expand step by step: start with a workshop selling to existing shops, and open their own shop only when sales are proven, because this adds value while keeping risk manageable.",
      }),
    ],
    explanation: "The plantation is primary, the workshop secondary and the shop tertiary. Expanding along the chain adds value but needs skills, capital and customers.",
    hints: ["Forestry, manufacturing, retailing: one per sector.", "For (d), consider the value added and the extra risks."],
  });
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: 720, applies: CAM,
    stem: "The table shows how the employment of a fictional country, Country X, changed over 30 years.\n\n| Sector | Share of workers 30 years ago (%) | Share of workers today (%) |\n| --- | ---: | ---: |\n| Primary | 70 | 45 |\n| Secondary | 12 | 20 |\n| Tertiary | 18 | 35 |",
    parts: [
      P.short({
        label: "(a)", marks: 1,
        stem: "Which sector's share of workers grew the most over the period?",
        accepted: ["tertiary", "the tertiary sector", "tertiary sector", "services"],
        wrong: ["secondary"],
      }),
      P.num({
        label: "(b)", marks: 1, kind: "plain", value: 70 - 45,
        stem: "By how many percentage points did the primary sector's share fall?",
        wrong: [45, 70 + 45],
        explanation: "70 − 45 = 25 percentage points.",
      }),
      P.manual({
        label: "(c)", marks: 4,
        stem: "Explain **two** possible reasons for the change in the primary sector.",
        points: ["Reason 1, e.g. mechanisation of farming (1)", "Developed: fewer workers needed for the same output (1)", "Reason 2, e.g. people moving to towns for better-paid factory/service jobs (1)", "Developed: higher wages / education attract workers away from farming (1)"],
      }),
      P.manual({
        label: "(d)", marks: 6, type: "EXTENDED_RESPONSE",
        stem: "A clothing manufacturer is deciding whether to open a factory in Country X. Evaluate whether the changes in the table make Country X a good location.",
        points: [
          "Growing secondary sector suggests skilled factory workers / suppliers available (1)",
          "Growing tertiary sector means transport, banking and retail services available (1)",
          "Rising incomes (implied by tertiary growth) give a home market for clothes (1)",
          "Drawback, e.g. wages may be rising / competition for workers (1)",
          "Recognises other information needed (e.g. costs, government policy) (1)",
          "Justified conclusion (1)",
        ],
        modelAnswer: "The growth of the secondary sector suggests there are workers with factory experience and suppliers of materials, and the growth of services means transport, banks and shops are available to support the factory and sell its clothes. Rising incomes also create a home market. On the other hand, as the country develops, wages tend to rise, which matters to a labour-intensive clothing business, and other factories may compete for workers. The table does not show costs, so the firm should also compare wages and rents. Overall the changes are a good sign, provided labour costs are still competitive.",
      }),
    ],
    explanation: "The tertiary share grew by 17 points (18 to 35), more than secondary (8 points). Primary fell by 25 points, typical of mechanisation and migration to towns.",
    hints: ["Subtract the old share from the new share for each sector.", "For (d), think about workers, services, customers and costs."],
  });
  b.card("DEFINITION", "Primary sector", "Extracts natural resources: farming, mining, fishing, forestry.");
  b.card("DEFINITION", "Secondary sector", "Turns raw materials into goods: manufacturing and construction.");
  b.card("DEFINITION", "Tertiary sector", "Provides services, e.g. transport, banking, insurance, retailing, education, health.");
  b.card("CONCEPT", "Commercial services versus direct services", "Commercial services (trade and aids to trade) help goods reach consumers; direct services are given personally to people (teachers, nurses).", null, { applies: COM });
  b.card("DEFINITION", "Chain of production", "The stages a product passes through from raw material to the final consumer.");
  b.card("CONCEPT", "Interdependence of the sectors", "Each sector relies on the others for inputs, services or customers; a problem in one spreads to the others.");
  b.card("FACT", "Aids to trade", "Transport, communication, banking, insurance, warehousing and advertising.", null, { applies: COM });
  b.card("CONCEPT", "Change in sectors with development", "Employment shifts from primary to secondary and then to tertiary as incomes rise and farming is mechanised.");
  b.card("FACT", "Construction", "Construction is in the secondary sector, not the tertiary sector.");
});
